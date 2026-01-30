-- 22_performance_indexes.sql
-- Optimizing common groupings and range queries

-- Functional index for Istanbul date grouping (used in Trends and Summaries)
CREATE INDEX IF NOT EXISTS transactions_istanbul_date_idx 
ON transactions ((transaction_date AT TIME ZONE 'Europe/Istanbul')::DATE);

-- Index for deleted_at to speed up filtering
CREATE INDEX IF NOT EXISTS transactions_deleted_at_idx ON transactions (deleted_at);

-- Combined index for faster daily reports
CREATE INDEX IF NOT EXISTS transactions_perf_report_idx 
ON transactions (user_id, type, transaction_date) 
WHERE deleted_at IS NULL;
