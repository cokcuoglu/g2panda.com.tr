const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function dumpData() {
    const userId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';
    try {
        console.log('--- Categories ---');
        const catRes = await pool.query('SELECT * FROM menu_categories WHERE user_id = $1', [userId]);
        console.log(JSON.stringify(catRes.rows, null, 2));

        console.log('\n--- Products ---');
        const prodRes = await pool.query('SELECT * FROM products WHERE user_id = $1', [userId]);
        console.log(JSON.stringify(prodRes.rows, null, 2));

        console.log('\n--- Normal Categories (Income/Expense) ---');
        const ncRes = await pool.query('SELECT * FROM categories WHERE user_id = $1', [userId]);
        console.log(JSON.stringify(ncRes.rows, null, 2));

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

dumpData();
