const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

async function checkRLS() {
    try {
        await client.connect();

        // Check RLS status
        const rlsStatus = await client.query(`
            SELECT tablename, rowsecurity 
            FROM pg_tables 
            WHERE tablename = 'transaction_items'
        `);
        console.log('RLS Status:', rlsStatus.rows);

        // Check policies
        const policies = await client.query(`
            SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
            FROM pg_policies 
            WHERE tablename = 'transaction_items'
        `);
        console.log('\nPolicies:');
        policies.rows.forEach(p => {
            console.log(`  - ${p.policyname}`);
            console.log(`    Permissive: ${p.permissive}`);
            console.log(`    Roles: ${p.roles}`);
            console.log(`    Command: ${p.cmd}`);
            console.log(`    USING: ${p.qual}`);
            console.log(`    WITH CHECK: ${p.with_check}`);
        });

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
    }
}

checkRLS();
