const { pool } = require('./src/db');

async function testRLSDirectly() {
    const userId = 'a3dbd896-7640-4228-86d4-83e9783e5209';
    const client = await pool.connect();
    try {
        console.log('=== TESTING RLS POLICY EVALUATION ===\n');

        await client.query('BEGIN');
        await client.query(`SELECT set_config('app.current_user_id', $1, true)`, [userId]);
        await client.query('SET LOCAL ROLE app_user');

        // Test 1: Can we read the setting?
        const ctx = await client.query(`SELECT current_setting('app.current_user_id', true) as val`);
        console.log(`1. Context value: "${ctx.rows[0].val}"`);

        // Test 2: Can we cast it to UUID?
        const cast = await client.query(`SELECT current_setting('app.current_user_id', true)::uuid as val`);
        console.log(`2. Cast to UUID: "${cast.rows[0].val}"`);

        // Test 3: What does NULLIF return?
        const nullif = await client.query(`SELECT NULLIF(current_setting('app.current_user_id', true), '') as val`);
        console.log(`3. NULLIF result: "${nullif.rows[0].val}"`);

        // Test 4: What does COALESCE return?
        const coalesce = await client.query(`
            SELECT COALESCE(
                NULLIF(current_setting('app.current_user_id', true), '')::uuid,
                '00000000-0000-0000-0000-000000000000'::uuid
            ) as val
        `);
        console.log(`4. COALESCE result: "${coalesce.rows[0].val}"`);

        // Test 5: Direct comparison
        const direct = await client.query(`
            SELECT user_id, 
                   user_id = $1::uuid as matches_param,
                   user_id = current_setting('app.current_user_id', true)::uuid as matches_setting
            FROM transactions 
            LIMIT 1
        `, [userId]);
        if (direct.rows.length > 0) {
            console.log(`5. Direct comparison:`);
            console.log(`   user_id: ${direct.rows[0].user_id}`);
            console.log(`   Matches param: ${direct.rows[0].matches_param}`);
            console.log(`   Matches setting: ${direct.rows[0].matches_setting}`);
        } else {
            console.log(`5. No rows returned (RLS blocked)`);
        }

        await client.query('ROLLBACK');
    } catch (err) {
        console.error('Error:', err.message);
        await client.query('ROLLBACK');
    } finally {
        client.release();
        pool.end();
    }
}

testRLSDirectly();
