const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkNotNull() {
    try {
        console.log('🔍 Listing MANDATORY columns for "transactions"...');
        const res = await pool.query(`
            SELECT column_name, data_type, column_default
            FROM information_schema.columns 
            WHERE table_name = 'transactions' 
            AND is_nullable = 'NO'
            ORDER BY ordinal_position;
        `);

        console.table(res.rows);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

checkNotNull();
