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

        // Transactions created today
        const txRes = await pool.query(`
      SELECT id, transaction_date, amount, type, created_at 
      FROM transactions 
      WHERE user_id = $1 
      AND created_at >= '2026-01-31 00:00:00'
      ORDER BY created_at DESC
    `, [userId]);

        console.log(`\nTransactions created today: ${txRes.rowCount}`);
        if (txRes.rowCount > 0) {
            txRes.rows.forEach(tx => {
                console.log(`- ${tx.created_at.toISOString()} | ${tx.type} | ${tx.amount} | Date: ${tx.transaction_date}`);
            });
            console.log("\n✅ User successfully created transactions today, meaning they logged in successfully.");
        } else {
            console.log("\n❌ No transactions created today.");
        }

    } catch (e) {
        console.error(e);
    } finally {
        pool.end();
    }
}

checkActivity();
