const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function verifyConstraints() {
    const client = await pool.connect();
    try {
        console.log('🔍 Verifying DB Constraints (v2) with valid Foreign Keys');

        let userId = 'be8b8541-f427-4287-a00b-a0e9783e5209';
        const userRes = await client.query('SELECT id FROM users LIMIT 1');
        if (userRes.rows.length > 0) {
            userId = userRes.rows[0].id;
        }
        console.log(`👤 Using User ID: ${userId}`);

        // Fetch valid category (expense type)
        const catRes = await client.query("SELECT id, name FROM categories WHERE type = 'expense' LIMIT 1");
        if (catRes.rows.length === 0) throw new Error('No expense categories found!');
        const categoryId = catRes.rows[0].id;
        console.log(`📂 Using Category: ${catRes.rows[0].name} (${categoryId})`);

        // Fetch valid channel
        const chanRes = await client.query("SELECT id, name FROM channels LIMIT 1");
        if (chanRes.rows.length === 0) throw new Error('No channels found!');
        const channelId = chanRes.rows[0].id;
        console.log(`💳 Using Channel: ${chanRes.rows[0].name} (${channelId})`);

        await client.query('BEGIN');

        console.log('\n🧪 Test 1: Inserting "Sabit" expense (No invoice_number, no items)...');
        try {
            const fixedRes = await client.query(`
                INSERT INTO transactions (
                    user_id, category_id, channel_id, type, amount, transaction_date, description, 
                    expense_type, document_type, is_tax_deductible, invoice_number
                ) 
                VALUES ($1, $2, $3, 'expense', 100.00, NOW(), 'Rent Payment Test', 
                        'fixed', 'receipt', true, NULL)
                RETURNING id, expense_type
            `, [userId, categoryId, channelId]);
            console.log('✅ Success! Inserted:', fixedRes.rows[0]);
        } catch (innerErr) {
            console.error('❌ Insert Failed Test 1:', innerErr.message);
            throw innerErr;
        }

        console.log('\n🧪 Test 2: Inserting "Özel" expense (Personal, no invoice #)...');
        try {
            const personalRes = await client.query(`
                INSERT INTO transactions (
                    user_id, category_id, channel_id, type, amount, transaction_date, description, 
                    expense_type, document_type, is_tax_deductible, invoice_number
                ) 
                 VALUES ($1, $2, $3, 'expense', 50.00, NOW(), 'Personal Lunch Test', 
                        'personal', 'receipt', false, NULL)
                RETURNING id, expense_type
            `, [userId, categoryId, channelId]);
            console.log('✅ Success! Inserted:', personalRes.rows[0]);
        } catch (innerErr) {
            console.error('❌ Insert Failed Test 2:', innerErr.message);
            throw innerErr;
        }

        await client.query('ROLLBACK');
        console.log('\n🔄 Rolled back all test transactions.');
        console.log('✨ Verification Complete!');

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('❌ Verification Failed Main Block:', err.message);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

verifyConstraints();
