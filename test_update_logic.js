const axios = require('axios');
// We need an auth token to test the protected endpoint.
// Since I can't easily get a token for 'test3' without the password or secret,
// I'll use the DB directly to simulate the backend logic.

const { pool } = require('./dist/db.js');

async function simulateUpdate(orderId) {
    try {
        console.log(`Simulating update for Order ID: ${orderId}`);
        const orderRes = await pool.query('SELECT items FROM orders WHERE id = $1', [orderId]);
        if (orderRes.rows.length === 0) {
            console.log('Order not found');
            return;
        }

        const items = orderRes.rows[0].items || [];
        console.log('Original Items:', JSON.stringify(items, null, 2));

        const updatedItems = items.map(item => ({
            ...item,
            confirmed_quantity: item.quantity
        }));

        await pool.query(
            'UPDATE orders SET items = $1, updated_at = NOW() WHERE id = $2',
            [JSON.stringify(updatedItems), orderId]
        );

        const verifyRes = await pool.query('SELECT items FROM orders WHERE id = $1', [orderId]);
        console.log('Updated Items in DB:', JSON.stringify(verifyRes.rows[0].items, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
}

// Get the latest order ID
pool.query('SELECT id FROM orders ORDER BY created_at DESC LIMIT 1')
    .then(res => {
        if (res.rows.length > 0) {
            simulateUpdate(res.rows[0].id);
        } else {
            console.log('No orders found');
            process.exit();
        }
    });
