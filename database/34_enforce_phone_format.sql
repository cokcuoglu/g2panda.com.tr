-- =====================================================
-- Migration: 34_enforce_phone_format.sql
-- Purpose: Enforce strict phone number format and uniqueness
-- =====================================================

-- 1. Clean up existing data
-- Fix numeric phones that start with '05' (e.g. 0530... -> 530...)
UPDATE customers 
SET phone = SUBSTRING(phone FROM 2) 
WHERE phone LIKE '05%';

-- Remove any non-numeric characters (optional safety, dependent on existing data quality)
-- For this migration, we assume we just want to remove completely invalid ones
-- that don't match the target format after the '0' fix.

-- Delete customers with invalid phone format
DELETE FROM customers 
WHERE phone !~ '^[5][0-9]{9}$';

-- 2. Add CHECK constraint
ALTER TABLE customers 
DROP CONSTRAINT IF EXISTS customers_phone_check;

ALTER TABLE customers 
ADD CONSTRAINT customers_phone_check 
CHECK (phone ~ '^[5][0-9]{9}$');

-- 3. Add UNIQUE constraint (per Merchant)
-- We use a unique index with WHERE deleted_at IS NULL to support soft deletes
DROP INDEX IF EXISTS customers_user_phone_unique_idx;

CREATE UNIQUE INDEX customers_user_phone_unique_idx 
ON customers (user_id, phone) 
WHERE deleted_at IS NULL;
