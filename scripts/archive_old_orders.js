const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

async function archiveOldOrders() {
    try {
        await client.connect();

        // Archive all orders before 12.02.2026
        const result = await client.query(`
            UPDATE orders 
            SET archived_at = NOW()
            WHERE archived_at IS NULL
            AND DATE(created_at) < '2026-02-12'
            RETURNING id, order_number, created_at, status
        `);

        console.log(`✅ Archived ${result.rows.length} orders from before 12.02.2026\n`);

        if (result.rows.length > 0) {
            console.log('Archived orders:');
            result.rows.forEach((order, idx) => {
                console.log(`${idx + 1}. ${order.order_number} - ${new Date(order.created_at).toLocaleDateString('tr-TR')} - ${order.status}`);
            });
        }

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await client.end();
    }
}

archiveOldOrders();
