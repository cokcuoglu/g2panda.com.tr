-- =====================================================
-- Inventory Management Module - Stock Entries Table
-- =====================================================
-- Migration: 71_inventory_stock_entries.sql
-- Purpose: Track individual stock entries with expiration dates
-- =====================================================

-- Create raw_material_stock_entries table
CREATE TABLE IF NOT EXISTS raw_material_stock_entries (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Ownership
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Material reference
    raw_material_id UUID NOT NULL REFERENCES raw_materials(id) ON DELETE CASCADE,
    
    -- Entry details
    quantity NUMERIC(10,2) NOT NULL,
    remaining_quantity NUMERIC(10,2) NOT NULL, -- For FIFO tracking
    unit_price NUMERIC(10,2),
    
    -- Expiration tracking
    expiration_date DATE,
    
    -- Entry metadata
    entry_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    notes TEXT,
    
    -- Integration with fixed expenses
    fixed_expense_id UUID REFERENCES fixed_expenses(id) ON DELETE SET NULL,
    
    -- Audit
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT stock_entries_quantity_positive CHECK (quantity > 0),
    CONSTRAINT stock_entries_remaining_valid CHECK (remaining_quantity >= 0 AND remaining_quantity <= quantity),
    CONSTRAINT stock_entries_unit_price_positive CHECK (unit_price IS NULL OR unit_price >= 0)
);

-- Performance indexes
CREATE INDEX IF NOT EXISTS stock_entries_user_id_idx ON raw_material_stock_entries(user_id);
CREATE INDEX IF NOT EXISTS stock_entries_material_idx ON raw_material_stock_entries(raw_material_id);
CREATE INDEX IF NOT EXISTS stock_entries_expiration_idx ON raw_material_stock_entries(expiration_date) 
    WHERE expiration_date IS NOT NULL AND remaining_quantity > 0;
CREATE INDEX IF NOT EXISTS stock_entries_remaining_idx ON raw_material_stock_entries(raw_material_id, remaining_quantity)
    WHERE remaining_quantity > 0;

-- Enable RLS
ALTER TABLE raw_material_stock_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE raw_material_stock_entries FORCE ROW LEVEL SECURITY;

-- RLS Policy: User isolation
CREATE POLICY stock_entries_isolation ON raw_material_stock_entries
    FOR ALL
    USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON raw_material_stock_entries TO app_user;

-- Comments
COMMENT ON TABLE raw_material_stock_entries IS 'Individual stock entries for raw materials with FIFO tracking';
COMMENT ON COLUMN raw_material_stock_entries.remaining_quantity IS 'Remaining quantity for FIFO deduction (starts equal to quantity)';
COMMENT ON COLUMN raw_material_stock_entries.expiration_date IS 'Optional expiration date for perishable items';
COMMENT ON COLUMN raw_material_stock_entries.fixed_expense_id IS 'Link to fixed expense if stock was added via expense entry';
