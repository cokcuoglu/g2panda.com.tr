const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function run() {
    const test3Id = 'be8b8541-f427-4287-a00b-a0e9783e5209';
    try {
        console.log('--- Investigating all products for test3 ---');
        const res = await pool.query('SELECT id, name, user_id, is_active FROM products WHERE user_id = $1', [test3Id]);
        console.log(`Total found (superuser): ${res.rows.length}`);

        const ids = res.rows.map(r => r.id);

        // Check which ones are visible under RLS
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            await client.query("SELECT set_config('app.current_user_id', $1, true)", [test3Id]);
            await client.query('SET LOCAL ROLE app_user');

            const visible = await client.query('SELECT id FROM products');
            const visibleIds = new Set(visible.rows.map(r => r.id));

            console.log(`Visible under RLS: ${visibleIds.size}`);

            const hidden = res.rows.filter(r => !visibleIds.has(r.id));
            console.log(`Hidden: ${hidden.length}`);

            if (hidden.length > 0) {
                console.log('Sample hidden products:', hidden.slice(0, 5));
            }

            await client.query('ROLLBACK');
        } finally {
            client.release();
        }

    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}
run();
