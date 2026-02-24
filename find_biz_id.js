const { pool } = require('./src/db');

async function getBusinessId() {
    try {
        const usersRes = await pool.query('SELECT id, email, business_id FROM users WHERE email LIKE $1 OR full_name LIKE $2', ['%test3%', '%Ozan%']);
        console.log('--- USER DATA ---');
        console.log(JSON.stringify(usersRes.rows, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

getBusinessId();
