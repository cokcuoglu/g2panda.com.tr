-- =====================================================
-- GG_Esnaf - Test Data (Geliştirme için Örnek Veriler)
-- =====================================================
-- Purpose: Test kullanıcısı + kategori + kanal + işlemler
-- WARNING: Sadece development ortamında kullanın!
-- =====================================================

-- ADIM 1: Test kullanıcısı oluştur
-- =====================================================

INSERT INTO users (email, password_hash, full_name, business_name, business_type, currency, locale)
VALUES (
    'ahmet@yilmazmarket.com',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGJad68LJZdL17lhWy', -- hashed "Test123!"
    'Ahmet Yılmaz',
    'Yılmaz Market',
    'Market',
    'TRY',
    'tr-TR'
) RETURNING id;

-- Not: Dönen user_id'yi kopyalayın ve aşağıdaki tüm sorguları manuel olarak çalıştırın
-- veya DBeaver'da değişken olarak kullanın

-- =====================================================
-- ADIM 2: user_id değişkenini ayarlayın
-- =====================================================
-- ÖNEMLI: Yukarıdaki INSERT'ten dönen UUID'yi buraya yapıştırın

-- DBeaver'da değişken kullanımı:
-- @set user_id = 'BURAYA_USER_ID_YAPIŞTIRIN'

-- Manuel kullanım için: Aşağıdaki tüm sorgulardaki :user_id yerine gerçek UUID'yi yazın

-- =====================================================
-- ÖRNEK: İlk kullanıcı ID'sini al ve kullan
-- =====================================================

DO $$
DECLARE
    v_user_id UUID;
    v_income_cat_perakende UUID;
    v_income_cat_online UUID;
    v_income_cat_paket UUID;
    v_expense_cat_kira UUID;
    v_expense_cat_urun UUID;
    v_expense_cat_elektrik UUID;
    v_expense_cat_maas UUID;
    v_channel_magaza UUID;
    v_channel_getir UUID;
    v_channel_nakit UUID;
    v_channel_kredi UUID;
