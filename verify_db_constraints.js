const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function verifyConstraints() {
    const client = await pool.connect();
    try {
        console.log('🔍 Verifying DB Constraints for New Expense Types');

        let userId = 'be8b8541-f427-4287-a00b-a0e9783e5209';
        const userRes = await client.query('SELECT id FROM users LIMIT 1');
        if (userRes.rows.length > 0) {
            userId = userRes.rows[0].id;
        }
        console.log(`👤 Using User ID: ${userId}`);

        await client.query('BEGIN');

        console.log('\n🧪 Test 1: Inserting "Sabit" expense (No invoice_number, no items)...');
        // Providing category_id and channel_id as defaults if needed, or null
        // Note: category_id and channel_id are often nullable but might be enforced?
        // Let's try sending keys but with NULL implies nullable.

        try {
            const fixedRes = await client.query(`
                INSERT INTO transactions (
                    user_id, type, amount, transaction_date, description, 
                    expense_type, document_type, is_tax_deductible, invoice_number
                ) 
                VALUES ($1, 'expense', 100.00, NOW(), 'Rent Payment Test', 'fixed', 'receipt', true, NULL)
                RETURNING id
            `, [userId]);
            console.log('✅ Success! Inserted:', fixedRes.rows[0]);
        } catch (innerErr) {
            console.error('❌ Insert Failed Details:', {
                message: innerErr.message,
                column: innerErr.column,
                constraint: innerErr.constraint,
                detail: innerErr.detail,
                table: innerErr.table
            });
            throw innerErr;
        }

        console.log('\n🧪 Test 2: Inserting "Özel" expense (Personal)...');

        try {
            const personalRes = await client.query(`
                INSERT INTO transactions (
                    user_id, type, amount, transaction_date, description, 
                    expense_type, document_type, is_tax_deductible, invoice_number
                ) 
                VALUES ($1, 'expense', 50.00, NOW(), 'Personal Lunch Test', 'personal', 'receipt', false, NULL)
                RETURNING id
            `, [userId]);
            console.log('✅ Success! Inserted:', personalRes.rows[0]);
        } catch (innerErr) {
            console.error('❌ Insert Failed Details:', {
                message: innerErr.message,
                column: innerErr.column,
                constraint: innerErr.constraint,
                detail: innerErr.detail,
                table: innerErr.table
            });
            throw innerErr;
        }

        await client.query('ROLLBACK');
        console.log('\n🔄 Rolled back all test transactions.');

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('❌ Verification Failed Main Block');
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

verifyConstraints();
