-- Add ocr_record_id column to link items directly to an OCR job
ALTER TABLE transaction_items 
ADD COLUMN IF NOT EXISTS ocr_record_id UUID REFERENCES ocr_records(id);

-- Make transaction_id nullable since items are created before the transaction is finalized
ALTER TABLE transaction_items 
ALTER COLUMN transaction_id DROP NOT NULL;
