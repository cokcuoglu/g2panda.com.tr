-- 20_fix_rls_policies.sql
-- Ensure all RLS policies are correctly configured

-- Grant app_user role permissions if not already granted
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;

-- Recreate RLS policies with correct syntax
-- Drop existing policies
DROP POLICY IF EXISTS menu_categories_isolation_policy ON menu_categories;
DROP POLICY IF EXISTS categories_isolation_policy ON categories;
DROP POLICY IF EXISTS channels_isolation_policy ON channels;
DROP POLICY IF EXISTS products_isolation_policy ON products;
DROP POLICY IF EXISTS transactions_isolation_policy ON transactions;

-- Recreate policies for menu_categories
CREATE POLICY menu_categories_isolation_policy ON menu_categories
    FOR ALL
    USING (user_id = current_setting('app.current_user_id', true)::uuid)
    WITH CHECK (user_id = current_setting('app.current_user_id', true)::uuid);

-- Recreate policies for categories
CREATE POLICY categories_isolation_policy ON categories
    FOR ALL
    USING (user_id = current_setting('app.current_user_id', true)::uuid)
    WITH CHECK (user_id = current_setting('app.current_user_id', true)::uuid);

-- Recreate policies for channels
CREATE POLICY channels_isolation_policy ON channels
    FOR ALL
    USING (user_id = current_setting('app.current_user_id', true)::uuid)
    WITH CHECK (user_id = current_setting('app.current_user_id', true)::uuid);

-- Recreate policies for products
CREATE POLICY products_isolation_policy ON products
    FOR ALL
    USING (user_id = current_setting('app.current_user_id', true)::uuid)
    WITH CHECK (user_id = current_setting('app.current_user_id', true)::uuid);

-- Recreate policies for transactions
CREATE POLICY transactions_isolation_policy ON transactions
    FOR ALL
    USING (user_id = current_setting('app.current_user_id', true)::uuid)
    WITH CHECK (user_id = current_setting('app.current_user_id', true)::uuid);

-- Ensure RLS is enabled
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Force RLS (even for table owner)
ALTER TABLE menu_categories FORCE ROW LEVEL SECURITY;
ALTER TABLE categories FORCE ROW LEVEL SECURITY;
ALTER TABLE channels FORCE ROW LEVEL SECURITY;
ALTER TABLE products FORCE ROW LEVEL SECURITY;
ALTER TABLE transactions FORCE ROW LEVEL SECURITY;

COMMENT ON POLICY menu_categories_isolation_policy ON menu_categories IS 'Isolate menu categories by user_id using app.current_user_id session variable';
COMMENT ON POLICY categories_isolation_policy ON categories IS 'Isolate categories by user_id using app.current_user_id session variable';
COMMENT ON POLICY channels_isolation_policy ON channels IS 'Isolate channels by user_id using app.current_user_id session variable';
COMMENT ON POLICY products_isolation_policy ON products IS 'Isolate products by user_id using app.current_user_id session variable';
COMMENT ON POLICY transactions_isolation_policy ON transactions IS 'Isolate transactions by user_id using app.current_user_id session variable';
