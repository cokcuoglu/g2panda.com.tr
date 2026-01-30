const { pool } = require('./src/db');

async function checkPolicyRoles() {
    try {
        console.log('=== CHECKING RLS POLICY ROLES ===\n');

        // Get the policy details
        const policy = await pool.query(`
            SELECT 
                policyname,
                roles,
                cmd,
                permissive,
                qual,
                with_check
            FROM pg_policies 
            WHERE tablename = 'transactions'
        `);

        if (policy.rows.length > 0) {
            const p = policy.rows[0];
            console.log(`Policy Name: ${p.policyname}`);
            console.log(`Applies to roles: ${p.roles}`);
            console.log(`Command: ${p.cmd}`);
            console.log(`Permissive: ${p.permissive}`);
            console.log(`\nUSING clause:`);
            console.log(p.qual);
            console.log(`\nWITH CHECK clause:`);
            console.log(p.with_check);
        }

        // Check if there are multiple policies
        const allPolicies = await pool.query(`
            SELECT policyname, roles
            FROM pg_policies 
            WHERE tablename = 'transactions'
        `);

        console.log(`\n\nTotal policies on transactions table: ${allPolicies.rows.length}`);
        allPolicies.rows.forEach((p, i) => {
            console.log(`  ${i + 1}. ${p.policyname} (roles: ${p.roles})`);
        });

    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

checkPolicyRoles();
