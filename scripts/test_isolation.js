const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function run() {
    const ozanId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';
    const canerId = 'be8b8541-f427-4287-a00b-a0e9783e5209';

    const client = await pool.connect();
    try {
        console.log(`--- TESTING ISOLATION FOR OZAN (${ozanId}) ---`);

        await client.query('BEGIN');

        // Simulating the authMiddleware logic
        await client.query(`SELECT set_config('app.current_user_id', $1, true)`, [ozanId]);
        await client.query('SET LOCAL ROLE app_user');

        const tables = ['products', 'categories', 'menu_categories', 'orders', 'transactions', 'tables'];

        for (const table of tables) {
            // Try to count ALL rows (RLS should filter them)
            const countAll = await client.query(`SELECT COUNT(*) FROM ${table}`);

            // Try to selectively find a row belonging to Caner
            const canerRow = await client.query(`SELECT COUNT(*) FROM ${table} WHERE user_id = $1`, [canerId]);

            console.log(`Table: ${table.padEnd(15)} | Total visible: ${countAll.rows[0].count} | Caner's rows visible: ${canerRow.rows[0].count}`);
        }

        await client.query('ROLLBACK');
    } catch (e) {
        console.error('ERROR during isolation test:', e.message);
    } finally {
        client.release();
        await pool.end();
    }
}
run();
