-- Add order type and discount fields to orders table
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS order_type VARCHAR(20) DEFAULT 'dine-in',
ADD COLUMN IF NOT EXISTS base_amount NUMERIC(15,2),
ADD COLUMN IF NOT EXISTS discount_amount NUMERIC(15,2) DEFAULT 0;

COMMENT ON COLUMN orders.order_type IS 'dine-in or takeaway';
COMMENT ON COLUMN orders.base_amount IS 'The original total amount before any discounts';
COMMENT ON COLUMN orders.discount_amount IS 'The total discount applied to this order';
