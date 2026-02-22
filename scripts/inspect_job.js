const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

async function inspectJob() {
    try {
        await client.connect();
        const jobId = '68fb70d2-80a3-429a-9be2-e4fbb32bddde';

        // Check OCR Record
        const recordRes = await client.query('SELECT * FROM ocr_records WHERE id = $1', [jobId]);
        console.log('OCR Record:', JSON.stringify(recordRes.rows[0], null, 2));

        // Check Transaction Items
        const itemsRes = await client.query('SELECT * FROM transaction_items WHERE ocr_record_id = $1', [jobId]);
        console.log('Transaction Items:', JSON.stringify(itemsRes.rows, null, 2));

    } catch (err) {
        console.error('Inspection failed:', err);
    } finally {
        await client.end();
    }
}

inspectJob();
