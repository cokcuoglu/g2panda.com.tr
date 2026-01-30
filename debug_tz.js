const { pool } = require('./src/db');

async function checkRoleConfig() {
    try {
        console.log('--- ROLE CONFIGURATION ---');

        // Check role attributes
        const roleRes = await pool.query(`
            SELECT rolname, rolsuper, rolinherit, rolcreaterole, rolcreatedb, 
                   rolcanlogin, rolreplication, rolbypassrls, rolconnlimit
            FROM pg_roles 
            WHERE rolname IN ('app_user', 'postgres')
        `);
        console.log('Role Attributes:');
        console.log(JSON.stringify(roleRes.rows, null, 2));

        // Check if FORCE RLS is enabled
        const rlsRes = await pool.query(`
            SELECT schemaname, tablename, rowsecurity
            FROM pg_tables 
            WHERE tablename = 'transactions'
        `);
        console.log('\nRLS Status:');
        console.log(JSON.stringify(rlsRes.rows, null, 2));

        // Check the actual policy definition
        const policyRes = await pool.query(`
            SELECT policyname, roles, cmd, qual, with_check
            FROM pg_policies 
            WHERE tablename = 'transactions'
        `);
        console.log('\nPolicy Definition:');
        console.log(JSON.stringify(policyRes.rows, null, 2));

    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

checkRoleConfig();
