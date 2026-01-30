const { pool } = require('./src/db');

async function testCaseStatement() {
    const userId = 'a3dbd896-7640-4228-86d4-83e9783e5209';
    const client = await pool.connect();
    try {
        console.log('=== TESTING CASE STATEMENT IN RLS POLICY ===\n');

        await client.query('BEGIN');
        await client.query(`SELECT set_config('app.current_user_id', $1, true)`, [userId]);
        await client.query('SET LOCAL ROLE app_user');

        // Test the CASE statement directly
        const caseTest = await client.query(`
            SELECT 
                current_setting('app.current_user_id', true) as setting_value,
                current_setting('app.current_user_id', true) IS NULL as is_null,
                current_setting('app.current_user_id', true) = '' as is_empty,
                CASE 
                    WHEN current_setting('app.current_user_id', true) IS NULL OR current_setting('app.current_user_id', true) = '' 
                    THEN false
                    ELSE true
                END as case_result
        `);

        console.log('CASE statement evaluation:');
        console.log(`  Setting value: "${caseTest.rows[0].setting_value}"`);
        console.log(`  IS NULL: ${caseTest.rows[0].is_null}`);
        console.log(`  IS EMPTY: ${caseTest.rows[0].is_empty}`);
        console.log(`  CASE result: ${caseTest.rows[0].case_result}`);

        // Now test the full policy condition
        const policyTest = await client.query(`
            SELECT 
                user_id,
                current_setting('app.current_user_id', true)::uuid as setting_as_uuid,
                user_id = current_setting('app.current_user_id', true)::uuid as direct_match,
                CASE 
                    WHEN current_setting('app.current_user_id', true) IS NULL OR current_setting('app.current_user_id', true) = '' 
                    THEN false
                    ELSE user_id = current_setting('app.current_user_id', true)::uuid
                END as policy_result
            FROM transactions
            WHERE user_id = $1
            LIMIT 1
        `, [userId]);

        if (policyTest.rows.length > 0) {
            console.log('\nPolicy condition evaluation:');
            console.log(`  user_id: ${policyTest.rows[0].user_id}`);
            console.log(`  Setting as UUID: ${policyTest.rows[0].setting_as_uuid}`);
            console.log(`  Direct match: ${policyTest.rows[0].direct_match}`);
            console.log(`  Policy result: ${policyTest.rows[0].policy_result}`);
        } else {
            console.log('\nNo rows returned - RLS is blocking!');
        }

        await client.query('ROLLBACK');
    } catch (err) {
        console.error('Error:', err.message);
        console.error(err.stack);
        await client.query('ROLLBACK');
    } finally {
        client.release();
        pool.end();
    }
}

testCaseStatement();
