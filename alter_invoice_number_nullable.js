const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function runMigration() {
    const client = await pool.connect();
    try {
        console.log('🔄 Migrating: Making "invoice_number" nullable in "transactions" table...');

        await client.query('BEGIN');

        await client.query(`
            ALTER TABLE transactions 
            ALTER COLUMN invoice_number DROP NOT NULL;
        `);

        await client.query('COMMIT');
        console.log('✅ Success! "invoice_number" is now nullable.');

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('❌ Migration Failed:', err.message);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

runMigration();
