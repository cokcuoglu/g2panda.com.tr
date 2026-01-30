-- 25_rls_to_public.sql
-- Simplify RLS policies to use TO PUBLIC (includes all roles)

-- The issue: TO app_user, public syntax doesn't work as expected
-- Solution: Use TO PUBLIC which applies to all roles including app_user

-- 1. Transactions
DROP POLICY IF EXISTS transactions_isolation_policy ON transactions;
CREATE POLICY transactions_isolation_policy ON transactions
    FOR ALL
    TO PUBLIC
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
    TO PUBLIC
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
    TO PUBLIC
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
    TO PUBLIC
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

COMMENT ON POLICY transactions_isolation_policy ON transactions IS 'Isolate transactions by user_id - applies to all roles via PUBLIC';
COMMENT ON POLICY products_isolation_policy ON products IS 'Isolate products by user_id - applies to all roles via PUBLIC';
COMMENT ON POLICY categories_isolation_policy ON categories IS 'Isolate categories by user_id - applies to all roles via PUBLIC';
COMMENT ON POLICY channels_isolation_policy ON channels IS 'Isolate channels by user_id - applies to all roles via PUBLIC';
