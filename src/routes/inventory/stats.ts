
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

export default router;
