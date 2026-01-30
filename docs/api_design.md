# GG_Esnaf - Backend API Tasarımı (v1.0)

**Base URL:** `/api/v1`
**Format:** JSON
**Auth:** Bearer Token (JWT)

## 1. Genel Standartlar

### Request Headers
```http
Content-Type: application/json
Authorization: Bearer <jwt_token>
```

### Response Format (Success)
```json
{
  "success": true,
  "data": { ... }
}
```

### Response Format (Error)
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Tutar 0'dan büyük olmalı",
    "details": ["amount must be positive"]
  }
}
```

### Pagination (Listelemeler için)
Query Parametreleri: `page` (default: 1), `limit` (default: 20)
```json
{
  "data": [...],
  "meta": {
    "total": 150,
    "page": 1,
    "limit": 20,
    "pages": 8
  }
}
```

---

## 2. Modüller

### A. Auth Modülü
Kullanıcı kaydı ve girişi.

| Method | Path | Açıklama | Body / Query | Response (Data) |
|--------|------|----------|--------------|-----------------|
| `POST` | `/auth/register` | Yeni üye kaydı | `{ email, password, full_name, business_name }` | `{ user: { id, email }, token }` |
| `POST` | `/auth/login` | Üye girişi | `{ email, password }` | `{ user, token }` |
| `GET` | `/auth/me` | Mevcut kullanıcı | - | `{ user }` |

**Not:** `/auth/register` ve `/auth/login` endpointleri public'tir (Auth header gerektirmez).

---

### B. Transactions Modülü (Gelir/Gider)
Ana işlem kayıtları.

| Method | Path | Açıklama | Body / Query | Response |
|--------|------|----------|--------------|----------|
| `GET` | `/transactions` | İşlem listesi | `?page, ?limit, ?start_date, ?end_date, ?type, ?category_id` | `{ data: [Transaction], meta }` |
| `POST` | `/transactions` | Yeni işlem ekle | `{ type, amount, date, category_id, channel_id, description }` | `{ id, ...Transaction }` |
| `GET` | `/transactions/:id` | İşlem detayı | - | `{ Transaction }` |
| `PUT` | `/transactions/:id` | İşlem güncelle | `{ amount, description, ... }` | `{ Transaction }` |
| `DELETE` | `/transactions/:id` | İşlem sil (Soft) | - | `{ success: true }` |

**Validation:**
- `type`: 'income' veya 'expense'
- `amount`: > 0
- `transaction_date`: Geçerli tarih (gelecek tarih olamaz)
- `category_id`, `channel_id`: UUID ve geçerli olmalı

---

### C. Categories Modülü
Kullanıcının gelir/gider kategorileri.

| Method | Path | Açıklama | Body / Query | Response |
|--------|------|----------|--------------|----------|
| `GET` | `/categories` | Kategori listesi | `?type (income/expense)` | `{ data: [Category] }` |
| `POST` | `/categories` | Yeni kategori ekle | `{ name, type, color, icon }` | `{ Category }` |
| `PUT` | `/categories/:id` | Kategori güncelle | `{ name, color, icon, is_active }` | `{ Category }` |
| `DELETE` | `/categories/:id` | Kategori sil | - | `{ success: true }` |

**Not:** Bir kategoriye bağlı işlem varsa silme başarısız olur (Frontend uyarı göstermeli).

---

### D. Channels Modülü
Satış kanalları ve ödeme yöntemleri.

| Method | Path | Açıklama | Body / Query | Response |
|--------|------|----------|--------------|----------|
| `GET` | `/channels` | Kanal listesi | `?type (sales/payment)` | `{ data: [Channel] }` |
| `POST` | `/channels` | Yeni kanal ekle | `{ name, type, description }` | `{ Channel }` |
| `PUT` | `/channels/:id` | Kanal güncelle | `{ name, description, is_active }` | `{ Channel }` |
| `DELETE` | `/channels/:id` | Kanal sil | - | `{ success: true }` |

---

### E. Fixed Expenses Modülü
Sabit gider tanımları.

| Method | Path | Açıklama | Body / Query | Response |
|--------|------|----------|--------------|----------|
| `GET` | `/fixed-expenses` | Sabit gider listesi | - | `{ data: [FixedExpense] }` |
| `POST` | `/fixed-expenses` | Sabit gider ekle | `{ name, amount, category_id, day, period, start_date }` | `{ FixedExpense }` |
| `PUT` | `/fixed-expenses/:id` | Güncelle | `{ amount, day, end_date, ... }` | `{ FixedExpense }` |
| `DELETE` | `/fixed-expenses/:id` | Sil/Pasifleştir | - | `{ success: true }` |

---

### F. Dashboard & Reports Modülü
Grafikler ve özetler için analiz endpointleri.

| Method | Path | Açıklama | Body / Query | Response |
|--------|------|----------|--------------|----------|
| `GET` | `/dashboard/summary` | Günlük/Aylık özet | `?date=YYYY-MM-DD` veya `?month=MM&year=YYYY` | `{ income, expense, net, counts }` |
| `GET` | `/dashboard/trend` | Grafik verisi | `?days=30` (varsayılan: 30 gün) | `{ labels: [], income: [], expense: [] }` |
| `GET` | `/reports/distribution` | Pasta grafik verisi | `?type=income/expense&group_by=category/channel` | `{ data: [{ label, value, color, percentage }] }` |

---

## 3. Güvenlik ve Hata Kodları

### HTTP Status Codes
- `200 OK`: Başarılı
- `201 Created`: Kayıt oluştu
- `400 Bad Request`: Validation hatası
- `401 Unauthorized`: Token yok veya geçersiz
- `403 Forbidden`: Erişim yetkisi yok (RLS bu hatayı pek döndürmez, veri boş döner)
- `404 Not Found`: Kayıt bulunamadı (veya başkasına ait)
- `500 Internal Server Error`: Backend/DB hatası

### Örnek Hata Senaryosu (Validation)
**POST** `/transactions`
Body: `{ "amount": -50 }`
**Response (400):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Doğrulama hatası",
    "details": [
      { "field": "amount", "message": "Pozitif sayı olmalı" }
    ]
  }
}
```
