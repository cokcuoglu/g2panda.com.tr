const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function check(id, name) {
    const p = await pool.query('SELECT is_active, COUNT(*) FROM products WHERE user_id = $1 GROUP BY is_active', [id]);
    const c = await pool.query('SELECT is_active, COUNT(*) FROM menu_categories WHERE user_id = $1 GROUP BY is_active', [id]);
    console.log(`${name} -> Products: ${JSON.stringify(p.rows)} | Categories: ${JSON.stringify(c.rows)}`);
}

async function run() {
    await check('e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Ozan');
    await check('be8b8541-f427-4287-a00b-a0e9783e5209', 'test3');
    await pool.end();
}
run();
