const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function run() {
    try {
        console.log('--- DATABASE DIAGNOSTIC START ---');

        // 1. List Tables
        const tablesRes = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
        const tables = tablesRes.rows.map(r => r.table_name);
        console.log('Tables in public schema:', tables.join(', '));

        // 2. List Users
        const usersRes = await pool.query('SELECT id, email FROM users');
        console.log('\n--- USERS ---');
        usersRes.rows.forEach(u => console.log(`${u.id} | ${u.email}`));

        // 3. Ownership stats
        for (const tableName of ['products', 'categories', 'orders', 'tables', 'transactions', 'channels']) {
            if (tables.includes(tableName)) {
                const countRes = await pool.query(`SELECT user_id, COUNT(*) as count FROM ${tableName} GROUP BY user_id`);
                console.log(`\n--- OWNERSHIP: ${tableName} ---`);
                countRes.rows.forEach(r => console.log(`${r.user_id}: ${r.count}`));
            }
        }

        // 4. Detailed comparison
        const ozanId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';
        const canerId = 'be8b8541-f427-4287-a00b-a0e9783e5209';

        console.log('\n--- DETAILED COMPARISON ---');
        for (const tableName of ['products', 'categories', 'menu_categories', 'orders', 'tables', 'transactions']) {
            if (tables.includes(tableName)) {
                const ozanCount = await pool.query(`SELECT COUNT(*) FROM ${tableName} WHERE user_id = $1`, [ozanId]);
                const canerCount = await pool.query(`SELECT COUNT(*) FROM ${tableName} WHERE user_id = $1`, [canerId]);
                console.log(`${tableName}: Ozan=${ozanCount.rows[0].count} | Caner=${canerCount.rows[0].count}`);
            }
        }

    } catch (e) {
        console.error('Error during diagnostic:', e);
    } finally {
        await pool.end();
    }
}
run();
