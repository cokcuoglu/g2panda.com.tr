-- =====================================================
-- GG_Esnaf - Data Security & RLS Policies
-- =====================================================
-- Purpose: Row Level Security (RLS) implementation
-- Security Model: "Shared Database, Shared Schema"
-- Strategy:
-- 1. Enable RLS on all tables
-- 2. Create policies to enforce `user_id` isolation
-- 3. Use `app.current_user_id` session variable for auth
-- =====================================================

-- =====================================================
-- 1. Enable RLS on All Tables
-- =====================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE fixed_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 2. Define Policies
-- =====================================================

-- NOTE: We use current_setting('app.current_user_id', true)
-- 'true' as second argument handles cases where variable is not set (returns NULL)
-- If it returns NULL, the policy evaluates to NULL/False, blocking access (Safe Default)

-- -----------------------------------------------------
-- Table: users
-- Rule: Users can only see and edit their own profile
-- -----------------------------------------------------

CREATE POLICY users_isolation_policy ON users
    FOR ALL
    USING (id = current_setting('app.current_user_id', true)::uuid)
    WITH CHECK (id = current_setting('app.current_user_id', true)::uuid);
    
-- Exception: Allow inserting a new user during registration (if not authenticated)
-- This might need adjustment based on exact auth flow (e.g. usage of a service role)

-- -----------------------------------------------------
-- Table: categories
-- Rule: Users can only see their own categories
-- -----------------------------------------------------

CREATE POLICY categories_isolation_policy ON categories
    FOR ALL
    USING (user_id = current_setting('app.current_user_id', true)::uuid)
    WITH CHECK (user_id = current_setting('app.current_user_id', true)::uuid);

-- -----------------------------------------------------
-- Table: channels
-- Rule: Users can only see their own channels
-- -----------------------------------------------------

CREATE POLICY channels_isolation_policy ON channels
    FOR ALL
    USING (user_id = current_setting('app.current_user_id', true)::uuid)
    WITH CHECK (user_id = current_setting('app.current_user_id', true)::uuid);

-- -----------------------------------------------------
-- Table: fixed_expenses
-- Rule: Users can only see their own fixed expenses
-- -----------------------------------------------------

CREATE POLICY fixed_expenses_isolation_policy ON fixed_expenses
    FOR ALL
    USING (user_id = current_setting('app.current_user_id', true)::uuid)
    WITH CHECK (user_id = current_setting('app.current_user_id', true)::uuid);

-- -----------------------------------------------------
-- Table: transactions
-- Rule: Users can only see their own transactions
-- -----------------------------------------------------

CREATE POLICY transactions_isolation_policy ON transactions
    FOR ALL
    USING (user_id = current_setting('app.current_user_id', true)::uuid)
    WITH CHECK (user_id = current_setting('app.current_user_id', true)::uuid);

-- =====================================================
-- 3. Testing RLS (Example Usage for Backend)
-- =====================================================
/*
    -- Backend Transaction Example (Node.js / pg):
    
    BEGIN;
    
    -- 1. Set the context for the current session/transaction
    SET LOCAL app.current_user_id = 'user-uuid-here';
    
    -- 2. Run queries (RLS automatically filters results)
    SELECT * FROM transactions; -- Returns only this user's data
    
    -- 3. Security Check
    -- If hacker tries: SELECT * FROM transactions WHERE user_id = 'other-user';
    -- RLS returns 0 rows.
    
    COMMIT;
*/

-- =====================================================
-- 4. Bypass RLS (For Admin / Service Role)
-- =====================================================
-- Altering the database user to bypass RLS (Be careful!)
-- ALTER ROLE postgres BYPASSRLS;

-- Or for specific tables in migration scripts:
-- ALTER TABLE users DISABLE ROW LEVEL SECURITY;
