-- Add menu_category_id to products
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS menu_category_id UUID REFERENCES menu_categories(id);

-- Add sort_order to products if not exists
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0;

-- Index for fast lookup
CREATE INDEX IF NOT EXISTS idx_products_menu_category_id ON products(menu_category_id);
