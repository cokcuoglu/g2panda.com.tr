const { pool } = require('./src/db');

async function deepDiveRLS() {
    const userId = 'a3dbd896-7640-4228-86d4-83e9783e5209';
    const client = await pool.connect();
    try {
        console.log('=== DEEP DIVE: RLS POLICY EVALUATION ===\n');

        await client.query('BEGIN');
        await client.query(`SELECT set_config('app.current_user_id', $1, true)`, [userId]);
        await client.query('SET LOCAL ROLE app_user');

        // Test 1: What does the policy see?
        console.log('1. Testing what the policy condition evaluates to:');
        const policyEval = await client.query(`
            SELECT 
                user_id,
                current_setting('app.current_user_id', true) as raw_setting,
                current_setting('app.current_user_id', true) IS NULL as setting_is_null,
                current_setting('app.current_user_id', true) = '' as setting_is_empty,
                current_setting('app.current_user_id', true)::uuid as setting_as_uuid,
                user_id = current_setting('app.current_user_id', true)::uuid as direct_comparison
            FROM transactions
            WHERE user_id = $1
            LIMIT 1
        `, [userId]);

        if (policyEval.rows.length > 0) {
            const row = policyEval.rows[0];
            console.log(`   user_id: ${row.user_id}`);
            console.log(`   raw_setting: "${row.raw_setting}"`);
            console.log(`   setting_is_null: ${row.setting_is_null}`);
            console.log(`   setting_is_empty: ${row.setting_is_empty}`);
            console.log(`   setting_as_uuid: ${row.setting_as_uuid}`);
            console.log(`   direct_comparison: ${row.direct_comparison}`);
        } else {
            console.log('   NO ROWS RETURNED - RLS blocked the query!');
        }

        // Test 2: Try with RLS disabled temporarily
        console.log('\n2. Temporarily disabling RLS to see the data:');
        await client.query('ROLLBACK');
        await client.query('BEGIN');

        // Re-enable RLS first
        await client.query('ALTER TABLE transactions ENABLE ROW LEVEL SECURITY');

        // Now test as superuser (should bypass RLS)
        const superTest = await client.query(`
            SELECT COUNT(*) as count
            FROM transactions
            WHERE user_id = $1
        `, [userId]);
        console.log(`   As superuser: ${superTest.rows[0].count} transactions`);

        // Now test as app_user with context
        await client.query(`SELECT set_config('app.current_user_id', $1, true)`, [userId]);
        await client.query('SET LOCAL ROLE app_user');

        const appTest = await client.query(`
            SELECT COUNT(*) as count
            FROM transactions
        `);
        console.log(`   As app_user with context: ${appTest.rows[0].count} transactions`);

        await client.query('ROLLBACK');
    } catch (err) {
        console.error('Error:', err.message);
        await client.query('ROLLBACK');
    } finally {
        client.release();
        pool.end();
    }
}

deepDiveRLS();
