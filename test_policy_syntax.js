const { pool } = require('./src/db');

async function testPolicyCreation() {
    try {
        console.log('=== TESTING POLICY CREATION SYNTAX ===\n');

        // Test 1: Create a test table
        await pool.query(`
            DROP TABLE IF EXISTS test_rls_table CASCADE;
            CREATE TABLE test_rls_table (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID NOT NULL,
                data TEXT
            );
        `);
        console.log('1. Created test table');

        // Test 2: Enable RLS
        await pool.query('ALTER TABLE test_rls_table ENABLE ROW LEVEL SECURITY');
        console.log('2. Enabled RLS');

        // Test 3: Create policy with TO clause
        await pool.query(`
            CREATE POLICY test_policy ON test_rls_table
                FOR ALL
                TO app_user, public
                USING (user_id = current_setting('app.current_user_id', true)::uuid)
        `);
        console.log('3. Created policy with TO app_user, public');

        // Test 4: Check what roles the policy applies to
        const check = await pool.query(`
            SELECT policyname, roles
            FROM pg_policies
            WHERE tablename = 'test_rls_table'
        `);
        console.log(`4. Policy applies to roles: ${check.rows[0].roles}`);

        // Test 5: Try without TO clause
        await pool.query('DROP POLICY test_policy ON test_rls_table');
        await pool.query(`
            CREATE POLICY test_policy2 ON test_rls_table
                FOR ALL
                USING (user_id = current_setting('app.current_user_id', true)::uuid)
        `);

        const check2 = await pool.query(`
            SELECT policyname, roles
            FROM pg_policies
            WHERE tablename = 'test_rls_table'
        `);
        console.log(`5. Policy without TO clause applies to roles: ${check2.rows[0].roles}`);

        // Cleanup
        await pool.query('DROP TABLE test_rls_table CASCADE');
        console.log('\n6. Cleaned up test table');

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        pool.end();
    }
}

testPolicyCreation();
