
-- =====================================================
-- FINAL RLS ENFORCEMENT - ISOLATION ARCHITECTURE
-- =====================================================
-- Strategy: Shared Database, Shared Schema, Row Level Security
-- Enforcement: DATABASE LEVEL (Policy > App Logic)
-- Context: app.current_user_id
-- Role: app_user (Low Privilege)

-- 1. Create specific application role (if not exists)
-- This role has NO INHERITANCE and NO SUPERUSER status
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_user') THEN
        CREATE ROLE app_user NOLOGIN;
    END IF;
END
$$;

-- 2. Grant basic usage (Permissions)
GRANT CONNECT ON DATABASE "postgres" TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO app_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO app_user;

-- 3. Define the list of Tenant-Owned tables
-- We will loop or explicitly apply policies to each.
-- Tables: users, categories, channels, fixed_expenses, transactions, products

-- =====================================================
-- REUSABLE MACROS / FUNCTIONS (Optional, but we use explicit DDL here for clarity)
-- =====================================================

-- =====================================================
-- TABLE: USERS
-- isolation: User can only see/edit themselves
-- =====================================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE users FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS users_isolation_policy ON users;

CREATE POLICY users_isolation_policy ON users
    FOR ALL
    TO app_user, public
    USING (id = NULLIF(current_setting('app.current_user_id', true), '')::uuid)
    WITH CHECK (id = NULLIF(current_setting('app.current_user_id', true), '')::uuid);


-- =====================================================
-- TABLE: PRODUCTS
-- isolation: Tenant can only touch rows with their user_id
-- =====================================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE products FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS products_isolation_policy ON products;

CREATE POLICY products_isolation_policy ON products
    FOR ALL
    TO app_user, public
    USING (user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid)
    WITH CHECK (user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid);


-- =====================================================
-- TABLE: TRANSACTIONS
-- =====================================================
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS transactions_isolation_policy ON transactions;

CREATE POLICY transactions_isolation_policy ON transactions
    FOR ALL
    TO app_user, public
    USING (user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid)
    WITH CHECK (user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid);


-- =====================================================
-- TABLE: CATEGORIES
-- =====================================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS categories_isolation_policy ON categories;

CREATE POLICY categories_isolation_policy ON categories
    FOR ALL
    TO app_user, public
    USING (user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid)
    WITH CHECK (user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid);


-- =====================================================
-- TABLE: CHANNELS
-- =====================================================
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE channels FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS channels_isolation_policy ON channels;

CREATE POLICY channels_isolation_policy ON channels
    FOR ALL
    TO app_user, public
    USING (user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid)
    WITH CHECK (user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid);


-- =====================================================
-- TABLE: FIXED_EXPENSES
-- =====================================================
ALTER TABLE fixed_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE fixed_expenses FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS fixed_expenses_isolation_policy ON fixed_expenses;

CREATE POLICY fixed_expenses_isolation_policy ON fixed_expenses
    FOR ALL
    TO app_user, public
    USING (user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid)
    WITH CHECK (user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid);

-- =====================================================
-- VERIFICATION NOTE
-- =====================================================
-- Since we use FORCE ROW LEVEL SECURITY, even the table owner 
-- (if they connect via app_user role) will be restricted.
-- AND we switch to app_user in middleware.
