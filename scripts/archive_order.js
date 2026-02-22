const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

async function archiveOrder() {
    try {
        await client.connect();

        const orderNumber = 'ORD-759307-3';

        // Find and archive the order
        const result = await client.query(`
            UPDATE orders 
            SET archived_at = NOW()
            WHERE order_number = $1
            RETURNING id, order_number, created_at, status, archived_at
        `, [orderNumber]);

        if (result.rows.length === 0) {
            console.log(`❌ Order ${orderNumber} not found`);
        } else {
            const order = result.rows[0];
            console.log(`✅ Order archived successfully:`);
            console.log(`   Order Number: ${order.order_number}`);
            console.log(`   Created: ${order.created_at}`);
            console.log(`   Status: ${order.status}`);
            console.log(`   Archived: ${order.archived_at}`);
        }

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await client.end();
    }
}

archiveOrder();
