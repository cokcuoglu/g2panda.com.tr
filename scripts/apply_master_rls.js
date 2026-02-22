const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function applyRLS() {
    try {
        console.log('Applying Master RLS Enforcement...');
        const sql = fs.readFileSync(path.join(__dirname, '../database/99_master_rls_enforcement.sql'), 'utf8');
        await pool.query(sql);
        console.log('SUCCESS: RLS enforced on all tables.');
    } catch (err) {
        console.error('FAILED to apply RLS:', err);
    } finally {
        await pool.end();
    }
}

applyRLS();
