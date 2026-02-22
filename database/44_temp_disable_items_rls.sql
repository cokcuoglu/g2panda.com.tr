-- Temporarily disable RLS on transaction_items to test if that's the issue
-- This is for debugging only - will be reverted once we identify the problem

DROP POLICY IF EXISTS transaction_items_isolation ON transaction_items;
DROP POLICY IF EXISTS transaction_items_select_update_delete ON transaction_items;

-- Disable RLS temporarily
ALTER TABLE transaction_items DISABLE ROW LEVEL SECURITY;
