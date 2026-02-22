const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function run() {
    const ozanId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';
    try {
        console.log('--- RESTORING TABLES FROM TRANSACTIONS ---');

        // 1. Find all table_ids used in Ozan's transactions
        // Wait, I need to check if table_id exists in transactions.
        // My previous check failed. I'll check all columns of transactions first.
        const colRes = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'transactions'");
        const columns = colRes.rows.map(r => r.column_name);
        console.log('Transactions columns:', columns.join(', '));

        if (columns.includes('table_id')) {
            const res = await pool.query(`
                UPDATE tables t
                SET user_id = sub.user_id
                FROM (
                    SELECT DISTINCT table_id, user_id
                    FROM transactions
                    WHERE table_id IS NOT NULL AND user_id = $1
                ) sub
                WHERE t.id = sub.table_id
                  AND t.user_id <> $1
                RETURNING t.name
            `, [ozanId]);
            console.log(`Restored ${res.rowCount} tables.`);
            res.rows.forEach(r => console.log(`  Table: ${r.name}`));
        } else {
            console.log('table_id column NOT FOUND in transactions. Checking orders...');
            // Try orders
            // Wait, I restored 0 orders based on item content in v2.
            // Maybe I should restore orders based on transactions?
            // Some transactions might have notes like "Bağlı Sipariş ID: ..." or description "Sipariş #..."

            // Let's check Ozan's transactions descriptions
            const transRes = await pool.query('SELECT description, notes FROM transactions WHERE user_id = $1', [ozanId]);
            console.log('Ozan Transactions Sample:');
            transRes.rows.forEach(r => console.log(`  D: ${r.description} | N: ${r.notes}`));
        }

    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}
run();
