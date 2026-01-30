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
        process.exit(1);
    }
}

async function deploy() {
    try {
        await runSqlFile('10_final_rls_enforcement.sql');
        console.log('Final RLS enforcement applied successfully!');
    } catch (err) {
        console.error('Deployment failed:', err);
    } finally {
        await pool.end();
    }
}

deploy();
