-- Add expense_type to categories table
ALTER TABLE categories 
ADD COLUMN expense_type VARCHAR(20) DEFAULT NULL;

-- Add constraint to ensure expense_type is valid
ALTER TABLE categories
ADD CONSTRAINT categories_expense_type_check 
CHECK (expense_type IN ('operational', 'fixed', 'personal', NULL));

-- Optional: If type is 'income', expense_type should be NULL (soft enforcement, or we can just ignore it)
-- For now, we just enforce the allowed values.

COMMENT ON COLUMN categories.expense_type IS 'Sub-classification for expenses (operational, fixed, personal)';
