-- Add missing ocr_record_id column to transactions table
-- This column links transactions to OCR records for receipt scanning

ALTER TABLE transactions 
ADD COLUMN IF NOT EXISTS ocr_record_id UUID REFERENCES ocr_records(id) ON DELETE SET NULL;

-- Create index for performance
CREATE INDEX IF NOT EXISTS transactions_ocr_idx ON transactions(ocr_record_id);

-- Verify the change
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'transactions' AND column_name = 'ocr_record_id';
