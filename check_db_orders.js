const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkOrders() {
    try {
        const res = await pool.query(`
            SELECT id, order_number, order_type, total_amount, base_amount, discount_amount, created_at, items::text as items_str
            FROM orders 
            ORDER BY created_at DESC 
            LIMIT 5
        `);
        console.log('Latest Orders (JSON):');
        console.log(JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error('Query failed:', err.message);
    } finally {
        await pool.end();
    }
}

checkOrders();
