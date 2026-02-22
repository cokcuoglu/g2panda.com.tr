const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkSchema() {
    try {
        console.log('--- Transactions Table Schema ---');
        const res = await pool.query(`
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns 
            WHERE table_name = 'transactions' 
            ORDER BY ordinal_position
        `);
        console.table(res.rows);

        const hasOcrColumn = res.rows.some(r => r.column_name === 'ocr_record_id');
        console.log(`\nocr_record_id column exists: ${hasOcrColumn}`);

    } catch (err) {
        console.error('ERROR:', err.message);
    } finally {
        await pool.end();
    }
}

checkSchema();
