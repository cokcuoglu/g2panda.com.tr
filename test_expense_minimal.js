const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function testExpenseMinimal() {
    const client = await pool.connect();
    try {
        const userId = 'be8b8541-f427-4287-a00b-a0e9783e5209'; // ozan.demirci28

        console.log('🔍 Minimal Expense Insert Test...');

        await client.query('BEGIN');

        // 1. Get Valid Category
        let catRes = await client.query('SELECT id FROM categories WHERE user_id = $1 LIMIT 1', [userId]);
        let catId = catRes.rows[0]?.id;

        if (!catId) {
            const newCat = await client.query(`
                INSERT INTO categories (user_id, name, type, color, expense_type) 
                VALUES ($1, 'Test Min Cat', 'expense', '#ff0000', 'other') 
                RETURNING id`, [userId]);
            catId = newCat.rows[0].id;
        }

        // 2. Get Valid Channel
        let chanRes = await client.query('SELECT id FROM channels WHERE user_id = $1 LIMIT 1', [userId]);
        let chanId = chanRes.rows[0]?.id;

        if (!chanId) {
            const newChan = await client.query(`
                INSERT INTO channels (user_id, name, type) 
                VALUES ($1, 'Test Min Chan', 'cash') 
                RETURNING id`, [userId]);
            chanId = newChan.rows[0].id;
        }

        console.log(`Using Cat: ${catId}, Chan: ${chanId}`);

        // 3. Insert with ONLY Mandatory Columns
        const insertRes = await client.query(`
            INSERT INTO transactions (
                user_id, category_id, channel_id, type, amount, transaction_date
            ) 
            VALUES ($1, $2, $3, 'expense', 1.00, NOW())
            RETURNING id
        `, [userId, catId, chanId]);

        console.log('✅ Success! Inserted:', insertRes.rows[0]);

        await client.query('ROLLBACK');

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('❌ Failed:', err.message);
    } finally {
        client.release();
        await pool.end();
    }
}

testExpenseMinimal();
