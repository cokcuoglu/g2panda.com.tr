-- Create Customers Table

CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL, -- Merchant ID
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50), 
    address TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,

    CONSTRAINT customers_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Unique constraint for phone per merchant to prevent duplicates
-- Use a unique index that ignores deleted records
CREATE UNIQUE INDEX customers_user_phone_unique_idx 
ON customers (user_id, phone) 
WHERE deleted_at IS NULL AND phone IS NOT NULL AND phone <> '';

-- Enable RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- RLS Policy
CREATE POLICY "policy_customers_isolation" ON customers
    FOR ALL
    USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON customers TO app_user;
