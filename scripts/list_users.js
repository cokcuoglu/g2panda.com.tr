const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function listUsers() {
    try {
        const res = await pool.query('SELECT id, full_name, email, role FROM users');
        console.log('--- All Users ---');
        console.log(JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error('ERROR:', err.message);
    } finally {
        await pool.end();
    }
}

listUsers();
