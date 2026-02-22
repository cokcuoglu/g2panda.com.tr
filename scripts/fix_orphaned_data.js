const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function run() {
    const targetUserId = 'be8b8541-f427-4287-a00b-a0e9783e5209'; // caner@test.com
    try {
        console.log(`Re-assigning everything to ${targetUserId}...`);

        const r1 = await pool.query('UPDATE orders SET user_id = $1 WHERE user_id <> $1', [targetUserId]);
        console.log(`Updated ${r1.rowCount} orders.`);

        const r2 = await pool.query('UPDATE tables SET user_id = $1 WHERE user_id <> $1', [targetUserId]);
        console.log(`Updated ${r2.rowCount} tables.`);

        const r3 = await pool.query('UPDATE products SET user_id = $1 WHERE user_id <> $1', [targetUserId]);
        console.log(`Updated ${r3.rowCount} products.`);

        const r4 = await pool.query('UPDATE categories SET user_id = $1 WHERE user_id <> $1', [targetUserId]);
        console.log(`Updated ${r4.rowCount} categories.`);

    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}
run();
