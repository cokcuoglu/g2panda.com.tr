import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function testOcrExpense() {
    const client = await pool.connect();
    try {
        console.log('Creating Test Expense with OCR linkage...');
        await client.query('BEGIN');
        await client.query('SET LOCAL ROLE app_user');
        // Use a dummy user ID or existing one if possible
        // Actually for this test I will just use the pool directly to simulate API behavior, assuming permissions are fine in this script context (it runs as superuser unless ROLE is set, but here I set it).
        // Wait, app_user needs permissions.

        // Let's first ensure we have a valid category and channel
        const catRes = await client.query("SELECT id FROM categories WHERE type='expense' LIMIT 1");
        const chanRes = await client.query("SELECT id FROM channels LIMIT 1");

        if (catRes.rows.length === 0 || chanRes.rows.length === 0) {
            console.log('Missing category or channel for test.');
            return;
        }

        // Create dummy OCR records
        const ocrRes = await client.query("INSERT INTO ocr_records (status, detected_amount) VALUES ('confirmed', 123.45) RETURNING id");
        const ocrId = ocrRes.rows[0].id;

        // Insert Transaction
        // mimicking transactions.js logic
        const query = `
          INSERT INTO transactions (
            category_id, channel_id, type, amount, transaction_date, description, ocr_record_id, expense_type, document_type
          )
          VALUES ($1, $2, 'expense', 123.45, CURRENT_DATE, 'Test OCR Expense', $3, 'operational', 'receipt')
          RETURNING id, type, amount, ocr_record_id
        `;

        const txRes = await client.query(query, [catRes.rows[0].id, chanRes.rows[0].id, ocrId]);
        console.log('Transaction Created:', txRes.rows[0]);

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Test Failed:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

testOcrExpense();
