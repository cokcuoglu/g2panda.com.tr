const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkLatest() {
    const client = await pool.connect();
    try {
        console.log('--- ALL Recent Transactions (Last 5) ---');
        const res = await client.query(`
            SELECT id, description, amount, type, expense_type, created_at, deleted_at
            FROM transactions 
            ORDER BY created_at DESC 
            LIMIT 5
        `);
        if (res.rows.length === 0) {
            console.log('No transactions found in the database.');
        } else {
            console.table(res.rows);
        }
    } catch (err) {
        console.error(err);
    } finally {
        client.release();
        pool.end();
    }
}

checkLatest();
