import { Router, Request, Response } from 'express';
import { withTransaction } from '../../db';

const router = Router();

// POST /api/inventory/produce
router.post('/', async (req: Request, res: Response) => {
    try {
        const { intermediate_id, quantity_to_produce } = req.body;

        if (!intermediate_id || !quantity_to_produce || quantity_to_produce <= 0) {
            return res.status(400).json({ success: false, error: 'Invalid production parameters' });
        }

        let productionResult = null;

        await withTransaction(req.user!.id, async (client) => {
            // 1. Verify intermediate product exists
            const intermediateRes = await client.query(
                'SELECT * FROM raw_materials WHERE id = $1 AND user_id = $2 AND is_intermediate = true AND deleted_at IS NULL',
                [intermediate_id, req.user!.id]
            );

            if (intermediateRes.rows.length === 0) {
                throw new Error('Ara ürün bulunamadı.');
            }
            const intermediateItem = intermediateRes.rows[0];

            // 2. Fetch recipe for this intermediate product
            const recipeRes = await client.query(
                'SELECT raw_material_id, quantity FROM intermediate_recipes WHERE intermediate_id = $1 AND user_id = $2',
                [intermediate_id, req.user!.id]
            );

            if (recipeRes.rows.length === 0) {
                throw new Error('Bu ara ürünün reçetesi bulunamadı. Lütfen önce reçete tanımlayın.');
            }

            const recipe = recipeRes.rows;
            let totalCost = 0;

            // 3. For each recipe item, deduct from stock using FIFO and calculate total cost
            for (const item of recipe) {
                const totalRequired = Number(item.quantity) * Number(quantity_to_produce);
                let remainingToDeduct = totalRequired;

                // Lock raw materials for update to prevent race conditions during FIFO
                const stockRes = await client.query(
                    `
                    SELECT * FROM raw_material_stock_entries
                    WHERE raw_material_id = $1 AND user_id = $2 AND remaining_quantity > 0
                    ORDER BY entry_date ASC
                    FOR UPDATE
                    `,
                    [item.raw_material_id, req.user!.id]
                );

                let availableStock = stockRes.rows.reduce((sum, entry) => sum + Number(entry.remaining_quantity), 0);

                if (availableStock < totalRequired) {
                    const rawMaterialNameRes = await client.query('SELECT name FROM raw_materials WHERE id = $1', [item.raw_material_id]);
                    const rawName = rawMaterialNameRes.rows[0]?.name || 'Bilinmeyen Hammadde';
                    throw new Error(`Yetersiz stok: ${rawName}. Gereken: ${totalRequired}, Mevcut: ${availableStock}`);
                }

                for (const entry of stockRes.rows) {
                    if (remainingToDeduct <= 0) break;

                    const deductAmount = Math.min(Number(entry.remaining_quantity), remainingToDeduct);

                    await client.query(
                        'UPDATE raw_material_stock_entries SET remaining_quantity = remaining_quantity - $1 WHERE id = $2',
                        [deductAmount, entry.id]
                    );

                    totalCost += deductAmount * Number(entry.unit_price || 0);
                    remainingToDeduct -= deductAmount;
                }
            }

            // 4. Create a new stock entry for the produced intermediate product
            const unitPrice = totalCost / Number(quantity_to_produce);

            const insertRes = await client.query(
                `
                INSERT INTO raw_material_stock_entries 
                (user_id, raw_material_id, quantity, remaining_quantity, unit_price, entry_date, notes)
                VALUES ($1, $2, $3, $4, $5, NOW(), $6)
                RETURNING *
                `,
                [
                    req.user!.id,
                    intermediate_id,
                    quantity_to_produce,
                    quantity_to_produce,
                    unitPrice,
                    `Üretim (Miktar: ${quantity_to_produce})`
                ]
            );

            productionResult = insertRes.rows[0];
        });

        res.status(201).json({
            success: true,
            message: 'Üretim başarıyla tamamlandı.',
            data: productionResult
        });

    } catch (err: any) {
        console.error('Produce error:', err);
        res.status(500).json({ success: false, error: err.message || 'Üretim sırasında bir hata oluştu.' });
    }
});

export default router;
