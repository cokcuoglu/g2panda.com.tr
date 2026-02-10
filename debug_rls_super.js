const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('sslmode=require') ? { rejectUnauthorized: false } : false
});

async function debugSuper() {
    let client;
    try {
        const userId = 'be8b8541-f427-4287-a00b-a0e9783e5209'; // test3
        console.log(`Debug for User: ${userId}`);

        client = await pool.connect();

        // 1. Check Table RLS Status
        const rlsStatus = await client.query(`
            SELECT relname, relrowsecurity, relforcerowsecurity 
            FROM pg_class 
            WHERE relname IN ('products', 'categories', 'channels')
        `);
        console.log('--- RLS STATUS ---');
        console.table(rlsStatus.rows);

        // 2. Check app_user Role Attributes
        const roleStatus = await client.query(`
            SELECT rolname, rolsuper, rolinherit, rolcreaterole, rolcreatedb, rolcanlogin, rolreplication, rolbypassrls 
            FROM pg_roles 
            WHERE rolname = 'app_user'
        `);
        console.log('--- ROLE STATUS (app_user) ---');
        console.table(roleStatus.rows);

        // 3. Compare Categories
        // A. Superuser fetch
        const superCats = await pool.query('SELECT id, name, user_id, created_at FROM categories WHERE user_id = $1 ORDER BY created_at', [userId]);
        console.log(`[Superuser] Total Categories: ${superCats.rows.length}`);

        // B. RLS fetch
        await client.query(`SELECT set_config('app.current_user_id', $1, true)`, [userId]);
        await client.query('SET LOCAL ROLE app_user');

        const rlsCats = await client.query('SELECT id, name, user_id, created_at FROM categories');
        console.log(`[RLS] Visible Categories: ${rlsCats.rows.length}`);

        // Find matched and unmatched
        const visibleIds = new Set(rlsCats.rows.map(r => r.id));
        const hiddenCats = superCats.rows.filter(r => !visibleIds.has(r.id));

        if (rlsCats.rows.length > 0) {
            console.log('[RLS] Visible Sample:', JSON.stringify(rlsCats.rows[0], null, 2));
        }
        if (hiddenCats.length > 0) {
            console.log('[RLS] HIDDEN Sample:', JSON.stringify(hiddenCats[0], null, 2));
        }

        // 4. Compare Channels (Why 114?)
        const rlsChans = await client.query('SELECT count(*) FROM channels');
        console.log(`[RLS] Visible Channels: ${rlsChans.rows[0].count}`);

    } catch (err) {
        console.error(err);
    } finally {
        if (client) client.release();
        pool.end();
    }
}

debugSuper();
