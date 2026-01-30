const { pool } = require('./src/db');

async function checkPolicyDefinition() {
    try {
        console.log('--- CURRENT RLS POLICY FOR TRANSACTIONS ---\n');

        const res = await pool.query(`
            SELECT 
                schemaname,
                tablename,
                policyname,
                permissive,
                roles,
                cmd,
                qual,
                with_check
            FROM pg_policies 
            WHERE tablename = 'transactions'
        `);

        if (res.rows.length > 0) {
            const policy = res.rows[0];
            console.log(`Policy Name: ${policy.policyname}`);
            console.log(`Permissive: ${policy.permissive}`);
            console.log(`Roles: ${policy.roles}`);
            console.log(`Command: ${policy.cmd}`);
            console.log(`\nUSING clause (qual):`);
            console.log(policy.qual);
            console.log(`\nWITH CHECK clause:`);
            console.log(policy.with_check);
        } else {
            console.log('No RLS policy found for transactions table!');
        }

    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

checkPolicyDefinition();
