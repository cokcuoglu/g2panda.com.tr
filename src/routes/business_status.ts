import { Router, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import { pool } from '../db';
import { BusinessService } from '../services/businessService';

const router = Router();

// GET /api/business-status - Get current opening status
router.get('/', authMiddleware, async (req: any, res: Response) => {
    try {
        const userId = req.user.id;
        const result = await pool.query(
            'SELECT is_open, last_opened_at, last_closed_at FROM users WHERE id = $1',
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Business not found' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error fetching business status:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// POST /api/business-status/toggle - Toggle open/closed status
router.post('/toggle', authMiddleware, async (req: any, res: Response) => {
    try {
        const userId = req.user.id;
        const result = await BusinessService.toggleStatus(userId);
        res.json({ success: true, data: result });
    } catch (error: any) {
        console.error('Error toggling business status:', error);
        res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
    }
});

export default router;
