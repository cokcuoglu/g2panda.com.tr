const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function runMigration() {
    const migrationPath = path.join(__dirname, '../database/81_z_reports_table.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    try {
        console.log('Running migration: 81_z_reports_table.sql');
        await pool.query(sql);
        console.log('Migration completed successfully!');
    } catch (err) {
        console.error('Migration failed:', err.message);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

runMigration();
