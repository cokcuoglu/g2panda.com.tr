const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function run() {
    const ozanId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57'; // ozan.demirci28@gmail.com
    const canerId = 'be8b8541-f427-4287-a00b-a0e9783e5209'; // caner@test.com

    try {
        console.log('--- OZAN BEY DATA RESCUE ---');

        // 1. Restore categories used in Ozan's transactions
        const catRes = await pool.query(`
            UPDATE categories c
            SET user_id = t.user_id
            FROM transactions t
            WHERE c.id = t.category_id
            AND t.user_id = $1
            AND c.user_id <> $1
            RETURNING c.name
        `, [ozanId]);
        console.log(`Restored ${catRes.rowCount} categories to Ozan.`);
        catRes.rows.forEach(r => console.log(`  Category: ${r.name}`));

        // 2. Restore products based on menu_categories (Double check)
        const prodRes = await pool.query(`
            UPDATE products p
            SET user_id = mc.user_id
            FROM menu_categories mc
            WHERE p.menu_category_id = mc.id
            AND mc.user_id = $1
            AND p.user_id <> $1
            RETURNING p.name
        `, [ozanId]);
        console.log(`Restored ${prodRes.rowCount} products to Ozan.`);

        // 3. Restore orders that contain Ozan's products
        // We find products owned by Ozan
        const ozanProds = await pool.query('SELECT id, name FROM products WHERE user_id = $1', [ozanId]);
        const ozanProdNames = ozanProds.rows.map(p => p.name);

        if (ozanProdNames.length > 0) {
            // Find orders whose items contain Ozan's products
            // items is jsonb. We look for array items with name in ozanProdNames
            const orderRes = await pool.query(`
                UPDATE orders
                SET user_id = $1
                WHERE user_id <> $1
                AND items @> ANY($2::jsonb[])
                RETURNING id, table_number
            `, [ozanId, ozanProdNames.map(name => JSON.stringify([{ name }]))]);
            // Note: @> ANY might be tricky with jsonb arrays. 
            // Alternative: use a loop or a better jsonb query.
            console.log(`Restored ${orderRes.rowCount} orders based on product content.`);

            // 4. Restore tables based on these orders
            const ozanTableNumbers = Array.from(new Set(orderRes.rows.map(r => r.table_number).filter(t => t)));
            if (ozanTableNumbers.length > 0) {
                const tableRes = await pool.query(`
                    UPDATE tables
                    SET user_id = $1
                    WHERE user_id <> $1
                    AND name = ANY($2)
                `, [ozanId, ozanTableNumbers]);
                console.log(`Restored ${tableRes.rowCount} tables based on order history.`);
            }
        }

        // 5. Restore channels?
        // Channels don't have a clear link back besides transactions
        const chanRes = await pool.query(`
            UPDATE channels c
            SET user_id = t.user_id
            FROM transactions t
            WHERE c.id = t.channel_id
            AND t.user_id = $1
            AND c.user_id <> $1
            RETURNING c.name
        `, [ozanId]);
        console.log(`Restored ${chanRes.rowCount} channels to Ozan.`);

    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}
run();
