const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkRLS() {
    try {
        console.log('--- TABLE RLS STATUS ---');
        const tablesRes = await pool.query(`
            SELECT tablename, rowsecurity 
            FROM pg_tables 
            WHERE schemaname = 'public'
            ORDER BY tablename;
        `);

        for (const row of tablesRes.rows) {
            console.log(`${row.tablename.padEnd(20)}: RLS ${row.rowsecurity ? 'ENABLED' : 'DISABLED'}`);
        }

        console.log('\n--- POLICIES ---');
        const policiesRes = await pool.query(`
            SELECT tablename, policyname, cmd, roles, qual 
            FROM pg_policies 
            WHERE schemaname = 'public'
            ORDER BY tablename, policyname;
        `);

        for (const pol of policiesRes.rows) {
            console.log(`Table: ${pol.tablename}`);
            console.log(`  Policy: ${pol.policyname}`);
            console.log(`  Cmd: ${pol.cmd}, Roles: ${pol.roles}`);
            console.log(`  Qual: ${pol.qual}`);
            console.log('-------------------');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

checkRLS();
