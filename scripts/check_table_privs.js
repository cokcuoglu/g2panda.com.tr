const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkTablePrivs() {
    try {
        const tables = ['products', 'menu_categories', 'categories', 'channels', 'users', 'transactions'];
        const privs = ['SELECT', 'INSERT', 'UPDATE', 'DELETE'];

        console.log('--- Privileges for app_user ---');
        for (const table of tables) {
            const results = {};
            for (const priv of privs) {
                const res = await pool.query(`SELECT has_table_privilege('app_user', $1, $2) as has_priv`, [table, priv]);
                results[priv] = res.rows[0].has_priv;
            }
            console.log(`${table}:`, results);
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

checkTablePrivs();
