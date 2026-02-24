const { pool } = require('./dist/db.js');

async function checkOrders() {
    try {
        const res = await pool.query('SELECT id, order_number, table_number, status, items FROM orders WHERE deleted_at IS NULL ORDER BY created_at DESC LIMIT 5');
        console.log('--- RECENT ORDERS ---');
        if (res.rows.length === 0) {
            console.log('No orders found');
            return;
        }
        const order = res.rows[0];
        console.log(`Order: ${order.order_number} | Status: ${order.status}`);
        console.log('Items Raw JSON:');
        console.log(JSON.stringify(order.items, null, 2));
        console.log('-------------------');
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
}

checkOrders();
