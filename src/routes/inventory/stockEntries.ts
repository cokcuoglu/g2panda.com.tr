import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/inventory/stock-entries
router.get('/', async (req: Request, res: Response) => {
    try {
        const { raw_material_id } = req.query;

        let query = `
            SELECT 
                se.*,
                rm.name as material_name,
                rm.unit
            FROM raw_material_stock_entries se
            JOIN raw_materials rm ON se.raw_material_id = rm.id
            WHERE se.user_id = $1
        `;
        const params: any[] = [req.user!.id];

        if (raw_material_id) {
            query += ` AND se.raw_material_id = $2`;
            params.push(raw_material_id);
        }

        query += ` ORDER BY se.entry_date DESC`;

        const result = await req.db.query(query, params);
        res.json({ success: true, data: result.rows });
    } catch (err) {
        console.error('Get stock entries error:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch stock entries' });
    }
});

// POST /api/inventory/stock-entries
router.post('/', async (req: Request, res: Response) => {
    try {
        const { raw_material_id, quantity, unit_price, expiration_date, notes } = req.body;

        if (!raw_material_id || !quantity || quantity <= 0) {
            return res.status(400).json({
                success: false,
                error: 'Raw material ID and positive quantity are required'
            });
        }

        // Insert stock entry
        const entryResult = await req.db.query(`
            INSERT INTO raw_material_stock_entries 
            (user_id, raw_material_id, quantity, remaining_quantity, unit_price, expiration_date, notes)
            VALUES ($1, $2, $3, $3, $4, $5, $6)
            RETURNING *
        `, [req.user!.id, raw_material_id, quantity, unit_price, expiration_date, notes]);

        const entry = entryResult.rows[0];

        // Get current total stock
        const stockResult = await req.db.query(`
            SELECT COALESCE(SUM(remaining_quantity), 0) as total_stock
            FROM raw_material_stock_entries
            WHERE raw_material_id = $1 AND user_id = $2
        `, [raw_material_id, req.user!.id]);

        const totalStock = parseFloat(stockResult.rows[0].total_stock);

        // Record stock movement
        await req.db.query(`
            INSERT INTO stock_movements 
            (user_id, raw_material_id, stock_entry_id, movement_type, quantity, remaining_quantity, reference_type, notes)
            VALUES ($1, $2, $3, 'in', $4, $5, 'manual_entry', $6)
        `, [req.user!.id, raw_material_id, entry.id, quantity, totalStock, notes]);

        res.status(201).json({ success: true, data: entry });

    } catch (err) {
        console.error('Create stock entry error:', err);
        res.status(500).json({ success: false, error: 'Failed to create stock entry' });
    }
});

// GET /api/inventory/stock-entries/summary
router.get('/summary', async (req: Request, res: Response) => {
    try {
        const result = await req.db.query(`
            SELECT 
                rm.id,
                rm.name,
                rm.unit,
                rm.critical_stock_level,
                rm.min_stock_level,
                COALESCE(SUM(se.quantity - se.remaining_quantity), 0) as total_used,
                COALESCE(SUM(se.remaining_quantity), 0) as current_stock,
                CASE 
                    WHEN COALESCE(SUM(se.remaining_quantity), 0) <= rm.critical_stock_level THEN 'critical'
                    WHEN COALESCE(SUM(se.remaining_quantity), 0) <= rm.min_stock_level THEN 'low'
                    ELSE 'normal'
                END as stock_status
            FROM raw_materials rm
            LEFT JOIN raw_material_stock_entries se ON rm.id = se.raw_material_id
            WHERE rm.user_id = $1 AND rm.deleted_at IS NULL
            GROUP BY rm.id
            ORDER BY 
                CASE 
                    WHEN COALESCE(SUM(se.remaining_quantity), 0) <= rm.critical_stock_level THEN 1
                    WHEN COALESCE(SUM(se.remaining_quantity), 0) <= rm.min_stock_level THEN 2
                    ELSE 3
                END,
                rm.name
        `, [req.user!.id]);

        res.json({ success: true, data: result.rows });
    } catch (err) {
        console.error('Get stock summary error:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch stock summary' });
    }
});

