-- Strict RLS Enforcement

-- 1. Ensure app_user is humble
ALTER ROLE app_user WITH NOBYPASSRLS NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION;

-- 2. Force RLS on Tables
-- This ensures RLS applies even to the table owner (if app_user ever becomes one)
ALTER TABLE products FORCE ROW LEVEL SECURITY;
ALTER TABLE categories FORCE ROW LEVEL SECURITY;
ALTER TABLE channels FORCE ROW LEVEL SECURITY;

-- 3. Re-Verify Policies (Just to be sure)
-- (Policies are already there from step 28)

-- 4. Grant usage just in case
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;
