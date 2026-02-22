const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function run() {
    try {
        const tables = ['orders', 'tables', 'transactions'];
        for (const table of tables) {
            const res = await pool.query('SELECT column_name FROM information_schema.columns WHERE table_name = $1', [table]);
            console.log(`Table: ${table}`);
            console.log(res.rows.map(r => r.column_name).join(', '));
            console.log('---');
        }
    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}
run();
