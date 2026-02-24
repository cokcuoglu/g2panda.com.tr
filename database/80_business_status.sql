-- Add business status columns to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_open BOOLEAN DEFAULT TRUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_opened_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_closed_at TIMESTAMP WITH TIME ZONE;

-- Performance index for real-time stats (if not exists)
CREATE INDEX IF NOT EXISTS idx_users_is_open ON users(is_open);
