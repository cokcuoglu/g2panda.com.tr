const { pool } = require('./src/db');

async function cleanRLSTest() {
    const userId = 'a3dbd896-7640-4228-86d4-83e9783e5209';
    const client = await pool.connect();
    try {
        console.log('=== CLEAN RLS TEST ===\n');
        console.log(`Testing with user_id: ${userId}\n`);

        // Test 1: As superuser (should see all)
        const superCount = await client.query('SELECT COUNT(*) FROM transactions WHERE user_id = $1', [userId]);
        console.log(`1. As superuser: ${superCount.rows[0].count} transactions for this user`);

        // Test 2: Set up RLS context and switch to app_user
        await client.query('BEGIN');
        await client.query(`SELECT set_config('app.current_user_id', $1, true)`, [userId]);
        await client.query('SET LOCAL ROLE app_user');

        // Verify context is set
        const ctx = await client.query(`SELECT current_setting('app.current_user_id', true) as val`);
        console.log(`2. Context after role switch: "${ctx.rows[0].val}"`);

        // Test 3: Try to count transactions as app_user
        const appCount = await client.query('SELECT COUNT(*) FROM transactions');
        console.log(`3. As app_user with RLS: ${appCount.rows[0].count} transactions visible`);

        // Test 4: Try to get a specific transaction
        const specific = await client.query('SELECT id, user_id, amount FROM transactions LIMIT 1');
        if (specific.rows.length > 0) {
            console.log(`4. Sample transaction visible:`);
            console.log(`   ID: ${specific.rows[0].id}`);
            console.log(`   user_id: ${specific.rows[0].user_id}`);
            console.log(`   amount: ${specific.rows[0].amount}`);
        } else {
            console.log(`4. No transactions visible (RLS blocked)`);
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

cleanRLSTest();
