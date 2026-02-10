const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false
});

async function applyMigration() {
    try {
        console.log('Adding commission columns...');
        await pool.query(`
            ALTER TABLE categories
            ADD COLUMN IF NOT EXISTS service_commission_rate NUMERIC(5,2) DEFAULT 0,
            ADD COLUMN IF NOT EXISTS courier_service_rate NUMERIC(5,2) DEFAULT 0;
        `);
        console.log('Columns added successfully.');
    } catch (err) {
        console.error('Error adding columns:', err);
    } finally {
        await pool.end();
    }
}

applyMigration();
