-- =====================================================
-- GG_Esnaf - Seed Data (Varsayılan Kategoriler ve Kanallar)
-- =====================================================
-- Purpose: Yeni kullanıcılar için varsayılan kategoriler ve kanallar
-- Bu veriler kullanıcı kaydı sonrası otomatik olarak oluşturulacak
-- =====================================================

-- NOTLAR:
-- 1. Bu script test kullanıcısı oluşturmaz
-- 2. Sadece varsayılan kategoriler ve kanalları tanımlar
-- 3. Gerçek uygulamada bu kategoriler kullanıcı kaydında otomatik oluşturulur
-- 4. user_id parametresi ile kullanılacak (test_data.sql'de örnek gösterilecek)

-- =====================================================
-- VARSAYILAN GELİR KATEGORİLERİ (Referans)
-- =====================================================
-- Bu kategoriler yeni kullanıcı kaydında otomatik oluşturulmalı

/*
INSERT INTO categories (user_id, name, type, color, icon, is_default, is_active)
VALUES
    (:user_id, 'Perakende Satış', 'income', '#10B981', 'shopping-cart', true, true),
    (:user_id, 'Online Satış', 'income', '#3B82F6', 'globe', true, true),
    (:user_id, 'Toptan Satış', 'income', '#8B5CF6', 'package', true, true),
    (:user_id, 'Hizmet Geliri', 'income', '#F59E0B', 'briefcase', true, true),
    (:user_id, 'Paket Servis', 'income', '#EC4899', 'truck', true, true),
    (:user_id, 'Diğer Gelirler', 'income', '#6B7280', 'plus-circle', true, true);
*/

-- =====================================================
-- VARSAYILAN GİDER KATEGORİLERİ (Referans)
-- =====================================================

/*
INSERT INTO categories (user_id, name, type, color, icon, is_default, is_active)
VALUES
    (:user_id, 'Kira', 'expense', '#EF4444', 'home', true, true),
    (:user_id, 'Elektrik', 'expense', '#F59E0B', 'zap', true, true),
    (:user_id, 'Su', 'expense', '#3B82F6', 'droplet', true, true),
    (:user_id, 'Doğalgaz', 'expense', '#F97316', 'flame', true, true),
    (:user_id, 'İnternet', 'expense', '#8B5CF6', 'wifi', true, true),
    (:user_id, 'Telefon', 'expense', '#06B6D4', 'phone', true, true),
    (:user_id, 'Personel Maaşı', 'expense', '#10B981', 'users', true, true),
    (:user_id, 'Ürün Alımı', 'expense', '#6366F1', 'shopping-bag', true, true),
    (:user_id, 'Nakliye', 'expense', '#14B8A6', 'truck', true, true),
    (:user_id, 'Vergi', 'expense', '#DC2626', 'file-text', true, true),
    (:user_id, 'SGK', 'expense', '#B91C1C', 'shield', true, true),
    (:user_id, 'Bakım-Onarım', 'expense', '#EA580C', 'tool', true, true),
    (:user_id, 'Pazarlama', 'expense', '#D946EF', 'megaphone', true, true),
    (:user_id, 'Sigorta', 'expense', '#7C3AED', 'umbrella', true, true),
    (:user_id, 'Muhasebe', 'expense', '#0891B2', 'calculator', true, true),
    (:user_id, 'Diğer Giderler', 'expense', '#6B7280', 'minus-circle', true, true);
*/

-- =====================================================
-- VARSAYILAN SATIŞ KANALLARI (Referans)
-- =====================================================

/*
INSERT INTO channels (user_id, name, type, description, is_active)
VALUES
    (:user_id, 'Mağaza Kasası', 'sales', 'Fiziksel mağaza satışları', true),
    (:user_id, 'Getir', 'sales', 'Getir üzerinden gelen siparişler', true),
    (:user_id, 'Yemeksepeti', 'sales', 'Yemeksepeti siparişleri', true),
    (:user_id, 'Trendyol', 'sales', 'Trendyol marketplace satışları', true),
    (:user_id, 'Instagram', 'sales', 'Instagram DM siparişleri', true),
    (:user_id, 'WhatsApp', 'sales', 'WhatsApp siparişleri', true),
    (:user_id, 'Telefon', 'sales', 'Telefon siparişleri', true),
    (:user_id, 'Web Sitesi', 'sales', 'Kendi web sitesi satışları', true);
*/

-- =====================================================
-- VARSAYILAN ÖDEME YÖNTEMLERİ (Referans)
-- =====================================================

/*
INSERT INTO channels (user_id, name, type, description, is_active)
VALUES
    (:user_id, 'Nakit', 'payment', 'Nakit ödeme', true),
    (:user_id, 'Kredi Kartı', 'payment', 'Kredi kartı ile ödeme (POS)', true),
    (:user_id, 'Banka Havalesi', 'payment', 'EFT/Havale', true),
    (:user_id, 'Çek', 'payment', 'Çek ile ödeme', true),
    (:user_id, 'Dijital Cüzdan', 'payment', 'Papara, İninal vb.', true),
    (:user_id, 'Kapıda Ödeme', 'payment', 'Teslimat anında ödeme', true);
*/

-- =====================================================
-- NOT: Gerçek Kullanım
-- =====================================================
-- Bu script doğrudan çalıştırılamaz (user_id parametresi gerekir)
-- Backend uygulamada kullanıcı kaydı sonrası bu INSERT'ler çalıştırılmalı
-- Test için 03_test_data.sql scriptine bakın
-- =====================================================
