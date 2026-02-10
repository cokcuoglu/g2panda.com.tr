const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function inspectDeep() {
    try {
        console.log('🔍 Listing Policies for categories/channels...');
        const policyRes = await pool.query(`
            SELECT tablename, policyname, cmd, roles, qual 
            FROM pg_policies 
            WHERE tablename IN ('categories', 'channels')
            ORDER BY tablename, policyname;
        `);
        policyRes.rows.forEach(p => {
            console.log(`[${p.tablename}] ${p.policyname} (${p.cmd}): ${p.qual}`);
        });

        const userId = 'be8b8541-f427-4287-a00b-a0e9783e5209'; // ozan.demirci28

        console.log(`\n🔍 Checking Data for User: ${userId}`);
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            // Mock Auth
            await client.query(`SELECT set_config('app.current_user_id', $1, true)`, [userId]);
            await client.query('SET LOCAL ROLE app_user');

            // Check Categories
            const catRes = await client.query('SELECT id, name, type, user_id FROM categories');
            console.log(`\nVisible Categories (${catRes.rows.length}):`);
            catRes.rows.forEach(r => console.log(`- ${r.name} (${r.type}) [User: ${r.user_id}]`));

            // Check Channels
            const chanRes = await client.query('SELECT id, name, type, user_id FROM channels');
            console.log(`\nVisible Channels (${chanRes.rows.length}):`);
            chanRes.rows.forEach(r => console.log(`- ${r.name} (${r.type}) [User: ${r.user_id}]`));

            await client.query('ROLLBACK');
        } finally {
            client.release();
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

inspectDeep();
