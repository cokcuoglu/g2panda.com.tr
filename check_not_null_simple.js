const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkNotNull() {
    try {
        console.log('🔍 Listing MANDATORY columns (No Default, Not Null)...');
        const res = await pool.query(`
            SELECT column_name
            FROM information_schema.columns 
            WHERE table_name = 'transactions' 
            AND is_nullable = 'NO'
            AND column_default IS NULL
            ORDER BY ordinal_position;
        `);

        res.rows.forEach(r => console.log(`- ${r.column_name}`));
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

checkNotNull();
