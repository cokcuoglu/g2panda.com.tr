-- Fix transaction_items RLS policy to properly check user ownership
-- The issue: policy checks if transaction exists, but doesn't verify user_id

DROP POLICY IF EXISTS transaction_items_isolation ON transaction_items;

CREATE POLICY transaction_items_isolation ON transaction_items
    AS PERMISSIVE FOR ALL TO app_user
    USING (
        (transaction_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM transactions t 
            WHERE t.id = transaction_id 
            AND t.user_id = current_setting('app.current_user_id', true)::uuid
        ))
        OR 
        (ocr_record_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM ocr_records o 
            WHERE o.id = ocr_record_id 
            AND o.user_id = current_setting('app.current_user_id', true)::uuid
        ))
    );
