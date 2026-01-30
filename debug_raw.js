const { pool } = require('./src/db');

async function checkRaw() {
    try {
        console.log('--- RAW TRANSACTION CHECK (NO RLS) ---');
        const res = await pool.query('SELECT user_id, COUNT(*) FROM transactions GROUP BY user_id');
        console.log('Transaction counts by user_id:');
        console.log(JSON.stringify(res.rows, null, 2));

        const latest = await pool.query('SELECT id, user_id, amount, created_at FROM transactions ORDER BY created_at DESC LIMIT 3');
        console.log('Latest 3 transactions:');
        console.log(JSON.stringify(latest.rows, null, 2));

    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

checkRaw();
