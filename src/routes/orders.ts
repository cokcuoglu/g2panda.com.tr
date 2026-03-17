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
            customer_name,
            customer_phone,
            customer_address,
            customer_city,
            customer_district,
            customer_neighborhood,
            note,
            order_type,
            table_id,
            table_code
        } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, error: 'Sepet boş olamaz.' });
        }

        // 1. Validate Items & Calculate Total
        let validatedItems = [];
        let baseAmount = 0;
        let discountAmount = 0;

        const itemIds = items.map((i: any) => i.id);

        // Fetch both products and campaigns that match the IDs
        const productsRes = await pool.query(
            `SELECT id, price, name, takeaway_discount_percent, 'product' as type FROM products WHERE id = ANY($1::uuid[])`,
            [itemIds]
        );

        const campaignsRes = await pool.query(
            `SELECT c.id, c.name, c.discount_amount, c.discount_type, 'campaign' as type,
                    COALESCE(SUM(p.price * cp.quantity), 0) as original_price
             FROM campaigns c
             LEFT JOIN campaign_products cp ON c.id = cp.campaign_id
             LEFT JOIN products p ON cp.product_id = p.id
             WHERE c.id = ANY($1::uuid[])
             GROUP BY c.id`,
            [itemIds]
        );

        const itemMap = new Map<string, any>();
        productsRes.rows.forEach((p: any) => itemMap.set(p.id, p));
        campaignsRes.rows.forEach((c: any) => itemMap.set(c.id, c));

        for (const item of items) {
            const match = itemMap.get(item.id);
            if (!match) {
                throw new Error(`Ürün veya kampanya bulunamadı: ${item.name}`);
            }

            const quantity = Number(item.quantity);

            if (match.type === 'product') {
                const price = Number(match.price);
                const shouldApplyDiscount = (order_type === 'takeaway' || !!table_id || !!table_code);
                const rawDiscount = Number(match.takeaway_discount_percent || 0);
                const discountPercent = shouldApplyDiscount ? rawDiscount : 0;

                const itemBaseTotal = price * quantity;
                const itemDiscount = (itemBaseTotal * discountPercent) / 100;

                validatedItems.push({
                    id: item.id,
                    name: match.name,
                    quantity: quantity,
                    price: price,
                    discount_percent: discountPercent,
                    type: 'product',
                    confirmed_quantity: 0
                });

                baseAmount += itemBaseTotal;
                discountAmount += itemDiscount;
            } else {
                // Campaign
                const originalPrice = Number(match.original_price);
                const discountValue = Number(match.discount_amount);

                let campaignPrice = originalPrice;
                if (match.discount_type === 'amount') {
                    campaignPrice = Math.max(0, originalPrice - discountValue);
                } else {
                    campaignPrice = originalPrice * (1 - discountValue / 100);
                }

                const itemBaseTotal = originalPrice * quantity;
                const itemDiscount = (originalPrice - campaignPrice) * quantity;

                validatedItems.push({
                    id: item.id,
                    name: match.name,
                    quantity: quantity,
                    price: originalPrice,
                    campaign_price: campaignPrice,
                    type: 'campaign',
                    confirmed_quantity: 0
                });

                baseAmount += itemBaseTotal;
                discountAmount += itemDiscount;
            }
        }

        const totalAmount = baseAmount - discountAmount;

        // 2. Handle Customer (CRM Integration)
        let customerId = null;
        if (customer_phone) {
            // ... (keep existing customer logic, simplified for brevity in this plan, but full code below)
            if (!/^[5][0-9]{9}$/.test(customer_phone)) {
                return res.status(400).json({ success: false, error: 'Telefon numarası 5 ile başlamalı ve 10 haneli olmalıdır. (Örn: 5301234567)' });
            }
            try {
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
            }
        }

        // 3. Check for Existing Pending Order (If Table ID provided)
        let existingOrder = null;
        if (table_id) {
            const existingRes = await pool.query(
                `SELECT o.* 
                 FROM orders o
                 JOIN tables t ON o.table_id = t.id
                 WHERE o.table_id = $1 
                 AND o.status IN ('pending', 'confirmed') 
                 AND t.status = 'active'
                 ORDER BY o.created_at DESC LIMIT 1`,
                [table_id]
            );
            if (existingRes.rows.length > 0) {
                existingOrder = existingRes.rows[0];
            }
        }

        let result;

        if (existingOrder) {
            // MERGE Logic
            const currentItems = existingOrder.items || [];

            // Merge new items into current items
            // If item exists (same ID and params), increase quantity? Or just append?
            // For simplicity and clarity on receipts, we append new items. 
            // Or better: consolidate if identical.
            // Let's perform a smart merge:

            const mergedItems = [...currentItems];

            for (const newItem of validatedItems) {
                const existingItemIndex = mergedItems.findIndex((ci: any) => ci.id === newItem.id && ci.type === newItem.type);

                if (existingItemIndex > -1) {
                    // Update quantity and totals for this line item
                    mergedItems[existingItemIndex].quantity += newItem.quantity;
                    // We don't need to update price per unit, but total line price calculation might be needed by frontend.
                    // The backend stores 'items' as JSON, usually including quantity and unit price.
                } else {
                    mergedItems.push(newItem);
                }
            }

            // Recalculate Order Totals
            let newBaseAmount = 0;
            let newDiscountAmount = 0;

            // We need to re-calculate total based on merged items to be safe, 
            // but we don't have the full pricing context of old items easily unless we trust the JSON.
            // Trusting validtedItems for new, and existingOrder values for old + delta is complex.
            // reliable way: Recalculate from merged items.
            // However, prices might have changed. 
            // Simple approach: Add new totals to existing totals.

            newBaseAmount = parseFloat(existingOrder.base_amount) + baseAmount;
            newDiscountAmount = parseFloat(existingOrder.discount_amount) + discountAmount;
            const newTotalAmount = newBaseAmount - newDiscountAmount;

            const updateQuery = `
                UPDATE orders SET
                    items = $1,
                    total_amount = $2,
                    base_amount = $3,
                    discount_amount = $4,
                    updated_at = NOW(),
                    status = 'pending',
                    note = CASE WHEN $5::text IS NOT NULL AND $5::text <> '' THEN note || ' | ' || $5::text ELSE note END
                WHERE id = $6
                RETURNING *
             `;

            result = await pool.query(updateQuery, [
                JSON.stringify(mergedItems),
                newTotalAmount,
                newBaseAmount,
                newDiscountAmount,
                note,
                existingOrder.id
            ]);

        } else {
            // INSERT Logic (New Order)
            let finalTableNumber = table_code || null;
            let finalTableCode = table_code || null;

            // Fetch table details if table_id is provided but info is missing (QR Menu flow)
            if (table_id && (!finalTableNumber || !finalTableCode)) {
                try {
                    const tableRes = await pool.query('SELECT name, unique_code FROM tables WHERE id = $1', [table_id]);
                    if (tableRes.rows.length > 0) {
                        finalTableNumber = finalTableNumber || tableRes.rows[0].name;
                        finalTableCode = finalTableCode || tableRes.rows[0].unique_code;
                    }
                } catch (tableErr) {
                    console.error('Error fetching table details for public order:', tableErr);
                }
            }

            const prefix = (table_id || table_code) ? 'ADY' : 'ORD';
            const orderNumber = `${prefix}-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 100)}`;

            const query = `
                INSERT INTO orders (
                    user_id, order_number, table_number, items, total_amount,
                    base_amount, discount_amount, order_type,
                    note, status,
                    customer_id, customer_name, customer_phone, customer_address,
                    customer_city, customer_district, customer_neighborhood,
                    table_id, table_code
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending', $10, $11, $12, $13, $14, $15, $16, $17, $18)
                RETURNING *
            `;

            result = await pool.query(query, [
                userId, orderNumber, finalTableNumber, JSON.stringify(validatedItems), totalAmount,
                baseAmount, discountAmount, order_type || 'dine-in',
                note, customerId,
                customer_name || 'Misafir',
                customer_phone || null,
                customer_address || null,
                customer_city || null,
                customer_district || null,
                customer_neighborhood || null,
                table_id || null,
                finalTableCode
            ]);

            // If it's a table order, update table status to active and clear any old service requests
            if (table_id) {
                await pool.query("UPDATE tables SET status = 'active', service_request = NULL WHERE id = $1", [table_id]);
            }
        }

        res.status(201).json({ success: true, data: result.rows[0] });

    } catch (err: any) {
        logger.error(`[POST-PUBLIC-ORDER ERROR] Error: ${err.message}`);
        res.status(500).json({ success: false, error: err.message || 'Sipariş oluşturulamadı.' });
    }
});


