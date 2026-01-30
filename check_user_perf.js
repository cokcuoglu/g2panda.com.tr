const { pool } = require('./src/db');

async function checkUser(userId) {
    try {
        console.log(`Checking data volume for User: ${userId}`);

        const tables = ['transactions', 'products', 'categories', 'channels', 'fixed_expenses'];

        for (const table of tables) {
            const res = await pool.query(`SELECT COUNT(*) FROM ${table} WHERE user_id = $1`, [userId]);
            console.log(`- ${table}: ${res.rows[0].count}`);
        }

        const userRes = await pool.query('SELECT email, full_name, role FROM users WHERE id = $1', [userId]);
        if (userRes.rows.length > 0) {
            console.log(`User Info: ${userRes.rows[0].email} / ${userRes.rows[0].full_name} (${userRes.rows[0].role})`);
        } else {
            console.log('User not found in DB!');
        }

    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

const targetUserId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';
checkUser(targetUserId);
