const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function run() {
    const ozanId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';
    const canerId = 'be8b8541-f427-4287-a00b-a0e9783e5209';

    try {
        console.log('--- IMPROVED OZAN BEY DATA RESCUE ---');

        // 1. Restore categories from transactions
        const catRes = await pool.query(`
            UPDATE categories c
            SET user_id = t.user_id
            FROM transactions t
            WHERE c.id = t.category_id
              AND t.user_id = $1
              AND c.user_id <> $1
            RETURNING c.name
        `, [ozanId]);
        console.log(`Restored ${catRes.rowCount} categories.`);

        // 2. Restore products based on menu_categories (just in case some were missed)
        const prodRes = await pool.query(`
            UPDATE products p
            SET user_id = mc.user_id
            FROM menu_categories mc
            WHERE p.menu_category_id = mc.id
              AND mc.user_id = $1
              AND p.user_id <> $1
            RETURNING p.name
        `, [ozanId]);
        console.log(`Restored ${prodRes.rowCount} products.`);

        // 3. Restore orders based on product names
        // First, get all Ozan product names
        const ozanProdRes = await pool.query('SELECT name FROM products WHERE user_id = $1', [ozanId]);
        const ozanProdNames = ozanProdRes.rows.map(p => p.name);
        console.log(`Ozan has ${ozanProdNames.length} products to match against orders.`);

        if (ozanProdNames.length > 0) {
            // Restore orders where ANY item name matches one of Ozan's products
            // Using a subquery for matching items
            const orderRes = await pool.query(`
                UPDATE orders o
                SET user_id = $1
                WHERE o.user_id <> $1
                  AND EXISTS (
                    SELECT 1 FROM jsonb_array_elements(o.items) as item
                    WHERE item->>'name' = ANY($2)
                  )
                RETURNING id, table_number
            `, [ozanId, ozanProdNames]);
            console.log(`Restored ${orderRes.rowCount} orders based on item content.`);

            // 4. Restore tables based on these orders
            const tableNumbers = Array.from(new Set(orderRes.rows.map(r => r.table_number).filter(t => t)));
            if (tableNumbers.length > 0) {
                const tableRes = await pool.query(`
                    UPDATE tables
                    SET user_id = $1
                    WHERE user_id <> $1
                      AND name = ANY($2)
                `, [ozanId, tableNumbers]);
                console.log(`Restored ${tableRes.rowCount} tables.`);
            }
        }

    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}
run();
