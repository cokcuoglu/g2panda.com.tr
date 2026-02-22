
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function listEnums() {
    try {
        const res = await pool.query(`
            SELECT t.typname as enum_name, e.enumlabel as enum_value
            FROM pg_type t 
            JOIN pg_enum e ON t.oid = e.enumtypid  
            JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
            WHERE t.typname IN ('table_type', 'table_status')
        `);
        console.log('--- ENUM VALUES ---');
        res.rows.forEach(r => {
            console.log(`${r.enum_name}: ${r.enum_value}`);
        });
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

listEnums();
