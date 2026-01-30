const { pool } = require('./src/db');

async function checkUsers() {
    try {
        console.log('--- USER CHECK ---');
        const usersRes = await pool.query('SELECT id, email, full_name FROM users');
        console.log(JSON.stringify(usersRes.rows, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

checkUsers();
