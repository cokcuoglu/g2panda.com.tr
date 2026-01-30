const { pool } = require('./src/db');

async function checkTransactionDates() {
    try {
        const userId = 'a3dbd896-7640-4228-86d4-83e9783e5209';

        console.log('=== TRANSACTION DATE DISTRIBUTION ===\n');

        // Get distinct dates with counts
        const res = await pool.query(`
            SELECT 
                DATE(transaction_date AT TIME ZONE 'Europe/Istanbul') as date,
                type,
                COUNT(*) as count,
                SUM(amount) as total
            FROM transactions
            WHERE user_id = $1 AND deleted_at IS NULL
            GROUP BY DATE(transaction_date AT TIME ZONE 'Europe/Istanbul'), type
            ORDER BY date DESC, type
            LIMIT 20
        `, [userId]);

        console.log('Recent transaction dates:');
        res.rows.forEach(row => {
            console.log(`  ${row.date.toISOString().split('T')[0]} - ${row.type}: ${row.count} transactions, total: ${row.total}`);
        });

        // Check if there are any transactions for 2026-01-31
        const todayCheck = await pool.query(`
            SELECT COUNT(*) as count
            FROM transactions
            WHERE user_id = $1 
            AND deleted_at IS NULL
            AND DATE(transaction_date AT TIME ZONE 'Europe/Istanbul') = '2026-01-31'
        `, [userId]);

        console.log(`\nTransactions for 2026-01-31: ${todayCheck.rows[0].count}`);

    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

checkTransactionDates();
