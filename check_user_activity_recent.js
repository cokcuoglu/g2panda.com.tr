const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkActivity() {
    const userId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';
    try {
        console.log(`Checking activity for User ID: ${userId}`);
        console.log(`Current Time: ${new Date().toISOString()}`);

        // Transactions created in the last 48 hours
        const txRes = await pool.query(`
      SELECT id, transaction_date, amount, type, created_at 
      FROM transactions 
      WHERE user_id = $1 
      AND created_at >= NOW() - INTERVAL '48 hours'
      ORDER BY created_at DESC
    `, [userId]);

        console.log(`\nTransactions created in last 48 hours: ${txRes.rowCount}`);
        if (txRes.rowCount > 0) {
            txRes.rows.forEach(tx => {
                console.log(`- ${tx.created_at.toISOString()} | ${tx.type} | ${tx.amount} ₺ | Date: ${tx.transaction_date}`);
            });
        } else {
            console.log("❌ No transactions found in the last 48 hours.");
        }

        // Check for user existence and email again just to be sure
        const userRes = await pool.query('SELECT email, full_name, last_login_at FROM users WHERE id = $1', [userId]);
        if (userRes.rowCount > 0) {
            console.log(`\nUser matches: ${userRes.rows[0].email} (${userRes.rows[0].full_name})`);
            // Note: last_login_at might not exist if column wasn't added, but good to check if schema changed
        }

    } catch (e) {
        if (e.message.includes('last_login_at')) {
            console.log("\n(last_login_at column does not exist on users table)");
        } else {
            console.error(e);
        }
    } finally {
        pool.end();
    }
}

checkActivity();
