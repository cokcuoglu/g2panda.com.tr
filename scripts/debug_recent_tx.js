const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkRecentTransactions() {
    const client = await pool.connect();
    try {
        console.log('Checking last 5 transactions...');

        const res = await client.query(`
            SELECT id, type, amount, transaction_date, description, ocr_record_id, created_at
            FROM transactions 
            WHERE deleted_at IS NULL
            ORDER BY created_at DESC 
            LIMIT 5
        `);

        console.table(res.rows);

        if (res.rows.length > 0) {
            const lastTx = res.rows[0];
            console.log('Last Transaction Details:', JSON.stringify(lastTx, null, 2));

            if (lastTx.ocr_record_id) {
                console.log(`Checking OCR Record ${lastTx.ocr_record_id}...`);
                const ocrRes = await client.query('SELECT * FROM ocr_records WHERE id = $1', [lastTx.ocr_record_id]);
                console.log('OCR Record:', ocrRes.rows[0]);
            }
        } else {
            console.log('No recent transactions found.');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        pool.end();
    }
}

checkRecentTransactions();
