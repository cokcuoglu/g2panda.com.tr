const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkConstraints() {
    try {
        console.log('--- Constraints: products ---');
        const consRes = await pool.query(`
            SELECT conname, pg_get_constraintdef(c.oid)
            FROM pg_constraint c
            JOIN pg_namespace n ON n.oid = c.connamespace
            WHERE contype IN ('u', 'p', 'f') AND n.nspname = 'public' AND conrelid = 'products'::regclass
        `);
        console.log(JSON.stringify(consRes.rows, null, 2));

        console.log('\n--- Triggers: products ---');
        const trigRes = await pool.query(`
            SELECT tgname 
            FROM pg_trigger 
            WHERE tgrelid = 'products'::regclass
        `);
        console.log(JSON.stringify(trigRes.rows, null, 2));

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

checkConstraints();
