-- =====================================================
-- MASTER RLS ENFORCEMENT SCRIPT
-- Purpose: Strict Multi-Tenant Isolation for G2Panda
-- =====================================================

-- 1. Ensure app_user is restricted
ALTER ROLE app_user WITH NOBYPASSRLS NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION;

-- 2. Drop all existing policies on all user-facing tables
DO $$
DECLARE
    t text;
    pol text;
BEGIN
    FOR t IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
        FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = t LOOP
            EXECUTE format('DROP POLICY IF EXISTS %I ON %I', pol, t);
        END LOOP;
    END LOOP;
END $$;

-- 3. Enable RLS and Force it for owners
DO $$
DECLARE
    t text;
BEGIN
    FOR t IN VALUES 
        ('users'), ('categories'), ('channels'), ('transactions'), 
        ('fixed_expenses'), ('ocr_records'), ('products'), 
        ('orders'), ('customers'), ('transaction_items'),
        ('transaction_vat_breakdown')
    LOOP
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
        EXECUTE format('ALTER TABLE %I FORCE ROW LEVEL SECURITY', t);
        EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON %I TO app_user', t);
    END LOOP;
END $$;

-- 4. Create Isolation Policies (Direct user_id check)
DO $$
DECLARE
    t text;
BEGIN
    FOR t IN VALUES 
        ('users'), ('categories'), ('channels'), ('transactions'), 
        ('fixed_expenses'), ('ocr_records'), ('products'), 
        ('orders'), ('customers')
    LOOP
        EXECUTE format('CREATE POLICY %I_isolation ON %I AS PERMISSIVE FOR ALL TO app_user USING (user_id = current_setting(''app.current_user_id'', true)::uuid)', t, t);
    END LOOP;
END $$;

-- 5. Create Isolation Policies (Indirect via parent link)
-- transaction_items -> linked via transaction_id OR ocr_record_id
CREATE POLICY transaction_items_isolation ON transaction_items
    AS PERMISSIVE FOR ALL TO app_user
    USING (
        EXISTS (SELECT 1 FROM transactions t WHERE t.id = transaction_id)
        OR EXISTS (SELECT 1 FROM ocr_records o WHERE o.id = ocr_record_id)
    );

-- transaction_vat_breakdown -> linked via transaction_id
CREATE POLICY transaction_vat_breakdown_isolation ON transaction_vat_breakdown
    AS PERMISSIVE FOR ALL TO app_user
    USING (EXISTS (SELECT 1 FROM transactions t WHERE t.id = transaction_id));

-- 6. Verify and Log
ANALYZE;
