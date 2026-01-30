import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

/**
 * GET /api/menu-categories
 * Returns full category tree for the user
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, error: 'Unauthorized' });
        }
        const userId = req.user.id; // Correct safe access

        // Use req.db if available (authMiddleware), otherwise fallback (unsafe if RLS required) but better to error.
        // Assuming authMiddleware is always present for this route in server.ts
        if (!req.db) {
            throw new Error('Database connection not attached to request');
        }

        const result = await req.db.query(
            'SELECT * FROM menu_categories WHERE user_id = $1 ORDER BY parent_id NULLS FIRST, sort_order ASC, name ASC',
            [userId]
        );

        // Build Tree Structure
        const categories = result.rows;
        const categoryMap = new Map();
        const rootCategories: any[] = [];

        // Initialize map
        categories.forEach((cat: any) => {
            cat.children = [];
            categoryMap.set(cat.id, cat);
        });

        // Build hierarchy
        categories.forEach((cat: any) => {
            if (cat.parent_id) {
                const parent = categoryMap.get(cat.parent_id);
                if (parent) {
                    parent.children.push(cat);
                } else {
                    // Orphaned -> Root
                    rootCategories.push(cat);
                }
            } else {
                rootCategories.push(cat);
            }
        });

        res.json({
            success: true,
            data: rootCategories
        });

    } catch (error) {
        console.error('Error fetching menu categories:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

/**
 * POST /api/menu-categories
 * Create a new category 
 */
router.post('/', async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, error: 'Unauthorized' });
        }
        const userId = req.user.id;
        const { name, parent_id, sort_order } = req.body;

        if (!name) {
            return res.status(400).json({ success: false, error: 'Category name is required' });
        }

        let level = 1;
        let pId = parent_id || null;

        // Validation: Check Parent & Depth
        if (pId) {
            const parentRes = await req.db.query(
                'SELECT id, level, user_id FROM menu_categories WHERE id = $1',
                [pId]
            );

            if (parentRes.rows.length === 0) {
                return res.status(400).json({ success: false, error: 'Parent category not found' });
            }

            const parent = parentRes.rows[0];
            // RLS ensures we only see our own categories usually, but double check doesn't hurt if we selected by ID only?
            // Actually RLS handles filtering, so finding 0 rows means not found or not owned.
            // But if we bypass RLS somehow (we won't with req.db), this check is redundant but safe.
            if (parent.user_id !== userId) {
                // This line technically unreachable if RLS works, but keeps logic consistent
                return res.status(403).json({ success: false, error: 'Unauthorized parent category' });
            }

            if (parent.level >= 5) {
                return res.status(400).json({ success: false, error: 'Maximum category depth (5) reached' });
            }

            level = parent.level + 1;
        }

        const newId = uuidv4();
        const order = sort_order || 0;

        const result = await req.db.query(
            `INSERT INTO menu_categories (id, user_id, name, parent_id, level, sort_order, is_active) 
             VALUES ($1, $2, $3, $4, $5, $6, true) RETURNING *`,
            [newId, userId, name, pId, level, order]
        );

        res.status(201).json({
            success: true,
            data: result.rows[0]
        });

    } catch (error: any) {
        console.error('Error creating menu category:', error);
        res.status(500).json({ success: false, error: `Internal Server Error: ${error.message}` });
    }
});

/**
 * PUT /api/menu-categories/:id
 * Update category
 */
router.put('/:id', async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, error: 'Unauthorized' });
        }
        const userId = req.user.id;
        const categoryId = req.params.id;
        const { name, parent_id, sort_order, is_active } = req.body;

        // Check ownership
        const currentRes = await req.db.query(
            'SELECT * FROM menu_categories WHERE id = $1',
            [categoryId]
        );

        if (currentRes.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Category not found' });
        }
        const currentCat = currentRes.rows[0];

        // Prepare updates
        const updates: any[] = [];
        const values: any[] = [];
        let valIdx = 1;

        if (name !== undefined) {
            updates.push(`name = $${valIdx++}`);
            values.push(name);
        }
        if (sort_order !== undefined) {
            updates.push(`sort_order = $${valIdx++}`);
            values.push(sort_order);
        }
        if (is_active !== undefined) {
            updates.push(`is_active = $${valIdx++}`);
            values.push(is_active);
        }

        // Parent Change Logic
        if (parent_id !== undefined && parent_id !== currentCat.parent_id) {
            if (parent_id === categoryId) {
                return res.status(400).json({ success: false, error: 'Cannot set category as its own parent' });
            }

            let newLevel = 1;
            if (parent_id) {
                const parentRes = await req.db.query('SELECT level FROM menu_categories WHERE id = $1', [parent_id]);
                if (parentRes.rows.length === 0) return res.status(400).json({ success: false, error: 'New parent not found' });
                newLevel = parentRes.rows[0].level + 1;

                if (newLevel > 5) return res.status(400).json({ success: false, error: 'Parent depth too high' });
            }

            updates.push(`parent_id = $${valIdx++}`);
            values.push(parent_id);
            updates.push(`level = $${valIdx++}`);
            values.push(newLevel);
        }

        if (updates.length === 0) {
            return res.json({ success: true, data: currentCat });
        }

        values.push(categoryId);
        // Note: checking user_id in WHERE is good practice even with RLS
        const updateQuery = `
            UPDATE menu_categories 
            SET ${updates.join(', ')}, updated_at = NOW() 
            WHERE id = $${valIdx} 
            RETURNING *`;

        const updateRes = await req.db.query(updateQuery, values);
        res.json({ success: true, data: updateRes.rows[0] });

    } catch (error) {
        console.error('Error updating menu category:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

/**
 * DELETE /api/menu-categories/:id
 */
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, error: 'Unauthorized' });
        }
        const categoryId = req.params.id;

        // Check for children
        const childrenRes = await req.db.query('SELECT id FROM menu_categories WHERE parent_id = $1', [categoryId]);
        if (childrenRes.rows.length > 0) {
            return res.status(400).json({ success: false, error: 'Cannot delete category with sub-categories.' });
        }

        // Check for products
        const productsRes = await req.db.query('SELECT id FROM products WHERE menu_category_id = $1', [categoryId]);
        if (productsRes.rows.length > 0) {
            return res.status(400).json({ success: false, error: 'Cannot delete category containing products.' });
        }

        await req.db.query('DELETE FROM menu_categories WHERE id = $1', [categoryId]);

        res.json({ success: true, message: 'Category deleted' });

    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

export default router;
