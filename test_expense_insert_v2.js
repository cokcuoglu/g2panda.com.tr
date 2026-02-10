const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function testExpense() {
    const client = await pool.connect();
    try {
        const userId = 'be8b8541-f427-4287-a00b-a0e9783e5209'; // ozan.demirci28

        console.log('🔍 Auditing Expenses for User:', userId);

        // 1. Count Existing Expenses
        const countRes = await client.query(`
            SELECT COUNT(*) 
            FROM transactions 
            WHERE user_id = $1 AND type = 'expense' AND deleted_at IS NULL
        `, [userId]);
        console.log(`📊 Existing Expense Count: ${countRes.rows[0].count}`);

        // 2. Try to Insert a Test Expense (Minimal)
        console.log('\n🧪 Testing Expense Insertion (Minimal)...');
        await client.query('BEGIN');

        const insertRes = await client.query(`
            INSERT INTO transactions (
                user_id, category_id, channel_id, type, amount, transaction_date, description, 
                expense_type, document_type, is_tax_deductible
            ) 
            VALUES ($1, NULL, NULL, 'expense', 10.00, NOW(), 'Test Expense Check', 'other', 'receipt', true)
            RETURNING id, document_type, amount, is_tax_deductible
        `, [userId]);

        console.log('✅ Success! Inserted Expense:', insertRes.rows[0]);

        await client.query('ROLLBACK');
        console.log('🔄 Rolled back test transaction.');

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('❌ Failed to insert expense:', err.message);
        if (err.detail) console.error('Error Detail:', err.detail);
        if (err.hint) console.error('Error Hint:', err.hint);
    } finally {
        client.release();
        await pool.end();
    }
}

testExpense();
