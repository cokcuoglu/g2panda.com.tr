const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('sslmode=require') ? { rejectUnauthorized: false } : false
});

async function runMigration() {
    try {
        const MIGRATION_FILE = path.join(__dirname, 'database', '35_fix_orders_rls_and_transactions.sql');
        const sql = fs.readFileSync(MIGRATION_FILE, 'utf8');
        console.log(`Running migration from ${MIGRATION_FILE}...`);
        await pool.query(sql);
        console.log('Migration SUCCESS');
    } catch (err) {
        console.error('Migration FAILED:', err);
    } finally {
        pool.end();
    }
}

runMigration();
