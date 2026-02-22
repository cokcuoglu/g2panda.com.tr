-- =====================================================
-- Inventory Management Module - Product Ingredients Table
-- =====================================================
-- Migration: 72_inventory_product_ingredients.sql
-- Purpose: Define product recipes (which raw materials are needed)
-- =====================================================

-- Create product_ingredients table
CREATE TABLE IF NOT EXISTS product_ingredients (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- References
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    raw_material_id UUID NOT NULL REFERENCES raw_materials(id) ON DELETE CASCADE,
    
    -- Recipe details
    quantity_required NUMERIC(10,2) NOT NULL,
    
    -- Audit
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT ingredients_quantity_positive CHECK (quantity_required > 0),
    CONSTRAINT ingredients_unique_per_product UNIQUE(product_id, raw_material_id)
);

-- Performance indexes
CREATE INDEX IF NOT EXISTS ingredients_product_idx ON product_ingredients(product_id);
CREATE INDEX IF NOT EXISTS ingredients_material_idx ON product_ingredients(raw_material_id);

-- Enable RLS
ALTER TABLE product_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_ingredients FORCE ROW LEVEL SECURITY;

-- RLS Policy: User isolation via product
CREATE POLICY ingredients_isolation ON product_ingredients
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM products p 
            WHERE p.id = product_ingredients.product_id 
            AND p.user_id = current_setting('app.current_user_id', true)::uuid
        )
    );

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON product_ingredients TO app_user;

-- Comments
COMMENT ON TABLE product_ingredients IS 'Product recipes - defines which raw materials are needed for each product';
COMMENT ON COLUMN product_ingredients.quantity_required IS 'Amount of raw material needed per unit of product';
COMMENT ON CONSTRAINT ingredients_unique_per_product ON product_ingredients IS 'Each raw material can only appear once per product';
