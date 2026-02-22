-- Increase precision for numeric columns to prevent overflow
ALTER TABLE transaction_items 
ALTER COLUMN vat_rate TYPE NUMERIC(10, 2),
ALTER COLUMN quantity TYPE NUMERIC(15, 2);
