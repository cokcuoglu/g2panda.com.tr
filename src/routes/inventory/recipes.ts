import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/inventory/recipes/:productId
router.get('/:productId', async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;

        const result = await req.db.query(`
            SELECT 
                pr.id,
                pr.raw_material_id,
                rm.name as raw_material_name,
                pr.quantity,
                rm.unit,
                COALESCE(AVG(se.unit_price), 0) as unit_price,
                COALESCE(AVG(se.unit_price), 0) * pr.quantity as cost
            FROM product_recipes pr
            JOIN raw_materials rm ON pr.raw_material_id = rm.id
            LEFT JOIN raw_material_stock_entries se ON rm.id = se.raw_material_id AND se.unit_price IS NOT NULL
            WHERE pr.product_id = $1 AND pr.user_id = $2
            GROUP BY pr.id, pr.raw_material_id, rm.name, pr.quantity, rm.unit
            ORDER BY rm.name
        `, [productId, req.user!.id]);

        res.json({ success: true, data: result.rows });
    } catch (err) {
        console.error('Get recipe error:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch recipe' });
    }
});

// POST /api/inventory/recipes
router.post('/', async (req: Request, res: Response) => {
    try {
        const { product_id, recipes } = req.body;

        if (!product_id || !recipes || !Array.isArray(recipes)) {
            return res.status(400).json({
                success: false,
                error: 'Product ID and recipes array are required'
            });
        }

        // Verify product belongs to user
        const productCheck = await req.db.query(`
            SELECT id FROM products WHERE id = $1 AND user_id = $2
        `, [product_id, req.user!.id]);

        if (productCheck.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        // Delete existing recipes for this product
        await req.db.query(`
            DELETE FROM product_recipes WHERE product_id = $1 AND user_id = $2
        `, [product_id, req.user!.id]);

        // Insert new recipes
        const insertedRecipes = [];
        for (const recipe of recipes) {
            if (!recipe.raw_material_id || !recipe.quantity || recipe.quantity <= 0) {
                continue; // Skip invalid entries
            }

            const result = await req.db.query(`
                INSERT INTO product_recipes (user_id, product_id, raw_material_id, quantity)
                VALUES ($1, $2, $3, $4)
                RETURNING *
            `, [req.user!.id, product_id, recipe.raw_material_id, recipe.quantity]);

            insertedRecipes.push(result.rows[0]);
        }

        res.status(201).json({ success: true, data: insertedRecipes });
    } catch (err) {
        console.error('Create recipe error:', err);
        res.status(500).json({ success: false, error: 'Failed to create recipe' });
    }
});

// DELETE /api/inventory/recipes/:id
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await req.db.query(`
            DELETE FROM product_recipes
            WHERE id = $1 AND user_id = $2
            RETURNING id
        `, [id, req.user!.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Recipe item not found' });
        }

        res.json({ success: true, message: 'Recipe item deleted' });
    } catch (err) {
        console.error('Delete recipe error:', err);
        res.status(500).json({ success: false, error: 'Failed to delete recipe item' });
    }
});

export default router;
