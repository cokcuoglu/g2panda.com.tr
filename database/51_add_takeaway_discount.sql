-- Add takeaway discount percentage column to products
ALTER TABLE products
ADD COLUMN IF NOT EXISTS takeaway_discount_percent DECIMAL(5,2) DEFAULT 0 
CHECK (takeaway_discount_percent >= 0 AND takeaway_discount_percent <= 100);

COMMENT ON COLUMN products.takeaway_discount_percent IS 'Percentage discount for takeaway orders (0-100)';
