const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function run() {
    try {
        console.log('--- RESTORING OWNERSHIP ---');

        // 1. Restore Product Owners from Menu Categories
        const prodRes = await pool.query(`
            UPDATE products p
            SET user_id = mc.user_id
            FROM menu_categories mc
            WHERE p.menu_category_id = mc.id
              AND p.user_id <> mc.user_id
            RETURNING p.name, mc.user_id
        `);
        console.log(`Restored ${prodRes.rowCount} products to their category owners.`);
        prodRes.rows.forEach(r => {
            console.log(`  Product: ${r.name} -> ${r.user_id}`);
        });

        // 2. Restore Table Owners from historical Transactions
        // Find tables that were used in transactions by other users
        const tableRes = await pool.query(`
            UPDATE tables t
            SET user_id = sub.user_id
            FROM (
                SELECT DISTINCT table_id, user_id
                FROM transactions
                WHERE table_id IS NOT NULL
            ) sub
            WHERE t.id = sub.table_id
              AND t.user_id <> sub.user_id
            RETURNING t.name, sub.user_id
        `);
        console.log(`\nRestored ${tableRes.rowCount} tables to their transaction owners.`);
        tableRes.rows.forEach(r => {
            console.log(`  Table: ${r.name} -> ${r.user_id}`);
        });

        // 3. Restore Order Owners from Tables
        const orderRes = await pool.query(`
            UPDATE orders o
            SET user_id = t.user_id
            FROM tables t
            WHERE o.table_id = t.id
              AND o.user_id <> t.user_id
            RETURNING o.id, t.user_id
        `);
        console.log(`\nRestored ${orderRes.rowCount} orders to their table owners.`);

        // 4. Restore Transaction Owners from Tables (if table_id exists)
        const transRes = await pool.query(`
            UPDATE transactions tr
            SET user_id = t.user_id
            FROM tables t
            WHERE tr.table_id = t.id
              AND tr.user_id <> t.user_id
            RETURNING tr.id, t.user_id
        `);
        console.log(`\nRestored ${transRes.rowCount} transactions to their table owners.`);

    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}
run();
