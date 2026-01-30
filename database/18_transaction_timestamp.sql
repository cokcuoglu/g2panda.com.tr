-- =====================================================
-- Transaction Timestamp Migration
-- =====================================================
-- Purpose: Convert transaction_date from DATE to TIMESTAMPTZ
-- to store hour and minute information for transactions
-- =====================================================

-- Convert transaction_date from DATE to TIMESTAMPTZ
-- Existing DATE values will be converted to midnight (00:00:00) on that date
ALTER TABLE transactions 
    ALTER COLUMN transaction_date TYPE TIMESTAMPTZ 
    USING transaction_date::TIMESTAMPTZ;

-- Update constraint to allow future timestamps within reason (24 hours)
-- This allows for timezone differences and minor clock adjustments
ALTER TABLE transactions 
    DROP CONSTRAINT IF EXISTS transactions_date_check;

ALTER TABLE transactions 
    ADD CONSTRAINT transactions_date_check 
    CHECK (transaction_date <= NOW() + INTERVAL '1 day');

-- Update column comment to reflect new behavior
COMMENT ON COLUMN transactions.transaction_date IS 
    'Transaction timestamp with timezone (includes date, hour, minute). Stores exact time of transaction.';

-- Verify the change
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'transactions' 
  AND column_name = 'transaction_date';
