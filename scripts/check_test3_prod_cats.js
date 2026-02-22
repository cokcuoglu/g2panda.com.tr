const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function run() {
    const userId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57'; // Ozan Bey
    try {
        const res = await pool.query('SELECT name, menu_category_id, is_active FROM products WHERE user_id = $1', [userId]);
        require('fs').writeFileSync('scripts/test3_prod_cats_v2.json', JSON.stringify(res.rows, null, 2), 'utf8');
        console.log('Saved to scripts/test3_prod_cats_v2.json');
    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}
run();
