-- =====================================================
-- 52_campaign_module.sql
-- Purpose: Add support for Campaign Sets (product bundles) and reporting
-- =====================================================

-- 1. Create campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    unique_code VARCHAR(50) NOT NULL,
    description TEXT,
    discount_amount NUMERIC(15,2) DEFAULT 0,
    discount_type VARCHAR(10) DEFAULT 'amount', -- 'amount' or 'percent'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    
    CONSTRAINT campaigns_discount_type_check CHECK (discount_type IN ('amount', 'percent')),
    CONSTRAINT campaigns_unique_code_user_idx UNIQUE (user_id, unique_code)
);

-- 2. Create campaign_products table (Many-to-Many with Products)
CREATE TABLE IF NOT EXISTS campaign_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    
    CONSTRAINT campaign_items_quantity_check CHECK (quantity > 0)
);

-- 3. Update transactions table to link to campaigns for reporting
ALTER TABLE transactions 
ADD COLUMN IF NOT EXISTS campaign_id UUID REFERENCES campaigns(id),
ADD COLUMN IF NOT EXISTS campaign_code VARCHAR(50);

-- 4. Enable RLS
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns FORCE ROW LEVEL SECURITY;

ALTER TABLE campaign_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_products FORCE ROW LEVEL SECURITY;

-- 5. Policies
CREATE POLICY campaigns_isolation ON campaigns
    FOR ALL TO app_user
    USING (user_id = current_setting('app.current_user_id', true)::uuid)
    WITH CHECK (user_id = current_setting('app.current_user_id', true)::uuid);

CREATE POLICY campaign_products_isolation ON campaign_products
    FOR ALL TO app_user
    USING (EXISTS (
        SELECT 1 FROM campaigns c 
        WHERE c.id = campaign_products.campaign_id 
        AND c.user_id = current_setting('app.current_user_id', true)::uuid
    ))
    WITH CHECK (EXISTS (
        SELECT 1 FROM campaigns c 
        WHERE c.id = campaign_products.campaign_id 
        AND c.user_id = current_setting('app.current_user_id', true)::uuid
    ));

-- 6. Indexes
CREATE INDEX IF NOT EXISTS campaigns_user_id_idx ON campaigns(user_id);
CREATE INDEX IF NOT EXISTS campaign_products_campaign_id_idx ON campaign_products(campaign_id);
CREATE INDEX IF NOT EXISTS transactions_campaign_id_idx ON transactions(campaign_id);
CREATE INDEX IF NOT EXISTS transactions_campaign_code_idx ON transactions(campaign_code);

-- 7. Grant Permissions
GRANT ALL ON campaigns TO app_user;
GRANT ALL ON campaign_products TO app_user;
