const { pool } = require('./src/db');

async function migrate() {
    try {
        console.log('Applying performance indexes one by one...');

        const queries = [
            "CREATE INDEX IF NOT EXISTS transactions_deleted_at_idx ON transactions (deleted_at)",
            "CREATE INDEX IF NOT EXISTS transactions_perf_report_idx ON transactions (user_id, type, transaction_date) WHERE deleted_at IS NULL",
            "CREATE INDEX IF NOT EXISTS transactions_istanbul_date_idx ON transactions (((transaction_date AT TIME ZONE 'Europe/Istanbul')::DATE))"
        ];

        for (const q of queries) {
            console.log(`Running: ${q}`);
            await pool.query(q);
        }

        console.log('Migration successful.');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        pool.end();
    }
}

migrate();
