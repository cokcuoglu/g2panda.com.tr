const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkRLS() {
    try {
        console.log('--- Table Schema: products ---');
        const schemaRes = await pool.query(`
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_name = 'products'
        `);
        console.log(JSON.stringify(schemaRes.rows, null, 2));

        console.log('\n--- RLS Policies: products ---');
        const policyRes = await pool.query(`
            SELECT policyname, permissive, roles, cmd, qual, with_check
            FROM pg_policies
            WHERE tablename = 'products'
        `);
        console.log(JSON.stringify(policyRes.rows, null, 2));

        console.log('\n--- User Metadata for Ozan ---');
        const ozanEmail = 'ozan.demirci28@gmail.com';
        const userRes = await pool.query("SELECT id, email, role FROM users WHERE LOWER(email) = LOWER($1)", [ozanEmail]);
        console.log(JSON.stringify(userRes.rows, null, 2));

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

checkRLS();
