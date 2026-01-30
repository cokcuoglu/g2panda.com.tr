
import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/audit-logs
// Fetch audit logs with filtering and pagination
router.get('/', async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, error: 'Unauthorized' });
        }

        const { page = 1, limit = 50, start_date, end_date, action } = req.query;
        const offset = (Number(page) - 1) * Number(limit);

        const params: any[] = [];
        let query = `
            SELECT 
                a.id, 
                a.action, 
                a.entity_type, 
                a.entity_id, 
                a.created_at, 
                a.details,
                u.email as performed_by_email,
                u.full_name as performed_by_name
            FROM audit_logs a
            LEFT JOIN users u ON a.performed_by = u.id
            WHERE 1=1
        `;
        let paramIdx = 1;

        if (start_date) {
            query += ` AND a.created_at >= $${paramIdx++}`;
            params.push(start_date);
        }

        if (end_date) {
            // End date inclusive (end of day) if just date provided
            query += ` AND a.created_at <= $${paramIdx++}::date + interval '1 day'`;
            params.push(end_date);
        }

        if (action && action !== 'all') {
            query += ` AND a.action = $${paramIdx++}`;
            params.push(action);
        }

        query += ` ORDER BY a.created_at DESC LIMIT $${paramIdx++} OFFSET $${paramIdx++}`;
        params.push(Number(limit), offset);

        const result = await req.db.query(query, params);

        // Format for frontend
        const logs = result.rows.map(row => ({
            id: row.id,
            action: row.action,
            entity_type: row.entity_type,
            entity_id: row.entity_id,
            performed_by: row.performed_by_email || 'Sistem', // Formatting constraint on frontend expects email usually
            created_at: row.created_at,
            details: row.details
        }));

        res.json({
            success: true,
            data: logs,
            meta: {
                page: Number(page),
                limit: Number(limit)
            }
        });

    } catch (error) {
        console.error('Audit Logs Error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch logs' });
    }
});

export default router;
