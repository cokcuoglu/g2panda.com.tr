const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function run() {
    try {
        const res = await pool.query("SELECT id, email, full_name, is_active FROM users WHERE id IN ('e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'be8b8541-f427-4287-a00b-a0e9783e5209')");
        console.log(JSON.stringify(res.rows, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}
run();
