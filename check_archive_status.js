const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkOrders() {
    try {
        const res = await pool.query(`
            SELECT id, order_number, status, archived_at, created_at 
            FROM orders 
            WHERE order_number IN ('ORD-676696-96', 'ORD-498099-75')
        `);
        console.log('Order Details:');
        console.log(JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error('Query failed:', err.message);
    } finally {
        await pool.end();
    }
}

checkOrders();
