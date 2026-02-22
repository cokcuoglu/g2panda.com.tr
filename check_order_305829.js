const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkOrder() {
    try {
        const res = await pool.query(`
            SELECT id, order_number, order_type, total_amount, base_amount, discount_amount, note, created_at 
            FROM orders 
            WHERE order_number = 'ORD-305829-33'
        `);
        console.log('Order Details:');
        console.log(JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error('Query failed:', err.message);
    } finally {
        await pool.end();
    }
}

checkOrder();
