
-- =====================================================
-- TABLE: ocr_records
-- =====================================================

CREATE TABLE ocr_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    
    image_path TEXT NOT NULL,
    raw_text TEXT,
    
    extracted_amount NUMERIC(15,2),
    extracted_date DATE,
    extracted_vendor VARCHAR(255),
    confidence_score INTEGER,
    
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, confirmed, failed
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT ocr_records_status_check CHECK (status IN ('pending', 'confirmed', 'failed')),
    
    CONSTRAINT ocr_records_user_id_fkey FOREIGN KEY (user_id) 
        REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX ocr_records_user_idx ON ocr_records(user_id);

-- Update Transactions Table
ALTER TABLE transactions 
ADD COLUMN ocr_record_id UUID REFERENCES ocr_records(id) ON DELETE SET NULL;

CREATE INDEX transactions_ocr_idx ON transactions(ocr_record_id);

-- =====================================================
-- RLS SECURITY (STRICT)
-- =====================================================

ALTER TABLE ocr_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE ocr_records FORCE ROW LEVEL SECURITY;

-- Policy: Users can only see/insert their own OCR records
CREATE POLICY ocr_records_isolation_policy ON ocr_records
    FOR ALL
    TO app_user, public
    USING (user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid)
    WITH CHECK (user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid);

-- Grant permissions to app_user (if it exists)
GRANT ALL ON ocr_records TO app_user;
