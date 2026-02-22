const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkUser(email) {
    try {
        const res = await pool.query('SELECT id, email, full_name, role FROM users WHERE email = $1', [email]);
        if (res.rows.length > 0) {
            console.log('User found:', res.rows[0]);
        } else {
            console.log('User NOT found');
        }
    } catch (err) {
        console.error('Error querying database:', err);
    } finally {
        await pool.end();
    }
}

const targetEmail = 'ozan.demirci28@gmail.com';
checkUser(targetEmail);