BEGIN
    -- Oluşturulan test kullanıcısının ID'sini al
    SELECT id INTO v_user_id FROM users WHERE email = 'ahmet@yilmazmarket.com' LIMIT 1;
    
    RAISE NOTICE 'Test User ID: %', v_user_id;
    
    -- =====================================================
    -- ADIM 3: Gelir kategorileri (tek tek INSERT)
    -- =====================================================
    
    INSERT INTO categories (user_id, name, type, color, icon, is_default, is_active)
    VALUES (v_user_id, 'Perakende Satış', 'income', '#10B981', 'shopping-cart', true, true)
    RETURNING id INTO v_income_cat_perakende;
    
    INSERT INTO categories (user_id, name, type, color, icon, is_default, is_active)
    VALUES (v_user_id, 'Online Satış', 'income', '#3B82F6', 'globe', true, true)
    RETURNING id INTO v_income_cat_online;
    
    INSERT INTO categories (user_id, name, type, color, icon, is_default, is_active)
    VALUES (v_user_id, 'Paket Servis', 'income', '#EC4899', 'truck', true, true)
    RETURNING id INTO v_income_cat_paket;
    
    INSERT INTO categories (user_id, name, type, color, icon, is_default, is_active)
    VALUES (v_user_id, 'Diğer Gelirler', 'income', '#6B7280', 'plus-circle', true, true);
    
    -- =====================================================
    -- ADIM 4: Gider kategorileri (tek tek INSERT)
    -- =====================================================
    
    INSERT INTO categories (user_id, name, type, color, icon, is_default, is_active)
    VALUES (v_user_id, 'Kira', 'expense', '#EF4444', 'home', true, true)
    RETURNING id INTO v_expense_cat_kira;
    
    INSERT INTO categories (user_id, name, type, color, icon, is_default, is_active)
    VALUES (v_user_id, 'Ürün Alımı', 'expense', '#6366F1', 'shopping-bag', true, true)
    RETURNING id INTO v_expense_cat_urun;
    
    INSERT INTO categories (user_id, name, type, color, icon, is_default, is_active)
    VALUES (v_user_id, 'Elektrik', 'expense', '#F59E0B', 'zap', true, true)
    RETURNING id INTO v_expense_cat_elektrik;
    
    INSERT INTO categories (user_id, name, type, color, icon, is_default, is_active)
    VALUES (v_user_id, 'Su', 'expense', '#3B82F6', 'droplet', true, true);
    
    INSERT INTO categories (user_id, name, type, color, icon, is_default, is_active)
    VALUES (v_user_id, 'Personel Maaşı', 'expense', '#10B981', 'users', true, true)
    RETURNING id INTO v_expense_cat_maas;
    
    INSERT INTO categories (user_id, name, type, color, icon, is_default, is_active)
    VALUES (v_user_id, 'Vergi', 'expense', '#DC2626', 'file-text', true, true);
    
    INSERT INTO categories (user_id, name, type, color, icon, is_default, is_active)
    VALUES (v_user_id, 'Diğer Giderler', 'expense', '#6B7280', 'minus-circle', true, true);
    
    -- =====================================================
    -- ADIM 5: Satış kanalları (tek tek INSERT)
    -- =====================================================
    
    INSERT INTO channels (user_id, name, type, description, is_active)
    VALUES (v_user_id, 'Mağaza Kasası', 'sales', 'Fiziksel mağaza satışları', true)
    RETURNING id INTO v_channel_magaza;
    
    INSERT INTO channels (user_id, name, type, description, is_active)
    VALUES (v_user_id, 'Getir', 'sales', 'Getir üzerinden gelen siparişler', true)
    RETURNING id INTO v_channel_getir;
    
    INSERT INTO channels (user_id, name, type, description, is_active)
    VALUES (v_user_id, 'Yemeksepeti', 'sales', 'Yemeksepeti siparişleri', true);
    
    INSERT INTO channels (user_id, name, type, description, is_active)
    VALUES (v_user_id, 'Instagram', 'sales', 'Instagram DM siparişleri', true);
    
    -- =====================================================
    -- ADIM 6: Ödeme yöntemleri (tek tek INSERT)
    -- =====================================================
    
    INSERT INTO channels (user_id, name, type, description, is_active)
    VALUES (v_user_id, 'Nakit', 'payment', 'Nakit ödeme', true)
    RETURNING id INTO v_channel_nakit;
    
    INSERT INTO channels (user_id, name, type, description, is_active)
    VALUES (v_user_id, 'Kredi Kartı', 'payment', 'Kredi kartı ile ödeme (POS)', true)
    RETURNING id INTO v_channel_kredi;
    
    INSERT INTO channels (user_id, name, type, description, is_active)
    VALUES (v_user_id, 'Banka Havalesi', 'payment', 'EFT/Havale', true);
    
    -- =====================================================
    -- ADIM 7: Sabit giderler
    -- =====================================================
    
    INSERT INTO fixed_expenses (user_id, category_id, name, amount, recurrence_period, payment_day, start_date)
    VALUES
        (v_user_id, v_expense_cat_kira, 'Mağaza Kirası', 15000.00, 'monthly', 5, '2026-01-01'),
        (v_user_id, v_expense_cat_maas, 'Kasiyer Maaşı', 18000.00, 'monthly', 1, '2026-01-01'),
        (v_user_id, v_expense_cat_elektrik, 'Elektrik Faturası', 2500.00, 'monthly', 15, '2026-01-01');
    
    -- =====================================================
    -- ADIM 8: Test işlemleri (Son 30 gün)
    -- =====================================================
    
    -- Gelirler (son 30 gün için)
    INSERT INTO transactions (user_id, category_id, channel_id, type, amount, transaction_date, description)
    VALUES
        -- Bugün
        (v_user_id, v_income_cat_perakende, v_channel_magaza, 'income', 1250.50, CURRENT_DATE, 'Günlük satış'),
        (v_user_id, v_income_cat_online, v_channel_getir, 'income', 850.00, CURRENT_DATE, 'Getir sipariş'),
        
        -- Dün
        (v_user_id, v_income_cat_perakende, v_channel_magaza, 'income', 1890.75, CURRENT_DATE - 1, 'Günlük satış'),
        (v_user_id, v_income_cat_paket, v_channel_getir, 'income', 425.00, CURRENT_DATE - 1, 'Paket servis'),
        
        -- 2 gün önce
        (v_user_id, v_income_cat_perakende, v_channel_magaza, 'income', 2100.00, CURRENT_DATE - 2, 'Günlük satış'),
        
        -- 3 gün önce
        (v_user_id, v_income_cat_perakende, v_channel_magaza, 'income', 1650.30, CURRENT_DATE - 3, 'Günlük satış'),
        (v_user_id, v_income_cat_online, v_channel_getir, 'income', 720.00, CURRENT_DATE - 3, 'Getir sipariş'),
        
        -- Son 2 hafta
        (v_user_id, v_income_cat_perakende, v_channel_magaza, 'income', 3200.00, CURRENT_DATE - 7, 'Hafta sonu satış'),
        (v_user_id, v_income_cat_perakende, v_channel_magaza, 'income', 2800.00, CURRENT_DATE - 14, 'Günlük satış'),
        (v_user_id, v_income_cat_online, v_channel_getir, 'income', 1200.00, CURRENT_DATE - 14, 'Getir sipariş'),
        
        -- Son 4 hafta
        (v_user_id, v_income_cat_perakende, v_channel_magaza, 'income', 4500.00, CURRENT_DATE - 21, 'Toplu satış'),
        (v_user_id, v_income_cat_perakende, v_channel_magaza, 'income', 2900.00, CURRENT_DATE - 28, 'Günlük satış');
    
    -- Giderler (son 30 gün için)
    INSERT INTO transactions (user_id, category_id, channel_id, type, amount, transaction_date, description)
    VALUES
        -- Bu ay
        (v_user_id, v_expense_cat_kira, v_channel_nakit, 'expense', 15000.00, CURRENT_DATE - 17, 'Ocak ayı kira'),
        (v_user_id, v_expense_cat_maas, v_channel_nakit, 'expense', 18000.00, CURRENT_DATE - 21, 'Kasiyer maaşı'),
        (v_user_id, v_expense_cat_elektrik, v_channel_nakit, 'expense', 2500.00, CURRENT_DATE - 7, 'Elektrik faturası'),
        
        -- Ürün alımları
        (v_user_id, v_expense_cat_urun, v_channel_kredi, 'expense', 8500.00, CURRENT_DATE - 5, 'Ürün alımı'),
        (v_user_id, v_expense_cat_urun, v_channel_kredi, 'expense', 12000.00, CURRENT_DATE - 15, 'Ürün alımı'),
        (v_user_id, v_expense_cat_urun, v_channel_kredi, 'expense', 9800.00, CURRENT_DATE - 25, 'Ürün alımı');
    
    RAISE NOTICE 'Test data oluşturuldu!';
    RAISE NOTICE 'User ID: %', v_user_id;
    RAISE NOTICE 'Email: ahmet@yilmazmarket.com';
    RAISE NOTICE 'Password: Test123!';
    
