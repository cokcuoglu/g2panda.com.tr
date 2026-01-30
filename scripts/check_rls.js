const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'gg_esnaf'
});

async function checkRLS() {
    try {
        await client.connect();

        // Check if RLS is enabled
        const rlsStatus = await client.query(`
            SELECT tablename, rowsecurity 
            FROM pg_tables 
            WHERE schemaname = 'public' 
            AND tablename IN ('menu_categories', 'categories', 'channels', 'products')
            ORDER BY tablename
        `);

        console.log('RLS Status:');
        rlsStatus.rows.forEach(r => {
            console.log(`  ${r.tablename}: ${r.rowsecurity ? 'ENABLED' : 'DISABLED'}`);
        });

        // Check policies
        const policies = await client.query(`
            SELECT tablename, policyname, permissive, cmd 
            FROM pg_policies 
            WHERE tablename IN ('menu_categories', 'categories', 'channels', 'products')
            ORDER BY tablename, policyname
        `);

        console.log('\nRLS Policies:');
        policies.rows.forEach(r => {
            console.log(`  ${r.tablename}.${r.policyname}: ${r.cmd}`);
        });

    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    } finally {
        await client.end();
    }
}

checkRLS();
