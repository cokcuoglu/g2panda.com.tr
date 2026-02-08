const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function getUser() {
    const userId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';
    try {
        const res = await pool.query('SELECT email, full_name FROM users WHERE id = $1', [userId]);
        if (res.rows.length > 0) {
            console.log(JSON.stringify(res.rows[0]));
        } else {
            console.log('User not found');
        }
    } catch (e) {
        console.error(e);
    } finally {
        pool.end();
    }
}

getUser();
