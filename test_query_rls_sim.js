require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const p = new Pool({ connectionString: process.env.DATABASE_URL });

async function run() {
    const client = await p.connect();
    try {
        await client.query('BEGIN');

        const userRes = await client.query("SELECT id FROM users WHERE email='test3@test.com' LIMIT 1");
        const userId = userRes.rows[0].id;

        await client.query(`SELECT set_config('app.current_user_id', $1, true)`, [userId]);
        await client.query('SET LOCAL ROLE app_user');

        const tablesRes = await client.query("SELECT * FROM tables WHERE user_id = $1 AND deleted_at IS NULL ORDER BY created_at ASC", [userId]);
        fs.writeFileSync('tables_rls_db.json', JSON.stringify(tablesRes.rows, null, 2));
        console.log('Saved 2nd query to tables_rls_db.json. Count:', tablesRes.rows.length);

        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        console.error(e);
    } finally {
        client.release();
        p.end();
    }
}
run();
