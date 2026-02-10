
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function migrate() {
    try {
        console.log('Adding commission_rate column to channels table...');
        await pool.query(`
            ALTER TABLE channels 
            ADD COLUMN IF NOT EXISTS commission_rate DECIMAL(5,2) DEFAULT 0;
        `);
        console.log('Column added successfully.');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await pool.end();
    }
}

migrate();
