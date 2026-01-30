-- 22_fix_rls_app_user.sql
-- Fix RLS policies to work correctly with app_user role

-- The issue: When we SET ROLE app_user, the RLS policies need to allow
-- the user to INSERT/UPDATE/DELETE their own rows based on the session variable.

-- Solution: Use NULLIF to handle empty strings, and ensure the policy
-- allows operations when the user_id matches the session variable.

-- 1. Transactions
DROP POLICY IF EXISTS transactions_isolation_policy ON transactions;
CREATE POLICY transactions_isolation_policy ON transactions
    FOR ALL
    USING (
        user_id = COALESCE(
            NULLIF(current_setting('app.current_user_id', true), '')::uuid,
            '00000000-0000-0000-0000-000000000000'::uuid
        )
    )
    WITH CHECK (
        user_id = COALESCE(
            NULLIF(current_setting('app.current_user_id', true), '')::uuid,
            '00000000-0000-0000-0000-000000000000'::uuid
        )
    );

-- 2. Products
DROP POLICY IF EXISTS products_isolation_policy ON products;
CREATE POLICY products_isolation_policy ON products
    FOR ALL
    USING (
        user_id = COALESCE(
            NULLIF(current_setting('app.current_user_id', true), '')::uuid,
            '00000000-0000-0000-0000-000000000000'::uuid
        )
    )
    WITH CHECK (
        user_id = COALESCE(
            NULLIF(current_setting('app.current_user_id', true), '')::uuid,
            '00000000-0000-0000-0000-000000000000'::uuid
        )
    );

-- 3. Categories
DROP POLICY IF EXISTS categories_isolation_policy ON categories;
CREATE POLICY categories_isolation_policy ON categories
    FOR ALL
    USING (
        user_id = COALESCE(
            NULLIF(current_setting('app.current_user_id', true), '')::uuid,
            '00000000-0000-0000-0000-000000000000'::uuid
        )
    )
    WITH CHECK (
        user_id = COALESCE(
            NULLIF(current_setting('app.current_user_id', true), '')::uuid,
            '00000000-0000-0000-0000-000000000000'::uuid
        )
    );

-- 4. Channels
DROP POLICY IF EXISTS channels_isolation_policy ON channels;
CREATE POLICY channels_isolation_policy ON channels
    FOR ALL
    USING (
        user_id = COALESCE(
            NULLIF(current_setting('app.current_user_id', true), '')::uuid,
            '00000000-0000-0000-0000-000000000000'::uuid
        )
    )
    WITH CHECK (
        user_id = COALESCE(
            NULLIF(current_setting('app.current_user_id', true), '')::uuid,
            '00000000-0000-0000-0000-000000000000'::uuid
        )
    );

COMMENT ON POLICY transactions_isolation_policy ON transactions IS 'Isolate transactions by user_id using app.current_user_id session variable with COALESCE fallback';
COMMENT ON POLICY products_isolation_policy ON products IS 'Isolate products by user_id using app.current_user_id session variable with COALESCE fallback';
COMMENT ON POLICY categories_isolation_policy ON categories IS 'Isolate categories by user_id using app.current_user_id session variable with COALESCE fallback';
COMMENT ON POLICY channels_isolation_policy ON channels IS 'Isolate channels by user_id using app.current_user_id session variable with COALESCE fallback';
