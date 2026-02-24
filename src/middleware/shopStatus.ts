import { Request, Response, NextFunction } from 'express';
import { pool } from '../db';

/**
 * Middleware to check if the shop is open before proceeding with financial transactions.
 * Returns 403 Forbidden if the shop is closed.
 */
export const shopStatusMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Bypassing for public (QR Menu) routes - no auth token, must be first!
        if (req.path.startsWith('/public')) {
            return next();
        }

        // Ensure user context exists
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, error: 'Unauthorized: User context required' });
        }

        const userId = req.user.id;

        // Bypassing for GET requests - we only want to block POST/PUT/DELETE
        if (req.method === 'GET') {
            return next();
        }

        // Bypassing for superadmins
        if (req.user.role === 'superadmin') {
            return next();
        }

        // Query shop status from DB - NO RLS needed as we use user_id directly
        // We use pool directly to avoid conflicting with the main connection if needed, 
        // though req.db could also be used since it's already connected in authMiddleware.
        // However, req.db is already in a transaction.
        const result = await pool.query('SELECT is_open FROM users WHERE id = $1', [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Business not found' });
        }

        const isOpen = result.rows[0].is_open;

        if (!isOpen) {
            return res.status(403).json({
                success: false,
                error: 'Mağaza kapalı. İşlem yapmak için lütfen önce dükkanı açın.',
                is_shop_closed: true
            });
        }

        next();
    } catch (error) {
        console.error('[ShopStatusMiddleware] Error:', error);
        res.status(500).json({ success: false, error: 'İşletme durumu doğrulanırken bir hata oluştu' });
    }
};
