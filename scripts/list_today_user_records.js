const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function findTrueActiveId() {
    try {
        console.log('Finding exact User ID with transactions today...');

        const res = await pool.query(`
            SELECT user_id, count(*) as count 
            FROM transactions 
            WHERE created_at >= '2026-02-16 00:00:00' 
            GROUP BY user_id
        `);

        if (res.rows.length === 0) {
            console.log('❌ No transactions found for today.');
            return;
        }

        for (const row of res.rows) {
            console.log(`✅ Active User ID: [${row.user_id}] - Transactions: ${row.count}`);

            // Get details for this specific ID since we found it
            const details = await pool.query(`
                SELECT created_at, amount, description
                FROM transactions 
                WHERE user_id = $1 AND created_at >= '2026-02-16 00:00:00'
                ORDER BY created_at ASC
            `, [row.user_id]);

            details.rows.forEach(t => {
                console.log(`   - Time: ${t.created_at}, Amount: ${t.amount}, Desc: ${t.description || 'N/A'}`);
            });
        }

    } catch (err) {
        console.error('ERROR:', err.message);
    } finally {
        await pool.end();
    }
}

findTrueActiveId();
