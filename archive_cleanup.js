const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function archiveOldOrders() {
    try {
        console.log('Starting manual archival of old orders...');
        const res = await pool.query(`
            UPDATE orders 
            SET archived_at = NOW()
            WHERE archived_at IS NULL
            AND status IN ('completed', 'rejected', 'cancelled')
            RETURNING id, order_number
        `);
        console.log(`Successfully archived ${res.rows.length} orders.`);
        if (res.rows.length > 0) {
            console.log('Archived Orders:', res.rows.map(o => o.order_number).join(', '));
        }
    } catch (err) {
        console.error('Archival failed:', err.message);
    } finally {
        await pool.end();
    }
}

archiveOldOrders();
