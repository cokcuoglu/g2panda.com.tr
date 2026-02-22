const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const targetUserId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';

async function verifyCounts() {
    try {
        console.log(`Verifying data counts for User ID: ${targetUserId}`);

        const tables = ['users', 'categories', 'products', 'transactions', 'orders'];

        for (const table of tables) {
            const res = await pool.query(`SELECT count(*) FROM ${table} WHERE ${table === 'users' ? 'id' : 'user_id'} = $1`, [targetUserId]);
            console.log(`✅ [${table}] Count: ${res.rows[0].count}`);
        }

    } catch (err) {
        console.error('ERROR:', err.message);
    } finally {
        await pool.end();
    }
}

verifyCounts();
