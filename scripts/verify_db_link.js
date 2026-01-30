const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function runTest() {
    const client = await pool.connect();
    try {
        console.log('Starting DB Link Verification...');

        // 1. Setup User and Context
        await client.query('BEGIN');

        // Use a fixed UUID for testing or create one
        const userId = '00000000-0000-0000-0000-000000000001'; // Mock ID
        // Create user if not exists (for FKs)
        await client.query(`INSERT INTO users (id, email, password_hash, full_name, role) 
            VALUES ($1, 'test_ocr@example.com', 'hash', 'OCR Tester', 'subscription_user')
            ON CONFLICT (id) DO NOTHING`, [userId]);

        // Set RLS Context
        await client.query('SET LOCAL ROLE app_user');
        await client.query(`SELECT set_config('app.current_user_id', $1, true)`, [userId]);

        // 2. Insert OCR Record
        console.log('Inserting OCR Record...');
        const ocrRes = await client.query(`
            INSERT INTO ocr_records (user_id, image_path, raw_text, status)
            VALUES ($1, 'uploads/test.png', 'SAMPLE TEXT', 'pending')
            RETURNING id
        `, [userId]);
        const ocrId = ocrRes.rows[0].id;
        console.log('OCR Record Created:', ocrId);

        // 3. Insert Transaction with Link
        console.log('Inserting Transaction linked to OCR...');
        // Need category and channel
        const catRes = await client.query(`INSERT INTO categories (name, type, user_id) VALUES ('OCR Cat', 'expense', $1) RETURNING id`, [userId]);
        const chanRes = await client.query(`INSERT INTO channels (name, type, user_id) VALUES ('OCR Wallet', 'payment', $1) RETURNING id`, [userId]);

        const txRes = await client.query(`
            INSERT INTO transactions (user_id, category_id, channel_id, type, amount, transaction_date, description, ocr_record_id)
            VALUES ($1, $2, $3, 'expense', 100, NOW(), 'OCR Transaction', $4)
            RETURNING id, ocr_record_id
        `, [userId, catRes.rows[0].id, chanRes.rows[0].id, ocrId]);

        const tx = txRes.rows[0];
        console.log('Transaction Created:', tx.id);

        if (tx.ocr_record_id === ocrId) {
            console.log('SUCCESS: Transaction is correctly linked to OCR Record.');
        } else {
            console.error('FAILURE: Transaction ocr_record_id mismatch:', tx.ocr_record_id);
        }

        await client.query('ROLLBACK'); // Rollback to keep DB clean
        console.log('Test Finished (Rolled back).');

    } catch (err) {
        console.error('Test Failed:', err);
        await client.query('ROLLBACK');
    } finally {
        client.release();
        pool.end();
    }
}

runTest();
