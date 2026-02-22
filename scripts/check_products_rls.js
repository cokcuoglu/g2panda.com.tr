const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function run() {
    try {
        console.log('--- Checking RLS on products table ---');
        const res = await pool.query("SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = 'products'");
        console.log('RLS Status:', res.rows);

        const pol = await pool.query("SELECT * FROM pg_policies WHERE tablename = 'products'");
        console.log('Policies:', JSON.stringify(pol.rows, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}
run();
