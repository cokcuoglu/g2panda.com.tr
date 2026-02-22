-- Fix RLS policy to allow updating OCR items (transaction_id = NULL initially)
-- The WITH CHECK clause needs to allow NULL transaction_id for OCR items

DROP POLICY IF EXISTS transaction_items_isolation ON transaction_items;
DROP POLICY IF EXISTS transaction_items_select_update_delete ON transaction_items;

-- Create comprehensive policy that handles both existing and new items
CREATE POLICY transaction_items_isolation ON transaction_items
    AS PERMISSIVE FOR ALL TO app_user
    USING (
        -- For SELECT/UPDATE/DELETE: check ownership via transaction OR ocr_record
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
        -- For INSERT/UPDATE: allow if transaction belongs to user OR if it's an OCR item being linked
        (transaction_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM transactions t 
            WHERE t.id = transaction_items.transaction_id 
            AND t.user_id = current_setting('app.current_user_id', true)::uuid
        ))
        OR
        -- Allow OCR items to be updated (linking to transaction)
        (ocr_record_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM ocr_records o 
            WHERE o.id = transaction_items.ocr_record_id 
            AND o.user_id = current_setting('app.current_user_id', true)::uuid
        ))
    );
