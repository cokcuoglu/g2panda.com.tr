import express, { Request, Response } from 'express';
import { withTransaction, pool } from '../db';
import logger from '../config/logger';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// ----------------------------------------------------------------------
// PUBLIC ENDPOINTS (No Auth Required - For QR Menu)
// ----------------------------------------------------------------------

// POST /api/orders/public/:userId
// Customer submits an order
router.post('/public/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const {
            items,
            table_number,
            note,
            customer_name,
            customer_phone,
            customer_address,
            customer_city,
            customer_district,
            customer_neighborhood
        } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, error: 'Sepet boş olamaz.' });
        }

        // 1. Validate Items & Calculate Total
        let validatedItems = [];
        let totalAmount = 0;

        // 1. Validate Items & Calculate Total (Simplified for brevity, assuming same logic as before)
        const productIds = items.map((i: any) => i.id);
        const productsRes = await pool.query(
            `SELECT id, price, name FROM products WHERE id = ANY($1::uuid[])`,
            [productIds]
        );
        const productMap = new Map(productsRes.rows.map((p: any) => [p.id, p]));

        for (const item of items) {
            const product = productMap.get(item.id);
            if (!product) {
                throw new Error(`Ürün bulunamadı: ${item.name}`);
            }

            // Verify price (important security check)
            const price = Number(product.price);
            validatedItems.push({
                id: item.id,
                name: product.name,
                quantity: item.quantity,
                price: price
            });
            totalAmount += price * item.quantity;
        }

        // 2. Handle Customer (CRM Integration)
        let customerId = null;
        if (customer_phone) {
            if (!/^[5][0-9]{9}$/.test(customer_phone)) {
                return res.status(400).json({ success: false, error: 'Telefon numarası 5 ile başlamalı ve 10 haneli olmalıdır. (Örn: 5301234567)' });
            }
            try {
                // Upsert customer based on phone number
                // ON CONFLICT requires the index to be inferred. 
                // Since we have a partial index (WHERE deleted_at IS NULL), we must specify it.
                const customerRes = await pool.query(
                    `INSERT INTO customers (user_id, name, phone, address, city, district, neighborhood)
                     VALUES ($1, $2, $3, $4, $5, $6, $7)
                     ON CONFLICT (user_id, phone) WHERE deleted_at IS NULL AND phone IS NOT NULL AND phone <> ''
                     DO UPDATE SET 
                        name = COALESCE(EXCLUDED.name, customers.name),
                        address = COALESCE(EXCLUDED.address, customers.address),
                        city = COALESCE(EXCLUDED.city, customers.city),
                        district = COALESCE(EXCLUDED.district, customers.district),
                        neighborhood = COALESCE(EXCLUDED.neighborhood, customers.neighborhood),
                        updated_at = NOW()
                     RETURNING id`,
                    [userId, customer_name || 'Misafir', customer_phone, customer_address || null, customer_city, customer_district, customer_neighborhood]
                );
                customerId = customerRes.rows[0].id;
            } catch (custErr) {
                console.error('Customer upsert error:', custErr);
                // Continue without linking if CRM fails, don't block order? 
                // Or fail? Let's log and continue to ensure sales aren't lost.
            }
        }

        // 3. Create Order
        const orderNumber = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 100)}`;

        const query = `
            INSERT INTO orders (
                user_id, order_number, table_number, items, total_amount, note, status,
                customer_id, customer_name, customer_phone, customer_address, 
                customer_city, customer_district, customer_neighborhood
            )
            VALUES ($1, $2, $3, $4, $5, $6, 'pending', $7, $8, $9, $10, $11, $12, $13)
            RETURNING *
        `;

        const result = await pool.query(query, [
            userId,
            orderNumber,
            table_number,
            JSON.stringify(validatedItems),
            totalAmount,
            note,
            customerId,
            customer_name,
            customer_phone,
            customer_address,
            customer_city,
            customer_district,
            customer_neighborhood
        ]);

        res.status(201).json({ success: true, data: result.rows[0] });

    } catch (err: any) {
        logger.error(`[POST-PUBLIC-ORDER ERROR] Error: ${err.message}`);
        res.status(500).json({ success: false, error: err.message || 'Sipariş oluşturulamadı.' });
    }
});


// ----------------------------------------------------------------------
// PROTECTED ENDPOINTS (Auth Required - For Merchant)
// ----------------------------------------------------------------------

router.use(authMiddleware);

// GET /api/orders
// List orders (with filters)
router.get('/', async (req: any, res: Response) => {
    try {
        const { status, limit = '50', page = '1' } = req.query;
        const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

        let query = `SELECT * FROM orders WHERE user_id = $1 AND deleted_at IS NULL`;
        const params: any[] = [req.user.id];

        if (status) {
            params.push(status);
            query += ` AND status = $${params.length}`;
        }

        query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
        params.push(parseInt(limit as string), offset);

        const result = await req.db.query(query, params);

        res.json({ success: true, data: result.rows });

    } catch (err: any) {
        logger.error(`[GET-ORDERS ERROR] User: ${req.user?.id}, Error: ${err.message}`);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// GET /api/orders/pending-count
// Polling endpoint for notifications
router.get('/pending-count', async (req: any, res: Response) => {
    try {
        const result = await req.db.query(
            `SELECT COUNT(*) FROM orders WHERE user_id = $1 AND status = 'pending' AND deleted_at IS NULL`,
            [req.user.id]
        );
        res.json({ success: true, count: parseInt(result.rows[0].count) });
    } catch (err: any) {
        res.status(500).json({ success: false, error: 'Error' });
    }
});


// PUT /api/orders/:id/status
// Update status (Approve to 'confirmed' or Reject to 'rejected')
router.put('/:id/status', async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'confirmed', 'rejected', 'cancelled'

        if (!['confirmed', 'rejected', 'cancelled', 'completed'].includes(status)) {
            return res.status(400).json({ success: false, error: 'Invalid status' });
        }

        const result = await req.db.query(
            `UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 AND user_id = $3 RETURNING *`,
            [status, id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }

        res.json({ success: true, data: result.rows[0] });

    } catch (err: any) {
        logger.error(`[PUT-ORDER-STATUS ERROR] User: ${req.user?.id}, Error: ${err.message}`);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// POST /api/orders/:id/finalize
// Convert Order to Transaction (Sale)
router.post('/:id/finalize', async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const { category_id, channel_id, payment_method } = req.body;

        if (!category_id || !channel_id) {
            return res.status(400).json({ success: false, error: 'Kategori ve Ödeme Yöntemi gereklidir.' });
        }

        // Transaction logic within a transaction block
        await withTransaction(req.user.id, async (client) => {
            // 1. Get Order
            const orderRes = await client.query(
                `SELECT * FROM orders WHERE id = $1 AND user_id = $2 FOR UPDATE`,
                [id, req.user.id]
            );

            if (orderRes.rows.length === 0) {
                throw new Error('Sipariş bulunamadı.');
            }

            const order = orderRes.rows[0];

            if (order.status === 'completed') {
                throw new Error('Bu sipariş zaten tamamlanmış.');
            }

            // 2. Create Transaction
            const createTxRes = await client.query(`
                INSERT INTO transactions (
                    user_id, category_id, channel_id, type, amount, 
                    transaction_date, description, document_type, notes
                ) VALUES ($1, $2, $3, 'income', $4, CURRENT_DATE, $5, 'order', $6)
                RETURNING id
            `, [
                req.user.id,
                category_id,
                channel_id,
                order.total_amount,
                `Sipariş #${order.order_number} (${order.table_number || 'Masa yok'})`,
                `Items: ${JSON.stringify(order.items)}`
            ]);

            const transactionId = createTxRes.rows[0]?.id; // Retrieve ID if needed, but we don't use it yet (logging only)

            // --- Automatic Expense Deduction Logic (Mirrored from transactions.ts) ---
            try {
                // Start a sub-transaction (savepoint) so failures here don't abort the main transaction
                await client.query('SAVEPOINT deduction_savepoint');

                // 1. Fetch Category Details to check for rates
                const catRes = await client.query('SELECT * FROM categories WHERE id = $1', [category_id]);
                const category = catRes.rows[0];

                if (category) {
                    const serviceRate = parseFloat(category.service_commission_rate || '0');
                    const courierRate = parseFloat(category.courier_service_rate || '0');
                    const amount = order.total_amount;
                    const transaction_date = new Date(); // Use current date for deduction

                    if (serviceRate > 0 || courierRate > 0) {
                        const systemCategoryName = `Sistem-${category.name}`;

                        // 2. Find or Create System Category
                        let systemCategoryId;
                        const sysCatRes = await client.query(
                            'SELECT id FROM categories WHERE user_id = $1 AND name = $2 AND type = $3',
                            [req.user.id, systemCategoryName, 'expense']
                        );

                        if (sysCatRes.rows.length > 0) {
                            systemCategoryId = sysCatRes.rows[0].id;
                        } else {
                            // Create new category
                            const createSysCatRes = await client.query(
                                `INSERT INTO categories (user_id, name, type, color, is_default)
                                 VALUES ($1, $2, $3, $4, $5) RETURNING id`,
                                [req.user.id, systemCategoryName, 'expense', '#64748b', false]
                            );
                            systemCategoryId = createSysCatRes.rows[0].id;
                        }

                        // 3. Create Service Commission Expense
                        if (serviceRate > 0) {
                            const commissionAmount = (Number(amount) * serviceRate) / 100;
                            await client.query(
                                `INSERT INTO transactions (
                                    user_id, category_id, channel_id, type, amount, transaction_date, 
                                    description, notes, expense_type
                                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                                [
                                    req.user.id,
                                    systemCategoryId,
                                    channel_id,
                                    'expense',
                                    commissionAmount,
                                    transaction_date,
                                    `Otomatik Kesinti: Hizmet Komisyonu (%${serviceRate})`,
                                    `Bağlı Sipariş: ${order.order_number}`,
                                    'operational'
                                ]
                            );
                        }

                        // 4. Create Courier Service Expense
                        if (courierRate > 0) {
                            const courierAmount = (Number(amount) * courierRate) / 100;
                            await client.query(
                                `INSERT INTO transactions (
                                    user_id, category_id, channel_id, type, amount, transaction_date, 
                                    description, notes, expense_type
                                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                                [
                                    req.user.id,
                                    systemCategoryId,
                                    channel_id,
                                    'expense',
                                    courierAmount,
                                    transaction_date,
                                    `Otomatik Kesinti: Kurye Hizmeti (%${courierRate})`,
                                    `Bağlı Sipariş: ${order.order_number}`,
                                    'operational'
                                ]
                            );
                        }
                    }
                }

                // 2. Check Channel Commission
                if (channel_id) {
                    const chanRes = await client.query('SELECT * FROM channels WHERE id = $1', [channel_id]);
                    const channel = chanRes.rows[0];

                    if (channel) {
                        const commissionRate = parseFloat(channel.commission_rate || '0');

                        if (commissionRate > 0) {
                            const systemChannelCatName = `Sistem-${channel.name}`;
                            let systemChannelCatId;

                            // Find or Create System Category for Channel
                            const sysChanCatRes = await client.query(
                                'SELECT id FROM categories WHERE user_id = $1 AND name = $2 AND type = $3',
                                [req.user.id, systemChannelCatName, 'expense']
                            );

                            if (sysChanCatRes.rows.length > 0) {
                                systemChannelCatId = sysChanCatRes.rows[0].id;
                            } else {
                                const createSysChanCatRes = await client.query(
                                    `INSERT INTO categories (user_id, name, type, color, is_default)
                                     VALUES ($1, $2, $3, $4, $5) RETURNING id`,
                                    [req.user.id, systemChannelCatName, 'expense', '#f59e0b', false]
                                );
                                systemChannelCatId = createSysChanCatRes.rows[0].id;
                            }

                            // Create Channel Commission Expense
                            const commissionAmount = (Number(order.total_amount) * commissionRate) / 100;
                            await client.query(
                                `INSERT INTO transactions (
                                    user_id, category_id, channel_id, type, amount, transaction_date, 
                                    description, notes, expense_type
                                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                                [
                                    req.user.id,
                                    systemChannelCatId,
                                    channel_id,
                                    'expense',
                                    commissionAmount,
                                    new Date(),
                                    `Otomatik Kesinti: ${channel.name} Komisyonu (%${commissionRate})`,
                                    `Bağlı Sipariş: ${order.order_number}`,
                                    'operational'
                                ]
                            );
                        }
                    }
                }
            } catch (deductionErr) {
                console.error('Error processing automatic deductions for order:', deductionErr);
                // Rollback to savepoint to ensure main transaction can proceed
                await client.query('ROLLBACK TO SAVEPOINT deduction_savepoint');
            }
            // ----------------------------------------

            // 3. Update Order Status
            await client.query(
                `UPDATE orders SET status = 'completed', updated_at = NOW() WHERE id = $1`,
                [id]
            );

            return { success: true };
        });

        res.json({ success: true, message: 'Sipariş satışa dönüştürüldü.' });

    } catch (err: any) {
        logger.error(`[POST-ORDER-FINALIZE ERROR] User: ${req.user?.id}, Error: ${err.message}`);
        res.status(500).json({ success: false, error: err.message || 'İşlem başarısız.' });
    }
});

export default router;
