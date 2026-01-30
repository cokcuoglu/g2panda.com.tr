# GG_Esnaf - Database Setup

PostgreSQL veritabanı kurulum dosyaları (MVP)

## Dosya Sıralaması

Aşağıdaki sırayla çalıştırın:

### 1️⃣ `01_schema.sql`
**Amaç:** Veritabanı şemasını oluşturur (tablolar, index'ler, constraint'ler)

**İçerik:**
- Extension (pgcrypto)
- 5 tablo: users, categories, channels, fixed_expenses, transactions
- 15 index
- Foreign key ilişkileri

**Çalıştırma:**
```sql
-- DBeaver'da:
-- 1. gg_esnaf veritabanını seç
-- 2. SQL Editor aç
-- 3. 01_schema.sql dosyasını aç
-- 4. Ctrl+A ile tümünü seç
-- 5. Ctrl+Enter ile çalıştır
```

---

### 2️⃣ `02_seed_data.sql`
**Amaç:** Varsayılan kategori ve kanal şablonlarını gösterir (referans)

**Not:** Bu dosya direkt çalıştırılamaz, sadece referans içindir. Gerçek veriler `03_test_data.sql`'de oluşturulacak.

---

### 3️⃣ `03_test_data.sql`
**Amaç:** Test kullanıcısı + kategoriler + kanallar + işlemler oluşturur

**İçerik:**
- Test kullanıcı: ahmet@yilmazmarket.com (Password: Test123!)
- 4 gelir kategorisi
- 7 gider kategorisi
- 4 satış kanalı
- 3 ödeme yöntemi
- 3 sabit gider
- Son 30 gün için ~18 işlem

**Çalıştırma:**
```sql
-- DBeaver'da 03_test_data.sql dosyasını aç ve çalıştır
-- Script otomatik olarak user_id'yi yönetir (DO $$ bloğu)
```

---

### 4️⃣ `04_dashboard_queries.sql`
**Amaç:** Dashboard ve raporlama sorgularını test eder

**İçerik:**
- Günlük özet
- Aylık özet
- Son 30 gün trendi
- Kategori bazlı dağılım
- Kanal bazlı dağılım
- Sabit gider listesi

**Çalıştırma:**
```sql
-- Her sorguyu ayrı ayrı çalıştırabilir veya tümünü seçip çalıştırabilirsiniz
-- Sonuçlar alt panelde görünecek
```

---

## Hızlı Başlangıç

### DBeaver ile:

1. **Veritabanı oluştur:**
```sql
CREATE DATABASE gg_esnaf
    ENCODING 'UTF8'
    LC_COLLATE = 'Turkish_Turkey.1254'
    LC_CTYPE = 'Turkish_Turkey.1254'
    TEMPLATE template0;
```

2. **Şemayı oluştur:**
- `01_schema.sql` çalıştır

3. **Test verisi ekle:**
- `03_test_data.sql` çalıştır

4. **Raporları çalıştır:**
- `04_dashboard_queries.sql` çalıştır

---

## Test Kullanıcısı

```
Email: ahmet@yilmazmarket.com
Password: Test123!
Business: Yılmaz Market
```

---

## Teknik Detaylar

- **PostgreSQL:** 14+
- **Primary Key:** UUID (pgcrypto)
- **Timezone:** UTC (TIMESTAMPTZ)
- **Soft Delete:** deleted_at kolonu
- **Encoding:** UTF8

---

## Sonraki Adımlar

- [ ] Backend API geliştir (Node.js/Express)
- [ ] ORM entegrasyonu (Prisma/Drizzle)
- [ ] Authentication sistemi
- [ ] Frontend dashboard

---

## Notlar

⚠️ **Uyarı:** `03_test_data.sql` sadece development için! Production'da kullanmayın.

✅ **Güvenlik:** Gerçek uygulamada şifreler bcrypt ile hash'lenmelidir.

📊 **Performans:** Index'ler transaction tablosunda optimize edilmiştir.
