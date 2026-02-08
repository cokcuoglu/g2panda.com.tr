const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkCount() {
    const userId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';
    try {
        const res = await pool.query(`
      SELECT COUNT(*) 
      FROM transactions 
      WHERE user_id = $1 
      AND created_at >= '2026-01-31 00:00:00'
    `, [userId]);
        console.log(`COUNT: ${res.rows[0].count}`);
    } catch (e) {
        console.error(e);
    } finally {
        pool.end();
    }
}

checkCount();
