const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function run() {
    try {
        const users = await pool.query('SELECT id, email, role FROM users');
        console.log('--- ALL USERS ---');
        users.rows.forEach(u => console.log(`${u.id} | ${u.email} | ${u.role}`));

        const productsCount = await pool.query('SELECT user_id, COUNT(*) as count FROM products GROUP BY user_id');
        console.log('--- PRODUCTS BY USER_ID ---');
        productsCount.rows.forEach(p => console.log(`${p.user_id}: ${p.count}`));

        const categoriesCount = await pool.query('SELECT user_id, COUNT(*) as count FROM categories GROUP BY user_id');
        console.log('--- CATEGORIES BY USER_ID ---');
        categoriesCount.rows.forEach(c => console.log(`${c.user_id}: ${c.count}`));

    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}
run();
