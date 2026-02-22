const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

async function createTestOrder() {
    try {
        await client.connect();

        // Get first user
        const userRes = await client.query('SELECT id FROM users LIMIT 1');
        if (userRes.rows.length === 0) {
            console.log('No users found');
            return;
        }

        const userId = userRes.rows[0].id;

        // Create a test order from yesterday with completed status
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const result = await client.query(`
            INSERT INTO orders (
                user_id, order_number, table_number, items, total_amount, 
                status, created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `, [
            userId,
            'TEST-' + Date.now(),
            'Masa 5',
            JSON.stringify([
                { name: 'Test Ürün 1', quantity: 2, price: 50 },
                { name: 'Test Ürün 2', quantity: 1, price: 30 }
            ]),
            130,
            'completed',
            yesterday
        ]);

        console.log('✅ Test order created:', result.rows[0].order_number);
        console.log('Created at:', result.rows[0].created_at);
        console.log('\nNow you can test archiving by running:');
        console.log('POST /api/orders/archive-daily');

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await client.end();
    }
}

createTestOrder();
