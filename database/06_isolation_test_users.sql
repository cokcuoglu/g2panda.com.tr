-- =====================================================
-- GG_Esnaf - RLS Isolation Test Users
-- =====================================================
-- Purpose: Create two distinct users to verify data isolation
-- =====================================================

-- 1. Create Users
-- =====================================================

-- User A
INSERT INTO users (id, email, password_hash, full_name, business_name, currency, locale)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'usera@test.com',
  'hash_placeholder',
  'User A',
  'User A Business',
  'TRY',
  'tr-TR'
) ON CONFLICT (id) DO NOTHING;

-- User B
INSERT INTO users (id, email, password_hash, full_name, business_name, currency, locale)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  'userb@test.com',
  'hash_placeholder',
  'User B',
  'User B Business',
  'TRY',
  'tr-TR'
) ON CONFLICT (id) DO NOTHING;

-- 2. Create Categories
-- =====================================================

-- User A categories
INSERT INTO categories (id, user_id, name, type, color, icon, is_active)
VALUES
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'Satış A', 'income', '#10B981', 'shopping-cart', true),
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'Kira A', 'expense', '#EF4444', 'home', true);

-- User B categories
INSERT INTO categories (id, user_id, name, type, color, icon, is_active)
VALUES
  (gen_random_uuid(), '22222222-2222-2222-2222-222222222222', 'Satış B', 'income', '#10B981', 'shopping-cart', true),
  (gen_random_uuid(), '22222222-2222-2222-2222-222222222222', 'Kira B', 'expense', '#EF4444', 'home', true);

-- 3. Create Channels (Required for Transactions)
-- =====================================================

-- User A channels
INSERT INTO channels (id, user_id, name, type, is_active)
VALUES
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'Nakit A', 'payment', true);

-- User B channels
INSERT INTO channels (id, user_id, name, type, is_active)
VALUES
  (gen_random_uuid(), '22222222-2222-2222-2222-222222222222', 'Nakit B', 'payment', true);


-- 4. Create Transactions
-- =====================================================

-- User A transaction
INSERT INTO transactions (
  id, user_id, category_id, channel_id, type, amount, transaction_date, description
)
SELECT
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  c.id,
  ch.id,
  'income',
  1000,
  CURRENT_DATE,
  'User A Transaction'
FROM categories c
JOIN channels ch ON ch.user_id = c.user_id
WHERE c.user_id = '11111111-1111-1111-1111-111111111111' AND c.type = 'income'
LIMIT 1;

-- User B transaction
INSERT INTO transactions (
  id, user_id, category_id, channel_id, type, amount, transaction_date, description
)
SELECT
  gen_random_uuid(),
  '22222222-2222-2222-2222-222222222222',
  c.id,
  ch.id,
  'income',
  2000,
  CURRENT_DATE,
  'User B Transaction'
FROM categories c
JOIN channels ch ON ch.user_id = c.user_id
WHERE c.user_id = '22222222-2222-2222-2222-222222222222' AND c.type = 'income'
LIMIT 1;

-- =====================================================
-- Test Instructions
-- =====================================================
-- Run this script to populate isolated data.
-- Then verify by setting user context in backend or SQL editor.
