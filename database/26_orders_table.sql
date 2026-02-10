-- =====================================================
-- TABLE: orders
-- =====================================================
-- Purpose: Store incoming orders from QR Menu
-- Status: Pending -> Confirmed -> Completed (Transaction Created) or Rejected

CREATE TABLE IF NOT EXISTS orders (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Ownership (The business/merchant)
    user_id UUID NOT NULL,
    
    -- Order details
    order_number VARCHAR(20) NOT NULL, -- e.g., "ORD-1234"
    table_number VARCHAR(50),          -- Optional table identifier
    
    -- JSONB for flexible item storage (since items might change over time)
    -- Structure: [{ "id": "uuid", "name": "Burger", "price": 150, "quantity": 2, "options": [] }]
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    
    total_amount NUMERIC(15,2) NOT NULL DEFAULT 0,
    
    -- Status pipeline
    status VARCHAR(20) NOT NULL DEFAULT 'pending', 
    -- 'pending': Customer submitted
    -- 'confirmed': Merchant saw it (optional step)
    -- 'completed': Merchant accepted & finalized (Transaction created)
    -- 'rejected': Merchant cancelled
    
    note TEXT,
    
    -- Audit fields
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    
    -- Constraints
    CONSTRAINT orders_status_check CHECK (status IN ('pending', 'confirmed', 'completed', 'rejected', 'cancelled')),
    
    -- Foreign keys
    CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) 
        REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX IF NOT EXISTS orders_user_status_idx ON orders (user_id, status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS orders_user_date_idx ON orders (user_id, created_at DESC) WHERE deleted_at IS NULL;
