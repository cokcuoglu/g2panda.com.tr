const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function run() {
    try {
        const res = await pool.query('SELECT id, email, full_name, role FROM users');
        res.rows.forEach(r => {
            console.log(`ID: ${r.id} | Email: ${r.email} | Name: ${r.full_name} | Role: ${r.role}`);
        });
    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}
run();
