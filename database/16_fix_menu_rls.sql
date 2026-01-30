-- Fix RLS Policy for menu_categories
-- Replaces undefined auth.uid() with current_setting('app.current_user_id', true)::uuid

DO $$
BEGIN
    -- Drop existing policy if it exists
    DROP POLICY IF EXISTS menu_categories_isolation_policy ON menu_categories;

    -- Create corrected policy
    CREATE POLICY menu_categories_isolation_policy ON menu_categories
        FOR ALL
        TO app_user, public, current_user
        USING (user_id = current_setting('app.current_user_id', true)::uuid)
        WITH CHECK (user_id = current_setting('app.current_user_id', true)::uuid);

    -- Ensure RLS is enforced
    ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
    ALTER TABLE menu_categories FORCE ROW LEVEL SECURITY;

END $$;
