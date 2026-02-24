
import { Router, Request, Response } from 'express';

const router = Router();

// GET /
// Replaces the insecure /api/auth/me
// Uses req.db which has RLS context set by authMiddleware
router.get('/', async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, error: 'Unauthorized' });
        }

        // We use req.db here implicitly because RLS is active
        // But users table might be special if the policy allows selecting own user
        const result = await req.db.query(
            'SELECT id, email, full_name, role, business_name, business_logo_url, currency, locale, permissions, is_open, auto_open_time, auto_close_time FROM users WHERE id = $1',
            [req.user.id]
        );
        const user = result.rows[0];

        // Format times to HH:mm
        if (user && user.auto_open_time) user.auto_open_time = user.auto_open_time.substring(0, 5);
        if (user && user.auto_close_time) user.auto_close_time = user.auto_close_time.substring(0, 5);

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Calculate permissions based on role (MVP) or Use DB permissions
        let permissions: string[] = user.permissions || [];
        const role = (user.role || 'OWNER').toUpperCase();

        // If no explicit permissions set (migration fallback), use role defaults
        if (permissions.length === 0) {
            if (role === 'OWNER') {
                permissions = ['transactions.read', 'transactions.write', 'reports.read', 'reports.export', 'settings.read', 'settings.write', 'users.read', 'users.write', 'dashboard.read'];
            } else if (role === 'ACCOUNTANT') {
                permissions = ['transactions.read', 'transactions.write', 'reports.read', 'reports.export', 'dashboard.read'];
            } else {
                permissions = ['transactions.read', 'transactions.write'];
            }
        }

        res.json({
            success: true,
            data: {
                ...user,
                permissions
            }
        });
    } catch (error) {
        console.error('Get Me error:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// PUT /
router.put('/', async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, error: 'Unauthorized' });
        }

        const { full_name, business_name, business_type, business_logo_url, currency, locale, auto_open_time, auto_close_time } = req.body;

        const result = await req.db.query(
            `UPDATE users 
             SET full_name = COALESCE($1, full_name),
                 business_name = COALESCE($2, business_name),
                 business_type = COALESCE($3, business_type),
                 currency = COALESCE($4, currency),
                 locale = COALESCE($5, locale),
                 business_logo_url = COALESCE($6, business_logo_url),
                 auto_open_time = $7,
                 auto_close_time = $8
             WHERE id = $9
             RETURNING id, email, full_name, role, business_name, business_logo_url, currency, locale, auto_open_time, auto_close_time`,
            [full_name, business_name, business_type, currency, locale, business_logo_url, auto_open_time || null, auto_close_time || null, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {
        console.error('Update Me error:', error);
        res.status(500).json({ success: false, error: 'Update failed' });
    }
});

export default router;
