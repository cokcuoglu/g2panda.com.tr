
import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth';
import { pool } from '../../db';

const router = Router();

// GET /api/inventory/stats/product-performance
router.get('/product-performance', authMiddleware, async (req: any, res) => {
    try {
        const userId = req.user.id;
        const limit = 5;

        // 1. Top Selling Products
        const topSellingQuery = `
            SELECT ti.name, CAST(SUM(ti.quantity) AS INTEGER) as total_quantity, CAST(SUM(ti.total_price) AS NUMERIC) as total_revenue
            FROM transaction_items ti
            JOIN transactions t ON ti.transaction_id = t.id
            WHERE t.user_id = $1 AND t.type = 'income'
            GROUP BY ti.name
            ORDER BY total_quantity DESC
            LIMIT $2
        `;

        // 2. Least Selling Products (including 0 sales)
        // We join products with transaction_items on name to find products with little or no sales
        const leastSellingQuery = `
            SELECT p.name, CAST(COALESCE(SUM(ti.quantity), 0) AS INTEGER) as total_quantity, CAST(COALESCE(SUM(ti.total_price), 0) AS NUMERIC) as total_revenue
            FROM products p
            LEFT JOIN transaction_items ti ON ti.name = p.name
            LEFT JOIN transactions t ON ti.transaction_id = t.id AND t.type = 'income' AND t.user_id = $1
            WHERE p.user_id = $1 AND p.is_active = true
            GROUP BY p.id, p.name
            ORDER BY total_quantity ASC, total_revenue ASC
            LIMIT $2
        `;

        const [topRes, bottomRes] = await Promise.all([
            pool.query(topSellingQuery, [userId, limit]),
            pool.query(leastSellingQuery, [userId, limit])
        ]);

        res.json({
            success: true,
            data: {
                topSelling: topRes.rows,
                leastSelling: bottomRes.rows
            }
        });

    } catch (error) {
        console.error('Error fetching product performance stats:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch statistics' });
    }
});

// GET /api/inventory/stats/performance
router.get('/performance', authMiddleware, async (req: any, res) => {
    try {
        const userId = req.user.id;
        const limit = 5;

        // 1. Top Performing Tables (by revenue)
        const topTablesQuery = `
            SELECT 
                COALESCE(table_number, 'Gel-Al (Eski)') as name, 
                CAST(COUNT(*) AS INTEGER) as total_quantity, 
                CAST(SUM(amount) AS NUMERIC) as total_revenue
            FROM transactions
            WHERE user_id = $1 AND type = 'income' AND deleted_at IS NULL
            GROUP BY table_number
            ORDER BY total_revenue DESC
            LIMIT $2
        `;

        // 2. Least Performing Tables (including those with 0 sales)
        // We join with the tables table to find tables that exist but have few or no sales
        const leastTablesQuery = `
            SELECT 
                t.name, 
                CAST(COALESCE(sub.total_quantity, 0) AS INTEGER) as total_quantity, 
                CAST(COALESCE(sub.total_revenue, 0) AS NUMERIC) as total_revenue
            FROM tables t
            LEFT JOIN (
                SELECT 
                    table_id,
                    COUNT(*) as total_quantity,
                    SUM(amount) as total_revenue
                FROM transactions
                WHERE user_id = $1 AND type = 'income' AND deleted_at IS NULL AND table_id IS NOT NULL
                GROUP BY table_id
            ) sub ON t.id = sub.table_id
            WHERE t.user_id = $1 AND t.deleted_at IS NULL
            ORDER BY total_revenue ASC, total_quantity ASC
            LIMIT $2
        `;

        const [topRes, leastRes] = await Promise.all([
            pool.query(topTablesQuery, [userId, limit]),
            pool.query(leastTablesQuery, [userId, limit])
        ]);

        res.json({
            success: true,
            data: {
                topTables: topRes.rows,
                leastTables: leastRes.rows
            }
        });

    } catch (error) {
        console.error('Error fetching performance stats:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch statistics' });
    }
});

// GET /api/inventory/stats/live
router.get('/live', authMiddleware, async (req: any, res) => {
    try {
        const userId = req.user.id;

        const activeTablesQuery = 'SELECT COUNT(*) FROM tables WHERE user_id = $1 AND status = \'active\' AND deleted_at IS NULL';
        const pendingOrdersQuery = 'SELECT COUNT(*) FROM orders WHERE user_id = $1 AND status = \'pending\' AND deleted_at IS NULL';

        const [tablesRes, ordersRes] = await Promise.all([
            pool.query(activeTablesQuery, [userId]),
            pool.query(pendingOrdersQuery, [userId])
        ]);

        res.json({
            success: true,
            data: {
                activeTables: parseInt(tablesRes.rows[0].count),
                pendingOrders: parseInt(ordersRes.rows[0].count)
            }
        });
    } catch (error) {
        console.error('Error fetching live stats:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch live statistics' });
    }
});

export default router;
