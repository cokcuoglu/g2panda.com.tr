import { Router, Request, Response } from 'express';
import { pool } from '../db';
import logger from '../config/logger';

const router = Router();

/**
 * POST /api/public/orders/:userId
 * Public endpoint for QR menu order submissions.
 * NO AUTH required - customers have no JWT token.
 * Uses pool directly (not req.db) to avoid RLS.
 */
router.post('/:userId', async (req: Request, res: Response) => {
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
        const validatedItems: any[] = [];
        let baseAmount = 0;
        let discountAmount = 0;

        const itemIds = items.map((i: any) => i.id);

        // Fetch products matching the IDs (use superuser pool — no RLS)
        const productsRes = await pool.query(
            `SELECT id, price, name, takeaway_discount_percent, 'product' as type FROM products WHERE id = ANY($1::uuid[]) AND user_id = $2`,
            [itemIds, userId]
        );

        const campaignsRes = await pool.query(
            `SELECT c.id, c.name, c.discount_amount, c.discount_type, 'campaign' as type,
                    COALESCE(SUM(p.price * cp.quantity), 0) as original_price
             FROM campaigns c
             LEFT JOIN campaign_products cp ON c.id = cp.campaign_id
             LEFT JOIN products p ON cp.product_id = p.id
             WHERE c.id = ANY($1::uuid[]) AND c.user_id = $2
             GROUP BY c.id`,
            [itemIds, userId]
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
                    quantity,
                    price,
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
                    quantity,
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

        // 2. Handle Customer (CRM)
        let customerId = null;
        if (customer_phone) {
            if (!/^[5][0-9]{9}$/.test(customer_phone)) {
                return res.status(400).json({ success: false, error: 'Telefon numarası 5 ile başlamalı ve 10 haneli olmalıdır.' });
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

        // 3. Check for existing pending order for this table
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
            // MERGE: add new items to existing order
            const currentItems = existingOrder.items || [];
            const mergedItems = [...currentItems];

            for (const newItem of validatedItems) {
                const idx = mergedItems.findIndex((ci: any) => ci.id === newItem.id && ci.type === newItem.type);
                if (idx > -1) {
                    mergedItems[idx].quantity += newItem.quantity;
                } else {
                    mergedItems.push(newItem);
                }
            }

            const newBaseAmount = parseFloat(existingOrder.base_amount) + baseAmount;
            const newDiscountAmount = parseFloat(existingOrder.discount_amount) + discountAmount;
            const newTotalAmount = newBaseAmount - newDiscountAmount;

            result = await pool.query(
                `UPDATE orders SET
                    items = $1, total_amount = $2, base_amount = $3, discount_amount = $4,
                    updated_at = NOW(), status = 'pending',
                    note = CASE WHEN $5::text IS NOT NULL AND $5::text <> '' THEN note || ' | ' || $5::text ELSE note END
                 WHERE id = $6
                 RETURNING *`,
                [JSON.stringify(mergedItems), newTotalAmount, newBaseAmount, newDiscountAmount, note, existingOrder.id]
            );
        } else {
            // INSERT new order
            let finalTableNumber = table_code || null;
            let finalTableCode = table_code || null;

            if (table_id) {
                try {
                    const tableRes = await pool.query('SELECT name, unique_code FROM tables WHERE id = $1', [table_id]);
                    if (tableRes.rows.length > 0) {
                        finalTableNumber = finalTableNumber || tableRes.rows[0].name;
                        finalTableCode = finalTableCode || tableRes.rows[0].unique_code;
                    }
                } catch (tableErr) {
                    console.error('Error fetching table details:', tableErr);
                }
            }

            const prefix = (table_id || table_code) ? 'ADY' : 'ORD';
            const orderNumber = `${prefix}-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 100)}`;

            result = await pool.query(
                `INSERT INTO orders (
                    user_id, order_number, table_number, items, total_amount,
                    base_amount, discount_amount, order_type,
                    note, status,
                    customer_id, customer_name, customer_phone, customer_address,
                    customer_city, customer_district, customer_neighborhood,
                    table_id, table_code
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending', $10, $11, $12, $13, $14, $15, $16, $17, $18)
                RETURNING *`,
                [
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
                ]
            );

            if (table_id) {
                await pool.query("UPDATE tables SET status = 'active', service_request = NULL WHERE id = $1", [table_id]);
            }
        }

        return res.status(201).json({ success: true, data: result.rows[0] });

    } catch (err: any) {
        logger.error(`[PUBLIC-ORDER ERROR] ${err.message}`);
        return res.status(500).json({ success: false, error: err.message || 'Sipariş oluşturulamadı.' });
    }
});

export default router;
