-- 23_final_rls_fix.sql
-- Final fix for RLS policies - handle NULL context gracefully

-- The issue: NULLIF returns NULL when empty, and user_id = NULL is always FALSE
-- The previous COALESCE fallback to 00000000... never matches real user_ids
-- Solution: Only enforce RLS when the context is actually set (not NULL/empty)

-- 1. Transactions
DROP POLICY IF EXISTS transactions_isolation_policy ON transactions;
CREATE POLICY transactions_isolation_policy ON transactions
    FOR ALL
    USING (
        CASE 
            WHEN current_setting('app.current_user_id', true) IS NULL OR current_setting('app.current_user_id', true) = '' 
            THEN false  -- Block access if no context is set
            ELSE user_id = current_setting('app.current_user_id', true)::uuid
        END
    )
    WITH CHECK (
        CASE 
            WHEN current_setting('app.current_user_id', true) IS NULL OR current_setting('app.current_user_id', true) = '' 
            THEN false  -- Block writes if no context is set
            ELSE user_id = current_setting('app.current_user_id', true)::uuid
        END
    );

-- 2. Products
DROP POLICY IF EXISTS products_isolation_policy ON products;
CREATE POLICY products_isolation_policy ON products
    FOR ALL
    USING (
        CASE 
            WHEN current_setting('app.current_user_id', true) IS NULL OR current_setting('app.current_user_id', true) = '' 
            THEN false
            ELSE user_id = current_setting('app.current_user_id', true)::uuid
        END
    )
    WITH CHECK (
        CASE 
            WHEN current_setting('app.current_user_id', true) IS NULL OR current_setting('app.current_user_id', true) = '' 
            THEN false
            ELSE user_id = current_setting('app.current_user_id', true)::uuid
        END
    );

-- 3. Categories
DROP POLICY IF EXISTS categories_isolation_policy ON categories;
CREATE POLICY categories_isolation_policy ON categories
    FOR ALL
    USING (
        CASE 
            WHEN current_setting('app.current_user_id', true) IS NULL OR current_setting('app.current_user_id', true) = '' 
            THEN false
            ELSE user_id = current_setting('app.current_user_id', true)::uuid
        END
    )
    WITH CHECK (
        CASE 
            WHEN current_setting('app.current_user_id', true) IS NULL OR current_setting('app.current_user_id', true) = '' 
            THEN false
            ELSE user_id = current_setting('app.current_user_id', true)::uuid
        END
    );

-- 4. Channels
DROP POLICY IF EXISTS channels_isolation_policy ON channels;
CREATE POLICY channels_isolation_policy ON channels
    FOR ALL
    USING (
        CASE 
            WHEN current_setting('app.current_user_id', true) IS NULL OR current_setting('app.current_user_id', true) = '' 
            THEN false
            ELSE user_id = current_setting('app.current_user_id', true)::uuid
        END
    )
    WITH CHECK (
        CASE 
            WHEN current_setting('app.current_user_id', true) IS NULL OR current_setting('app.current_user_id', true) = '' 
            THEN false
            ELSE user_id = current_setting('app.current_user_id', true)::uuid
        END
    );

COMMENT ON POLICY transactions_isolation_policy ON transactions IS 'Isolate transactions by user_id using app.current_user_id session variable with explicit NULL handling';
COMMENT ON POLICY products_isolation_policy ON products IS 'Isolate products by user_id using app.current_user_id session variable with explicit NULL handling';
COMMENT ON POLICY categories_isolation_policy ON categories IS 'Isolate categories by user_id using app.current_user_id session variable with explicit NULL handling';
COMMENT ON POLICY channels_isolation_policy ON channels IS 'Isolate channels by user_id using app.current_user_id session variable with explicit NULL handling';