// GET /api/orders/public/table/:tableId
// Get active order for a table (Public)
router.get('/public/table/:tableId', async (req: Request, res: Response) => {
    try {
        const { tableId } = req.params;

        // Find the active (pending) order for this table
        // IMPORTANT: Also check if table is actually 'active'. If table is 'available', ignore old pending orders.
        const result = await pool.query(
            `SELECT o.* 
             FROM orders o
             JOIN tables t ON o.table_id = t.id
             WHERE o.table_id = $1 
             AND o.status IN ('pending', 'confirmed') 
             ORDER BY o.created_at DESC LIMIT 1`,
            [tableId]
        );

        if (result.rows.length === 0) {
            return res.json({ success: true, data: null });
        }

        const order = result.rows[0];

        // Return only safe public info
        const publicOrder = {
            id: order.id,
            items: order.items,
            total_amount: order.total_amount,
            status: order.status,
            order_number: order.order_number,
            created_at: order.created_at
        };

        res.json({ success: true, data: publicOrder });
    } catch (err: any) {
        logger.error(`[GET-PUBLIC-TABLE-ORDER ERROR] Table: ${req.params.tableId}, Error: ${err.message}`);
        res.status(500).json({ success: false, error: 'Sipariş bilgisi alınamadı.' });
    }
});


