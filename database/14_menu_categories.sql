-- Create menu_categories table for hierarchical menu management
CREATE TABLE IF NOT EXISTS menu_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    parent_id UUID REFERENCES menu_categories(id),
    level INT NOT NULL CHECK (level BETWEEN 1 AND 5),
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_menu_categories_user_id ON menu_categories(user_id);
CREATE INDEX idx_menu_categories_parent_id ON menu_categories(parent_id);
CREATE INDEX idx_menu_categories_sort_order ON menu_categories(sort_order);

-- Enable RLS
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only see and manage their own categories
CREATE POLICY menu_categories_isolation_policy ON menu_categories
    USING (user_id = current_setting('app.current_user_id', true)::uuid);
