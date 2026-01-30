
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function run() {
    console.log('--- DEBUG RLS FAILURE ---');
    const client = await pool.connect();
    try {
        await client.query("SET LOCAL ROLE app_user");

        // 1. Check Current User and Role
        const roleRes = await client.query("SELECT current_user, session_user");
        console.log('Current/Session User:', roleRes.rows[0]);

        // 2. Check Role Attributes (bypassrls?)
        // Note: As app_user (non-super), we might not be able to query pg_roles fully, 
        // but let's try or switch back to verify. 
        // We'll switch back for a sec to check attributes.
        await client.query("RESET ROLE");
        const attrRes = await client.query("SELECT rolname, rolsuper, rolbypassrls FROM pg_roles WHERE rolname = 'app_user'");
        console.log('Role Attributes:', attrRes.rows[0]);

        await client.query("SET LOCAL ROLE app_user");

        // 3. Check Setting Value
        const settingRes = await client.query("SELECT current_setting('app.current_user_id', true) as val");
        console.log('current_setting value:', settingRes.rows[0]);

        // 4. Check Policy Definition (as superuser again)
        await client.query("RESET ROLE");
        const policyRes = await client.query("SELECT * FROM pg_policies WHERE tablename = 'products'");
        console.log('Active Policies:', policyRes.rows);

        // 5. Try Query again as app_user
        await client.query("SET LOCAL ROLE app_user");
        const countRes = await client.query("SELECT count(*) FROM products");
        console.log('Row Count seen by app_user (no context):', countRes.rows[0].count);

    } finally {
        client.release();
        await pool.end();
    }
}

run();
