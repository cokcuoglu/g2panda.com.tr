-- =====================================================
-- GG_Esnaf - Dashboard Sorguları
-- =====================================================
-- Test kullanıcısı üzerinde raporlama sorgularını çalıştırma
-- =====================================================

-- =====================================================
-- 1. GÜNLÜK ÖZET (BUGÜN)
-- =====================================================

SELECT 
    '1. Günlük Özet (Bugün)' AS rapor,
    CURRENT_DATE AS tarih,
    COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) AS toplam_gelir,
    COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS toplam_gider,
    COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END), 0) AS net_kar
FROM transactions
WHERE user_id = (SELECT id FROM users WHERE email = 'ahmet@yilmazmarket.com')
    AND transaction_date = CURRENT_DATE AND deleted_at IS NULL;

-- =====================================================
-- 2. AYLIK ÖZET (BU AY)
-- =====================================================

SELECT 
    '2. Aylık Özet' AS rapor,
    COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) AS toplam_gelir,
    COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS toplam_gider,
    COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END), 0) AS net_kar
FROM transactions
WHERE user_id = (SELECT id FROM users WHERE email = 'ahmet@yilmazmarket.com')
    AND DATE_TRUNC('month', transaction_date) = DATE_TRUNC('month', CURRENT_DATE)
    AND deleted_at IS NULL;

-- =====================================================
-- 3. SON 30 GÜN TRENDİ
-- =====================================================

WITH date_series AS (
    SELECT generate_series(CURRENT_DATE - 29, CURRENT_DATE, '1 day'::interval)::DATE AS tarih
),
daily_summary AS (
    SELECT transaction_date AS tarih,
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS gelir,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS gider
    FROM transactions
    WHERE user_id = (SELECT id FROM users WHERE email = 'ahmet@yilmazmarket.com')
        AND transaction_date >= CURRENT_DATE - 29 AND deleted_at IS NULL
    GROUP BY transaction_date
)
SELECT '3. Son 30 Gün' AS rapor, ds.tarih,
    COALESCE(s.gelir, 0) AS gelir,
    COALESCE(s.gider, 0) AS gider,
    COALESCE(s.gelir, 0) - COALESCE(s.gider, 0) AS net
FROM date_series ds LEFT JOIN daily_summary s ON ds.tarih = s.tarih
ORDER BY ds.tarih;

-- =====================================================
-- 4. KATEGORİ BAZLI (Gelir)
-- =====================================================

SELECT '4a. Kategori - Gelir' AS rapor, c.name AS kategori, c.color,
    COALESCE(SUM(t.amount), 0) AS toplam,
    COUNT(t.id) AS adet
FROM categories c
LEFT JOIN transactions t ON c.id = t.category_id 
    AND t.user_id = (SELECT id FROM users WHERE email = 'ahmet@yilmazmarket.com')
    AND t.type = 'income' AND t.transaction_date >= CURRENT_DATE - 29
    AND t.deleted_at IS NULL
WHERE c.user_id = (SELECT id FROM users WHERE email = 'ahmet@yilmazmarket.com')
    AND c.type = 'income' AND c.deleted_at IS NULL
GROUP BY c.id, c.name, c.color HAVING COUNT(t.id) > 0
ORDER BY toplam DESC;

-- =====================================================
-- 5. KATEGORİ BAZLI (Gider)
-- =====================================================

SELECT '4b. Kategori - Gider' AS rapor, c.name AS kategori, c.color,
    COALESCE(SUM(t.amount), 0) AS toplam,
    COUNT(t.id) AS adet
FROM categories c
LEFT JOIN transactions t ON c.id = t.category_id 
    AND t.user_id = (SELECT id FROM users WHERE email = 'ahmet@yilmazmarket.com')
    AND t.type = 'expense' AND t.transaction_date >= CURRENT_DATE - 29
    AND t.deleted_at IS NULL
WHERE c.user_id = (SELECT id FROM users WHERE email = 'ahmet@yilmazmarket.com')
    AND c.type = 'expense' AND c.deleted_at IS NULL
GROUP BY c.id, c.name, c.color HAVING COUNT(t.id) > 0
ORDER BY toplam DESC;

-- =====================================================
-- 6. KANAL BAZLI (Satış)
-- =====================================================

SELECT '5a. Kanal - Satış' AS rapor, ch.name AS kanal,
    COALESCE(SUM(t.amount), 0) AS toplam,
    COUNT(t.id) AS adet
FROM channels ch
LEFT JOIN transactions t ON ch.id = t.channel_id 
    AND t.user_id = (SELECT id FROM users WHERE email = 'ahmet@yilmazmarket.com')
    AND t.type = 'income' AND t.transaction_date >= CURRENT_DATE - 29
    AND t.deleted_at IS NULL
WHERE ch.user_id = (SELECT id FROM users WHERE email = 'ahmet@yilmazmarket.com')
    AND ch.type = 'sales' AND ch.deleted_at IS NULL
GROUP BY ch.id, ch.name HAVING COUNT(t.id) > 0
ORDER BY toplam DESC;

-- =====================================================
-- 7. SABİT GİDERLER
-- =====================================================

SELECT '6. Sabit Giderler' AS rapor, fe.name, fe.amount, fe.recurrence_period,
    c.name AS kategori
FROM fixed_expenses fe
INNER JOIN categories c ON fe.category_id = c.id
WHERE fe.user_id = (SELECT id FROM users WHERE email = 'ahmet@yilmazmarket.com')
    AND fe.is_active = true AND fe.deleted_at IS NULL
ORDER BY fe.amount DESC;

-- =====================================================
-- 8. KOMBİNE DASHBOARD
-- =====================================================

SELECT '7. Dashboard Özet (30 gün)' AS rapor,
    COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) AS toplam_gelir,
    COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS toplam_gider,
    COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END), 0) AS net_kar,
    COUNT(CASE WHEN type = 'income' THEN 1 END) AS gelir_adet,
    COUNT(CASE WHEN type = 'expense' THEN 1 END) AS gider_adet
FROM transactions
WHERE user_id = (SELECT id FROM users WHERE email = 'ahmet@yilmazmarket.com')
    AND transaction_date >= CURRENT_DATE - 29 AND deleted_at IS NULL;
