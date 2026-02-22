-- =====================================================
-- 60_transaction_discount_fields.sql
-- Purpose: Add support for tracking base amounts and discounts in transactions
-- =====================================================

-- 1. Add columns to transactions table
ALTER TABLE transactions 
ADD COLUMN IF NOT EXISTS base_amount NUMERIC(15,2),
ADD COLUMN IF NOT EXISTS discount_amount NUMERIC(15,2) DEFAULT 0;

-- 2. Performance Indexes
CREATE INDEX IF NOT EXISTS transactions_discount_amount_idx ON transactions(discount_amount) WHERE discount_amount > 0;

-- 3. Comments
COMMENT ON COLUMN transactions.base_amount IS 'The original total amount before any discounts or adjustments';
COMMENT ON COLUMN transactions.discount_amount IS 'The total discount applied to this transaction';
