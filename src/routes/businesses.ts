import { Router, Response } from 'express';

const router = Router();

// GET /api/businesses - Get user's businesses
router.get('/', async (req: any, res: Response) => {
    try {
        // For now, return a single business based on user's profile
        // In the future, this can be extended to support multiple businesses per user
        const userRes = await req.db.query(
            'SELECT id, email, business_name, business_type FROM users WHERE id = $1',
            [req.user.id]
        );

        if (userRes.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const user = userRes.rows[0];

        // Return business info
        const businesses = [{
            id: user.id, // Using user ID as business ID for now
            name: user.business_name || 'İşletmem',
            type: user.business_type || 'retail'
        }];

        res.json({ success: true, data: businesses });
    } catch (err) {
        console.error('Error fetching businesses:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// POST /api/businesses/switch - Switch active business
router.post('/switch', async (req: any, res: Response) => {
    try {
        const { business_id } = req.body;

        // For single-business setup, just acknowledge the switch
        // In multi-business setup, this would update session context

        res.json({ success: true, message: 'Business switched successfully' });
    } catch (err) {
        console.error('Error switching business:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

export default router;
