import express, { Request, Response } from 'express';
import logger from '../config/logger';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// GET /api/transactions
router.get('/', async (req: any, res: Response) => {
    try {
        const { page = '1', limit = '20', type, start_date, end_date, date, sort_by = 'date', expense_type } = req.query as any;
        const offset = (parseInt(page) - 1) * parseInt(limit);

        let query = `
      SELECT t.*, c.name as category_name, c.color as category_color, ch.name as channel_name, o.image_path as receipt_image
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      LEFT JOIN channels ch ON t.channel_id = ch.id
      LEFT JOIN ocr_records o ON t.ocr_record_id = o.id
      WHERE t.deleted_at IS NULL
    `;
        const params: any[] = [];

        if (type) {
            params.push(type);
            query += ` AND t.type = $${params.length}`;
        }

        if (expense_type) {
            params.push(expense_type);
            query += ` AND t.expense_type = $${params.length}`;
        }

        if (start_date) {
            params.push(start_date);
            query += ` AND t.transaction_date >= $${params.length}`;
        }

        if (end_date) {
            params.push(end_date);
            query += ` AND t.transaction_date <= $${params.length}`;
        }

        if (date) {
            params.push(date);
            query += ` AND t.transaction_date >= ($${params.length}::TIMESTAMP AT TIME ZONE 'Europe/Istanbul')`;
            query += ` AND t.transaction_date < (($${params.length}::DATE + INTERVAL '1 day')::TIMESTAMP AT TIME ZONE 'Europe/Istanbul')`;
        }

        if (sort_by === 'created_at') {
            query += ` ORDER BY t.created_at DESC`;
        } else {
            query += ` ORDER BY t.transaction_date DESC, t.created_at DESC`;
        }

        // Limits
        params.push(parseInt(limit));
        query += ` LIMIT $${params.length}`;

        params.push(offset);
        query += ` OFFSET $${params.length}`;

        // Execute using req.db (Transaction + RLS active)
        const result = await req.db.query(query, params);

        // Count total for pagination
        const countRes = await req.db.query(`SELECT COUNT(*) FROM transactions t WHERE t.deleted_at IS NULL`);

        res.json({
            success: true,
            data: result.rows,
            meta: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: parseInt(countRes.rows[0].count)
            }
        });
    } catch (err: any) {
        logger.error(`[GET-TRANSACTIONS ERROR] User: ${req.user?.id}, Error: ${err.message}`, { stack: err.stack });
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// GET /api/transactions/daily-total
router.get('/daily-total', async (req: any, res: Response) => {
    try {
        const { date } = req.query as any;
        const targetDate = date || new Date().toISOString().split('T')[0];

        const query = `
      SELECT SUM(amount) as total 
      FROM transactions 
      WHERE type = 'income' 
      AND deleted_at IS NULL 
      AND transaction_date >= ($1::TIMESTAMP AT TIME ZONE 'Europe/Istanbul')
      AND transaction_date < (($1::DATE + INTERVAL '1 day')::TIMESTAMP AT TIME ZONE 'Europe/Istanbul')
      AND user_id = $2
    `;

        const result = await req.db.query(query, [targetDate, req.user.id]);
        const total = result.rows[0].total || 0;

        logger.debug(`[DAILY-TOTAL] User: ${req.user.id}, Date: ${targetDate}, Total: ${total}`);

        res.json({ success: true, total: Number(total), debug: { userId: req.user.id, targetDate } });
    } catch (err: any) {
        logger.error(`[DAILY-TOTAL ERROR] User: ${req.user.id}, Date: ${req.query.date}, Error: ${err.message}`, { stack: err.stack });
        res.status(500).json({ success: false, error: 'Failed to calculate daily total' });
    }
});

// GET /api/transactions/:id
router.get('/:id', async (req: any, res: Response) => {
    try {
        const { id } = req.params;

        const query = `
      SELECT t.*, c.name as category_name, c.color as category_color, ch.name as channel_name, o.image_path as receipt_image
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      LEFT JOIN channels ch ON t.channel_id = ch.id
      LEFT JOIN ocr_records o ON t.ocr_record_id = o.id
      WHERE t.id = $1 AND t.deleted_at IS NULL
    `;

        const result = await req.db.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Transaction not found' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (err: any) {
        logger.error(`[GET-TRANSACTION-BY-ID ERROR] ID: ${req.params.id}, User: ${req.user?.id}, Error: ${err.message}`, { stack: err.stack });
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// POST /api/transactions
router.post('/', async (req: any, res: Response) => {
    try {
        let {
            category_id, channel_id, type, amount, transaction_date, description, ocr_record_id,
            expense_type, is_tax_deductible, deduction_reason, document_type, notes,
            invoice_number, base_amount, discount_amount, campaign_id, campaign_code
        } = req.body;

        // Normalize empty strings to null for UUID fields
        if (category_id === '') category_id = null;
        if (channel_id === '') channel_id = null;

        // Validation
        if (amount === undefined || amount === null || amount < 0 || amount === '') {
            return res.status(400).json({ success: false, error: 'Tutar 0 veya daha büyük olmalıdır' });
        }
        if (!['income', 'expense'].includes(type)) {
            return res.status(400).json({ success: false, error: 'Invalid transaction type' });
        }
        // Date Validation (Relaxed for Timezones)
        const txDate = new Date(transaction_date);
        const futureLimit = new Date();
        futureLimit.setHours(futureLimit.getHours() + 48); // Allow +48h buffer

        if (txDate > futureLimit) {
            return res.status(400).json({ success: false, error: 'Date cannot be in the future (more than 48h)' });
        }

        // Use the existing client from authentication middleware (already in transaction)
        const client = req.db;

        // 1. Insert Transaction
        const queryStr = `
            INSERT INTO transactions (
                user_id, category_id, channel_id, type, amount, transaction_date, description, ocr_record_id,
                expense_type, is_tax_deductible, deduction_reason, document_type, notes, vat_rate, vat_amount,
                invoice_number, base_amount, discount_amount, campaign_id, campaign_code
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
            RETURNING *
        `;

        const values = [
            req.user.id,
            category_id,
            channel_id,
            type,
            amount,
            transaction_date,
            description,
            ocr_record_id || null,
            expense_type || 'none',
            is_tax_deductible === undefined ? true : is_tax_deductible,
            deduction_reason || null,
            document_type || 'receipt',
            notes || null,
            req.body.vat_rate || null,
            req.body.vat_amount || null,
            invoice_number || null,
            base_amount || amount,
            discount_amount || 0,
            campaign_id || null,
            campaign_code || null
        ];

        const result = await client.query(queryStr, values);
        const transaction = result.rows[0];

        logger.info(`[TRANSACTION CREATED] ID: ${transaction.id}, User: ${req.user.id}`);

        // 2. Save Individual Items (If present)
        const items = req.body.items;
        if (items && Array.isArray(items) && items.length > 0) {
            for (const item of items) {
                // Check if item already exists (from OCR)
                if (item.id) {
                    await client.query(
                        `UPDATE transaction_items 
                         SET transaction_id = $1, name = $2, quantity = $3, unit = $4, unit_price = $5, total_price = $6, 
                             vat_rate = $7, vat_amount = $8, is_tax_deductible = $9, is_stock = $10, updated_at = NOW()
                         WHERE id = $11`,
                        [
                            transaction.id,
                            item.name,
                            item.quantity || 1,
                            item.unit || 'adet',
                            item.unit_price || item.total_price || 0,
                            item.total_price || 0,
                            item.vat_rate || 0,
                            item.vat_amount || ((item.total_price || 0) * ((item.vat_rate || 0) / 100)),
                            item.is_tax_deductible === undefined ? true : item.is_tax_deductible,
                            item.is_stock || false,
                            item.id
                        ]
                    );
                } else {
                    await client.query(
                        `INSERT INTO transaction_items (
                            transaction_id, ocr_record_id, name, quantity, unit,
                            unit_price, total_price, vat_rate, vat_amount, confidence,
                            is_tax_deductible, is_stock
                        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
                        [
                            transaction.id,
                            ocr_record_id || null,
                            item.name,
                            item.quantity || 1,
                            item.unit || 'adet',
                            item.unit_price || item.total_price || 0,
                            item.total_price || 0,
                            item.vat_rate || 0,
                            item.vat_amount || ((item.total_price || 0) * ((item.vat_rate || 0) / 100)),
                            item.confidence || 1.0,
                            item.is_tax_deductible === undefined ? true : item.is_tax_deductible,
                            item.is_stock || false
                        ]
                    );
                }

                // --- Stock Deduction for Income Items ---
                if (type === 'income') {
                    try {
                        // Create a savepoint to isolate stock deduction failures
                        await client.query('SAVEPOINT stock_deduction');

                        const productRes = await client.query(
                            `SELECT id FROM products WHERE name = $1 AND user_id = $2 LIMIT 1`,
                            [item.name, req.user.id]
                        );

                        if (productRes.rows.length > 0) {
                            const productId = productRes.rows[0].id;
                            const quantity = item.quantity || 1;

                            const recipeRes = await client.query(
                                `SELECT raw_material_id, quantity FROM product_recipes 
                                 WHERE product_id = $1 AND user_id = $2`,
                                [productId, req.user.id]
                            );

                            for (const ingredient of recipeRes.rows) {
                                const requiredQty = ingredient.quantity * quantity;
                                let remainingToDeduct = requiredQty;

                                const stockEntries = await client.query(
                                    `SELECT id, remaining_quantity FROM raw_material_stock_entries
                                     WHERE raw_material_id = $1 AND user_id = $2 AND remaining_quantity > 0
                                     ORDER BY entry_date ASC, created_at ASC
                                     FOR UPDATE`,
                                    [ingredient.raw_material_id, req.user.id]
                                );

                                for (const entry of stockEntries.rows) {
                                    if (remainingToDeduct <= 0) break;
                                    const deductFromThis = Math.min(entry.remaining_quantity, remainingToDeduct);

                                    const newRemaining = entry.remaining_quantity - deductFromThis;

                                    await client.query(
                                        `UPDATE raw_material_stock_entries 
                                         SET remaining_quantity = $1
                                         WHERE id = $2`,
                                        [newRemaining, entry.id]
                                    );

                                    await client.query(
                                        `INSERT INTO stock_movements (
                                            user_id, raw_material_id, stock_entry_id, movement_type, 
                                            quantity, remaining_quantity, reference_type, reference_id, notes
                                        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                                        [
                                            req.user.id,
                                            ingredient.raw_material_id,
                                            entry.id,
                                            'out',
                                            -deductFromThis,
                                            newRemaining,
                                            'transaction',
                                            transaction.id,
                                            `Satış: ${item.name} x${quantity}`
                                        ]
                                    );
                                    remainingToDeduct -= deductFromThis;
                                }
                            }
                        }

                        await client.query('RELEASE SAVEPOINT stock_deduction');
                    } catch (stockErr) {
                        logger.error(`Stock deduction failed for item ${item.name}:`, stockErr);
                        // Rollback to savepoint to ensure main transaction is not aborted
                        await client.query('ROLLBACK TO SAVEPOINT stock_deduction');
                    }
                }
            }
        }

        // 3. Automatic Expense Deductions (Commissions)
        if (type === 'income') {
            try {
                await client.query('SAVEPOINT deduction_savepoint');

                // Category Commissions (Service/Courier)
                if (category_id) {
                    const catRes = await client.query('SELECT * FROM categories WHERE id = $1', [category_id]);
                    const category = catRes.rows[0];

                    if (category) {
                        const serviceRate = parseFloat(category.service_commission_rate || '0');
                        const courierRate = parseFloat(category.courier_service_rate || '0');

                        if (serviceRate > 0 || courierRate > 0) {
                            const systemCategoryName = `Sistem-${category.name}`;
                            let systemCategoryId;

                            const sysCatRes = await client.query(
                                'SELECT id FROM categories WHERE user_id = $1 AND name = $2 AND type = $3',
                                [req.user.id, systemCategoryName, 'expense']
                            );

                            if (sysCatRes.rows.length > 0) {
                                systemCategoryId = sysCatRes.rows[0].id;
                            } else {
                                const createSysCatRes = await client.query(
                                    `INSERT INTO categories (user_id, name, type, color, is_default)
                                     VALUES ($1, $2, $3, $4, $5) RETURNING id`,
                                    [req.user.id, systemCategoryName, 'expense', '#64748b', false]
                                );
                                systemCategoryId = createSysCatRes.rows[0].id;
                            }

                            if (serviceRate > 0) {
                                const commissionAmount = (Number(amount) * serviceRate) / 100;
                                await client.query(
                                    `INSERT INTO transactions (
                                        user_id, category_id, channel_id, type, amount, transaction_date, 
                                        description, notes, expense_type
                                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                                    [req.user.id, systemCategoryId, channel_id, 'expense', commissionAmount, transaction_date, `Otomatik Kesinti: Hizmet Komisyonu (%${serviceRate})`, `Bağlı İşlem ID: ${transaction.id}`, 'operational']
                                );
                            }

                            if (courierRate > 0) {
                                const courierAmount = (Number(amount) * courierRate) / 100;
                                await client.query(
                                    `INSERT INTO transactions (
                                        user_id, category_id, channel_id, type, amount, transaction_date, 
                                        description, notes, expense_type
                                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                                    [req.user.id, systemCategoryId, channel_id, 'expense', courierAmount, transaction_date, `Otomatik Kesinti: Kurye Hizmeti (%${courierRate})`, `Bağlı İşlem ID: ${transaction.id}`, 'operational']
                                );
                            }
                        }
                    }
                }

                // Channel Commission
                if (channel_id) {
                    const chanRes = await client.query('SELECT * FROM channels WHERE id = $1', [channel_id]);
                    const channel = chanRes.rows[0];

                    if (channel) {
                        const commissionRate = parseFloat(channel.commission_rate || '0');
                        if (commissionRate > 0) {
                            const systemChannelCatName = `Sistem-${channel.name}`;
                            let systemChannelCatId;

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

                            const commissionAmount = (Number(amount) * commissionRate) / 100;
                            await client.query(
                                `INSERT INTO transactions (
                                    user_id, category_id, channel_id, type, amount, transaction_date, 
                                    description, notes, expense_type
                                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                                [req.user.id, systemChannelCatId, channel_id, 'expense', commissionAmount, transaction_date, `Otomatik Kesinti: ${channel.name} Komisyonu (%${commissionRate})`, `Bağlı İşlem ID: ${transaction.id}`, 'operational']
                            );
                        }
                    }
                }

                await client.query('RELEASE SAVEPOINT deduction_savepoint');
            } catch (deductionErr) {
                console.error('Auto deduction error:', deductionErr);
                await client.query('ROLLBACK TO SAVEPOINT deduction_savepoint');
            }
        }

        // 4. File Organization (Post-Commit action - but middleware commits at end of response)
        // We can do this here. If middleware rolls back, the file move is still done?
        // Yes, file operations are not transactional. 
        // This is a trade-off. But previously it was also like this.
        if (ocr_record_id) {
            try {
                const ocrRes = await req.db.query('SELECT * FROM ocr_records WHERE id = $1', [ocr_record_id]);
                const ocrRecord = ocrRes.rows[0];
                if (ocrRecord && ocrRecord.image_path) {
                    const catRes = await req.db.query('SELECT name FROM categories WHERE id = $1', [category_id]);
                    const categoryName = catRes.rows[0]?.name || 'uncategorized';
                    const safeCatName = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    const baseUploadDir = 'uploads';
                    const targetDir = path.join(baseUploadDir, type, safeCatName);
                    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
                    const oldPath = ocrRecord.image_path;
                    const fileName = path.basename(oldPath);
                    const newPath = path.join(targetDir, fileName);
                    if (fs.existsSync(oldPath)) {
                        fs.renameSync(oldPath, newPath);
                        await req.db.query(`UPDATE ocr_records SET image_path = $1, status = 'confirmed' WHERE id = $2`, [newPath, ocr_record_id]);
                    }
                }
            } catch (fileErr) {
                console.error('File organization failed:', fileErr);
            }
        }

        res.status(201).json({ success: true, data: transaction });

    } catch (err: any) {
        // No explicit ROLLBACK here, as middleware handles it on 500 status.
        // client.release() is also handled by middleware.
        console.error('[POST-TRANSACTION ERROR]', err);
        logger.error(`[POST-TRANSACTION ERROR] User: ${req.user?.id}, Error: ${err.message}`, { stack: err.stack, detail: err.detail, hint: err.hint, code: err.code });
        res.status(500).json({ success: false, error: 'Internal Server Error: ' + err.message });
    }
});

// PUT /api/transactions/:id
router.put('/:id', async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const { amount, description, transaction_date, category_id, channel_id } = req.body;

        // Validate if provided
        if (amount !== undefined && amount < 0) {
            return res.status(400).json({ success: false, error: 'Tutar 0 veya daha büyük olmalıdır' });
        }

        // Build dynamic update
        const fields: string[] = [];
        const values: any[] = [];
        let idx = 1;

        if (amount !== undefined) { fields.push(`amount = $${idx++}`); values.push(amount); }
        if (description !== undefined) { fields.push(`description = $${idx++}`); values.push(description); }
        if (transaction_date !== undefined) { fields.push(`transaction_date = $${idx++}`); values.push(transaction_date); }
        if (category_id !== undefined) { fields.push(`category_id = $${idx++}`); values.push(category_id); }
        if (channel_id !== undefined) { fields.push(`channel_id = $${idx++}`); values.push(channel_id); }
        if (req.body.expense_type !== undefined) { fields.push(`expense_type = $${idx++}`); values.push(req.body.expense_type); }
        if (req.body.is_tax_deductible !== undefined) { fields.push(`is_tax_deductible = $${idx++}`); values.push(req.body.is_tax_deductible); }
        if (req.body.deduction_reason !== undefined) { fields.push(`deduction_reason = $${idx++}`); values.push(req.body.deduction_reason); }
        if (req.body.notes !== undefined) { fields.push(`notes = $${idx++}`); values.push(req.body.notes); }
        if (req.body.vat_rate !== undefined) { fields.push(`vat_rate = $${idx++}`); values.push(req.body.vat_rate); }
        if (req.body.vat_amount !== undefined) { fields.push(`vat_amount = $${idx++}`); values.push(req.body.vat_amount); }
        if (req.body.invoice_number !== undefined) { fields.push(`invoice_number = $${idx++}`); values.push(req.body.invoice_number); }

        if (fields.length === 0) return res.status(400).json({ success: false, error: 'No fields to update' });

        fields.push(`updated_at = NOW()`);

        // Add ID as last parameter
        values.push(id);

        const query = `
      UPDATE transactions 
      SET ${fields.join(', ')}
      WHERE id = $${idx} AND deleted_at IS NULL
      RETURNING *
    `;

        const result = await req.db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Transaction not found' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// DELETE /api/transactions/:id
router.delete('/:id', async (req: any, res: Response) => {
    try {
        const { id } = req.params;

        // Check if transaction exists and is within 24 hours
        const checkQuery = `
            SELECT created_at FROM transactions 
            WHERE id = $1 AND deleted_at IS NULL
        `;
        const checkResult = await req.db.query(checkQuery, [id]);

        if (checkResult.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Transaction not found' });
        }

        const createdAt = new Date(checkResult.rows[0].created_at);
        const now = new Date();
        const diffHours = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

        if (diffHours > 24) {
            return res.status(403).json({ success: false, error: 'Records older than 24 hours cannot be deleted' });
        }

        const query = `
      UPDATE transactions 
      SET deleted_at = NOW()
      WHERE id = $1 AND deleted_at IS NULL
      RETURNING id
    `;

        const result = await req.db.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Transaction not found' });
        }

        // Auto-delete associated expenses (commissions, courier fees, etc.)
        const linkedNote = `Bağlı İşlem ID: ${id}`;
        await req.db.query(`
            UPDATE transactions 
            SET deleted_at = NOW() 
            WHERE notes = $1 AND deleted_at IS NULL
        `, [linkedNote]);

        res.json({ success: true, message: 'Transaction and associated expenses deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

export default router;
