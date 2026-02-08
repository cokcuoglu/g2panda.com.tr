-- Add VAT columns to transactions table
ALTER TABLE transactions
ADD COLUMN IF NOT EXISTS vat_rate NUMERIC(5,2),
ADD COLUMN IF NOT EXISTS vat_amount NUMERIC(15,2);

COMMENT ON COLUMN transactions.vat_rate IS 'VAT percentage rate (e.g. 1, 10, 20)';
COMMENT ON COLUMN transactions.vat_amount IS 'Calculated VAT amount included in the total';
