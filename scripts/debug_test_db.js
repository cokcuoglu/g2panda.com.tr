const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkUsers() {
    const client = await pool.connect();
    try {
        console.log('Checking Users in Test DB...');
        const res = await client.query('SELECT count(*) FROM users');
        console.log('User count:', res.rows[0].count);

        const permRes = await client.query("SELECT has_table_privilege('app_user', 'menu_categories', 'INSERT')");
        console.log('Does app_user have INSERT on menu_categories?', permRes.rows[0].has_table_privilege);

    } catch (err) {
        console.error('Check failed:', err);
    } finally {
        client.release();
        pool.end();
    }
}

checkUsers();
