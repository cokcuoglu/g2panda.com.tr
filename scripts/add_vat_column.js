const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function migrate() {
    try {
        console.log('Starting migration...');
        await pool.query(`ALTER TABLE ocr_records ADD COLUMN IF NOT EXISTS extracted_vat NUMERIC(15,2);`);
        console.log('Migration successful: extracted_vat column added to ocr_records.');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await pool.end();
    }
}

migrate();