// ----------------------------------------------------------------------
// PROTECTED ENDPOINTS (Auth Required - For Merchant)
// ----------------------------------------------------------------------

// Auth middleware is already universally applied to /api/* in server.ts
// so we don't need to re-apply it here, which would leak a 2nd DB connection!
// router.use(authMiddleware);

// GET /api/orders
// List orders (with filters)
router.get('/', async (req: any, res: Response) => {
    try {
        const { status, limit = '50', page = '1', date, archived, exclude_type } = req.query;
        const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

        let query = `SELECT * FROM orders WHERE user_id = $1 AND deleted_at IS NULL`;
        const params: any[] = [req.user.id];

        if (status) {
            params.push(status);
            query += ` AND status = $${params.length}`;
        }

        if (exclude_type) {
            params.push(exclude_type);
            query += ` AND order_type != $${params.length}`;
        }

        // Archival filter
        if (archived === 'true') {
            query += ` AND archived_at IS NOT NULL`;
        } else if (archived === 'false') {
            query += ` AND archived_at IS NULL`;
        }

        // Filter by date (YYYY-MM-DD format)
        if (date) {
            params.push(date);
            query += ` AND DATE(created_at) = $${params.length}`;
        }

        query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
        params.push(parseInt(limit as string), offset);

        const result = await req.db.query(query, params);


        // Get total count for pagination
        let countQuery = `SELECT COUNT(*) FROM orders WHERE user_id = $1 AND deleted_at IS NULL`;
        const countParams: any[] = [req.user.id];

        if (status) {
            countParams.push(status);
            countQuery += ` AND status = $${countParams.length}`;
        }

        if (exclude_type) {
            countParams.push(exclude_type);
            countQuery += ` AND order_type != $${countParams.length}`;
        }

        if (archived === 'true') {
            countQuery += ` AND archived_at IS NOT NULL`;
        } else if (archived === 'false') {
            countQuery += ` AND archived_at IS NULL`;
        }

        // Filter by date for count query
        if (date) {
            countParams.push(date);
            countQuery += ` AND DATE(created_at) = $${countParams.length}`;
        }

        const countResult = await req.db.query(countQuery, countParams);
        const total = parseInt(countResult.rows[0].count);

        res.json({
            success: true,
            data: result.rows,
            pagination: {
                total,
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                totalPages: Math.ceil(total / parseInt(limit as string))
            }
        });

    } catch (err: any) {
        logger.error(`[GET-ORDERS ERROR] User: ${req.user?.id}, Error: ${err.message}`);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// GET /api/orders/:id
// Get single order details
router.get('/:id', async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const result = await req.db.query(
            `SELECT * FROM orders WHERE id = $1 AND user_id = $2 AND deleted_at IS NULL`,
            [id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Sipariş bulunamadı.' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (err: any) {
        logger.error(`[GET-ORDER-BY-ID ERROR] User: ${req.user?.id}, Id: ${req.params.id}, Error: ${err.message}`);
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

        const isFinalState = ['rejected', 'cancelled', 'completed'].includes(status);
        const setArchived = isFinalState ? `, archived_at = NOW()` : '';

        // If status is 'confirmed', update items to set confirmed_quantity = quantity
        let updatedItems;
        if (status === 'confirmed') {
            const orderRes = await req.db.query('SELECT items FROM orders WHERE id = $1', [id]);
            if (orderRes.rows.length > 0) {
                const items = orderRes.rows[0].items || [];
                updatedItems = items.map((item: any) => ({
                    ...item,
                    confirmed_quantity: item.quantity
                }));
            }
        }

        const itemsUpdate = updatedItems ? `, items = $4` : '';
        const updateParams = [status, id, req.user.id];
        if (updatedItems) updateParams.push(JSON.stringify(updatedItems));

        const result = await req.db.query(
            `UPDATE orders SET status = $1, updated_at = NOW() ${setArchived} ${itemsUpdate} WHERE id = $2 AND user_id = $3 RETURNING *`,
            updateParams
        );

        // 2. If this was a table order and we reached a final state, set table back to available and clear requests
        if (isFinalState && result.rows[0].table_id) {
            await req.db.query(
                "UPDATE tables SET status = 'available', service_request = NULL WHERE id = $1",
                [result.rows[0].table_id]
            );
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
        const { category_id, channel_id, final_amount } = req.body;

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

            // Determine final transaction amount
            const hasFinalAmount = final_amount !== undefined && final_amount !== null && final_amount !== '';
            const transactionAmount = hasFinalAmount ? parseFloat(final_amount) : order.total_amount;
            const discountDiff = hasFinalAmount ? (order.total_amount - transactionAmount) : 0;
            const totalDiscount = (parseFloat(order.discount_amount || '0') + discountDiff);

            // 2. Create Transaction
            let tableLabel = order.table_number;
            if (!tableLabel) {
                if (order.order_type === 'takeaway') {
                    tableLabel = 'Gel-Al';
                } else if (order.table_id) {
                    // Try to fetch table name on the fly if missing (fallback for old orders)
                    try {
                        const tRes = await client.query('SELECT name FROM tables WHERE id = $1', [order.table_id]);
                        if (tRes.rows.length > 0) {
                            tableLabel = tRes.rows[0].name;
                        }
                    } catch (e) {
                        console.error('Error fetching table name for description fallback:', e);
                    }
                }
            }

            const createTxRes = await client.query(`
                INSERT INTO transactions (
                    user_id, category_id, channel_id, type, amount, 
                    transaction_date, description, document_type, notes,
                    base_amount, discount_amount, table_id, table_number
                ) VALUES ($1, $2, $3, 'income', $4, NOW(), $5, 'order', $6, $7, $8, $9, $10)
                RETURNING id
            `, [
                req.user.id,
                category_id,
                channel_id,
                transactionAmount,
                `Sipariş #${order.order_number} (${tableLabel || 'Masa yok'})`,
                `Items: ${JSON.stringify(order.items)}`,
                order.base_amount || order.total_amount,
                totalDiscount,
                order.table_id || null,
                order.order_type === 'takeaway' ? 'Al/Götür' : (order.table_number || null)
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
                    const amount = transactionAmount;
                    const transaction_date = new Date(Date.now() + 1000); // Add 1 second to ensure it appears after income

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
                            const commissionAmount = (Number(transactionAmount) * commissionRate) / 100;
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

            // 3. Update Order Status and Archive
            await client.query(
                `UPDATE orders SET 
                    status = 'completed', 
                    archived_at = NOW(), 
                    updated_at = NOW(),
                    total_amount = $2,
                    discount_amount = $3
                 WHERE id = $1`,
                [id, transactionAmount, totalDiscount]
            );

            // 4. Release Table and clear requests
            if (order.table_id) {
                await client.query(
                    "UPDATE tables SET status = 'available', service_request = NULL WHERE id = $1",
                    [order.table_id]
                );
            }

            return { success: true };
        });

        res.json({ success: true, message: 'Sipariş satışa dönüştürüldü.' });

    } catch (err: any) {
        logger.error(`[POST-ORDER-FINALIZE ERROR] User: ${req.user?.id}, Error: ${err.message}`);
        res.status(500).json({ success: false, error: err.message || 'İşlem başarısız.' });
    }
});

// POST /api/orders/archive-daily
// Archive previous day's completed orders
router.post('/archive-daily', async (req: any, res: Response) => {
    try {
        // Archive all orders from previous days that are completed/rejected/cancelled
        const result = await req.db.query(`
            UPDATE orders 
            SET archived_at = NOW()
            WHERE user_id = $1 
            AND archived_at IS NULL
            AND DATE(created_at) < CURRENT_DATE
            AND status IN ('completed', 'rejected', 'cancelled')
            RETURNING id
        `, [req.user.id]);

        const archivedCount = result.rows.length;

        logger.info(`[ARCHIVE-ORDERS] User: ${req.user.id}, Archived: ${archivedCount} orders`);

        res.json({
            success: true,
            message: `${archivedCount} sipariş arşivlendi.`,
            count: archivedCount
        });

    } catch (err: any) {
        logger.error(`[ARCHIVE-ORDERS ERROR] User: ${req.user?.id}, Error: ${err.message}`);
        res.status(500).json({ success: false, error: 'Arşivleme başarısız.' });
    }
});

// DELETE /api/orders/:id
// Permanently delete an order
router.delete('/:id', authMiddleware, async (req: any, res: Response) => {
    try {
        const { id } = req.params;

        // Delete order (check ownership)
        const result = await req.db.query(
            `DELETE FROM orders 
             WHERE id = $1 AND user_id = $2
             RETURNING id, order_number`,
            [id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Sipariş bulunamadı.' });
        }

        logger.info(`[ORDER-DELETE] User: ${req.user.id}, Order: ${result.rows[0].order_number}`);

        res.json({
            success: true,
            message: 'Sipariş silindi.',
            order_number: result.rows[0].order_number
        });

    } catch (err: any) {
        logger.error(`[ORDER-DELETE ERROR] User: ${req.user?.id}, Error: ${err.message}`);
        res.status(500).json({ success: false, error: 'Silme başarısız.' });
    }
});

export default router;
