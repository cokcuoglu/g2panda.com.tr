-- =====================================================
-- Inventory Management Module - Stock Movements Table
-- =====================================================
-- Migration: 73_inventory_stock_movements.sql
-- Purpose: Track all stock movements (in/out/adjustments) for audit trail
-- =====================================================

-- Create stock_movements table
CREATE TABLE IF NOT EXISTS stock_movements (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Ownership
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Material reference
    raw_material_id UUID NOT NULL REFERENCES raw_materials(id) ON DELETE CASCADE,
    
    -- Stock entry reference (for FIFO tracking)
    stock_entry_id UUID REFERENCES raw_material_stock_entries(id) ON DELETE SET NULL,
    
    -- Movement details
    movement_type VARCHAR(20) NOT NULL,
    quantity NUMERIC(10,2) NOT NULL,
    remaining_quantity NUMERIC(10,2) NOT NULL, -- Snapshot of total stock after movement
    
    -- Reference tracking
    reference_type VARCHAR(50),
    reference_id UUID,
    
    -- Notes
    notes TEXT,
    
    -- Audit
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT movements_type_check CHECK (movement_type IN ('in', 'out', 'adjustment', 'expired', 'waste')),
    CONSTRAINT movements_quantity_nonzero CHECK (quantity != 0)
);

-- Performance indexes
CREATE INDEX IF NOT EXISTS movements_user_id_idx ON stock_movements(user_id);
CREATE INDEX IF NOT EXISTS movements_material_idx ON stock_movements(raw_material_id);
CREATE INDEX IF NOT EXISTS movements_entry_idx ON stock_movements(stock_entry_id);
CREATE INDEX IF NOT EXISTS movements_reference_idx ON stock_movements(reference_type, reference_id);
CREATE INDEX IF NOT EXISTS movements_created_idx ON stock_movements(created_at DESC);

-- Enable RLS
ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements FORCE ROW LEVEL SECURITY;

-- RLS Policy: User isolation
CREATE POLICY movements_isolation ON stock_movements
    FOR ALL
    USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON stock_movements TO app_user;

-- Comments
COMMENT ON TABLE stock_movements IS 'Audit trail for all stock movements';
COMMENT ON COLUMN stock_movements.movement_type IS 'Type: in (entry), out (sale/usage), adjustment (manual), expired, waste';
COMMENT ON COLUMN stock_movements.remaining_quantity IS 'Snapshot of total stock remaining after this movement';
COMMENT ON COLUMN stock_movements.reference_type IS 'Source of movement: sale, order, manual, fixed_expense, etc.';
COMMENT ON COLUMN stock_movements.reference_id IS 'ID of the source record (order_id, transaction_id, etc.)';
