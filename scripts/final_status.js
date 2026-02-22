const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function run() {
    const users = [
        { id: 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', name: 'Ozan Bey' },
        { id: 'be8b8541-f427-4287-a00b-a0e9783e5209', name: 'test3' }
    ];

    try {
        for (const user of users) {
            console.log(`\n--- ${user.name} ---`);
            const p = await pool.query('SELECT is_active, COUNT(*) FROM products WHERE user_id = $1 GROUP BY is_active', [user.id]);
            console.log('Products:', p.rows);
            const c = await pool.query('SELECT is_active, COUNT(*) FROM menu_categories WHERE user_id = $1 GROUP BY is_active', [user.id]);
            console.log('Categories:', c.rows);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}
run();
