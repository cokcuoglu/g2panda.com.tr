const { Pool } = require('pg');
require('dotenv').config();
const fs = require('fs');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function run() {
    const users = [
        { id: 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', name: 'Ozan' },
        { id: 'be8b8541-f427-4287-a00b-a0e9783e5209', name: 'test3' }
    ];

    try {
        const results = [];
        for (const user of users) {
            const client = await pool.connect();
            try {
                await client.query('BEGIN');
                await client.query("SELECT set_config('app.current_user_id', $1, true)", [user.id]);
                await client.query('SET LOCAL ROLE app_user');

                const catRes = await client.query('SELECT id, name, user_id, is_active FROM menu_categories');
                const prodRes = await client.query('SELECT id, name, user_id, is_active FROM products');

                results.push({
                    user: user.name,
                    id: user.id,
                    categories: catRes.rows,
                    products: prodRes.rows
                });

                await client.query('ROLLBACK');
            } finally {
                client.release();
            }
        }
        fs.writeFileSync('scripts/internal_sim_out.json', JSON.stringify(results, null, 2));
        console.log('Results written to scripts/internal_sim_out.json');
    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}
run();
