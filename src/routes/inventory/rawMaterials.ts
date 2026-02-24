import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/inventory/raw-materials
router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await req.db.query(`
            SELECT 
                rm.*,
                COALESCE(SUM(se.remaining_quantity), 0) as current_stock
            FROM raw_materials rm
            LEFT JOIN raw_material_stock_entries se ON rm.id = se.raw_material_id
            WHERE rm.deleted_at IS NULL
            GROUP BY rm.id
            ORDER BY rm.name
        `);

        res.json({ success: true, data: result.rows });
    } catch (err) {
        console.error('Get raw materials error:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch raw materials' });
    }
});

// POST /api/inventory/raw-materials
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, unit, critical_stock_level, min_stock_level, is_intermediate } = req.body;

        if (!name || !unit) {
            return res.status(400).json({ success: false, error: 'Name and unit are required' });
        }

        const result = await req.db.query(`
            INSERT INTO raw_materials (user_id, name, unit, critical_stock_level, min_stock_level, is_intermediate)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `, [req.user!.id, name, unit, critical_stock_level || 0, min_stock_level || 0, is_intermediate || false]);

        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error('Create raw material error:', err);
        res.status(500).json({ success: false, error: 'Failed to create raw material' });
    }
});

// PUT /api/inventory/raw-materials/:id
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, unit, critical_stock_level, min_stock_level, is_active, is_intermediate } = req.body;

        const result = await req.db.query(`
            UPDATE raw_materials
            SET 
                name = COALESCE($1, name),
                unit = COALESCE($2, unit),
                critical_stock_level = COALESCE($3, critical_stock_level),
                min_stock_level = COALESCE($4, min_stock_level),
                is_active = COALESCE($5, is_active),
                is_intermediate = COALESCE($6, is_intermediate),
                updated_at = NOW()
            WHERE id = $7 AND user_id = $8 AND deleted_at IS NULL
            RETURNING *
        `, [name, unit, critical_stock_level, min_stock_level, is_active, is_intermediate !== undefined ? is_intermediate : null, id, req.user!.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Raw material not found' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error('Update raw material error:', err);
        res.status(500).json({ success: false, error: 'Failed to update raw material' });
    }
});

// DELETE /api/inventory/raw-materials/:id (soft delete)
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await req.db.query(`
            UPDATE raw_materials
            SET deleted_at = NOW()
            WHERE id = $1 AND user_id = $2 AND deleted_at IS NULL
            RETURNING id
        `, [id, req.user!.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Raw material not found' });
        }

        res.json({ success: true, message: 'Raw material deleted' });
    } catch (err) {
        console.error('Delete raw material error:', err);
        res.status(500).json({ success: false, error: 'Failed to delete raw material' });
    }
});

export default router;
