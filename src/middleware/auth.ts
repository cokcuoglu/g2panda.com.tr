import { Request, Response, NextFunction } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../db';

// Extend Express Request type to include db client and user
declare global {
    namespace Express {
        interface Request {
            db: PoolClient;
            user?: {
                id: string;
                role?: string;
                email?: string;
            };
        }
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // Bypass auth for public QR menu order submissions (no token on customer device)
    if (req.path.startsWith('/orders/public/')) {
        return next();
    }

    // 1. Assume req.user.id is already populated by a previous JWT validator
    if (!req.user || !req.user.id) {
        // In a real scenario, we might want to throw 401 here if this middleware 
        // is strictly for authenticated routes.
        // For now, we proceed but log a waning or block if strictly required.
        // As per rules "assumes req.user.id is already available", we'll check validity.
        return res.status(401).json({ success: false, error: 'Unauthorized: No user context found' });
    }

    // 2. Open a DB Connection for this request
    const client = await pool.connect();
    req.db = client;

    try {
        // 3. Start Transaction
        await client.query('BEGIN');

        // 3.5. Set RLS Context FIRST, then switch role (UNLESS SUPERADMIN)
        // CRITICAL: Context must be set BEFORE role switch to ensure it's accessible
        if (req.user.role === 'superadmin') {
            // Superadmin keeps the original connection role (postgres) which bypasses RLS
            // We still set config for auditing if needed, but RLS won't hide rows
            await client.query(`SELECT set_config('app.current_user_id', $1, true)`, [req.user.id]);
        } else {
            // 4. Set RLS Context FIRST (Critical for Security)
            await client.query(`SELECT set_config('app.current_user_id', $1, true)`, [req.user.id]);
            // 5. Then switch to non-superuser role to enforce RLS
            await client.query('SET LOCAL ROLE app_user');
        }

        // 5. Handle Commit/Rollback on Response finish
        res.on('finish', async () => {
            try {
                if (res.statusCode >= 400) {
                    // Rollback on errors (4xx, 5xx)
                    await client.query('ROLLBACK');
                } else {
                    // Commit on success (2xx, 3xx)
                    await client.query('COMMIT');
                }
            } catch (err) {
                console.error('[AuthMiddleware] Transaction Commit/Rollback Error:', err);
            } finally {
                // Always release the client back to the pool
                client.release();
            }
        });

        next();
    } catch (error) {
        // If setting up transaction fails
        client.release();
        console.error('[AuthMiddleware] Database Error:', error);
        res.status(500).json({ success: false, error: 'Database Connection Error' });
    }
};
