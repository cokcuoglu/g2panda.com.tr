const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkFKs() {
    try {
        console.log('🔍 Checking FK columns...');
        const res = await pool.query(`
            SELECT column_name, is_nullable
            FROM information_schema.columns 
            WHERE table_name = 'transactions' AND column_name IN ('category_id', 'channel_id')
        `);
        console.table(res.rows);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

checkFKs();
