
const axios = require('axios');
const { Client } = require('pg');
require('dotenv').config();

// Mock environment for direct DB test if needed, but perfer HTTP
// We need an auth token to hit the API.
// So we will simulate a login first.

async function testReports() {
    try {
        // 1. Login as owner (assuming verified@example.com is owner, per previous logs?)
        // Or I can pick a user from DB.

        const db = new Client({
            connectionString: process.env.DATABASE_URL
        });
        await db.connect();

        const userRes = await db.query("SELECT email, role FROM users WHERE role = 'OWNER' OR role = 'owner' LIMIT 1");
        if (userRes.rows.length === 0) {
            console.error("No owner found to test with.");
            await db.end();
            return;
        }

        const user = userRes.rows[0];
        console.log(`Testing with user: ${user.email} (${user.role})`);

        // We can't easily login via API because we don't know the plain password (hashed).
        // But we can generate a token if we had the secret.
        // OR, we can just run the SQL queries directly to verify they don't crash.

        // Let's verify the SQL queries directly.

        console.log("Testing Reports Summary SQL...");
        const summaryQuery = `
            SELECT 
                SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as total_income,
                SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as total_expense,
                COUNT(CASE WHEN type = 'income' THEN 1 END) as income_count,
                COUNT(CASE WHEN type = 'expense' THEN 1 END) as expense_count
            FROM transactions
            WHERE transaction_date >= ($1::TIMESTAMP AT TIME ZONE 'Europe/Istanbul')
              AND transaction_date < (($2::DATE + INTERVAL '1 day')::TIMESTAMP AT TIME ZONE 'Europe/Istanbul')
        `;
        const today = new Date().toISOString().split('T')[0];
        const res1 = await db.query(summaryQuery, [today, today]);
        console.log("Summary Result:", res1.rows[0]);

        console.log("Testing Dashboard Trend SQL...");
        const trendQuery = `
      WITH date_series AS (
          SELECT generate_series(
              CURRENT_DATE - ($1 || ' days')::INTERVAL,
              CURRENT_DATE,
              INTERVAL '1 day'
          )::DATE AS report_date
      ),
      daily_summary AS (
          SELECT 
              transaction_date AS report_date,
              SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS daily_income,
              SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS daily_expense
          FROM transactions
          WHERE 
              transaction_date >= ((CURRENT_DATE - ($1 || ' days')::INTERVAL)::TIMESTAMP AT TIME ZONE 'Europe/Istanbul')
              AND transaction_date < ((CURRENT_DATE + INTERVAL '1 day')::TIMESTAMP AT TIME ZONE 'Europe/Istanbul')
              AND deleted_at IS NULL
          GROUP BY (transaction_date AT TIME ZONE 'Europe/Istanbul')::DATE
      )
      SELECT 
          ds.report_date,
          COALESCE(s.daily_income, 0) AS daily_income,
          COALESCE(s.daily_expense, 0) AS daily_expense,
          COALESCE(s.daily_income, 0) - COALESCE(s.daily_expense, 0) AS daily_net_profit
      FROM date_series ds
      LEFT JOIN daily_summary s ON ds.report_date = s.report_date::DATE
      ORDER BY ds.report_date;
        `;
        const res2 = await db.query(trendQuery, [30]);
        console.log("Trend Result Count:", res2.rows.length);
        if (res2.rows.length > 0) console.log("Trend Sample:", res2.rows[0]);

        await db.end();
        console.log("SQL Tests Passed.");

    } catch (error) {
        console.error("Test Failed:", error);
    }
}

testReports();
