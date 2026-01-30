const { pool } = require('./src/db');

async function testSettingAccess() {
    const userId = 'a3dbd896-7640-4228-86d4-83e9783e5209';
    const client = await pool.connect();
    try {
        console.log('=== TESTING current_setting ACCESS ===\n');

        await client.query('BEGIN');

        // As superuser
        await client.query(`SELECT set_config('app.current_user_id', $1, true)`, [userId]);
        const super1 = await client.query(`SELECT current_setting('app.current_user_id', true) as val`);
        console.log(`1. As superuser AFTER set: "${super1.rows[0].val}"`);

        // Switch to app_user
        await client.query('SET LOCAL ROLE app_user');

        // Try to read as app_user
        const app1 = await client.query(`SELECT current_setting('app.current_user_id', true) as val`);
        console.log(`2. As app_user AFTER role switch: "${app1.rows[0].val}"`);

        // Try to set as app_user
        try {
            await client.query(`SELECT set_config('app.current_user_id', $1, true)`, ['test-value']);
            const app2 = await client.query(`SELECT current_setting('app.current_user_id', true) as val`);
            console.log(`3. As app_user AFTER set attempt: "${app2.rows[0].val}"`);
        } catch (err) {
            console.log(`3. app_user CANNOT set config: ${err.message}`);
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

testSettingAccess();
