const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function run() {
    try {
        const ozanId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';
        const test3Id = 'be8b8541-f427-4287-a00b-a0e9783e5209';

        console.log('--- Ozan Products ---');
        const ozanProds = await pool.query('SELECT name FROM products WHERE user_id = $1 ORDER BY name', [ozanId]);
        ozanProds.rows.forEach(r => console.log(` - ${r.name}`));

        console.log('\n--- test3 Products ---');
        const test3Prods = await pool.query('SELECT name FROM products WHERE user_id = $1 ORDER BY name', [test3Id]);
        test3Prods.rows.forEach(r => console.log(` - ${r.name}`));

    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}
run();
