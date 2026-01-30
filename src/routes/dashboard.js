const express = require('express');
const router = express.Router();

// GET /api/dashboard/daily-summary
router.get('/daily-summary', async (req, res) => {
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ success: false, error: 'Date is required (YYYY-MM-DD)' });
        }

        const query = `
      SELECT 
        $1::DATE AS report_date,
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) AS total_income,
        COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS total_expense,
        COALESCE(
            SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - 
            SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 
            0
        ) AS net_profit,
        COUNT(CASE WHEN type = 'income' THEN 1 END) AS income_count,
        COUNT(CASE WHEN type = 'expense' THEN 1 END) AS expense_count
      FROM transactions
      WHERE 
        transaction_date >= ($1::TIMESTAMP AT TIME ZONE 'Europe/Istanbul')
        AND transaction_date < (($1::DATE + INTERVAL '1 day')::TIMESTAMP AT TIME ZONE 'Europe/Istanbul')
        AND deleted_at IS NULL;
    `;

        const result = await req.db.query(query, [date]);
        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// GET /api/dashboard/monthly-summary
router.get('/monthly-summary', async (req, res) => {
    try {
        const { year, month } = req.query;

        if (!year || !month) {
            return res.status(400).json({ success: false, error: 'Year and month are required' });
        }

        const query = `
      SELECT 
        $1::INTEGER AS report_year,
        $2::INTEGER AS report_month,
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) AS total_income,
        COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS total_expense,
        COALESCE(
            SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - 
            SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 
            0
        ) AS net_profit,
        COUNT(CASE WHEN type = 'income' THEN 1 END) AS income_count,
        COUNT(CASE WHEN type = 'expense' THEN 1 END) AS expense_count
      FROM transactions
      WHERE 
        transaction_date >= ($1::INTEGER || '-' || $2::INTEGER || '-01')::DATE
        AND transaction_date < (($1::INTEGER || '-' || $2::INTEGER || '-01')::DATE + INTERVAL '1 month')
        AND deleted_at IS NULL;
    `;

        const result = await req.db.query(query, [year, month]);
        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// GET /api/dashboard/trend
router.get('/trend', async (req, res) => {
    try {
        const { days = 30 } = req.query;

        // RLS in 'daily_summary' CTE works automatically because 'transactions' table has active RLS
        const query = `
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

        const result = await req.db.query(query, [days]);
        res.json({ success: true, data: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// GET /api/reports/by-category
router.get('/reports/by-category', async (req, res) => {
    try {
        const { start_date, end_date, type } = req.query;

        if (!start_date || !end_date) {
            return res.status(400).json({ success: false, error: 'Start date and end date are required' });
        }
        if (type && !['income', 'expense'].includes(type)) {
            return res.status(400).json({ success: false, error: 'Invalid type (income/expense)' });
        }

        let query = `
      SELECT 
        c.id AS category_id,
        c.name AS category_name,
        c.color AS category_color,
        COALESCE(SUM(t.amount), 0) AS total_amount,
        COUNT(t.id) AS transaction_count,
        ROUND(
            (COALESCE(SUM(t.amount), 0) / NULLIF(
                (SELECT SUM(amount) 
                 FROM transactions 
                 WHERE 
                   transaction_date BETWEEN $1::DATE AND $2::DATE
                   AND deleted_at IS NULL
                   ${type ? "AND type = $3" : ""}
                ), 0
            ) * 100), 2
        ) AS percentage
      FROM categories c
      LEFT JOIN transactions t ON 
        c.id = t.category_id 
        AND t.transaction_date BETWEEN $1::DATE AND $2::DATE
        AND t.deleted_at IS NULL
        ${type ? "AND t.type = $3" : ""}
      WHERE 
        c.is_active = true
        AND c.deleted_at IS NULL
        ${type ? "AND c.type = $3" : ""}
      GROUP BY c.id, c.name, c.color
      HAVING COUNT(t.id) > 0
      ORDER BY total_amount DESC;
    `;

        const params = [start_date, end_date];
        if (type) params.push(type);

        const result = await req.db.query(query, params);
        res.json({ success: true, data: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// GET /api/reports/by-channel
router.get('/reports/by-channel', async (req, res) => {
    try {
        const { start_date, end_date, type } = req.query;

        if (!start_date || !end_date) {
            return res.status(400).json({ success: false, error: 'Start date and end date are required' });
        }

        if (type && !['sales', 'payment'].includes(type)) {
            return res.status(400).json({ success: false, error: 'Invalid type (sales/payment)' });
        }

        // Map 'sales' -> 'income' transactions, 'payment' -> 'expense' transactions
        const transactionType = type === 'sales' ? 'income' : (type === 'payment' ? 'expense' : null);

        let query = `
      SELECT 
        ch.id AS channel_id,
        ch.name AS channel_name,
        COALESCE(SUM(t.amount), 0) AS total_amount,
        COUNT(t.id) AS transaction_count,
        ROUND(COALESCE(AVG(t.amount), 0), 2) AS avg_transaction_amount,
        ROUND(
            (COALESCE(SUM(t.amount), 0) / NULLIF(
                (SELECT SUM(amount) 
                 FROM transactions 
                 WHERE 
                   transaction_date BETWEEN $1::DATE AND $2::DATE
                   AND deleted_at IS NULL
                   ${transactionType ? "AND type = $3" : ""}
                ), 0
            ) * 100), 2
        ) AS percentage
      FROM channels ch
      LEFT JOIN transactions t ON 
        ch.id = t.channel_id 
        AND t.transaction_date BETWEEN $1::DATE AND $2::DATE
        AND t.deleted_at IS NULL
        ${transactionType ? "AND t.type = $3" : ""}
      WHERE 
        ch.is_active = true
        AND ch.deleted_at IS NULL
        ${type ? "AND ch.type = $4" : ""}
      GROUP BY ch.id, ch.name
      HAVING COUNT(t.id) > 0
      ORDER BY total_amount DESC;
    `;

        const params = [start_date, end_date];
        if (transactionType) params.push(transactionType);
        if (type) params.push(type);

        const result = await req.db.query(query, params);
        res.json({ success: true, data: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

module.exports = router;
