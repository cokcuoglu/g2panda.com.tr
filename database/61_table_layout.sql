-- =====================================================
-- TABLE LAYOUT & ORDER MANAGEMENT MODULE
-- =====================================================

-- 1. Create enum types if they don't exist
DO $$ BEGIN
    CREATE TYPE table_type AS ENUM ('round', 'square', 'rectangle', 'lshape');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE table_status AS ENUM ('available', 'active');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Create tables table
CREATE TABLE IF NOT EXISTS tables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    unique_code VARCHAR(12) NOT NULL,
    name VARCHAR(100) NOT NULL,
    type table_type NOT NULL DEFAULT 'square',
    rotation INTEGER NOT NULL DEFAULT 0,
    capacity INTEGER NOT NULL DEFAULT 2,
    area VARCHAR(100),
    status table_status NOT NULL DEFAULT 'available',
    pos_x FLOAT NOT NULL DEFAULT 0,
    pos_y FLOAT NOT NULL DEFAULT 0,
    deleted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Unique index per tenant for table codes
CREATE UNIQUE INDEX IF NOT EXISTS tables_unique_code_idx ON tables (user_id, unique_code) WHERE deleted_at IS NULL;

-- 3. Update orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS table_id UUID REFERENCES tables(id) ON DELETE SET NULL;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS table_code VARCHAR(12);

-- 4. Enable RLS
ALTER TABLE tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE tables FORCE ROW LEVEL SECURITY;

-- 5. Create RLS Policy
DROP POLICY IF EXISTS tables_isolation_policy ON tables;
CREATE POLICY tables_isolation_policy ON tables
    FOR ALL
    TO app_user, public
    USING (user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid)
    WITH CHECK (user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid);

-- 6. Grant permissions to app_user (if and when new tables are created)
GRANT ALL PRIVILEGES ON tables TO app_user;
