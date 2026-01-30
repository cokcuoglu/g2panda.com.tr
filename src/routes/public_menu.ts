
import { Router, Request, Response } from 'express';
import { withTransaction } from '../db';
import { PoolClient } from 'pg';
const { query } = require('../db');

const router = Router();

// GET /api/public/menu/:userId
router.get('/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        // Use withTransaction to set RLS context (app.current_user_id)
        // This allows reading rows that are owned by 'userId' even if not logged in
        await withTransaction(userId, async (client: PoolClient) => {
            // Verify user exists (optional but good practice)
            const userCheck = await client.query('SELECT id, business_name FROM users WHERE id = $1', [userId]);
            if (userCheck.rows.length === 0) {
                return res.status(404).json({ success: false, error: 'User not found' });
            }
            const businessName = userCheck.rows[0].business_name;

            // Fetch Categories (Active only)
            const categories = await client.query(
                `SELECT * FROM menu_categories 
                 WHERE user_id = $1 AND is_active = true 
                 ORDER BY sort_order ASC, name ASC`,
                [userId]
            );

            // Fetch Products (Active only)
            const products = await client.query(
                `SELECT id, name, price, description, image_url, menu_category_id, sort_order 
                 FROM products 
                 WHERE user_id = $1 AND is_active = true
                 ORDER BY sort_order ASC, name ASC`,
                [userId]
            );

            // Enhance categories with children
            const cats = categories.rows;
            const prods = products.rows;

            // Build Tree
            const categoryMap = new Map();
            cats.forEach((c: any) => {
                categoryMap.set(c.id, { ...c, children: [], products: [] });
            });

            const rootCategories: any[] = [];

            // Attach products to categories
            prods.forEach((p: any) => {
                if (p.menu_category_id && categoryMap.has(p.menu_category_id)) {
                    categoryMap.get(p.menu_category_id).products.push(p);
                } else {
                    // Products without category? Maybe valid, but for now ignore or put in "Uncategorized" if needed.
                }
            });

            // Build hierarchy
            cats.forEach((c: any) => {
                if (c.parent_id && categoryMap.has(c.parent_id)) {
                    categoryMap.get(c.parent_id).children.push(categoryMap.get(c.id));
                } else {
                    rootCategories.push(categoryMap.get(c.id));
                }
            });

            res.json({
                success: true,
                data: {
                    business_name: businessName,
                    categories: rootCategories
                }
            });
        });

    } catch (err) {
        console.error('Public Menu API Error:', err);
        if (!res.headersSent) {
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }
});

export default router;
