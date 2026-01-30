-- 21_add_product_columns.sql
-- Add missing columns to products table

-- Add description column
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS description TEXT;

-- Add image_url column if not exists
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS image_url VARCHAR(500);

-- Add updated_at column for consistency
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Comments
COMMENT ON COLUMN products.description IS 'Product description for digital menu';
COMMENT ON COLUMN products.image_url IS 'Product image URL path';
