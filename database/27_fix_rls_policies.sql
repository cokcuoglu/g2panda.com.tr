-- Fix RLS Policies for Core Tables

-- 1. Products
DROP POLICY IF EXISTS products_isolation_policy ON products;
CREATE POLICY products_isolation_policy ON products
    FOR ALL
    USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- 2. Categories
DROP POLICY IF EXISTS categories_isolation_policy ON categories;
CREATE POLICY categories_isolation_policy ON categories
    FOR ALL
    USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- 3. Channels
DROP POLICY IF EXISTS channels_isolation_policy ON channels;
CREATE POLICY channels_isolation_policy ON channels
    FOR ALL
    USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- 4. Enable RLS (just in case)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
