-- Nuke and Fix RLS Policies
-- This script drops ALL policies on specific tables and recreates them cleanly.

DO $$
DECLARE
    pol record;
BEGIN
    -- 1. Drop all policies on products
    FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'products' LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON products', pol.policyname);
    END LOOP;

    -- 2. Drop all policies on categories
    FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'categories' LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON categories', pol.policyname);
    END LOOP;

    -- 3. Drop all policies on channels
    FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'channels' LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON channels', pol.policyname);
    END LOOP;
END $$;

-- 4. Re-Initialize RLS on tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;

-- 5. Create Standard Isolation Policies
-- Using a distinct name to avoid confusion with old ones

-- Products
CREATE POLICY "policy_products_isolation_v2" ON products
    FOR ALL
    USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- Categories
CREATE POLICY "policy_categories_isolation_v2" ON categories
    FOR ALL
    USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- Channels
CREATE POLICY "policy_channels_isolation_v2" ON channels
    FOR ALL
    USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- 6. Grant Permissions (Ensuring app_user can access)
GRANT SELECT, INSERT, UPDATE, DELETE ON products TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON categories TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON channels TO app_user;
