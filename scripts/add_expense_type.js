
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function migrate() {
    try {
        console.log('Adding expense_type column to transactions table...');
        await pool.query(`
            ALTER TABLE transactions 
            ADD COLUMN IF NOT EXISTS expense_type VARCHAR(50);
        `);
        console.log('Column added successfully.');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await pool.end();
    }
}

migrate();
