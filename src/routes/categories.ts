import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/categories
router.get('/', async (req: Request, res: Response) => {
    console.log('GET /api/categories received');
    try {
        const { type, expense_type } = req.query;
        console.log('Query params:', { type, expense_type });

        let query = `
            SELECT c.*, 
                   COALESCE((SELECT array_agg(channel_id) FROM category_channels WHERE category_id = c.id), '{}') as form_channel_ids
            FROM categories c
            WHERE c.deleted_at IS NULL 
        `;
        const params: any[] = [];

        if (type) {
            params.push(type);
            query += ` AND c.type = $${params.length}`;
        }

        if (expense_type) {
            params.push(expense_type);
            query += ` AND c.expense_type = $${params.length}`;
        }

        query += ` ORDER BY c.type, c.name`;

        console.log('Executing query:', query, params);

        const result = await req.db.query(query, params);
        console.log(`Found ${result.rows.length} categories`);

        res.json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch categories' });
    }
});

// POST /api/categories
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, type, color, expense_type, default_channel_id, channel_ids } = req.body;

        const query = `
            INSERT INTO categories (name, type, color, user_id, expense_type, default_channel_id) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *
        `;
        const result = await req.db.query(query, [name, type, color, req.user?.id, expense_type || null, default_channel_id || null]);
        const newCategory = result.rows[0];

        // Insert channel links
        if (channel_ids && Array.isArray(channel_ids) && channel_ids.length > 0) {
            const linkValues = channel_ids.map((cid: string) => `('${newCategory.id}', '${cid}')`).join(',');
            await req.db.query(`INSERT INTO category_channels (category_id, channel_id) VALUES ${linkValues}`);
        }

        newCategory.form_channel_ids = channel_ids || [];

        res.status(201).json({
            success: true,
            data: newCategory
        });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ success: false, error: 'Failed to create category' });
    }
});

// PUT /api/categories/:id
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, type, color, expense_type, default_channel_id, channel_ids } = req.body;

        const query = `
            UPDATE categories 
            SET name = $1, type = $2, color = $3, expense_type = $4, default_channel_id = $5, updated_at = NOW()
            WHERE id = $6 AND deleted_at IS NULL
            RETURNING *
        `;

        const result = await req.db.query(query, [name, type, color, expense_type || null, default_channel_id || null, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Category not found' });
        }

        const updatedCategory = result.rows[0];

        // Update links: Delete all then insert new (Simpler)
        await req.db.query(`DELETE FROM category_channels WHERE category_id = $1`, [id]);

        if (channel_ids && Array.isArray(channel_ids) && channel_ids.length > 0) {
            const linkValues = channel_ids.map((cid: string) => `('${id}', '${cid}')`).join(',');
            await req.db.query(`INSERT INTO category_channels (category_id, channel_id) VALUES ${linkValues}`);
        }

        updatedCategory.form_channel_ids = channel_ids || [];

        res.json({
            success: true,
            data: updatedCategory
        });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ success: false, error: 'Failed to update category' });
    }
});

// DELETE /api/categories/:id
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const query = `
            UPDATE categories 
            SET deleted_at = NOW()
            WHERE id = $1 AND deleted_at IS NULL
            RETURNING id
        `;
        const result = await req.db.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Category not found' });
        }

        res.json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ success: false, error: 'Failed to delete category' });
    }
});

export default router;
