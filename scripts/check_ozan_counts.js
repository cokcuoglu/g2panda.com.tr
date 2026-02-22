const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function run() {
    const ozanId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';
    try {
        const tables = ['products', 'categories', 'menu_categories', 'orders', 'tables', 'transactions'];
        console.log(`Checking counts for Ozan (${ozanId}):`);
        for (const t of tables) {
            const res = await pool.query(`SELECT COUNT(*) FROM ${t} WHERE user_id = $1`, [ozanId]);
            console.log(`${t}: ${res.rows[0].count}`);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}
run();
