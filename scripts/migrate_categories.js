const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function runMigration() {
    const client = await pool.connect();
    try {
        console.log('Running migration: 13_category_types.sql');
        const sql = fs.readFileSync(path.join(__dirname, '../database/13_category_types.sql'), 'utf8');
        await client.query(sql);
        console.log('Migration successful.');
    } catch (err) {
        if (err.code === '42701') {
            console.log('Column already exists, skipping.');
        } else {
            console.error('Migration failed:', err);
        }
    } finally {
        client.release();
        pool.end();
    }
}

runMigration();
