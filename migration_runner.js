const { pool } = require('./src/db');
const fs = require('fs');
const path = require('path');

async function runMigration() {
    try {
        const sqlPath = path.join(__dirname, 'database', '25_rls_to_public.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');
        console.log(`Running migration from ${sqlPath}...`);
        await pool.query(sql);
        console.log('Migration SUCCESS');
    } catch (err) {
        console.error('Migration FAILED:', err);
    } finally {
        pool.end();
    }
}

runMigration();