END $$;

-- =====================================================
-- Sonuç: Test Verisi Özeti
-- =====================================================

-- Test kullanıcısı bilgileri
SELECT 
    'Test Kullanıcı Bilgileri' AS info,
    email,
    full_name,
    business_name,
    business_type
FROM users
WHERE email = 'ahmet@yilmazmarket.com';

-- Oluşturulan kategoriler
SELECT 
    'Oluşturulan Kategoriler' AS info,
    COUNT(*) FILTER (WHERE type = 'income') AS gelir_kategorileri,
    COUNT(*) FILTER (WHERE type = 'expense') AS gider_kategorileri,
    COUNT(*) AS toplam
FROM categories
WHERE user_id = (SELECT id FROM users WHERE email = 'ahmet@yilmazmarket.com');

-- Oluşturulan kanallar
SELECT 
    'Oluşturulan Kanallar' AS info,
    COUNT(*) FILTER (WHERE type = 'sales') AS satis_kanallari,
    COUNT(*) FILTER (WHERE type = 'payment') AS odeme_yontemleri,
    COUNT(*) AS toplam
FROM channels
WHERE user_id = (SELECT id FROM users WHERE email = 'ahmet@yilmazmarket.com');

-- İşlem özeti
SELECT 
    'İşlem Özeti' AS info,
    COUNT(*) FILTER (WHERE type = 'income') AS gelir_adet,
    COUNT(*) FILTER (WHERE type = 'expense') AS gider_adet,
    SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS toplam_gelir,
    SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS toplam_gider,
    SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) AS net_kar
FROM transactions
WHERE user_id = (SELECT id FROM users WHERE email = 'ahmet@yilmazmarket.com');
