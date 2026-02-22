import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/inventory/alerts/critical-stock
router.get('/critical-stock', async (req: Request, res: Response) => {
    try {
        const result = await req.db.query(`
            SELECT 
                rm.id,
                rm.name,
                rm.unit,
                rm.critical_stock_level,
                rm.min_stock_level,
                COALESCE(SUM(se.remaining_quantity), 0) as current_stock
            FROM raw_materials rm
            LEFT JOIN raw_material_stock_entries se ON rm.id = se.raw_material_id
            WHERE rm.user_id = $1 AND rm.deleted_at IS NULL
            GROUP BY rm.id
            HAVING COALESCE(SUM(se.remaining_quantity), 0) <= rm.critical_stock_level
            ORDER BY 
                COALESCE(SUM(se.remaining_quantity), 0) / NULLIF(rm.critical_stock_level, 0),
                rm.name
        `, [req.user!.id]);

        res.json({ success: true, data: result.rows });
    } catch (err) {
        console.error('Get critical stock alerts error:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch critical stock alerts' });
    }
});

// GET /api/inventory/alerts/expiring-soon
router.get('/expiring-soon', async (req: Request, res: Response) => {
    try {
        const daysAhead = parseInt(req.query.days as string) || 7;

        const result = await req.db.query(`
            SELECT 
                se.id,
                se.expiration_date,
                se.remaining_quantity,
                rm.name as material_name,
                rm.unit,
                (se.expiration_date - CURRENT_DATE) as days_until_expiration
            FROM raw_material_stock_entries se
            JOIN raw_materials rm ON se.raw_material_id = rm.id
            WHERE se.user_id = $1 
            AND se.expiration_date IS NOT NULL
            AND se.remaining_quantity > 0
            AND se.expiration_date <= CURRENT_DATE + $2
            ORDER BY se.expiration_date ASC
        `, [req.user!.id, daysAhead]);

        res.json({ success: true, data: result.rows });
    } catch (err) {
        console.error('Get expiring items error:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch expiring items' });
    }
});

// GET /api/inventory/alerts/summary
router.get('/summary', async (req: Request, res: Response) => {
    try {
        // Get critical stock count
        const criticalResult = await req.db.query(`
            SELECT COUNT(*) as count
            FROM (
                SELECT rm.id
                FROM raw_materials rm
                LEFT JOIN raw_material_stock_entries se ON rm.id = se.raw_material_id
                WHERE rm.user_id = $1 AND rm.deleted_at IS NULL
                GROUP BY rm.id
                HAVING COALESCE(SUM(se.remaining_quantity), 0) <= rm.critical_stock_level
            ) sub
        `, [req.user!.id]);

        // Get expiring soon count
        const expiringResult = await req.db.query(`
            SELECT COUNT(*) as count
            FROM raw_material_stock_entries se
            WHERE se.user_id = $1 
            AND se.expiration_date IS NOT NULL
            AND se.remaining_quantity > 0
            AND se.expiration_date <= CURRENT_DATE + 7
        `, [req.user!.id]);

        res.json({
            success: true,
            data: {
                critical_stock_count: parseInt(criticalResult.rows[0].count),
                expiring_soon_count: parseInt(expiringResult.rows[0].count)
            }
        });
    } catch (err) {
        console.error('Get alerts summary error:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch alerts summary' });
    }
});

export default router;
