import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/inventory/products/:productId/ingredients
router.get('/:productId', async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;

        const result = await req.db.query(`
            SELECT 
                pi.*,
                rm.name as material_name,
                rm.unit
            FROM product_ingredients pi
            JOIN raw_materials rm ON pi.raw_material_id = rm.id
            JOIN products p ON pi.product_id = p.id
            WHERE pi.product_id = $1 AND p.user_id = $2
            ORDER BY rm.name
        `, [productId, req.user!.id]);

        res.json({ success: true, data: result.rows });
    } catch (err) {
        console.error('Get product ingredients error:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch product ingredients' });
    }
});

// POST /api/inventory/products/:productId/ingredients
router.post('/:productId', async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const { raw_material_id, quantity_required } = req.body;

        if (!raw_material_id || !quantity_required || quantity_required <= 0) {
            return res.status(400).json({
                success: false,
                error: 'Raw material ID and positive quantity are required'
            });
        }

        // Verify product belongs to user
        const productCheck = await req.db.query(
            'SELECT id FROM products WHERE id = $1 AND user_id = $2',
            [productId, req.user!.id]
        );

        if (productCheck.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        const result = await req.db.query(`
            INSERT INTO product_ingredients (product_id, raw_material_id, quantity_required)
            VALUES ($1, $2, $3)
            ON CONFLICT (product_id, raw_material_id) 
            DO UPDATE SET quantity_required = $3, updated_at = NOW()
            RETURNING *
        `, [productId, raw_material_id, quantity_required]);

        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error('Create product ingredient error:', err);
        res.status(500).json({ success: false, error: 'Failed to create product ingredient' });
    }
});

// PUT /api/inventory/products/:productId/ingredients/:ingredientId
router.put('/:productId/ingredients/:ingredientId', async (req: Request, res: Response) => {
    try {
        const { productId, ingredientId } = req.params;
        const { quantity_required } = req.body;

        if (!quantity_required || quantity_required <= 0) {
            return res.status(400).json({
                success: false,
                error: 'Positive quantity is required'
            });
        }

        const result = await req.db.query(`
            UPDATE product_ingredients pi
            SET quantity_required = $1, updated_at = NOW()
            FROM products p
            WHERE pi.id = $2 
            AND pi.product_id = $3 
            AND pi.product_id = p.id 
            AND p.user_id = $4
            RETURNING pi.*
        `, [quantity_required, ingredientId, productId, req.user!.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Ingredient not found' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error('Update product ingredient error:', err);
        res.status(500).json({ success: false, error: 'Failed to update product ingredient' });
    }
});

// DELETE /api/inventory/products/:productId/ingredients/:ingredientId
router.delete('/:productId/ingredients/:ingredientId', async (req: Request, res: Response) => {
    try {
        const { productId, ingredientId } = req.params;

        const result = await req.db.query(`
            DELETE FROM product_ingredients pi
            USING products p
            WHERE pi.id = $1 
            AND pi.product_id = $2 
            AND pi.product_id = p.id 
            AND p.user_id = $3
            RETURNING pi.id
        `, [ingredientId, productId, req.user!.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Ingredient not found' });
        }

        res.json({ success: true, message: 'Ingredient deleted' });
    } catch (err) {
        console.error('Delete product ingredient error:', err);
        res.status(500).json({ success: false, error: 'Failed to delete product ingredient' });
    }
});

export default router;
