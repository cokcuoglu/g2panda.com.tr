-- 1. Fix Orders RLS
-- Enable RLS just in case it wasn't
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any to avoid conflicts
DROP POLICY IF EXISTS orders_select_policy ON orders;
DROP POLICY IF EXISTS orders_insert_policy ON orders;
DROP POLICY IF EXISTS orders_update_policy ON orders;
DROP POLICY IF EXISTS orders_delete_policy ON orders;

-- Create Policies
-- Users can see their own orders
CREATE POLICY orders_select_policy ON orders
    FOR SELECT TO public
    USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- Users can insert orders for themselves
CREATE POLICY orders_insert_policy ON orders
    FOR INSERT TO public
    WITH CHECK (user_id = current_setting('app.current_user_id', true)::uuid);

-- Users can update their own orders
CREATE POLICY orders_update_policy ON orders
    FOR UPDATE TO public
    USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- Users can delete (soft delete) their own orders
CREATE POLICY orders_delete_policy ON orders
    FOR DELETE TO public
    USING (user_id = current_setting('app.current_user_id', true)::uuid);


-- 2. Fix Transactions Constraint for 'order' type
-- We need to drop the existing check constraint and add a new one that includes 'order'

ALTER TABLE transactions 
DROP CONSTRAINT IF EXISTS transactions_document_type_check;

ALTER TABLE transactions 
ADD CONSTRAINT transactions_document_type_check 
CHECK (document_type IN ('invoice', 'receipt', 'order'));
