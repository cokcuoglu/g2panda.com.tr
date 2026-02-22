-- Add archived_at column to orders table for archive tracking
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS archived_at TIMESTAMP DEFAULT NULL;

-- Create index for efficient archive queries
CREATE INDEX IF NOT EXISTS idx_orders_archived_at 
ON orders(user_id, archived_at) 
WHERE archived_at IS NOT NULL;

-- Create index for today's orders queries
CREATE INDEX IF NOT EXISTS idx_orders_today 
ON orders(user_id, created_at) 
WHERE archived_at IS NULL;
