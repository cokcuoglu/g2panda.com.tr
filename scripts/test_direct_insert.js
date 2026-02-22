const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

async function testDirectInsert() {
    try {
        await client.connect();

        // Get a user ID
        const userRes = await client.query('SELECT id FROM auth_users LIMIT 1');
        const userId = userRes.rows[0].id;

        console.log('User ID:', userId);

        // Try to insert a transaction
        const txRes = await client.query(`
            INSERT INTO transactions (
                user_id, type, amount, transaction_date, description, expense_type
            ) VALUES ($1, $2, $3, NOW(), $4, $5)
            RETURNING id
        `, [userId, 'expense', 100, 'Test Transaction', 'operational']);

        const txId = txRes.rows[0].id;
        console.log('Transaction created:', txId);

        // Try to insert an item with unit
        await client.query(`
            INSERT INTO transaction_items (
                transaction_id, name, quantity, unit, total_price
            ) VALUES ($1, $2, $3, $4, $5)
        `, [txId, 'Test Item', 2, 'adet', 100]);

        console.log('Item inserted successfully!');

        // Cleanup
        await client.query('DELETE FROM transaction_items WHERE transaction_id = $1', [txId]);
        await client.query('DELETE FROM transactions WHERE id = $1', [txId]);
        console.log('Cleanup done.');

    } catch (err) {
        console.error('Error:', err.message);
        console.error('Detail:', err.detail);
        console.error('Code:', err.code);
    } finally {
        await client.end();
    }
}

testDirectInsert();
