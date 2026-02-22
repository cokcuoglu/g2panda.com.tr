const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function listOrders() {
    try {
        const res = await pool.query(`
            SELECT id, user_id, table_id, table_number, status, total_amount, items, created_at 
            FROM orders 
            WHERE table_id IS NOT NULL 
            ORDER BY created_at DESC 
            LIMIT 10
        `);
        console.log(`Found ${res.rows.length} table orders.`);
        res.rows.forEach(row => {
            console.log(`Order: ${row.id} | User: ${row.user_id} | Table: ${row.table_number} | Status: ${row.status} | Total: ${row.total_amount} | Created: ${row.created_at}`);
            // console.log(`Items JSON: ${JSON.stringify(row.items)}`);
            console.log('---');
        });
    } catch (err) {
        console.error('Error listing orders:', err);
    } finally {
        await pool.end();
    }
}

listOrders();
