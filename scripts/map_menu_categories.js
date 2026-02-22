const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function run() {
    const ozanId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57'; // ozan.demirci28@gmail.com
    const canerId = 'be8b8541-f427-4287-a00b-a0e9783e5209'; // caner@test.com

    try {
        console.log('--- MAPPING MENU DATA ---');

        // 1. Get Ozan's menu categories
        const catRes = await pool.query('SELECT id, name FROM menu_categories WHERE user_id = $1', [ozanId]);
        const ozanCatIds = catRes.rows.map(r => r.id);
        console.log('Ozan Menu Categories:', catRes.rows);

        if (ozanCatIds.length > 0) {
            // 2. Find products linked to these categories that are now with Caner
            const prodRes = await pool.query(
                'SELECT id, name, user_id FROM products WHERE menu_category_id = ANY($1)',
                [ozanCatIds]
            );
            console.log(`Found ${prodRes.rows.length} products linked to Ozan categories.`);

            prodRes.rows.forEach(p => {
                console.log(`  Product: ${p.name} (Current Owner: ${p.user_id})`);
            });

            // 3. Find transaction-linked categories if any
            const transCatRes = await pool.query(
                "SELECT DISTINCT c.id, c.name FROM categories c JOIN transactions t ON c.id = t.category_id WHERE t.user_id = $1",
                [ozanId]
            );
            console.log('Ozan Transaction Categories:', transCatRes.rows);
        }

        // 4. Tables check
        const tableRes = await pool.query('SELECT id, name, user_id FROM tables WHERE user_id = $1 OR user_id = $2', [ozanId, canerId]);
        console.log('--- TABLES INFO ---');
        tableRes.rows.forEach(t => console.log(`${t.id} | ${t.name} | ${t.user_id}`));

    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}
run();
