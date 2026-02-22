const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function checkRecentOrders() {
    try {
        const res = await pool.query(`
            SELECT id, table_id, table_number, status, total_amount, created_at 
            FROM orders 
            WHERE status = 'pending' 
            AND created_at > NOW() - INTERVAL '10 minutes' 
            ORDER BY created_at DESC
        `);
        console.log(`Found ${res.rows.length} recent pending orders.`);
        console.log(JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error('Error checking recent orders:', err);
    } finally {
        await pool.end();
    }
}

checkRecentOrders();
