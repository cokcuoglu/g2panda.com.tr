-- Final, correct RLS policy for transaction_items
-- This policy allows:
-- 1. Reading items that belong to user via transaction OR ocr_record
-- 2. Creating new items for user's transactions
-- 3. Updating OCR items (transaction_id=NULL) to link them to user's transactions
-- 4. Deleting user's items

-- Enable RLS
ALTER TABLE transaction_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE transaction_items FORCE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS transaction_items_isolation ON transaction_items;

-- Create policy for SELECT/DELETE - check current ownership
CREATE POLICY transaction_items_select_delete ON transaction_items
    AS PERMISSIVE 
    FOR SELECT
    TO app_user
    USING (
        -- Item belongs to user via transaction
        (transaction_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM transactions t 
            WHERE t.id = transaction_items.transaction_id 
            AND t.user_id = current_setting('app.current_user_id', true)::uuid
        ))
        OR 
        -- Item belongs to user via OCR record
        (ocr_record_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM ocr_records o 
            WHERE o.id = transaction_items.ocr_record_id 
            AND o.user_id = current_setting('app.current_user_id', true)::uuid
        ))
    );

-- Create policy for INSERT - new items must belong to user's transaction
CREATE POLICY transaction_items_insert ON transaction_items
    AS PERMISSIVE 
    FOR INSERT
    TO app_user
    WITH CHECK (
        -- New item must be for user's transaction
        (transaction_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM transactions t 
            WHERE t.id = transaction_items.transaction_id 
            AND t.user_id = current_setting('app.current_user_id', true)::uuid
        ))
        OR
        -- OR for user's OCR record
        (ocr_record_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM ocr_records o 
            WHERE o.id = transaction_items.ocr_record_id 
            AND o.user_id = current_setting('app.current_user_id', true)::uuid
        ))
    );

-- Create policy for UPDATE - allow if current OR new state belongs to user
CREATE POLICY transaction_items_update ON transaction_items
    AS PERMISSIVE 
    FOR UPDATE
    TO app_user
    USING (
        -- Current state: item belongs to user
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
        -- New state: item will belong to user
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

-- Create policy for DELETE
CREATE POLICY transaction_items_delete ON transaction_items
    AS PERMISSIVE 
    FOR DELETE
    TO app_user
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
    );
