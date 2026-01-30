const { pool } = require('./src/db');

async function testRLS() {
    const userId = 'a3dbd896-7640-4228-86d4-83e9783e5209';
    const client = await pool.connect();
    try {
        console.log(`--- RLS FULL TEST (WITH CONTEXT) ---`);

        await client.query('BEGIN');

        // Set context FIRST
        await client.query(`SELECT set_config('app.current_user_id', $1, true)`, [userId]);

        // Then switch role
        await client.query('SET LOCAL ROLE app_user');

        // Verify context is still set
        const ctx = await client.query(`SELECT current_setting('app.current_user_id', true) as val`);
        console.log(`Context after role switch: "${ctx.rows[0].val}"`);

        // Check visibility
        const res = await client.query('SELECT COUNT(*) FROM transactions');
        console.log(`Transactions visible: ${res.rows[0].count}`);

        // Try to get sum
        const sumRes = await client.query(`SELECT SUM(amount) FROM transactions WHERE type = 'income' AND deleted_at IS NULL`);
        console.log(`Sum of income: ${sumRes.rows[0].sum}`);

        await client.query('ROLLBACK');
    } catch (err) {
        console.error('RLS Test Error:', err);
        await client.query('ROLLBACK');
    } finally {
        client.release();
        pool.end();
    }
}

testRLS();
