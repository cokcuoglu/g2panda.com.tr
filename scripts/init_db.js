const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function runSqlFile(filename) {
    const filePath = path.join(__dirname, '..', 'database', filename);
    console.log(`Executing ${filename}...`);
    try {
        const sql = fs.readFileSync(filePath, 'utf8');
        await pool.query(sql);
        console.log(`Successfully executed ${filename}`);
    } catch (err) {
        console.error(`Error executing ${filename}:`, err);
        // We might continue or exit depending on error, but let's exit to be safe
        process.exit(1);
    }
}

async function initDb() {
    try {
        await runSqlFile('01_schema.sql');
        // Initializing with test data so the app is usable immediately
        await runSqlFile('03_test_data.sql');
        console.log('Database initialization complete!');
    } catch (err) {
        console.error('Initialization failed:', err);
    } finally {
        await pool.end();
    }
}

initDb();
