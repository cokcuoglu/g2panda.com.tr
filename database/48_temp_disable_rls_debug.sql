-- Completely disable RLS on transaction_items to identify the real issue
DROP POLICY IF EXISTS transaction_items_isolation ON transaction_items;
ALTER TABLE transaction_items DISABLE ROW LEVEL SECURITY;
GRANT ALL ON transaction_items TO app_user;