// PUT /api/inventory/stock-entries/:id
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { quantity, unit_price, expiration_date, notes } = req.body;

        // Get current entry
        const currentEntry = await req.db.query(`
            SELECT * FROM raw_material_stock_entries
            WHERE id = $1 AND user_id = $2
        `, [id, req.user!.id]);

        if (currentEntry.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Stock entry not found' });
        }

        const oldEntry = currentEntry.rows[0];
        const oldQuantity = parseFloat(oldEntry.quantity);
        const oldRemaining = parseFloat(oldEntry.remaining_quantity);
        const usedQuantity = oldQuantity - oldRemaining;

        // Calculate new remaining quantity
        const newQuantity = quantity !== undefined ? parseFloat(quantity) : oldQuantity;
        const newRemaining = Math.max(0, newQuantity - usedQuantity);

        // Update entry
        const result = await req.db.query(`
            UPDATE raw_material_stock_entries
            SET 
                quantity = $1,
                remaining_quantity = $2,
                unit_price = COALESCE($3, unit_price),
                expiration_date = COALESCE($4, expiration_date),
                notes = COALESCE($5, notes),
                updated_at = NOW()
            WHERE id = $6 AND user_id = $7
            RETURNING *
        `, [newQuantity, newRemaining, unit_price, expiration_date, notes, id, req.user!.id]);

        // Record stock movement for the adjustment
        const quantityDiff = newQuantity - oldQuantity;
        if (quantityDiff !== 0) {
            const stockResult = await req.db.query(`
                SELECT COALESCE(SUM(remaining_quantity), 0) as total_stock
                FROM raw_material_stock_entries
                WHERE raw_material_id = $1 AND user_id = $2
            `, [oldEntry.raw_material_id, req.user!.id]);

            await req.db.query(`
                INSERT INTO stock_movements 
                (user_id, raw_material_id, stock_entry_id, movement_type, quantity, remaining_quantity, reference_type, notes)
                VALUES ($1, $2, $3, $4, $5, $6, 'adjustment', $7)
            `, [
                req.user!.id,
                oldEntry.raw_material_id,
                id,
                quantityDiff > 0 ? 'in' : 'out',
                Math.abs(quantityDiff),
                parseFloat(stockResult.rows[0].total_stock),
                `Entry updated: ${notes || 'No notes'}`
            ]);
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error('Update stock entry error:', err);
        res.status(500).json({ success: false, error: 'Failed to update stock entry' });
    }
});

// DELETE /api/inventory/stock-entries/:id
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Get entry details before deletion
        const entryResult = await req.db.query(`
            SELECT * FROM raw_material_stock_entries
            WHERE id = $1 AND user_id = $2
        `, [id, req.user!.id]);

        if (entryResult.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Stock entry not found' });
        }

        const entry = entryResult.rows[0];
        const remainingQty = parseFloat(entry.remaining_quantity);

        // Check if any quantity has been used
        if (remainingQty < parseFloat(entry.quantity)) {
            return res.status(400).json({
                success: false,
                error: 'Cannot delete entry that has been partially used. Remaining quantity must equal original quantity.'
            });
        }

        // Delete the entry
        await req.db.query(`
            DELETE FROM raw_material_stock_entries
            WHERE id = $1 AND user_id = $2
        `, [id, req.user!.id]);

        // Record stock movement
        const stockResult = await req.db.query(`
            SELECT COALESCE(SUM(remaining_quantity), 0) as total_stock
            FROM raw_material_stock_entries
            WHERE raw_material_id = $1 AND user_id = $2
        `, [entry.raw_material_id, req.user!.id]);

        await req.db.query(`
            INSERT INTO stock_movements 
            (user_id, raw_material_id, movement_type, quantity, remaining_quantity, reference_type, notes)
            VALUES ($1, $2, 'out', $3, $4, 'entry_deleted', 'Stock entry deleted')
        `, [
            req.user!.id,
            entry.raw_material_id,
            entry.quantity,
            parseFloat(stockResult.rows[0].total_stock)
        ]);

        res.json({ success: true, message: 'Stock entry deleted' });
    } catch (err) {
        console.error('Delete stock entry error:', err);
        res.status(500).json({ success: false, error: 'Failed to delete stock entry' });
    }
});

export default router;
