
-- 12_finance_updates.sql
-- Add expense classification and tax compliance fields

-- Add expense_type to transactions (default 'none' for income or existing data)
ALTER TABLE transactions 
ADD COLUMN expense_type VARCHAR(20) DEFAULT 'none',
ADD COLUMN is_tax_deductible BOOLEAN DEFAULT true,
ADD COLUMN deduction_reason TEXT,
ADD COLUMN document_type VARCHAR(20) DEFAULT 'receipt';

-- Add constraints
ALTER TABLE transactions 
ADD CONSTRAINT transactions_expense_type_check 
CHECK (expense_type IN ('fixed', 'operational', 'personal', 'none'));

ALTER TABLE transactions 
ADD CONSTRAINT transactions_document_type_check 
CHECK (document_type IN ('invoice', 'receipt', 'none'));

-- Create index for filtering by expense type
CREATE INDEX transactions_user_expense_type_idx 
ON transactions (user_id, expense_type) WHERE deleted_at IS NULL;

-- Comment
COMMENT ON COLUMN transactions.expense_type IS 'Classification: fixed (rent/salary), operational (goods), personal (owner), none (income)';
COMMENT ON COLUMN transactions.is_tax_deductible IS 'TTK compliance flag for tax reporting';
