-- Re-enable RLS on transaction_items with proper policy

-- Enable RLS
ALTER TABLE transaction_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE transaction_items FORCE ROW LEVEL SECURITY;

-- Create proper policy
CREATE POLICY transaction_items_isolation ON transaction_items
    AS PERMISSIVE FOR ALL TO app_user
    USING (
        (transaction_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM transactions t 
            WHERE t.id = transaction_items.transaction_id 
            AND t.user_id = current_setting('app.current_user_id', true)::uuid
        ))
        OR 
        (ocr_record_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM ocr_records o 
            WHERE o.id = transaction_items.ocr_record_id 
            AND o.user_id = current_setting('app.current_user_id', true)::uuid
        ))
    )
    WITH CHECK (
        (transaction_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM transactions t 
            WHERE t.id = transaction_items.transaction_id 
            AND t.user_id = current_setting('app.current_user_id', true)::uuid
        ))
        OR 
        (ocr_record_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM ocr_records o 
            WHERE o.id = transaction_items.ocr_record_id 
            AND o.user_id = current_setting('app.current_user_id', true)::uuid
        ))
    );
