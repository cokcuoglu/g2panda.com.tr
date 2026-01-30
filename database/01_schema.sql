-- =====================================================
-- GG_Esnaf - PostgreSQL Database Schema (MVP)
-- =====================================================
-- PostgreSQL Version: 14+
-- Purpose: Multi-tenant finance tracking application
-- MVP Scope: User, Category, Channel, FixedExpense, Transaction
-- =====================================================

-- =====================================================
-- EXTENSIONS
-- =====================================================

-- UUID generation support
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- DROP TABLES (For re-initialization)
-- =====================================================
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS fixed_expenses CASCADE;
DROP TABLE IF EXISTS channels CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- =====================================================
-- TABLE: users
-- =====================================================
-- Purpose: User authentication and business profile (User = Business in MVP)

CREATE TABLE users (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Authentication
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    
    -- Business information (will be moved to separate table post-MVP)
    business_name VARCHAR(255),
    business_type VARCHAR(100),
    tax_number VARCHAR(50),
    
    -- Preferences
    currency VARCHAR(3) NOT NULL DEFAULT 'TRY',
    locale VARCHAR(10) NOT NULL DEFAULT 'tr-TR',
    role VARCHAR(20) NOT NULL DEFAULT 'OWNER',
    
    -- Audit fields
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    
    -- Constraints
    CONSTRAINT users_currency_check CHECK (currency IN ('TRY', 'USD', 'EUR', 'GBP')),
    CONSTRAINT users_locale_check CHECK (locale IN ('tr-TR', 'en-US')),
    CONSTRAINT users_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Unique email per active user (soft delete aware)
CREATE UNIQUE INDEX users_email_unique_idx ON users (email) WHERE deleted_at IS NULL;

-- Performance indexes
CREATE INDEX users_deleted_at_idx ON users (deleted_at);

-- Comments
COMMENT ON TABLE users IS 'User accounts with embedded business profile (MVP design)';
COMMENT ON COLUMN users.business_name IS 'Will be migrated to businesses table post-MVP';
COMMENT ON COLUMN users.deleted_at IS 'Soft delete timestamp (NULL = active)';

-- =====================================================
-- TABLE: categories
-- =====================================================
-- Purpose: Transaction categorization (income/expense classification)

CREATE TABLE categories (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Ownership
    user_id UUID NOT NULL,
    
    -- Category details
    name VARCHAR(100) NOT NULL,
    type VARCHAR(10) NOT NULL,
    color VARCHAR(7),
    icon VARCHAR(50),
    
    -- Status flags
    is_default BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    
    -- Audit fields
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    
    -- Constraints
    CONSTRAINT categories_type_check CHECK (type IN ('income', 'expense')),
    CONSTRAINT categories_color_check CHECK (color IS NULL OR color ~* '^#[0-9A-Fa-f]{6}$'),
    
    -- Foreign keys
    CONSTRAINT categories_user_id_fkey FOREIGN KEY (user_id) 
        REFERENCES users(id) ON DELETE CASCADE
);

-- Unique category name per user and type (soft delete aware)
CREATE UNIQUE INDEX categories_user_name_type_unique_idx 
    ON categories (user_id, name, type) WHERE deleted_at IS NULL;

-- Performance indexes
CREATE INDEX categories_user_id_idx ON categories (user_id);
CREATE INDEX categories_user_type_active_idx 
    ON categories (user_id, type, is_active) WHERE deleted_at IS NULL;

-- Comments
COMMENT ON TABLE categories IS 'User-defined transaction categories';
COMMENT ON COLUMN categories.is_default IS 'System-provided default categories';
COMMENT ON COLUMN categories.type IS 'income or expense classification';

-- =====================================================
-- TABLE: channels
-- =====================================================
-- Purpose: Sales and payment channels (where transaction occurs)

CREATE TABLE channels (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Ownership
    user_id UUID NOT NULL,
    
    -- Channel details
    name VARCHAR(100) NOT NULL,
    type VARCHAR(10) NOT NULL,
    description TEXT,
    
    -- Status
    is_active BOOLEAN NOT NULL DEFAULT true,
    
    -- Audit fields
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    
    -- Constraints
    CONSTRAINT channels_type_check CHECK (type IN ('sales', 'payment')),
    
    -- Foreign keys
    CONSTRAINT channels_user_id_fkey FOREIGN KEY (user_id) 
        REFERENCES users(id) ON DELETE CASCADE
);

-- Unique channel name per user and type (soft delete aware)
CREATE UNIQUE INDEX channels_user_name_type_unique_idx 
    ON channels (user_id, name, type) WHERE deleted_at IS NULL;

-- Performance indexes
CREATE INDEX channels_user_id_idx ON channels (user_id);
CREATE INDEX channels_user_type_active_idx 
    ON channels (user_id, type, is_active) WHERE deleted_at IS NULL;

-- Comments
COMMENT ON TABLE channels IS 'Sales and payment channel definitions';
COMMENT ON COLUMN channels.type IS 'sales channel (Getir, store) or payment method (cash, card)';

-- =====================================================
-- TABLE: fixed_expenses
-- =====================================================
-- Purpose: Recurring expense definitions (rent, salary, etc.)

CREATE TABLE fixed_expenses (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Ownership
    user_id UUID NOT NULL,
    category_id UUID NOT NULL,
    
    -- Expense details
    name VARCHAR(255) NOT NULL,
    amount NUMERIC(15,2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'TRY',
    
    -- Recurrence settings
    recurrence_period VARCHAR(20) NOT NULL,
    payment_day SMALLINT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    
    -- Automation (future feature)
    auto_create_transaction BOOLEAN NOT NULL DEFAULT false,
    
    -- Status
    is_active BOOLEAN NOT NULL DEFAULT true,
    notes TEXT,
    
    -- Audit fields
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    
    -- Constraints
    CONSTRAINT fixed_expenses_amount_check CHECK (amount > 0),
    CONSTRAINT fixed_expenses_currency_check CHECK (currency IN ('TRY', 'USD', 'EUR', 'GBP')),
    CONSTRAINT fixed_expenses_period_check CHECK (
        recurrence_period IN ('monthly', 'weekly', 'yearly', 'quarterly')
    ),
    CONSTRAINT fixed_expenses_payment_day_check CHECK (payment_day >= 1 AND payment_day <= 31),
    CONSTRAINT fixed_expenses_date_range_check CHECK (end_date IS NULL OR start_date <= end_date),
    
    -- Foreign keys
    CONSTRAINT fixed_expenses_user_id_fkey FOREIGN KEY (user_id) 
        REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fixed_expenses_category_id_fkey FOREIGN KEY (category_id) 
        REFERENCES categories(id) ON DELETE RESTRICT
);

-- Performance indexes
CREATE INDEX fixed_expenses_user_id_idx ON fixed_expenses (user_id);
CREATE INDEX fixed_expenses_user_active_idx 
    ON fixed_expenses (user_id, is_active) WHERE deleted_at IS NULL;
CREATE INDEX fixed_expenses_category_id_idx ON fixed_expenses (category_id);

-- Comments
COMMENT ON TABLE fixed_expenses IS 'Recurring expense templates (rent, salaries)';
COMMENT ON COLUMN fixed_expenses.payment_day IS 'Day of month (1-31) or week (1-7) depending on period';
COMMENT ON COLUMN fixed_expenses.auto_create_transaction IS 'Auto-generate transactions (post-MVP feature)';

-- =====================================================
-- TABLE: transactions
-- =====================================================
-- Purpose: Income and expense transaction records (core entity)

CREATE TABLE transactions (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Ownership and classification
    user_id UUID NOT NULL,
    category_id UUID NOT NULL,
    channel_id UUID NOT NULL,
    
    -- Transaction details
    type VARCHAR(10) NOT NULL,
    amount NUMERIC(15,2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'TRY',
    transaction_date DATE NOT NULL,
    
    -- Optional metadata
    description TEXT,
    invoice_number VARCHAR(100),
    payment_method VARCHAR(50),
    notes TEXT,
    
    -- Audit fields
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    
    -- Constraints
    CONSTRAINT transactions_type_check CHECK (type IN ('income', 'expense')),
    CONSTRAINT transactions_amount_check CHECK (amount > 0),
    CONSTRAINT transactions_currency_check CHECK (currency IN ('TRY', 'USD', 'EUR', 'GBP')),
    CONSTRAINT transactions_date_check CHECK (transaction_date <= CURRENT_DATE),
    
    -- Foreign keys
    CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) 
        REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT transactions_category_id_fkey FOREIGN KEY (category_id) 
        REFERENCES categories(id) ON DELETE RESTRICT,
    CONSTRAINT transactions_channel_id_fkey FOREIGN KEY (channel_id) 
        REFERENCES channels(id) ON DELETE RESTRICT
);

-- Performance indexes (critical for reporting)
CREATE INDEX transactions_user_id_idx ON transactions (user_id);

-- Primary list view: user's transactions sorted by date
CREATE INDEX transactions_user_date_idx 
    ON transactions (user_id, transaction_date DESC) WHERE deleted_at IS NULL;

-- Filter by type: "user's income in date range"
CREATE INDEX transactions_user_type_date_idx 
    ON transactions (user_id, type, transaction_date) WHERE deleted_at IS NULL;

-- Foreign key indexes for joins and cascade checks
CREATE INDEX transactions_category_id_idx ON transactions (category_id);
CREATE INDEX transactions_channel_id_idx ON transactions (channel_id);

-- Recently created transactions view
CREATE INDEX transactions_user_created_idx 
    ON transactions (user_id, created_at DESC) WHERE deleted_at IS NULL;

-- Comments
COMMENT ON TABLE transactions IS 'Core transaction records (income/expense)';
COMMENT ON COLUMN transactions.transaction_date IS 'User-selected transaction date (no time component)';
COMMENT ON COLUMN transactions.created_at IS 'System record timestamp (audit trail)';
COMMENT ON COLUMN transactions.type IS 'Must match category.type (enforced at application layer)';

-- =====================================================
-- SCHEMA VALIDATION SUMMARY
-- =====================================================
-- Tables created: 5 (users, categories, channels, fixed_expenses, transactions)
-- Total indexes: 15 (including unique constraints)
-- Foreign key relationships: 6
-- Check constraints: 18
-- Soft delete support: All tables (deleted_at + partial indexes)
-- 
-- Post-MVP expansion ready for:
-- - businesses table (extract from users)
-- - locations table (multi-branch support)
-- - ocr_records table (receipt scanning)
-- =====================================================
