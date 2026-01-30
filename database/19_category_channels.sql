-- 19_category_channels.sql
-- Add channel association support to categories

-- Add default_channel_id column to categories table
ALTER TABLE categories 
ADD COLUMN default_channel_id UUID DEFAULT NULL;

-- Add foreign key constraint
ALTER TABLE categories
ADD CONSTRAINT categories_default_channel_id_fkey 
FOREIGN KEY (default_channel_id) REFERENCES channels(id) ON DELETE SET NULL;

-- Create category_channels junction table for many-to-many relationship
CREATE TABLE IF NOT EXISTS category_channels (
    category_id UUID NOT NULL,
    channel_id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Primary key (composite)
    PRIMARY KEY (category_id, channel_id),
    
    -- Foreign keys
    CONSTRAINT category_channels_category_id_fkey 
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    CONSTRAINT category_channels_channel_id_fkey 
        FOREIGN KEY (channel_id) REFERENCES channels(id) ON DELETE CASCADE
);

-- Create indexes for performance
CREATE INDEX category_channels_category_id_idx ON category_channels (category_id);
CREATE INDEX category_channels_channel_id_idx ON category_channels (channel_id);

-- Comments
COMMENT ON COLUMN categories.default_channel_id IS 'Default payment channel for income categories (auto-selected in transaction form)';
COMMENT ON TABLE category_channels IS 'Many-to-many relationship between categories and allowed payment channels';
