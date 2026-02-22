-- =====================================================
-- Inventory Management Module - Raw Materials Table
-- =====================================================
-- Migration: 70_inventory_raw_materials.sql
-- Purpose: Create raw materials table for inventory tracking
-- =====================================================

-- Create raw_materials table
CREATE TABLE IF NOT EXISTS raw_materials (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Ownership
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Material details
    name VARCHAR(255) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    
    -- Stock level thresholds
    critical_stock_level NUMERIC(10,2) DEFAULT 0,
    min_stock_level NUMERIC(10,2) DEFAULT 0,
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    
    -- Audit fields
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    
    -- Constraints
    CONSTRAINT raw_materials_unit_check CHECK (unit IN ('adet', 'litre', 'kilo', 'gram', 'ml')),
    CONSTRAINT raw_materials_critical_check CHECK (critical_stock_level >= 0),
    CONSTRAINT raw_materials_min_check CHECK (min_stock_level >= 0)
);

-- Performance indexes
CREATE INDEX IF NOT EXISTS raw_materials_user_id_idx ON raw_materials(user_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS raw_materials_active_idx ON raw_materials(user_id, is_active) WHERE deleted_at IS NULL;

-- Enable RLS
ALTER TABLE raw_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE raw_materials FORCE ROW LEVEL SECURITY;

-- RLS Policy: User isolation
CREATE POLICY raw_materials_isolation ON raw_materials
    FOR ALL
    USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON raw_materials TO app_user;

-- Comments
COMMENT ON TABLE raw_materials IS 'Raw materials/ingredients for inventory management';
COMMENT ON COLUMN raw_materials.critical_stock_level IS 'Critical stock level threshold for alerts (red warning)';
COMMENT ON COLUMN raw_materials.min_stock_level IS 'Minimum stock level threshold for warnings (yellow warning)';
COMMENT ON COLUMN raw_materials.unit IS 'Measurement unit: adet, litre, kilo, gram, ml';
