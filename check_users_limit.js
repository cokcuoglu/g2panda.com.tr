const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkUserLimit() {
    try {
        console.log('🔍 Fetching one user...');
        const res = await pool.query(`SELECT * FROM users LIMIT 1`);
        if (res.rows.length > 0) {
            console.log('User Keys:', Object.keys(res.rows[0]).join(', '));
            // Also print values for context
            console.log('Sample Values:', Object.values(res.rows[0]).map(v => String(v).substring(0, 50)).join(', '));
        } else {
            console.log('❌ No users found.');
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

checkUserLimit();
