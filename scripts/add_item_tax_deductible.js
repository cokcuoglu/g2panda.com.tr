const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function migrate() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        console.log('Adding is_tax_deductible column to transaction_items...');
        await client.query(`
            ALTER TABLE transaction_items 
            ADD COLUMN IF NOT EXISTS is_tax_deductible BOOLEAN DEFAULT TRUE;
        `);
        await client.query('COMMIT');
        console.log('Migration successful!');
    } catch (e) {
        await client.query('ROLLBACK');
        console.error('Migration failed:', e);
    } finally {
        client.release();
        await pool.end();
    }
}

migrate();
