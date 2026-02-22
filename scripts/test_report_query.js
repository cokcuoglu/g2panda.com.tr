const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const targetUserId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';

async function testReportQuery() {
    const client = await pool.connect();
    try {
        console.log(`Testing report query for User: ${targetUserId}`);

        // 1. Set RLS context
        await client.query(`SELECT set_config('app.current_user_id', $1, true)`, [targetUserId]);
        await client.query('SET LOCAL ROLE app_user');

        // 2. wide date range to catch all
        const start_date = '2026-01-01';
        const end_date = '2026-12-31';

        const query = `
            SELECT id, transaction_date, type, amount, description, created_at
            FROM transactions
            WHERE transaction_date >= ($1::TIMESTAMP AT TIME ZONE 'Europe/Istanbul')
              AND transaction_date < (($2::DATE + INTERVAL '1 day')::TIMESTAMP AT TIME ZONE 'Europe/Istanbul')
              AND deleted_at IS NULL
            ORDER BY transaction_date DESC
        `;

        const res = await client.query(query, [start_date, end_date]);
        console.log(`📊 Found ${res.rows.length} transactions for Ozan in range ${start_date} to ${end_date}`);

        if (res.rows.length > 0) {
            console.log('Sample row:', JSON.stringify(res.rows[0]));
        } else {
            // Check without RLS to see if it's an RLS issue or date issue
            await client.query('RESET ROLE');
            const resNoRLS = await client.query(query, [start_date, end_date]);
            console.log(`📊 WITHOUT RLS, found ${resNoRLS.rows.length} transactions in same range.`);

            // Check counts per user without RLS
            const counts = await client.query('SELECT user_id, count(*) FROM transactions GROUP BY user_id');
            console.log('Total counts per user (all time):', JSON.stringify(counts.rows));
        }

    } catch (err) {
        console.error('ERROR:', err.message);
    } finally {
        client.release();
        await pool.end();
    }
}

testReportQuery();
