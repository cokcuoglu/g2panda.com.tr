const { pool } = require('./src/db');

async function checkTodaysTransactions() {
    try {
        const userId = 'a3dbd896-7640-4228-86d4-83e9783e5209';
        const targetDate = '2026-01-31';

        console.log('=== CHECKING TODAY\'S TRANSACTIONS ===\n');
        console.log(`User ID: ${userId}`);
        console.log(`Target Date: ${targetDate}\n`);

        // Check all transactions for this user
        const allRes = await pool.query(`
            SELECT COUNT(*), type
            FROM transactions
            WHERE user_id = $1 AND deleted_at IS NULL
            GROUP BY type
        `, [userId]);

        console.log('All transactions by type:');
        allRes.rows.forEach(row => {
            console.log(`  ${row.type}: ${row.count}`);
        });

        // Check transactions for today
        const todayRes = await pool.query(`
            SELECT COUNT(*), type
            FROM transactions
            WHERE user_id = $1 
            AND deleted_at IS NULL
            AND transaction_date >= ($2::TIMESTAMP AT TIME ZONE 'Europe/Istanbul')
            AND transaction_date < (($2::DATE + INTERVAL '1 day')::TIMESTAMP AT TIME ZONE 'Europe/Istanbul')
            GROUP BY type
        `, [userId, targetDate]);

        console.log(`\nTransactions for ${targetDate}:`);
        if (todayRes.rows.length === 0) {
            console.log('  NO TRANSACTIONS FOUND FOR THIS DATE');
        } else {
            todayRes.rows.forEach(row => {
                console.log(`  ${row.type}: ${row.count}`);
            });
        }

        // Check income transactions for today
        const incomeRes = await pool.query(`
            SELECT SUM(amount) as total, COUNT(*) as count
            FROM transactions
            WHERE user_id = $1 
            AND type = 'income'
            AND deleted_at IS NULL
            AND transaction_date >= ($2::TIMESTAMP AT TIME ZONE 'Europe/Istanbul')
            AND transaction_date < (($2::DATE + INTERVAL '1 day')::TIMESTAMP AT TIME ZONE 'Europe/Istanbul')
        `, [userId, targetDate]);

        console.log(`\nIncome for ${targetDate}:`);
        console.log(`  Count: ${incomeRes.rows[0].count}`);
        console.log(`  Total: ${incomeRes.rows[0].total || 0}`);

        // Check sample transactions with dates
        const sampleRes = await pool.query(`
            SELECT id, type, amount, transaction_date
            FROM transactions
            WHERE user_id = $1 AND deleted_at IS NULL
            ORDER BY transaction_date DESC
            LIMIT 10
        `, [userId]);

        console.log(`\nRecent transactions:`);
        sampleRes.rows.forEach(row => {
            console.log(`  ${row.transaction_date.toISOString().split('T')[0]} - ${row.type}: ${row.amount}`);
        });

    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

checkTodaysTransactions();
