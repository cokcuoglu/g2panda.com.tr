import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Helper to generate Unique Table Code: TBL-<6 uppercase alphanumeric characters>
const generateTableCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `TBL-${code}`;
};

// ==========================================
// 1. SPECIFIC ROUTES (Must be first)
// ==========================================

// POST /api/tables/:id/service-request
router.post('/:id/service-request', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { type } = req.body;
        console.log(`[ServiceRequest-POST] Table: ${id}, Type: ${type}`);

        if (type && !['bill', 'call_waiter', 'none'].includes(type)) {
            return res.status(400).json({ success: false, error: 'Invalid request type' });
        }

        const tableCheck = await req.db.query("SELECT status FROM tables WHERE id = $1", [id]);
        if (tableCheck.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Table not found' });
        }
        if (tableCheck.rows[0].status !== 'active' && type !== 'none') {
            return res.status(400).json({ success: false, error: 'Oturum açılmamış masada işlem yapılamaz.' });
        }

        const requestText = type === 'bill' ? 'Hesap İstiyor' : (type === 'call_waiter' ? 'Garson İstiyor' : null);

        const result = await req.db.query(
            `UPDATE tables SET service_request = $1, updated_at = NOW() WHERE id = $2 RETURNING id, name, service_request`,
            [requestText, id]
        );

        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error('Service Request error:', err);
        res.status(500).json({ success: false, error: 'Failed to update service request' });
    }
});

// PATCH /api/tables/:id/service-request
router.patch('/:id/service-request', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { type } = req.body;
        const trimmedId = id.trim();
        console.log(`[ServiceRequest-PATCH] Table: ${trimmedId}, Type: ${type}`);

        if (type && !['bill', 'call_waiter', 'none'].includes(type)) {
            return res.status(400).json({ success: false, error: 'Invalid request type' });
        }

        const requestText = type === 'bill' ? 'Hesap İstiyor' : (type === 'call_waiter' ? 'Garson İstiyor' : null);

        const result = await req.db.query(
            `UPDATE tables SET service_request = $1, updated_at = NOW() WHERE id = $2 RETURNING id, name, service_request`,
            [requestText, trimmedId]
        );

        if (result.rows.length === 0) {
            console.warn(`[ServiceRequest-PATCH] NOT FOUND: ${trimmedId}`);
            return res.status(404).json({ success: false, error: 'Table not found' });
        }

        console.log(`[ServiceRequest-PATCH] SUCCESS: ${result.rows[0].name}`);
        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error('Service Request update error:', err);
        res.status(500).json({ success: false, error: 'Failed to update service request' });
    }
});

// POST /api/tables/:id/reset
router.post('/:id/reset', async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) return res.status(401).json({ success: false, error: 'Unauthorized' });
        const { id } = req.params;
        console.log(`[Table-RESET] Table: ${id}`);

        await req.db.query(
            "UPDATE tables SET status = 'available', service_request = NULL WHERE id = $1 AND user_id = $2",
            [id, req.user.id]
        );

        await req.db.query(
            "UPDATE orders SET status = 'cancelled', updated_at = NOW(), archived_at = NOW() WHERE table_id = $1 AND status IN ('pending', 'confirmed') AND user_id = $2",
            [id, req.user.id]
        );

        res.json({ success: true, message: 'Table reset successfully' });
    } catch (err) {
        console.error('Reset Table error:', err);
        res.status(500).json({ success: false, error: 'Failed to reset table' });
    }
});

// ==========================================
// 2. GENERIC ROUTES
// ==========================================

// GET /api/tables
router.get('/', async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) return res.status(401).json({ success: false, error: 'Unauthorized' });

        const result = await req.db.query(
            `SELECT * FROM tables WHERE user_id = $1 AND deleted_at IS NULL ORDER BY created_at ASC`,
            [req.user.id]
        );

        const sanitizedData = result.rows.map(t => ({
            ...t,
            service_request: t.status === 'active' ? t.service_request : null
        }));

        res.json({ success: true, data: sanitizedData });
    } catch (err) {
        console.error('Get Tables error:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch tables' });
    }
});

// POST /api/tables
router.post('/', async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) return res.status(401).json({ success: false, error: 'Unauthorized' });
        const { name, type, capacity, area, posX, posY, rotation } = req.body;
        if (!name) return res.status(400).json({ success: false, error: 'Table name is required' });

        let uniqueCode = generateTableCode();
        let result = await req.db.query(
            `INSERT INTO tables (user_id, unique_code, name, type, rotation, capacity, area, pos_x, pos_y)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
             RETURNING *`,
            [req.user.id, uniqueCode, name, type || 'square', rotation || 0, capacity || 2, area || 'Genel', posX || 0, posY || 0]
        );

        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error('Create Table error:', err);
        res.status(500).json({ success: false, error: 'Failed to create table' });
    }
});

// PATCH /api/tables/:id
router.patch('/:id', async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) return res.status(401).json({ success: false, error: 'Unauthorized' });
        const { id } = req.params;
        const { name, type, rotation, capacity, area, status, posX, posY } = req.body;
        console.log(`[Table-PATCH] Table: ${id}`);

        const result = await req.db.query(
            `UPDATE tables 
             SET name = COALESCE($1, name),
                 type = COALESCE($2, type),
                 rotation = COALESCE($3, rotation),
                 capacity = COALESCE($4, capacity),
                 area = COALESCE($5, area),
                 status = COALESCE($6, status),
                 service_request = CASE WHEN COALESCE($6, status) = 'available' THEN NULL ELSE service_request END,
                 pos_x = COALESCE($7, pos_x),
                 pos_y = COALESCE($8, pos_y),
                 updated_at = NOW()
             WHERE id = $9 AND user_id = $10 AND deleted_at IS NULL
             RETURNING *`,
            [name, type, rotation, capacity, area, status, posX, posY, id, req.user.id]
        );

        if (result.rows.length === 0) return res.status(404).json({ success: false, error: 'Table not found' });
        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error('Update Table error:', err);
        res.status(500).json({ success: false, error: 'Failed to update table' });
    }
});

// DELETE /api/tables/:id
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) return res.status(401).json({ success: false, error: 'Unauthorized' });
        const { id } = req.params;
        const result = await req.db.query(
            `UPDATE tables SET deleted_at = NOW() WHERE id = $1 AND user_id = $2 RETURNING id`,
            [id, req.user.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ success: false, error: 'Table not found' });
        res.json({ success: true, message: 'Table deleted successfully' });
    } catch (err) {
        console.error('Delete Table error:', err);
        res.status(500).json({ success: false, error: 'Failed to delete table' });
    }
});

export default router;
