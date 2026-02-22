const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function run() {
    try {
        const res = await pool.query('SELECT id, email, role FROM users');
        console.log('--- USERS START ---');
        res.rows.forEach(u => {
            console.log(`ID: ${u.id} | Email: ${u.email} | Role: ${u.role}`);
        });
        console.log('--- USERS END ---');
    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}
run();
