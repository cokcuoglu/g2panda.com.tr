const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkTransactions() {
    try {
        console.log('Checking last 5 transactions...');
        const res = await pool.query(`
            SELECT id, description, amount, type, transaction_date, created_at, document_type 
            FROM transactions 
            ORDER BY created_at DESC 
            LIMIT 5
        `);
        console.log(JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

checkTransactions();
