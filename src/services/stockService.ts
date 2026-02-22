import { PoolClient } from 'pg';

/**
 * Deduct stock for a completed order using FIFO (First In, First Out) logic
 * @param orderId - The order ID that was completed
 * @param client - Database client (transaction-aware)
 */
export async function deductStockForOrder(orderId: string, userId: string, client: PoolClient) {
    try {
        // Get all items in the order
        const orderItemsResult = await client.query(`
            SELECT oi.product_id, oi.quantity
            FROM order_items oi
            WHERE oi.order_id = $1
        `, [orderId]);

        if (orderItemsResult.rows.length === 0) {
            console.log(`[Stock] No items found for order ${orderId}`);
            return;
        }

        console.log(`[Stock] Processing ${orderItemsResult.rows.length} items for order ${orderId}`);

        // For each product in the order
        for (const item of orderItemsResult.rows) {
            const { product_id, quantity } = item;

            // Get the recipe (ingredients) for this product
            const ingredientsResult = await client.query(`
                SELECT pi.raw_material_id, pi.quantity_required, rm.name, rm.unit
                FROM product_ingredients pi
                JOIN raw_materials rm ON pi.raw_material_id = rm.id
                WHERE pi.product_id = $1
            `, [product_id]);

            if (ingredientsResult.rows.length === 0) {
                console.log(`[Stock] No recipe defined for product ${product_id}, skipping stock deduction`);
                continue;
            }

            // Deduct each ingredient
            for (const ingredient of ingredientsResult.rows) {
                const totalNeeded = ingredient.quantity_required * quantity;
                await deductRawMaterial(
                    ingredient.raw_material_id,
                    totalNeeded,
                    userId,
                    'sale',
                    orderId,
                    `Order ${orderId} - ${ingredient.name}`,
                    client
                );
            }
        }

        console.log(`[Stock] Successfully deducted stock for order ${orderId}`);
    } catch (err) {
        console.error(`[Stock] Error deducting stock for order ${orderId}:`, err);
        throw err;
    }
}

/**
 * Deduct raw material stock using FIFO logic
 * @param rawMaterialId - The raw material to deduct
 * @param quantityNeeded - Amount to deduct
 * @param userId - User ID
 * @param referenceType - Type of reference (sale, waste, etc.)
 * @param referenceId - ID of the reference (order_id, etc.)
 * @param notes - Optional notes
 * @param client - Database client
 */
async function deductRawMaterial(
    rawMaterialId: string,
    quantityNeeded: number,
    userId: string,
    referenceType: string,
    referenceId: string,
    notes: string,
    client: PoolClient
) {
    let remainingToDeduct = quantityNeeded;

    // Get stock entries in FIFO order (oldest first, then by expiration date)
    const stockEntriesResult = await client.query(`
        SELECT id, remaining_quantity, expiration_date
        FROM raw_material_stock_entries
        WHERE raw_material_id = $1 
        AND user_id = $2
        AND remaining_quantity > 0
        ORDER BY 
            entry_date ASC,
            COALESCE(expiration_date, '9999-12-31'::date) ASC
    `, [rawMaterialId, userId]);

    if (stockEntriesResult.rows.length === 0) {
        console.warn(`[Stock] No stock available for raw material ${rawMaterialId}`);
        // Still record the movement as negative stock
        await recordStockMovement(
            rawMaterialId,
            null,
            -quantityNeeded,
            0,
            userId,
            referenceType,
            referenceId,
            `${notes} (INSUFFICIENT STOCK)`,
            client
        );
        return;
    }

    // Deduct from entries using FIFO
    for (const entry of stockEntriesResult.rows) {
        if (remainingToDeduct <= 0) break;

        const deductFromThis = Math.min(entry.remaining_quantity, remainingToDeduct);
        const newRemaining = entry.remaining_quantity - deductFromThis;

        // Update the stock entry
        await client.query(`
            UPDATE raw_material_stock_entries
            SET remaining_quantity = $1
            WHERE id = $2
        `, [newRemaining, entry.id]);

        // Record the movement
        const totalStockResult = await client.query(`
            SELECT COALESCE(SUM(remaining_quantity), 0) as total
            FROM raw_material_stock_entries
            WHERE raw_material_id = $1 AND user_id = $2
        `, [rawMaterialId, userId]);

        await recordStockMovement(
            rawMaterialId,
            entry.id,
            -deductFromThis,
            parseFloat(totalStockResult.rows[0].total),
            userId,
            referenceType,
            referenceId,
            notes,
            client
        );

        remainingToDeduct -= deductFromThis;
    }

    if (remainingToDeduct > 0) {
        console.warn(`[Stock] Insufficient stock for raw material ${rawMaterialId}. Still needed: ${remainingToDeduct}`);
    }
}

/**
 * Record a stock movement for audit trail
 */
async function recordStockMovement(
    rawMaterialId: string,
    stockEntryId: string | null,
    quantity: number,
    remainingQuantity: number,
    userId: string,
    referenceType: string,
    referenceId: string,
    notes: string,
    client: PoolClient
) {
    await client.query(`
        INSERT INTO stock_movements 
        (user_id, raw_material_id, stock_entry_id, movement_type, quantity, remaining_quantity, reference_type, reference_id, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `, [
        userId,
        rawMaterialId,
        stockEntryId,
        quantity < 0 ? 'out' : 'in',
        Math.abs(quantity),
        remainingQuantity,
        referenceType,
        referenceId,
        notes
    ]);
}
