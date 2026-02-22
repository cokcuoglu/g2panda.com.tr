const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function resetTable() {
    try {
        // Find Masa 2
        const tableRes = await pool.query("SELECT id FROM tables WHERE name = 'Masa 2' AND deleted_at IS NULL");
        if (tableRes.rows.length > 0) {
            const tableId = tableRes.rows[0].id;
            await pool.query("UPDATE tables SET status = 'available' WHERE id = $1", [tableId]);
            console.log(`Table Masa 2 (${tableId}) set to available.`);
        } else {
            console.log('Masa 2 not found.');
        }
    } catch (err) {
        console.error('Error resetting table:', err);
    } finally {
        await pool.end();
    }
}

resetTable();
