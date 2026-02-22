const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function findUsers() {
    try {
        const res = await pool.query("SELECT email FROM users WHERE LOWER(email) = 'ozan.demirci28@gmail.com'");
        console.log('Matching users:', res.rows);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

findUsers();
