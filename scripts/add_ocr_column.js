const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function addMissingColumn() {
    try {
        console.log('🔧 Adding missing ocr_record_id column to transactions table...');

        // Add the column
        await pool.query(`
            ALTER TABLE transactions 
            ADD COLUMN IF NOT EXISTS ocr_record_id UUID REFERENCES ocr_records(id) ON DELETE SET NULL
        `);
        console.log('✅ Column added successfully');

        // Create index
        await pool.query(`
            CREATE INDEX IF NOT EXISTS transactions_ocr_idx ON transactions(ocr_record_id)
        `);
        console.log('✅ Index created successfully');

        // Verify
        const res = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'transactions' AND column_name = 'ocr_record_id'
        `);

        if (res.rows.length > 0) {
            console.log('✅ Verification successful:', res.rows[0]);
        } else {
            console.log('❌ Column not found after migration');
        }

    } catch (err) {
        console.error('❌ Migration failed:', err.message);
        throw err;
    } finally {
        await pool.end();
    }
}

addMissingColumn();
