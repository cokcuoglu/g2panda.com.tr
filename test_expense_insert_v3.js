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

        await client.query('BEGIN');

        // 1. Get/Create Valid Category
        let catRes = await client.query('SELECT id FROM categories WHERE user_id = $1 LIMIT 1', [userId]);
        let catId = catRes.rows[0]?.id;

        if (!catId) {
            console.log('Creating Test Category...');
            const newCat = await client.query(`
                INSERT INTO categories (user_id, name, type, color, expense_type) 
                VALUES ($1, 'Test Expense Cat', 'expense', '#ff0000', 'other') 
                RETURNING id
            `, [userId]);
            catId = newCat.rows[0].id;
        }
        console.log(`✅ Using Category ID: ${catId}`);

        // 2. Get/Create Valid Channel
        let chanRes = await client.query('SELECT id FROM channels WHERE user_id = $1 LIMIT 1', [userId]);
        let chanId = chanRes.rows[0]?.id;

        if (!chanId) {
            console.log('Creating Test Channel...');
            const newChan = await client.query(`
                INSERT INTO channels (user_id, name, type) 
                VALUES ($1, 'Test Channel', 'cash') 
                RETURNING id
            `, [userId]);
            chanId = newChan.rows[0].id;
        }
        console.log(`✅ Using Channel ID: ${chanId}`);

        // 3. Try to Insert a Test Expense (Full)
        console.log('\n🧪 Testing Expense Insertion (Full)...');

        const insertRes = await client.query(`
            INSERT INTO transactions (
                user_id, category_id, channel_id, type, amount, transaction_date, description, 
                expense_type, document_type, is_tax_deductible
            ) 
            VALUES ($1, $2, $3, 'expense', 10.00, NOW(), 'Test Expense Check', 'other', 'receipt', true)
            RETURNING id, document_type, amount, is_tax_deductible
        `, [userId, catId, chanId]);

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
