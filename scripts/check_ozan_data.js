const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const targetUserId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';

async function checkUserAndContext() {
    try {
        console.log('--- User Existence Check ---');
        const userRes = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [targetUserId]);
        if (userRes.rows.length > 0) {
            console.log('✅ User Ozan exists:', JSON.stringify(userRes.rows[0]));
        } else {
            console.log('❌ User Ozan NOT FOUND in users table!');
        }

        console.log('\n--- Transaction Sample Check ---');
        const txRes = await pool.query('SELECT count(*) FROM transactions WHERE user_id = $1', [targetUserId]);
        console.log(`Total transactions for Ozan: ${txRes.rows[0].count}`);

        if (txRes.rows[0].count > 0) {
            const sampleRes = await pool.query('SELECT id, transaction_date, type, category_id, deleted_at FROM transactions WHERE user_id = $1 LIMIT 5', [targetUserId]);
            console.log('Sample transactions:', JSON.stringify(sampleRes.rows, null, 2));
        }

    } catch (err) {
        console.error('ERROR:', err.message);
    } finally {
        await pool.end();
    }
}

checkUserAndContext();
