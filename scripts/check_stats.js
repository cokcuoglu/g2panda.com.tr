const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkStats() {
    try {
        const res = await pool.query('SELECT count(*) FROM users');
        console.log('Total users:', res.rows[0].count);

        const recentRes = await pool.query('SELECT email, created_at FROM users ORDER BY created_at DESC LIMIT 5');
        console.log('Recent users:', JSON.stringify(recentRes.rows, null, 2));
    } catch (err) {
        console.error('Error querying database:', err);
    } finally {
        await pool.end();
    }
}

checkStats();
