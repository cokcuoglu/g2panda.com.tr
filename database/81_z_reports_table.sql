-- Create Z-Reports table for daily end-of-day summaries
CREATE TABLE IF NOT EXISTS z_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    opened_at TIMESTAMPTZ NOT NULL,
    closed_at TIMESTAMPTZ NOT NULL,
    total_income NUMERIC(15,2) DEFAULT 0,
    total_expense NUMERIC(15,2) DEFAULT 0,
    order_count INTEGER DEFAULT 0,
    transaction_count INTEGER DEFAULT 0,
    payment_breakdown JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Added index for reporting
    CONSTRAINT z_reports_period_check CHECK (opened_at <= closed_at)
);

CREATE INDEX IF NOT EXISTS idx_z_reports_user_date ON z_reports(user_id, closed_at DESC);
