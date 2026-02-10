import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/channels
router.get('/', async (req: Request, res: Response) => {
    try {
        const query = `
            SELECT * FROM channels 
            WHERE deleted_at IS NULL 
            ORDER BY type, name
        `;
        const result = await req.db.query(query);

        res.json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        console.error('Error fetching channels:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch channels' });
    }
});
// POST /api/channels
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, type, description, commission_rate } = req.body;

        if (!name || !type) {
            return res.status(400).json({ success: false, error: 'Name and type are required' });
        }

        const query = `
            INSERT INTO channels (name, type, description, user_id, commission_rate) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *
        `;
        const result = await req.db.query(query, [name, type, description, req.user?.id, commission_rate || 0]);

        res.status(201).json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error creating channel:', error);
        res.status(500).json({ success: false, error: 'Failed to create channel' });
    }
});

// PUT /api/channels/:id
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, type, description, commission_rate } = req.body;

        const query = `
            UPDATE channels 
            SET name = $1, type = $2, description = $3, commission_rate = $4, updated_at = NOW()
            WHERE id = $5 AND deleted_at IS NULL
            RETURNING *
        `;
        const result = await req.db.query(query, [name, type, description, commission_rate || 0, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Channel not found' });
        }

        res.json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error updating channel:', error);
        res.status(500).json({ success: false, error: 'Failed to update channel' });
    }
});

// DELETE /api/channels/:id
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const query = `
            UPDATE channels 
            SET deleted_at = NOW()
            WHERE id = $1 AND deleted_at IS NULL
            RETURNING id
        `;
        const result = await req.db.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Channel not found' });
        }

        res.json({ success: true, message: 'Channel deleted successfully' });
    } catch (error) {
        console.error('Error deleting channel:', error);
        res.status(500).json({ success: false, error: 'Failed to delete channel' });
    }
});

export default router;
