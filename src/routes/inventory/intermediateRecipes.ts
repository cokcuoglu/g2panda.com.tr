import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/inventory/intermediate-recipes/:intermediateId
router.get('/:intermediateId', async (req: Request, res: Response) => {
    try {
        const { intermediateId } = req.params;

        const result = await req.db.query(`
            SELECT 
                ir.id,
                ir.raw_material_id,
                rm.name as raw_material_name,
                ir.quantity,
                rm.unit,
                COALESCE(AVG(se.unit_price), 0) as unit_price,
                COALESCE(AVG(se.unit_price), 0) * ir.quantity as cost
            FROM intermediate_recipes ir
            JOIN raw_materials rm ON ir.raw_material_id = rm.id
            LEFT JOIN raw_material_stock_entries se ON rm.id = se.raw_material_id AND se.unit_price IS NOT NULL
            WHERE ir.intermediate_id = $1 AND ir.user_id = $2
            GROUP BY ir.id, ir.raw_material_id, rm.name, ir.quantity, rm.unit
            ORDER BY rm.name
        `, [intermediateId, req.user!.id]);

        res.json({ success: true, data: result.rows });
    } catch (err) {
        console.error('Get intermediate recipe error:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch intermediate recipe' });
    }
});

// POST /api/inventory/intermediate-recipes
router.post('/', async (req: Request, res: Response) => {
    try {
        const { intermediate_id, recipes } = req.body;

        if (!intermediate_id || !recipes || !Array.isArray(recipes)) {
            return res.status(400).json({
                success: false,
                error: 'Intermediate ID and recipes array are required'
            });
        }

        // Verify intermediate product belongs to user
        const intermediateCheck = await req.db.query(`
            SELECT id FROM raw_materials WHERE id = $1 AND user_id = $2 AND is_intermediate = true
        `, [intermediate_id, req.user!.id]);

        if (intermediateCheck.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Intermediate product not found' });
        }

        // Delete existing recipes for this intermediate product
        await req.db.query(`
            DELETE FROM intermediate_recipes WHERE intermediate_id = $1 AND user_id = $2
        `, [intermediate_id, req.user!.id]);

        // Insert new recipes
        const insertedRecipes = [];
        for (const recipe of recipes) {
            if (!recipe.raw_material_id || !recipe.quantity || recipe.quantity <= 0) {
                continue; // Skip invalid entries
            }

            const result = await req.db.query(`
                INSERT INTO intermediate_recipes (user_id, intermediate_id, raw_material_id, quantity)
                VALUES ($1, $2, $3, $4)
                RETURNING *
            `, [req.user!.id, intermediate_id, recipe.raw_material_id, recipe.quantity]);

            insertedRecipes.push(result.rows[0]);
        }

        res.status(201).json({ success: true, data: insertedRecipes });
    } catch (err) {
        console.error('Create intermediate recipe error:', err);
        res.status(500).json({ success: false, error: 'Failed to create intermediate recipe' });
    }
});

// DELETE /api/inventory/intermediate-recipes/:id
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await req.db.query(`
            DELETE FROM intermediate_recipes
            WHERE id = $1 AND user_id = $2
            RETURNING id
        `, [id, req.user!.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Recipe item not found' });
        }

        res.json({ success: true, message: 'Recipe item deleted' });
    } catch (err) {
        console.error('Delete intermediate recipe error:', err);
        res.status(500).json({ success: false, error: 'Failed to delete recipe item' });
    }
});

export default router;
