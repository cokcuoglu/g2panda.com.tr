-- Add 'order' to transactions document_type check constraint

ALTER TABLE transactions 
DROP CONSTRAINT IF EXISTS transactions_document_type_check;

ALTER TABLE transactions 
ADD CONSTRAINT transactions_document_type_check 
CHECK (document_type IN ('invoice', 'receipt', 'none', 'order'));
