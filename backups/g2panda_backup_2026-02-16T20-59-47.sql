-- Database Backup: g2panda_release
-- Created: 2026-02-16T20:59:47.877Z
-- After schema fixes and data restoration


-- Table: campaign_products (8 rows)
TRUNCATE TABLE campaign_products CASCADE;
INSERT INTO campaign_products (id, campaign_id, product_id, quantity) VALUES ('984d1b1c-b7de-4b78-a7ce-4b644cb0fb4b', '95a9a423-77af-4ae2-a250-b8ed639fe854', 'bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb', 1);
INSERT INTO campaign_products (id, campaign_id, product_id, quantity) VALUES ('01bca4b4-7cb1-436a-8197-115121c7ad7f', '95a9a423-77af-4ae2-a250-b8ed639fe854', '5af0b94d-d49c-472d-a068-6640afbbd6f7', 1);
INSERT INTO campaign_products (id, campaign_id, product_id, quantity) VALUES ('0533fd88-ed6a-411d-b32f-26ed413a088d', 'b8a18152-d22b-4c36-b62b-0a3b6e1cff87', 'ffaa46c8-4046-4986-a49b-77fdf4a727c1', 1);
INSERT INTO campaign_products (id, campaign_id, product_id, quantity) VALUES ('adc8a69f-04c4-43f5-a4f9-36f72d812d73', 'b8a18152-d22b-4c36-b62b-0a3b6e1cff87', '0a947cc9-9682-45b6-9819-c6aceeac7260', 1);
INSERT INTO campaign_products (id, campaign_id, product_id, quantity) VALUES ('6b41fa67-0bd3-433f-b0a5-75c2f046280e', '80979d45-4fb5-4a0c-9bd2-4b4cbd4ff513', 'bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb', 1);
INSERT INTO campaign_products (id, campaign_id, product_id, quantity) VALUES ('04903309-2713-4329-ad6f-0937e79641cd', '80979d45-4fb5-4a0c-9bd2-4b4cbd4ff513', '179d6eda-a6a9-4655-96ee-f5e5e240657c', 1);
INSERT INTO campaign_products (id, campaign_id, product_id, quantity) VALUES ('cf8b8f42-1595-446b-9959-d7507f309a18', 'cccfc8a9-8d88-47d6-8577-3bbb36bdec30', '0a55c683-512e-44a8-a60d-cfb3b68b0607', 1);
INSERT INTO campaign_products (id, campaign_id, product_id, quantity) VALUES ('3cf032fc-8eea-46cf-b3bd-6f35fb8e78f6', 'cccfc8a9-8d88-47d6-8577-3bbb36bdec30', 'a2f054b6-0eb7-47a8-aa5b-d9f8f2c8ed04', 1);

-- Table: campaigns (4 rows)
TRUNCATE TABLE campaigns CASCADE;
INSERT INTO campaigns (id, user_id, name, unique_code, description, discount_amount, discount_type, is_active, created_at, updated_at, deleted_at, image_url) VALUES ('cccfc8a9-8d88-47d6-8577-3bbb36bdec30', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Sevgililer Günü', '14_ŞUBAT', 'Sevgililer gününe özel kahvenin yanında tatlı %10 indirimli', '10.00', 'percent', TRUE, '2026-02-12T22:51:46.522Z', '2026-02-12T22:52:22.472Z', NULL, NULL);
INSERT INTO campaigns (id, user_id, name, unique_code, description, discount_amount, discount_type, is_active, created_at, updated_at, deleted_at, image_url) VALUES ('95a9a423-77af-4ae2-a250-b8ed639fe854', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Süper 2''li', '123', '', '10.00', 'amount', TRUE, '2026-02-12T22:31:57.912Z', '2026-02-12T22:37:00.231Z', NULL, NULL);
INSERT INTO campaigns (id, user_id, name, unique_code, description, discount_amount, discount_type, is_active, created_at, updated_at, deleted_at, image_url) VALUES ('b8a18152-d22b-4c36-b62b-0a3b6e1cff87', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'test', '1234', '', '10.00', 'percent', TRUE, '2026-02-12T22:32:21.285Z', '2026-02-13T12:18:33.254Z', NULL, '/uploads/be8b8541-f427-4287-a00b-a0e9783e5209/production/1770983456461-765627894.jpg');
INSERT INTO campaigns (id, user_id, name, unique_code, description, discount_amount, discount_type, is_active, created_at, updated_at, deleted_at, image_url) VALUES ('80979d45-4fb5-4a0c-9bd2-4b4cbd4ff513', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Öğle Menusu', 'CMP-20260213-235414', 'kuru pilav', '20.00', 'percent', TRUE, '2026-02-13T20:55:00.566Z', '2026-02-13T20:55:00.566Z', NULL, NULL);

-- Table: categories (48 rows)
TRUNCATE TABLE categories CASCADE;
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('4167260d-f848-49a1-85c3-ddda1b70b315', 'ec606148-bad2-45ed-8e51-83c2422e8832', 'Perakende Satış', 'income', '#10B981', 'shopping-cart', TRUE, TRUE, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('db82561c-3a8d-491d-9e71-52d9c6e2f24e', 'ec606148-bad2-45ed-8e51-83c2422e8832', 'Online Satış', 'income', '#3B82F6', 'globe', TRUE, TRUE, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('745de391-0126-4f29-8275-4b18a05f2816', 'ec606148-bad2-45ed-8e51-83c2422e8832', 'Paket Servis', 'income', '#EC4899', 'truck', TRUE, TRUE, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('20e9cf1a-63f5-4bcb-bf43-e2207eef640b', 'ec606148-bad2-45ed-8e51-83c2422e8832', 'Diğer Gelirler', 'income', '#6B7280', 'plus-circle', TRUE, TRUE, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('0dea7732-85a9-4464-8215-cca208029f8d', 'ec606148-bad2-45ed-8e51-83c2422e8832', 'Kira', 'expense', '#EF4444', 'home', TRUE, TRUE, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('23a34d17-5f71-4e53-af74-2a3174e6d2f6', 'ec606148-bad2-45ed-8e51-83c2422e8832', 'Ürün Alımı', 'expense', '#6366F1', 'shopping-bag', TRUE, TRUE, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('a786ce47-e690-473c-a34a-5dedbacaa25b', 'ec606148-bad2-45ed-8e51-83c2422e8832', 'Elektrik', 'expense', '#F59E0B', 'zap', TRUE, TRUE, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('756d7584-8551-47d4-b8b4-27c7db7e043d', 'ec606148-bad2-45ed-8e51-83c2422e8832', 'Su', 'expense', '#3B82F6', 'droplet', TRUE, TRUE, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('7f587b7d-d3b2-47d4-8a9d-69a282dfc342', 'ec606148-bad2-45ed-8e51-83c2422e8832', 'Personel Maaşı', 'expense', '#10B981', 'users', TRUE, TRUE, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('28ba7cd0-100c-49b5-92e9-2c6965f0da78', 'ec606148-bad2-45ed-8e51-83c2422e8832', 'Vergi', 'expense', '#DC2626', 'file-text', TRUE, TRUE, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('02ffbc46-1190-4d95-a228-d882edbab2d8', 'ec606148-bad2-45ed-8e51-83c2422e8832', 'Diğer Giderler', 'expense', '#6B7280', 'minus-circle', TRUE, TRUE, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('5261f2f5-9fe0-4510-a52d-bc93e1ee252d', '11111111-1111-1111-1111-111111111111', 'Satış A', 'income', '#10B981', 'shopping-cart', FALSE, TRUE, '2026-02-16T17:31:28.358Z', '2026-02-16T17:31:28.358Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('8052e71e-c550-4c5a-800c-c4b1b55c58a7', '11111111-1111-1111-1111-111111111111', 'Kira A', 'expense', '#EF4444', 'home', FALSE, TRUE, '2026-02-16T17:31:28.358Z', '2026-02-16T17:31:28.358Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('e73e6a3b-fab5-47a5-8fe7-ad567358318c', '22222222-2222-2222-2222-222222222222', 'Satış B', 'income', '#10B981', 'shopping-cart', FALSE, TRUE, '2026-02-16T17:31:28.358Z', '2026-02-16T17:31:28.358Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('8310246d-beca-41d5-a915-c3947cf709c0', '22222222-2222-2222-2222-222222222222', 'Kira B', 'expense', '#EF4444', 'home', FALSE, TRUE, '2026-02-16T17:31:28.358Z', '2026-02-16T17:31:28.358Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('df7cb357-7f74-4e01-b25c-f093f06a0f7f', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Kira', 'expense', '#f43f5e', NULL, FALSE, TRUE, '2026-01-23T23:00:29.942Z', '2026-01-24T11:48:42.222Z', NULL, 'fixed', '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('ec3d3430-4ff3-43b8-9267-77db9b2c03d9', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Market', 'expense', '#10b981', NULL, FALSE, TRUE, '2026-01-24T07:41:35.309Z', '2026-01-24T11:48:50.785Z', NULL, 'operational', '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('d13142d0-ac10-4a28-a3f6-3aba86d8de77', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'TrendYol', 'income', '#f97316', NULL, FALSE, TRUE, '2026-01-23T23:01:00.207Z', '2026-01-30T22:51:35.114Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('6612bef2-edfa-4f14-acc9-14062d7e0b36', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Elektrik', 'expense', '#f97316', NULL, FALSE, TRUE, '2026-01-23T23:00:22.259Z', '2026-01-24T11:48:31.347Z', NULL, 'fixed', '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('e81262f3-6d07-4cae-a227-7abfb64a4d9b', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Vergi', 'expense', '#6366f1', NULL, FALSE, TRUE, '2026-01-23T23:00:06.248Z', '2026-01-24T11:48:59.152Z', NULL, 'fixed', '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('c94f97c8-228c-4383-a096-5e1479b930f7', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Yemek Sepeti', 'income', '#f43f5e', NULL, FALSE, TRUE, '2026-01-24T07:08:53.369Z', '2026-02-10T18:30:54.290Z', NULL, NULL, '5.00', '5.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('2a35ae13-e12c-4f73-aa0c-eec79d86f811', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Getir', 'income', '#8b5cf6', NULL, FALSE, TRUE, '2026-01-23T23:00:44.038Z', '2026-02-09T20:23:27.384Z', NULL, NULL, '10.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('872ad2d1-c781-4872-8b19-13a4e5673867', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Ağırlama', 'expense', '#06b6d4', NULL, FALSE, TRUE, '2026-01-24T11:50:09.684Z', '2026-01-24T11:50:18.468Z', NULL, 'personal', '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('a8e5883a-7a25-4016-94a6-cc181f5a9a92', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dükkan', 'income', '#64748b', NULL, FALSE, TRUE, '2026-01-29T21:42:43.979Z', '2026-01-29T21:42:43.979Z', '2026-01-29T21:54:33.076Z', NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('dc37da5e-02ba-4650-a71c-7fe896541a80', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Dükkan Satış', 'income', '#84cc16', NULL, FALSE, TRUE, '2026-01-24T11:53:18.300Z', '2026-01-29T21:54:43.109Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('9986f25d-95e0-4fe5-b20c-0553067c4163', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Test kategori', 'expense', '#84cc16', NULL, FALSE, TRUE, '2026-01-26T18:30:00.857Z', '2026-01-26T18:30:00.857Z', '2026-01-29T21:55:39.999Z', NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('66c14a88-4f8e-4c3c-94af-c4bafd7d2987', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Dİkkan', 'income', '#64748b', NULL, FALSE, TRUE, '2026-01-29T21:43:01.225Z', '2026-01-29T21:43:01.225Z', '2026-01-29T21:55:46.239Z', NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('bb29aa96-7ba6-4db0-9ab9-6af7edcf1912', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'deneme', 'income', '#64748b', NULL, FALSE, TRUE, '2026-02-09T06:51:05.238Z', '2026-02-09T06:51:05.238Z', '2026-02-09T06:51:18.762Z', NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('a9db9d54-87a4-46e1-99dd-6abea3ba9cbb', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'test', 'income', '#71717a', NULL, FALSE, TRUE, '2026-02-09T06:51:32.618Z', '2026-02-09T06:51:32.618Z', '2026-02-09T06:51:36.576Z', NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('2a9af643-f7f1-4956-a329-153471331f8a', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'test', 'income', '#0ea5e9', NULL, FALSE, TRUE, '2026-02-09T20:09:11.368Z', '2026-02-09T20:09:11.368Z', '2026-02-09T20:09:15.394Z', NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('85a0e973-3b81-46ee-938c-cf1ba996dc1c', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Sistem-Getir', 'expense', '#64748b', NULL, FALSE, TRUE, '2026-02-09T20:47:23.510Z', '2026-02-09T20:47:23.510Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('3b61eb52-4b64-40df-ad80-f2bfee978b3b', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Sistem-Yemek Sepeti', 'expense', '#64748b', NULL, FALSE, TRUE, '2026-02-10T18:31:08.096Z', '2026-02-10T18:31:08.096Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('74ebce92-7e81-43ba-8c11-406b76c345a5', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Sistem-Kredi kartı', 'expense', '#f59e0b', NULL, FALSE, TRUE, '2026-02-10T19:16:25.302Z', '2026-02-10T19:16:25.302Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('c76d16ac-a3b5-4742-8961-16648dc37180', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Sistem-Sodexo', 'expense', '#f59e0b', NULL, FALSE, TRUE, '2026-02-13T12:01:20.786Z', '2026-02-13T12:01:20.786Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('f5f96f5f-b39d-4e1a-a51f-ef6a4d400fb4', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Kira', 'expense', '#dc2626', 'Home', TRUE, TRUE, '2026-01-28T18:19:45.361Z', '2026-01-28T18:19:45.361Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('0a830cc6-d7c8-4d51-981f-0db7cca476b9', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Fatura (Elektrik/Su)', 'expense', '#dc2626', 'Zap', TRUE, TRUE, '2026-01-28T18:19:45.362Z', '2026-01-28T18:19:45.362Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('539e81e2-1765-43de-a68e-966190363bf3', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Personel Maaşı', 'expense', '#dc2626', 'Users', TRUE, TRUE, '2026-01-28T18:19:45.363Z', '2026-01-28T18:19:45.363Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('f4c2b9df-02f5-4e9f-b327-d4147ef73208', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Malzeme Alımı', 'expense', '#dc2626', 'Package', TRUE, TRUE, '2026-01-28T18:19:45.364Z', '2026-01-28T18:19:45.364Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('040e84b9-af5d-4493-a32d-7159504c729d', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Diğer Giderler', 'expense', '#dc2626', 'MoreHorizontal', TRUE, TRUE, '2026-01-28T18:19:45.365Z', '2026-01-28T18:19:45.365Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('e2ddde0e-1de0-4298-ba4b-8260233011a1', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Hizmet Geliri', 'income', '#16a34a', 'Briefcase', TRUE, TRUE, '2026-01-28T18:19:45.360Z', '2026-01-28T18:19:45.360Z', '2026-02-09T12:48:01.396Z', NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('0372131f-9eaa-4f02-a7ef-abe14149a2df', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Genel Satış', 'income', '#16a34a', 'ShoppingCart', TRUE, TRUE, '2026-01-28T18:19:45.357Z', '2026-01-28T18:19:45.357Z', '2026-02-09T12:48:04.387Z', NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('79c62556-4555-483b-97fe-96eb4129f531', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Mağaza', 'income', '#ef4444', NULL, FALSE, TRUE, '2026-02-09T12:49:14.577Z', '2026-02-09T12:49:36.516Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('d93fb8c6-7823-4078-8fba-d4cd2ae94292', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Yemek Sepeti', 'income', '#ef4444', NULL, FALSE, TRUE, '2026-01-28T18:44:46.772Z', '2026-02-14T20:17:45.704Z', NULL, NULL, '39.30', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('150dea11-d552-48c4-bc25-41ca640e11ae', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Sistem-Yemek Sepeti', 'expense', '#64748b', NULL, FALSE, TRUE, '2026-02-11T19:04:04.015Z', '2026-02-11T19:04:04.015Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('0ed57563-9b15-4216-af6d-43070cd95b5e', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Getir', 'income', '#8b5cf6', NULL, FALSE, TRUE, '2026-01-28T18:44:36.723Z', '2026-02-13T18:27:12.078Z', NULL, NULL, '42.40', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('0cc87ecc-ec35-4a07-b656-57f2a5defec5', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Trendyol', 'income', '#f97316', NULL, FALSE, TRUE, '2026-01-28T18:45:01.479Z', '2026-02-13T18:28:22.131Z', NULL, NULL, '38.40', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('37975206-a3b8-4879-b3dd-9ecca653fa49', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Sistem-Getir', 'expense', '#64748b', NULL, FALSE, TRUE, '2026-02-13T18:12:34.634Z', '2026-02-13T18:12:34.634Z', NULL, NULL, '0.00', '0.00');
INSERT INTO categories (id, user_id, name, type, color, icon, is_default, is_active, created_at, updated_at, deleted_at, expense_type, service_commission_rate, courier_service_rate) VALUES ('885903b0-ef68-49dc-b2a8-033dd59eb95b', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Sistem-Trendyol', 'expense', '#64748b', NULL, FALSE, TRUE, '2026-02-14T20:05:37.816Z', '2026-02-14T20:05:37.816Z', NULL, NULL, '0.00', '0.00');

-- Table: channels (28 rows)
TRUNCATE TABLE channels CASCADE;
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('d80887b8-9b74-4f9d-b3a5-d9e76f867f2f', 'ec606148-bad2-45ed-8e51-83c2422e8832', 'Mağaza Kasası', 'sales', 'Fiziksel mağaza satışları', TRUE, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, '0.00');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('705da090-bab1-4581-92c9-c291a5a566dd', 'ec606148-bad2-45ed-8e51-83c2422e8832', 'Getir', 'sales', 'Getir üzerinden gelen siparişler', TRUE, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, '0.00');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('9e4a2b6d-5e55-4cf7-bd31-e2073288eeb0', 'ec606148-bad2-45ed-8e51-83c2422e8832', 'Yemeksepeti', 'sales', 'Yemeksepeti siparişleri', TRUE, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, '0.00');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('a917f9f6-7097-4054-963f-c6555a8ec609', 'ec606148-bad2-45ed-8e51-83c2422e8832', 'Instagram', 'sales', 'Instagram DM siparişleri', TRUE, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, '0.00');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('5e5e6231-e93e-4961-b899-493c05c96276', 'ec606148-bad2-45ed-8e51-83c2422e8832', 'Nakit', 'payment', 'Nakit ödeme', TRUE, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, '0.00');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('ae1a72cd-1158-486b-b98e-951fa52f3705', 'ec606148-bad2-45ed-8e51-83c2422e8832', 'Kredi Kartı', 'payment', 'Kredi kartı ile ödeme (POS)', TRUE, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, '0.00');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('2aa67536-035b-4e2a-99b3-2d6e5ddac8b1', 'ec606148-bad2-45ed-8e51-83c2422e8832', 'Banka Havalesi', 'payment', 'EFT/Havale', TRUE, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, '0.00');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('8b14d077-949f-4ac0-a0c6-ee439bddf0e2', '11111111-1111-1111-1111-111111111111', 'Nakit A', 'payment', NULL, TRUE, '2026-02-16T17:31:28.358Z', '2026-02-16T17:31:28.358Z', NULL, '0.00');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('0442418f-9e23-4207-ac2f-45c1cf36f7eb', '22222222-2222-2222-2222-222222222222', 'Nakit B', 'payment', NULL, TRUE, '2026-02-16T17:31:28.358Z', '2026-02-16T17:31:28.358Z', NULL, '0.00');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('6e191037-0aa9-4ca7-a4f6-ccc6c5cb4a32', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Test', 'sales', '', TRUE, '2026-01-29T21:58:52.724Z', '2026-01-29T21:58:52.724Z', '2026-01-29T21:59:00.701Z', '0.00');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('3ce0b5b6-213b-46bb-9d37-feec5c40584c', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Online Satış', 'sales', '', TRUE, '2026-02-09T20:08:45.094Z', '2026-02-09T20:08:45.094Z', NULL, '0.00');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('17323675-d555-4408-bf1e-da858060942f', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'test', 'sales', '', TRUE, '2026-02-09T20:11:14.934Z', '2026-02-09T20:11:14.934Z', '2026-02-09T20:11:22.369Z', '0.00');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('0fa170a4-d8e8-48c4-9ff7-6ab81a544ce5', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'test', 'payment', '', TRUE, '2026-02-09T20:17:33.577Z', '2026-02-09T20:17:33.577Z', '2026-02-09T20:17:37.918Z', '0.00');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Nakit', 'payment', '', TRUE, '2026-01-23T23:08:59.408Z', '2026-02-09T20:17:48.790Z', NULL, '0.00');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('305e0b20-dd98-4bde-942f-a1bc0a22e752', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Online Satış', 'payment', '', TRUE, '2026-01-29T21:54:53.826Z', '2026-01-29T21:55:09.634Z', '2026-02-09T20:18:16.980Z', '0.00');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('3e3ece09-dc67-4b66-ab6d-2bd4c4cdfaa4', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Sodexo', 'payment', '', TRUE, '2026-02-09T20:18:24.768Z', '2026-02-13T12:00:44.715Z', NULL, '0.00');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('6562038e-37bb-4726-8999-f73d800c151d', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Nakit Kasa', 'payment', 'Nakit işlemler', TRUE, '2026-01-28T18:19:45.367Z', '2026-01-28T18:19:45.367Z', NULL, '0.00');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('c3c610ce-5905-4252-bb77-6279a6abc50b', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Kredi Kartı', 'payment', 'POS cihazı çekimleri', TRUE, '2026-01-28T18:19:45.369Z', '2026-01-28T18:19:45.369Z', NULL, '0.00');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('7f725b8e-2377-4d8f-be48-78eb232948d6', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Banka Hesabı', 'payment', 'Havale/EFT', TRUE, '2026-01-28T18:19:45.370Z', '2026-01-28T18:19:45.370Z', NULL, '0.00');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('0abf0e3a-8724-4d91-a091-e8d13c3e7527', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Getir', 'sales', 'Getir satışları', TRUE, '2026-01-28T18:19:45.372Z', '2026-01-28T18:19:45.372Z', '2026-02-09T12:48:38.088Z', '0.00');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('7cb157a3-a157-4ebf-a721-6854e70a78fc', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Trendyol', 'sales', 'Trendyol satışları', TRUE, '2026-01-28T18:19:45.371Z', '2026-01-28T18:19:45.371Z', '2026-02-09T12:48:42.018Z', '0.00');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('d35b6b49-61a6-42c5-bfc0-86aa410d5496', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Mağaza Satışı', 'sales', 'Fiziksel mağaza', TRUE, '2026-01-28T18:19:45.374Z', '2026-01-28T18:19:45.374Z', '2026-02-09T12:48:47.715Z', '0.00');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('fb5098e5-6e26-4b7c-8fdd-cc80caa889cf', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Nakit', 'payment', '', TRUE, '2026-02-09T12:52:49.721Z', '2026-02-09T12:52:49.721Z', NULL, '0.00');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('0cf763c5-9bd7-42a7-abb2-e91e64320665', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Online', 'payment', '', TRUE, '2026-02-09T12:50:14.877Z', '2026-02-09T12:53:13.733Z', NULL, '0.00');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('ae26e0ec-6caf-4a38-994d-f1df1611b587', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Edernet', 'payment', '', TRUE, '2026-02-09T12:49:22.507Z', '2026-02-09T12:49:22.507Z', '2026-02-16T20:26:19.936Z', '0.00');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Kredi kartı', 'payment', '', TRUE, '2026-01-23T23:09:14.622Z', '2026-02-16T20:29:04.084Z', NULL, '5.00');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('f627b71e-53d5-4d3a-9c74-de13340f4634', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Ederned', 'payment', '', TRUE, '2026-02-16T20:39:43.902Z', '2026-02-16T20:39:52.678Z', NULL, '9.50');
INSERT INTO channels (id, user_id, name, type, description, is_active, created_at, updated_at, deleted_at, commission_rate) VALUES ('dd5eb7d8-e0b5-4cfe-bee5-67b7e3c242e0', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Pluxee', 'payment', '', TRUE, '2026-01-28T18:46:12.008Z', '2026-02-16T20:40:00.508Z', NULL, '9.50');

-- Table: customers (4 rows)
TRUNCATE TABLE customers CASCADE;
INSERT INTO customers (id, user_id, name, phone, address, notes, created_at, updated_at, deleted_at, city, district, neighborhood) VALUES ('df7432ad-d243-45d5-a2d1-4c8c80752484', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Test Customer Updated', '5551234567', 'Test Address', NULL, '2026-02-09T07:50:08.185Z', '2026-02-09T07:50:08.192Z', NULL, NULL, NULL, NULL);
INSERT INTO customers (id, user_id, name, phone, address, notes, created_at, updated_at, deleted_at, city, district, neighborhood) VALUES ('93b3f5b1-68bd-423a-af74-684d9243c9e1', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Caner2', '5309022660', 'Test', NULL, '2026-02-09T07:55:32.809Z', '2026-02-09T08:13:26.278Z', NULL, 'İstanbul', 'Beşiktaş', 'Dikilitaş');
INSERT INTO customers (id, user_id, name, phone, address, notes, created_at, updated_at, deleted_at, city, district, neighborhood) VALUES ('e21eaf99-2417-4de2-9f51-6dcd72b757fd', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Caner3', '5309022661', 'Test', NULL, '2026-02-09T08:14:13.976Z', '2026-02-09T08:14:32.870Z', NULL, 'İstanbul', 'Beşiktaş', 'Dikilitaş');
INSERT INTO customers (id, user_id, name, phone, address, notes, created_at, updated_at, deleted_at, city, district, neighborhood) VALUES ('fcf5407d-dea3-4420-8a6d-64c44d6637d3', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Caner Okcuoğlu ', '5309022660', 'Dödkxm', NULL, '2026-02-09T12:47:17.791Z', '2026-02-09T12:47:17.791Z', NULL, 'İstanbul', 'Beşiktaş', 'Dikilitaş');

-- Table: fixed_expenses (3 rows)
TRUNCATE TABLE fixed_expenses CASCADE;
INSERT INTO fixed_expenses (id, user_id, category_id, name, amount, currency, recurrence_period, payment_day, start_date, end_date, auto_create_transaction, is_active, notes, created_at, updated_at, deleted_at) VALUES ('ef61142b-a3d8-4a2c-9d87-97dea91d446d', 'ec606148-bad2-45ed-8e51-83c2422e8832', '0dea7732-85a9-4464-8215-cca208029f8d', 'Mağaza Kirası', '15000.00', 'TRY', 'monthly', 5, '2025-12-31T21:00:00.000Z', NULL, FALSE, TRUE, NULL, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL);
INSERT INTO fixed_expenses (id, user_id, category_id, name, amount, currency, recurrence_period, payment_day, start_date, end_date, auto_create_transaction, is_active, notes, created_at, updated_at, deleted_at) VALUES ('766dd569-fb5f-47a9-a156-5787c82a7824', 'ec606148-bad2-45ed-8e51-83c2422e8832', '7f587b7d-d3b2-47d4-8a9d-69a282dfc342', 'Kasiyer Maaşı', '18000.00', 'TRY', 'monthly', 1, '2025-12-31T21:00:00.000Z', NULL, FALSE, TRUE, NULL, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL);
INSERT INTO fixed_expenses (id, user_id, category_id, name, amount, currency, recurrence_period, payment_day, start_date, end_date, auto_create_transaction, is_active, notes, created_at, updated_at, deleted_at) VALUES ('bed99f2c-e028-414c-8a09-1bec368d1c5e', 'ec606148-bad2-45ed-8e51-83c2422e8832', 'a786ce47-e690-473c-a34a-5dedbacaa25b', 'Elektrik Faturası', '2500.00', 'TRY', 'monthly', 15, '2025-12-31T21:00:00.000Z', NULL, FALSE, TRUE, NULL, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL);

-- Table: menu_categories (12 rows)
TRUNCATE TABLE menu_categories CASCADE;
INSERT INTO menu_categories (id, user_id, name, parent_id, level, sort_order, is_active, created_at, updated_at) VALUES ('e06cbb09-c0ad-4d7d-9ad3-73bc2ac01aec', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Balık', '07cf17ab-5099-40d1-9157-b820eb7a1890', 2, 0, TRUE, '2026-01-29T21:49:54.260Z', '2026-01-29T21:49:54.260Z');
INSERT INTO menu_categories (id, user_id, name, parent_id, level, sort_order, is_active, created_at, updated_at) VALUES ('01278280-fb38-4e93-a042-d7967cd9fde4', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'İçecekler', NULL, 1, 0, TRUE, '2026-01-29T21:52:17.724Z', '2026-01-29T21:52:17.724Z');
INSERT INTO menu_categories (id, user_id, name, parent_id, level, sort_order, is_active, created_at, updated_at) VALUES ('07cf17ab-5099-40d1-9157-b820eb7a1890', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Ana Yemek', NULL, 1, 0, TRUE, '2026-01-29T21:49:39.696Z', '2026-01-30T19:34:28.251Z');
INSERT INTO menu_categories (id, user_id, name, parent_id, level, sort_order, is_active, created_at, updated_at) VALUES ('51453b73-f4db-410e-8948-5911c3e4fee7', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Ara Sıcak', NULL, 1, 1, TRUE, '2026-01-30T19:37:49.046Z', '2026-01-30T19:37:49.046Z');
INSERT INTO menu_categories (id, user_id, name, parent_id, level, sort_order, is_active, created_at, updated_at) VALUES ('80225371-fb1d-4e2f-a508-dd0c7e802440', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Ev Yemekleri', '07cf17ab-5099-40d1-9157-b820eb7a1890', 2, 0, TRUE, '2026-02-08T19:47:40.204Z', '2026-02-08T19:47:40.204Z');
INSERT INTO menu_categories (id, user_id, name, parent_id, level, sort_order, is_active, created_at, updated_at) VALUES ('1d75df37-0c6a-44a1-a528-36a876c28f51', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Sıcak İçecekler', '5fb5edae-67e5-4c28-80e3-00e899ab5223', 2, 0, TRUE, '2026-02-09T12:34:51.445Z', '2026-02-09T12:34:51.445Z');
INSERT INTO menu_categories (id, user_id, name, parent_id, level, sort_order, is_active, created_at, updated_at) VALUES ('2dee550b-fd7d-4c5a-87e4-9403eb7504ee', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Soğuk İçecekler', '5fb5edae-67e5-4c28-80e3-00e899ab5223', 2, 1, TRUE, '2026-02-09T12:34:35.221Z', '2026-02-09T12:35:01.129Z');
INSERT INTO menu_categories (id, user_id, name, parent_id, level, sort_order, is_active, created_at, updated_at) VALUES ('9c1b29f6-10fb-4e92-b54c-ece79b2f46ad', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'BELÇİKA ÇİKOLATALI TATLILAR', NULL, 1, 1, TRUE, '2026-02-08T20:11:01.801Z', '2026-02-09T12:35:24.389Z');
INSERT INTO menu_categories (id, user_id, name, parent_id, level, sort_order, is_active, created_at, updated_at) VALUES ('5fb5edae-67e5-4c28-80e3-00e899ab5223', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'İçecekler', NULL, 1, 3, TRUE, '2026-02-09T12:34:18.152Z', '2026-02-09T12:35:33.546Z');
INSERT INTO menu_categories (id, user_id, name, parent_id, level, sort_order, is_active, created_at, updated_at) VALUES ('84a79213-5623-4e36-8114-595ead40266c', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Magnolia', NULL, 1, 2, TRUE, '2026-02-09T12:34:05.827Z', '2026-02-10T19:10:06.379Z');
INSERT INTO menu_categories (id, user_id, name, parent_id, level, sort_order, is_active, created_at, updated_at) VALUES ('614fdffb-80c7-4ff7-b131-742cf972d97a', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Limonatalar', '5fb5edae-67e5-4c28-80e3-00e899ab5223', 2, 3, TRUE, '2026-02-11T11:40:56.989Z', '2026-02-11T11:40:56.989Z');
INSERT INTO menu_categories (id, user_id, name, parent_id, level, sort_order, is_active, created_at, updated_at) VALUES ('c302f79b-0e33-4bc0-99a0-558f9529faaa', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'İÇECEKLER', '5fb5edae-67e5-4c28-80e3-00e899ab5223', 2, 4, TRUE, '2026-02-11T11:42:03.552Z', '2026-02-11T11:42:03.552Z');

-- Table: ocr_records (104 rows)
TRUNCATE TABLE ocr_records CASCADE;
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('c738f98f-7cdb-4f58-ae7d-28d51d4016cc', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1769239458182-556335446.png', 'DiaSA AS
R HAH. İSMETNO:08
Beyoğlu TANBUL
EKER KASAP KÖFTE — XİB «Lek
SELPAK TIN.KAĞIDIB''. 18 4695
SUTAS PAST. TEREYAG A8 10:63
DANETTE FIN.CİKOLATA 18 *1.23
EXT.CLERİ DİS FIRÇAB TAB Mbal
EKKEK 200ER YL 1013
ÜLHSİ iğ GK #Ldğ
CLASSIC ke .ÇİK MB *Ld3
DIR STREÇ FİLM İSMT XLB #073
KİREÇ SÖKÜCÜ DA Ti8 337
PENAR DOYUM SUCUK SİB 44,39
DI BUZ POSET KÜĞÜK 18 30.45
CÖFFEMATE EKO-PAKET XL8 MDU
MZ Kb ve aled3
0.495 KE X SKB)
KAYISI - AÇIK 08 KARLA
0460 Kb X 2129
COCA DOLA S3CL XiB xL68
Lie BR.
Coca COLA LİGHT S3lLe #ÜN
ATLAMA bicl
SİM ZE “|
kimi — göz "
FRUKO GAZAZ BOM ZLE 40MS5
EFES PİLSE.FİĞI BİRA S1 > ağıl
', '44.39', NULL, 'DiaSA AS', 34, 'pending', '2026-01-24T07:24:18.176Z', '2026-01-24T07:24:18.176Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('1315370e-0ee9-40c4-9625-2c566219d7cf', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1769239588885-372760723.jpg', 'YAN ARA
BE > le ir
Wi >< Wes
" MERE
|) LİRA &8 DER
7 Ü > çe > DOM
AR: e
A.” : Sİ
| Sağlar ve BE ÜNER
Ds 35 ÜRE
PUR Ğİ Se MM
b Brom Owe — TEE MM
Ber
ARA TOPLAN SazT6L Wer di
1“ ömer aile Cöra DD
sert —
tzemirzsi, A MES
SLÜRLD 10 m el ve 4
iErUğöme m sam
Dir |
TEK ğa revan o ee
gELeY neo
', '0.00', NULL, 'YAN ARA', 33, 'pending', '2026-01-24T07:26:28.883Z', '2026-01-24T07:26:28.883Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('8c53804d-1081-494f-bb02-a7c72a3c0931', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1769239603931-343689846.jpg', 'YAN ARA
BE > le ir
Wi >< Wes
" MERE
|) LİRA &8 DER
7 Ü > çe > DOM
AR: e
A.” : Sİ
| Sağlar ve BE ÜNER
Ds 35 ÜRE
PUR Ğİ Se MM
b Brom Owe — TEE MM
Ber
ARA TOPLAN SazT6L Wer di
1“ ömer aile Cöra DD
sert —
tzemirzsi, A MES
SLÜRLD 10 m el ve 4
iErUğöme m sam
Dir |
TEK ğa revan o ee
gELeY neo
', '0.00', NULL, 'YAN ARA', 33, 'pending', '2026-01-24T07:26:43.929Z', '2026-01-24T07:26:43.929Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('009ad5fe-51b3-4af1-aec3-21eaa6e53f2b', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1769239656803-523170605.jpg', '| 4
i f ME
Tü kr
| benm a dl a
İş EDS tga İl
Eye ES
| m.
Bı o
i TERRA Ft
: DONAN DENMA D ul
Saz.
lit e
ÜRE
Bre Biyik
üm
EŞE
Köziş ie. garamnonı
aracı zin
ye te yama
', '0.00', NULL, 'i f ME', 22, 'pending', '2026-01-24T07:27:36.801Z', '2026-01-24T07:27:36.801Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('12740f29-57e0-44f7-8ef0-2e4cb881064e', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1769239668602-433390006.jpg', '| 4
i f ME
Tü kr
| benm a dl a
İş EDS tga İl
Eye ES
| m.
Bı o
i TERRA Ft
: DONAN DENMA D ul
Saz.
lit e
ÜRE
Bre Biyik
üm
EŞE
Köziş ie. garamnonı
aracı zin
ye te yama
', '0.00', NULL, 'i f ME', 22, 'pending', '2026-01-24T07:27:48.600Z', '2026-01-24T07:27:48.600Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('4fd18afe-7d17-47bb-835d-4e0ccf403e90', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1769240427286-436577181.jpg', 'F JÜURKİYE TARIMA KAEDİ
Ky CÖOPERATIF
| i TK TARIM KREDİ PAZ. VE MARKETÇİLİK A.Ş ki
ki b: 4 YAYLACIK MAHALLESİ BAŞARI CD. ğ 2
kiç ak NO:24/A BUCA/İZMİR ri
a rg N 2 k.| Ankara Kurumlar V.D./8450627145 4 v
WEE NC ?

ME “TF Sa ÇEDAŞ ra / iş i i
ERA A e va N Üişı / | ” Ül i
WAR EŞ ; # i) d T «

bn da SAA ÜY Abrb — A du

SE Çete alla Ne VA HAP “> 4 "iş et

EĞ 3 xw : eee” çil dü ER RS

iy Ca ER iç Baf i Ef s./

#5 EM TÜR : e-ARŞİV FATURA Eler. fm

* <<” SE KS) F . * ğ.
e Bl : 11.01.2023 Mağaza No : 5757 ; yeğ
EŞ e saat : 13:19 Kasa No: 2 : A
Se rğr Belge No : 49 Z No : 205 gör yi RA

“a Tim a ER üs sss mE se GERE SER. LL... g "a '' ÜRE. ağ #
a RefNo : T172023000001615 VR . AR ŞA
A ETTİN : 51467467-9991-ed11-a3ce-eoed4cb3cesb — Mpa a İz
Bi 8690639001312 x 1 AD *34,90-B iler 3 Dağ zg
ÖĞ O) LtpTon EARL GREY DEM xo1 *34,90 Dy Ji <7
E O 8682615101925 x 1 AD *19,25-B UR ev RA
EO) K DEMLİK POŞET ÇAY &01 *19,25 Şi e $
TORİ 8682615101925 x 1 AD *19,25-B ''R.
çi TK DEMLİK POŞET ÇAY X01 *19,25 ÜRE RE 3 sa
8682615101925 x 1 AD *19,25-B “SEİR YA a # did
TK DEMLİK POŞET ÇAY X01 *19,25 A ör
8680643020461 x 1 AD *0,25-B Klee £ Tç ç.
TKK MARKET POŞETİ — X18 *0,25 KEY ATİ iz. ş
Toplam KDV : 10,06 — PER ES Dye
Toplam ğ *92,90 ET yaz EE AŞ
YALNIZDoksanİkiTLDoksankKr EE Yine ya
BANKA KREDİ KARTI *92,900 a e
EĞ © 3

$ Bu e-Arşiv Faturanızı, EKA ağ m

&arsiv.kooperatifmarket.com.tr şi hık, Ka

Çi adresinden Referans No girişi yaparak | HK EŞ

e görüntüleyebilirsiniz. e dir ül ; »

Bi ''n Firma VKN : 845 062 7145 SE LL b a

zel in Fatura No : T172023000001615 kei > AĞEBSİİ

i ğ Ödenen Tutar 92,90 NÜ ak - SE ke

* Hz aa > T “ÖĞ

at vok KA Re 4

X $ OL Tükatlcı öv ce b” » o ağ Sr

vet İrt aliye Yerine Geçer Mo va, kB ş şk

vee Ş b” şilan WS Ül san

Va Merkez : SARAY MAlI, GIDACILAR CD. : > Ayk”

; NO:11 KAHRAMANKAZAN/ ANKARA <<. Ze rt YT
Web : Www. kooperaLifmarkel.com. tr BE BY Aa a ASİ
SARAY MAH, GIDACILAR CD.NO:11 “yü vd BT

F İADE İŞLEMLERİNDE SATIŞ FİŞİNİN VE SR Tig 7 Siğr E

4 KREDİ KARTININ İBRAZI GEREKLİDİR. ELE a ME

: Mersis No : 0845 0627 1450 00001 KT ME AR LE

Yl (00000 olumu dl roll Ci Yl Der. am
', '92.90', '2023-01-10T21:00:00.000Z', 'F JÜURKİYE TARIMA KAEDİ', 45, 'pending', '2026-01-24T07:40:27.286Z', '2026-01-24T07:40:27.286Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('f44be82e-1824-4c0c-9842-71cadaaf8580', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1769240505170-756199803.jpg', 'F JÜURKİYE TARIMA KAEDİ
Ky CÖOPERATIF
| i TK TARIM KREDİ PAZ. VE MARKETÇİLİK A.Ş ki
ki b: 4 YAYLACIK MAHALLESİ BAŞARI CD. ğ 2
kiç ak NO:24/A BUCA/İZMİR ri
a rg N 2 k.| Ankara Kurumlar V.D./8450627145 4 v
WEE NC ?

ME “TF Sa ÇEDAŞ ra / iş i i
ERA A e va N Üişı / | ” Ül i
WAR EŞ ; # i) d T «

bn da SAA ÜY Abrb — A du

SE Çete alla Ne VA HAP “> 4 "iş et

EĞ 3 xw : eee” çil dü ER RS

iy Ca ER iç Baf i Ef s./

#5 EM TÜR : e-ARŞİV FATURA Eler. fm

* <<” SE KS) F . * ğ.
e Bl : 11.01.2023 Mağaza No : 5757 ; yeğ
EŞ e saat : 13:19 Kasa No: 2 : A
Se rğr Belge No : 49 Z No : 205 gör yi RA

“a Tim a ER üs sss mE se GERE SER. LL... g "a '' ÜRE. ağ #
a RefNo : T172023000001615 VR . AR ŞA
A ETTİN : 51467467-9991-ed11-a3ce-eoed4cb3cesb — Mpa a İz
Bi 8690639001312 x 1 AD *34,90-B iler 3 Dağ zg
ÖĞ O) LtpTon EARL GREY DEM xo1 *34,90 Dy Ji <7
E O 8682615101925 x 1 AD *19,25-B UR ev RA
EO) K DEMLİK POŞET ÇAY &01 *19,25 Şi e $
TORİ 8682615101925 x 1 AD *19,25-B ''R.
çi TK DEMLİK POŞET ÇAY X01 *19,25 ÜRE RE 3 sa
8682615101925 x 1 AD *19,25-B “SEİR YA a # did
TK DEMLİK POŞET ÇAY X01 *19,25 A ör
8680643020461 x 1 AD *0,25-B Klee £ Tç ç.
TKK MARKET POŞETİ — X18 *0,25 KEY ATİ iz. ş
Toplam KDV : 10,06 — PER ES Dye
Toplam ğ *92,90 ET yaz EE AŞ
YALNIZDoksanİkiTLDoksankKr EE Yine ya
BANKA KREDİ KARTI *92,900 a e
EĞ © 3

$ Bu e-Arşiv Faturanızı, EKA ağ m

&arsiv.kooperatifmarket.com.tr şi hık, Ka

Çi adresinden Referans No girişi yaparak | HK EŞ

e görüntüleyebilirsiniz. e dir ül ; »

Bi ''n Firma VKN : 845 062 7145 SE LL b a

zel in Fatura No : T172023000001615 kei > AĞEBSİİ

i ğ Ödenen Tutar 92,90 NÜ ak - SE ke

* Hz aa > T “ÖĞ

at vok KA Re 4

X $ OL Tükatlcı öv ce b” » o ağ Sr

vet İrt aliye Yerine Geçer Mo va, kB ş şk

vee Ş b” şilan WS Ül san

Va Merkez : SARAY MAlI, GIDACILAR CD. : > Ayk”

; NO:11 KAHRAMANKAZAN/ ANKARA <<. Ze rt YT
Web : Www. kooperaLifmarkel.com. tr BE BY Aa a ASİ
SARAY MAH, GIDACILAR CD.NO:11 “yü vd BT

F İADE İŞLEMLERİNDE SATIŞ FİŞİNİN VE SR Tig 7 Siğr E

4 KREDİ KARTININ İBRAZI GEREKLİDİR. ELE a ME

: Mersis No : 0845 0627 1450 00001 KT ME AR LE

Yl (00000 olumu dl roll Ci Yl Der. am
', '92.90', '2023-01-10T21:00:00.000Z', 'F JÜURKİYE TARIMA KAEDİ', 45, 'pending', '2026-01-24T07:41:45.172Z', '2026-01-24T07:41:45.172Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('08e2740d-391b-4b3c-9e5f-71230efb0c68', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1769240562482-959005522.jpg', 'F JÜURKİYE TARIMA KAEDİ
Ky CÖOPERATIF
| i TK TARIM KREDİ PAZ. VE MARKETÇİLİK A.Ş ki
ki b: 4 YAYLACIK MAHALLESİ BAŞARI CD. ğ 2
kiç ak NO:24/A BUCA/İZMİR ri
a rg N 2 k.| Ankara Kurumlar V.D./8450627145 4 v
WEE NC ?

ME “TF Sa ÇEDAŞ ra / iş i i
ERA A e va N Üişı / | ” Ül i
WAR EŞ ; # i) d T «

bn da SAA ÜY Abrb — A du

SE Çete alla Ne VA HAP “> 4 "iş et

EĞ 3 xw : eee” çil dü ER RS

iy Ca ER iç Baf i Ef s./

#5 EM TÜR : e-ARŞİV FATURA Eler. fm

* <<” SE KS) F . * ğ.
e Bl : 11.01.2023 Mağaza No : 5757 ; yeğ
EŞ e saat : 13:19 Kasa No: 2 : A
Se rğr Belge No : 49 Z No : 205 gör yi RA

“a Tim a ER üs sss mE se GERE SER. LL... g "a '' ÜRE. ağ #
a RefNo : T172023000001615 VR . AR ŞA
A ETTİN : 51467467-9991-ed11-a3ce-eoed4cb3cesb — Mpa a İz
Bi 8690639001312 x 1 AD *34,90-B iler 3 Dağ zg
ÖĞ O) LtpTon EARL GREY DEM xo1 *34,90 Dy Ji <7
E O 8682615101925 x 1 AD *19,25-B UR ev RA
EO) K DEMLİK POŞET ÇAY &01 *19,25 Şi e $
TORİ 8682615101925 x 1 AD *19,25-B ''R.
çi TK DEMLİK POŞET ÇAY X01 *19,25 ÜRE RE 3 sa
8682615101925 x 1 AD *19,25-B “SEİR YA a # did
TK DEMLİK POŞET ÇAY X01 *19,25 A ör
8680643020461 x 1 AD *0,25-B Klee £ Tç ç.
TKK MARKET POŞETİ — X18 *0,25 KEY ATİ iz. ş
Toplam KDV : 10,06 — PER ES Dye
Toplam ğ *92,90 ET yaz EE AŞ
YALNIZDoksanİkiTLDoksankKr EE Yine ya
BANKA KREDİ KARTI *92,900 a e
EĞ © 3

$ Bu e-Arşiv Faturanızı, EKA ağ m

&arsiv.kooperatifmarket.com.tr şi hık, Ka

Çi adresinden Referans No girişi yaparak | HK EŞ

e görüntüleyebilirsiniz. e dir ül ; »

Bi ''n Firma VKN : 845 062 7145 SE LL b a

zel in Fatura No : T172023000001615 kei > AĞEBSİİ

i ğ Ödenen Tutar 92,90 NÜ ak - SE ke

* Hz aa > T “ÖĞ

at vok KA Re 4

X $ OL Tükatlcı öv ce b” » o ağ Sr

vet İrt aliye Yerine Geçer Mo va, kB ş şk

vee Ş b” şilan WS Ül san

Va Merkez : SARAY MAlI, GIDACILAR CD. : > Ayk”

; NO:11 KAHRAMANKAZAN/ ANKARA <<. Ze rt YT
Web : Www. kooperaLifmarkel.com. tr BE BY Aa a ASİ
SARAY MAH, GIDACILAR CD.NO:11 “yü vd BT

F İADE İŞLEMLERİNDE SATIŞ FİŞİNİN VE SR Tig 7 Siğr E

4 KREDİ KARTININ İBRAZI GEREKLİDİR. ELE a ME

: Mersis No : 0845 0627 1450 00001 KT ME AR LE

Yl (00000 olumu dl roll Ci Yl Der. am
', '92.90', '2023-01-10T21:00:00.000Z', 'F JÜURKİYE TARIMA KAEDİ', 45, 'pending', '2026-01-24T07:42:42.481Z', '2026-01-24T07:42:42.481Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('1072b844-a124-485d-a195-dd220ad981e8', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\expense\market\image-1769241349223-263075009.jpg', 'F JÜURKİYE TARIMA KAEDİ
Ky CÖOPERATIF
| i TK TARIM KREDİ PAZ. VE MARKETÇİLİK A.Ş ki
ki b: 4 YAYLACIK MAHALLESİ BAŞARI CD. ğ 2
kiç ak NO:24/A BUCA/İZMİR ri
a rg N 2 k.| Ankara Kurumlar V.D./8450627145 4 v
WEE NC ?

ME “TF Sa ÇEDAŞ ra / iş i i
ERA A e va N Üişı / | ” Ül i
WAR EŞ ; # i) d T «

bn da SAA ÜY Abrb — A du

SE Çete alla Ne VA HAP “> 4 "iş et

EĞ 3 xw : eee” çil dü ER RS

iy Ca ER iç Baf i Ef s./

#5 EM TÜR : e-ARŞİV FATURA Eler. fm

* <<” SE KS) F . * ğ.
e Bl : 11.01.2023 Mağaza No : 5757 ; yeğ
EŞ e saat : 13:19 Kasa No: 2 : A
Se rğr Belge No : 49 Z No : 205 gör yi RA

“a Tim a ER üs sss mE se GERE SER. LL... g "a '' ÜRE. ağ #
a RefNo : T172023000001615 VR . AR ŞA
A ETTİN : 51467467-9991-ed11-a3ce-eoed4cb3cesb — Mpa a İz
Bi 8690639001312 x 1 AD *34,90-B iler 3 Dağ zg
ÖĞ O) LtpTon EARL GREY DEM xo1 *34,90 Dy Ji <7
E O 8682615101925 x 1 AD *19,25-B UR ev RA
EO) K DEMLİK POŞET ÇAY &01 *19,25 Şi e $
TORİ 8682615101925 x 1 AD *19,25-B ''R.
çi TK DEMLİK POŞET ÇAY X01 *19,25 ÜRE RE 3 sa
8682615101925 x 1 AD *19,25-B “SEİR YA a # did
TK DEMLİK POŞET ÇAY X01 *19,25 A ör
8680643020461 x 1 AD *0,25-B Klee £ Tç ç.
TKK MARKET POŞETİ — X18 *0,25 KEY ATİ iz. ş
Toplam KDV : 10,06 — PER ES Dye
Toplam ğ *92,90 ET yaz EE AŞ
YALNIZDoksanİkiTLDoksankKr EE Yine ya
BANKA KREDİ KARTI *92,900 a e
EĞ © 3

$ Bu e-Arşiv Faturanızı, EKA ağ m

&arsiv.kooperatifmarket.com.tr şi hık, Ka

Çi adresinden Referans No girişi yaparak | HK EŞ

e görüntüleyebilirsiniz. e dir ül ; »

Bi ''n Firma VKN : 845 062 7145 SE LL b a

zel in Fatura No : T172023000001615 kei > AĞEBSİİ

i ğ Ödenen Tutar 92,90 NÜ ak - SE ke

* Hz aa > T “ÖĞ

at vok KA Re 4

X $ OL Tükatlcı öv ce b” » o ağ Sr

vet İrt aliye Yerine Geçer Mo va, kB ş şk

vee Ş b” şilan WS Ül san

Va Merkez : SARAY MAlI, GIDACILAR CD. : > Ayk”

; NO:11 KAHRAMANKAZAN/ ANKARA <<. Ze rt YT
Web : Www. kooperaLifmarkel.com. tr BE BY Aa a ASİ
SARAY MAH, GIDACILAR CD.NO:11 “yü vd BT

F İADE İŞLEMLERİNDE SATIŞ FİŞİNİN VE SR Tig 7 Siğr E

4 KREDİ KARTININ İBRAZI GEREKLİDİR. ELE a ME

: Mersis No : 0845 0627 1450 00001 KT ME AR LE

Yl (00000 olumu dl roll Ci Yl Der. am
', '92.90', '2023-01-10T21:00:00.000Z', 'F JÜURKİYE TARIMA KAEDİ', 45, 'confirmed', '2026-01-24T07:55:49.217Z', '2026-01-24T07:55:49.217Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('a72f9ff8-2f14-421b-88a8-d9410d7f4fca', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\expense\market\image-1769241489818-930395186.jpg', 'F JÜURKİYE TARIMA KAEDİ
Ky CÖOPERATIF
| i TK TARIM KREDİ PAZ. VE MARKETÇİLİK A.Ş ki
ki b: 4 YAYLACIK MAHALLESİ BAŞARI CD. ğ 2
kiç ak NO:24/A BUCA/İZMİR ri
a rg N 2 k.| Ankara Kurumlar V.D./8450627145 4 v
WEE NC ?

ME “TF Sa ÇEDAŞ ra / iş i i
ERA A e va N Üişı / | ” Ül i
WAR EŞ ; # i) d T «

bn da SAA ÜY Abrb — A du

SE Çete alla Ne VA HAP “> 4 "iş et

EĞ 3 xw : eee” çil dü ER RS

iy Ca ER iç Baf i Ef s./

#5 EM TÜR : e-ARŞİV FATURA Eler. fm

* <<” SE KS) F . * ğ.
e Bl : 11.01.2023 Mağaza No : 5757 ; yeğ
EŞ e saat : 13:19 Kasa No: 2 : A
Se rğr Belge No : 49 Z No : 205 gör yi RA

“a Tim a ER üs sss mE se GERE SER. LL... g "a '' ÜRE. ağ #
a RefNo : T172023000001615 VR . AR ŞA
A ETTİN : 51467467-9991-ed11-a3ce-eoed4cb3cesb — Mpa a İz
Bi 8690639001312 x 1 AD *34,90-B iler 3 Dağ zg
ÖĞ O) LtpTon EARL GREY DEM xo1 *34,90 Dy Ji <7
E O 8682615101925 x 1 AD *19,25-B UR ev RA
EO) K DEMLİK POŞET ÇAY &01 *19,25 Şi e $
TORİ 8682615101925 x 1 AD *19,25-B ''R.
çi TK DEMLİK POŞET ÇAY X01 *19,25 ÜRE RE 3 sa
8682615101925 x 1 AD *19,25-B “SEİR YA a # did
TK DEMLİK POŞET ÇAY X01 *19,25 A ör
8680643020461 x 1 AD *0,25-B Klee £ Tç ç.
TKK MARKET POŞETİ — X18 *0,25 KEY ATİ iz. ş
Toplam KDV : 10,06 — PER ES Dye
Toplam ğ *92,90 ET yaz EE AŞ
YALNIZDoksanİkiTLDoksankKr EE Yine ya
BANKA KREDİ KARTI *92,900 a e
EĞ © 3

$ Bu e-Arşiv Faturanızı, EKA ağ m

&arsiv.kooperatifmarket.com.tr şi hık, Ka

Çi adresinden Referans No girişi yaparak | HK EŞ

e görüntüleyebilirsiniz. e dir ül ; »

Bi ''n Firma VKN : 845 062 7145 SE LL b a

zel in Fatura No : T172023000001615 kei > AĞEBSİİ

i ğ Ödenen Tutar 92,90 NÜ ak - SE ke

* Hz aa > T “ÖĞ

at vok KA Re 4

X $ OL Tükatlcı öv ce b” » o ağ Sr

vet İrt aliye Yerine Geçer Mo va, kB ş şk

vee Ş b” şilan WS Ül san

Va Merkez : SARAY MAlI, GIDACILAR CD. : > Ayk”

; NO:11 KAHRAMANKAZAN/ ANKARA <<. Ze rt YT
Web : Www. kooperaLifmarkel.com. tr BE BY Aa a ASİ
SARAY MAH, GIDACILAR CD.NO:11 “yü vd BT

F İADE İŞLEMLERİNDE SATIŞ FİŞİNİN VE SR Tig 7 Siğr E

4 KREDİ KARTININ İBRAZI GEREKLİDİR. ELE a ME

: Mersis No : 0845 0627 1450 00001 KT ME AR LE

Yl (00000 olumu dl roll Ci Yl Der. am
', '92.90', '2023-01-10T21:00:00.000Z', 'F JÜURKİYE TARIMA KAEDİ', 45, 'confirmed', '2026-01-24T07:58:09.817Z', '2026-01-24T07:58:09.817Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('5643090f-58c2-4c62-b340-8889f73b3b67', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\expense\market\image-1769241555343-208297919.jpg', 'F JÜURKİYE TARIMA KAEDİ
Ky CÖOPERATIF
| i TK TARIM KREDİ PAZ. VE MARKETÇİLİK A.Ş ki
ki b: 4 YAYLACIK MAHALLESİ BAŞARI CD. ğ 2
kiç ak NO:24/A BUCA/İZMİR ri
a rg N 2 k.| Ankara Kurumlar V.D./8450627145 4 v
WEE NC ?

ME “TF Sa ÇEDAŞ ra / iş i i
ERA A e va N Üişı / | ” Ül i
WAR EŞ ; # i) d T «

bn da SAA ÜY Abrb — A du

SE Çete alla Ne VA HAP “> 4 "iş et

EĞ 3 xw : eee” çil dü ER RS

iy Ca ER iç Baf i Ef s./

#5 EM TÜR : e-ARŞİV FATURA Eler. fm

* <<” SE KS) F . * ğ.
e Bl : 11.01.2023 Mağaza No : 5757 ; yeğ
EŞ e saat : 13:19 Kasa No: 2 : A
Se rğr Belge No : 49 Z No : 205 gör yi RA

“a Tim a ER üs sss mE se GERE SER. LL... g "a '' ÜRE. ağ #
a RefNo : T172023000001615 VR . AR ŞA
A ETTİN : 51467467-9991-ed11-a3ce-eoed4cb3cesb — Mpa a İz
Bi 8690639001312 x 1 AD *34,90-B iler 3 Dağ zg
ÖĞ O) LtpTon EARL GREY DEM xo1 *34,90 Dy Ji <7
E O 8682615101925 x 1 AD *19,25-B UR ev RA
EO) K DEMLİK POŞET ÇAY &01 *19,25 Şi e $
TORİ 8682615101925 x 1 AD *19,25-B ''R.
çi TK DEMLİK POŞET ÇAY X01 *19,25 ÜRE RE 3 sa
8682615101925 x 1 AD *19,25-B “SEİR YA a # did
TK DEMLİK POŞET ÇAY X01 *19,25 A ör
8680643020461 x 1 AD *0,25-B Klee £ Tç ç.
TKK MARKET POŞETİ — X18 *0,25 KEY ATİ iz. ş
Toplam KDV : 10,06 — PER ES Dye
Toplam ğ *92,90 ET yaz EE AŞ
YALNIZDoksanİkiTLDoksankKr EE Yine ya
BANKA KREDİ KARTI *92,900 a e
EĞ © 3

$ Bu e-Arşiv Faturanızı, EKA ağ m

&arsiv.kooperatifmarket.com.tr şi hık, Ka

Çi adresinden Referans No girişi yaparak | HK EŞ

e görüntüleyebilirsiniz. e dir ül ; »

Bi ''n Firma VKN : 845 062 7145 SE LL b a

zel in Fatura No : T172023000001615 kei > AĞEBSİİ

i ğ Ödenen Tutar 92,90 NÜ ak - SE ke

* Hz aa > T “ÖĞ

at vok KA Re 4

X $ OL Tükatlcı öv ce b” » o ağ Sr

vet İrt aliye Yerine Geçer Mo va, kB ş şk

vee Ş b” şilan WS Ül san

Va Merkez : SARAY MAlI, GIDACILAR CD. : > Ayk”

; NO:11 KAHRAMANKAZAN/ ANKARA <<. Ze rt YT
Web : Www. kooperaLifmarkel.com. tr BE BY Aa a ASİ
SARAY MAH, GIDACILAR CD.NO:11 “yü vd BT

F İADE İŞLEMLERİNDE SATIŞ FİŞİNİN VE SR Tig 7 Siğr E

4 KREDİ KARTININ İBRAZI GEREKLİDİR. ELE a ME

: Mersis No : 0845 0627 1450 00001 KT ME AR LE

Yl (00000 olumu dl roll Ci Yl Der. am
', '92.90', '2023-01-10T21:00:00.000Z', 'F JÜURKİYE TARIMA KAEDİ', 45, 'confirmed', '2026-01-24T07:59:15.341Z', '2026-01-24T07:59:15.341Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('b543e83c-350c-4534-b18e-dd72eda0a0be', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\expense\market\image-1769247628069-546326862.jpg', 'F JÜURKİYE TARIMA KAEDİ
Ky CÖOPERATIF
| i TK TARIM KREDİ PAZ. VE MARKETÇİLİK A.Ş ki
ki b: 4 YAYLACIK MAHALLESİ BAŞARI CD. ğ 2
kiç ak NO:24/A BUCA/İZMİR ri
a rg N 2 k.| Ankara Kurumlar V.D./8450627145 4 v
WEE NC ?

ME “TF Sa ÇEDAŞ ra / iş i i
ERA A e va N Üişı / | ” Ül i
WAR EŞ ; # i) d T «

bn da SAA ÜY Abrb — A du

SE Çete alla Ne VA HAP “> 4 "iş et

EĞ 3 xw : eee” çil dü ER RS

iy Ca ER iç Baf i Ef s./

#5 EM TÜR : e-ARŞİV FATURA Eler. fm

* <<” SE KS) F . * ğ.
e Bl : 11.01.2023 Mağaza No : 5757 ; yeğ
EŞ e saat : 13:19 Kasa No: 2 : A
Se rğr Belge No : 49 Z No : 205 gör yi RA

“a Tim a ER üs sss mE se GERE SER. LL... g "a '' ÜRE. ağ #
a RefNo : T172023000001615 VR . AR ŞA
A ETTİN : 51467467-9991-ed11-a3ce-eoed4cb3cesb — Mpa a İz
Bi 8690639001312 x 1 AD *34,90-B iler 3 Dağ zg
ÖĞ O) LtpTon EARL GREY DEM xo1 *34,90 Dy Ji <7
E O 8682615101925 x 1 AD *19,25-B UR ev RA
EO) K DEMLİK POŞET ÇAY &01 *19,25 Şi e $
TORİ 8682615101925 x 1 AD *19,25-B ''R.
çi TK DEMLİK POŞET ÇAY X01 *19,25 ÜRE RE 3 sa
8682615101925 x 1 AD *19,25-B “SEİR YA a # did
TK DEMLİK POŞET ÇAY X01 *19,25 A ör
8680643020461 x 1 AD *0,25-B Klee £ Tç ç.
TKK MARKET POŞETİ — X18 *0,25 KEY ATİ iz. ş
Toplam KDV : 10,06 — PER ES Dye
Toplam ğ *92,90 ET yaz EE AŞ
YALNIZDoksanİkiTLDoksankKr EE Yine ya
BANKA KREDİ KARTI *92,900 a e
EĞ © 3

$ Bu e-Arşiv Faturanızı, EKA ağ m

&arsiv.kooperatifmarket.com.tr şi hık, Ka

Çi adresinden Referans No girişi yaparak | HK EŞ

e görüntüleyebilirsiniz. e dir ül ; »

Bi ''n Firma VKN : 845 062 7145 SE LL b a

zel in Fatura No : T172023000001615 kei > AĞEBSİİ

i ğ Ödenen Tutar 92,90 NÜ ak - SE ke

* Hz aa > T “ÖĞ

at vok KA Re 4

X $ OL Tükatlcı öv ce b” » o ağ Sr

vet İrt aliye Yerine Geçer Mo va, kB ş şk

vee Ş b” şilan WS Ül san

Va Merkez : SARAY MAlI, GIDACILAR CD. : > Ayk”

; NO:11 KAHRAMANKAZAN/ ANKARA <<. Ze rt YT
Web : Www. kooperaLifmarkel.com. tr BE BY Aa a ASİ
SARAY MAH, GIDACILAR CD.NO:11 “yü vd BT

F İADE İŞLEMLERİNDE SATIŞ FİŞİNİN VE SR Tig 7 Siğr E

4 KREDİ KARTININ İBRAZI GEREKLİDİR. ELE a ME

: Mersis No : 0845 0627 1450 00001 KT ME AR LE

Yl (00000 olumu dl roll Ci Yl Der. am
', '92.90', '2023-01-10T21:00:00.000Z', 'F JÜURKİYE TARIMA KAEDİ', 45, 'confirmed', '2026-01-24T09:40:28.068Z', '2026-01-24T09:40:28.068Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('9dfe8f9b-b2e6-46f2-aee9-1ad8c9e46b70', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\expense\market\image-1769247806704-249322451.jpg', 'F JÜURKİYE TARIMA KAEDİ
Ky CÖOPERATIF
| i TK TARIM KREDİ PAZ. VE MARKETÇİLİK A.Ş ki
ki b: 4 YAYLACIK MAHALLESİ BAŞARI CD. ğ 2
kiç ak NO:24/A BUCA/İZMİR ri
a rg N 2 k.| Ankara Kurumlar V.D./8450627145 4 v
WEE NC ?

ME “TF Sa ÇEDAŞ ra / iş i i
ERA A e va N Üişı / | ” Ül i
WAR EŞ ; # i) d T «

bn da SAA ÜY Abrb — A du

SE Çete alla Ne VA HAP “> 4 "iş et

EĞ 3 xw : eee” çil dü ER RS

iy Ca ER iç Baf i Ef s./

#5 EM TÜR : e-ARŞİV FATURA Eler. fm

* <<” SE KS) F . * ğ.
e Bl : 11.01.2023 Mağaza No : 5757 ; yeğ
EŞ e saat : 13:19 Kasa No: 2 : A
Se rğr Belge No : 49 Z No : 205 gör yi RA

“a Tim a ER üs sss mE se GERE SER. LL... g "a '' ÜRE. ağ #
a RefNo : T172023000001615 VR . AR ŞA
A ETTİN : 51467467-9991-ed11-a3ce-eoed4cb3cesb — Mpa a İz
Bi 8690639001312 x 1 AD *34,90-B iler 3 Dağ zg
ÖĞ O) LtpTon EARL GREY DEM xo1 *34,90 Dy Ji <7
E O 8682615101925 x 1 AD *19,25-B UR ev RA
EO) K DEMLİK POŞET ÇAY &01 *19,25 Şi e $
TORİ 8682615101925 x 1 AD *19,25-B ''R.
çi TK DEMLİK POŞET ÇAY X01 *19,25 ÜRE RE 3 sa
8682615101925 x 1 AD *19,25-B “SEİR YA a # did
TK DEMLİK POŞET ÇAY X01 *19,25 A ör
8680643020461 x 1 AD *0,25-B Klee £ Tç ç.
TKK MARKET POŞETİ — X18 *0,25 KEY ATİ iz. ş
Toplam KDV : 10,06 — PER ES Dye
Toplam ğ *92,90 ET yaz EE AŞ
YALNIZDoksanİkiTLDoksankKr EE Yine ya
BANKA KREDİ KARTI *92,900 a e
EĞ © 3

$ Bu e-Arşiv Faturanızı, EKA ağ m

&arsiv.kooperatifmarket.com.tr şi hık, Ka

Çi adresinden Referans No girişi yaparak | HK EŞ

e görüntüleyebilirsiniz. e dir ül ; »

Bi ''n Firma VKN : 845 062 7145 SE LL b a

zel in Fatura No : T172023000001615 kei > AĞEBSİİ

i ğ Ödenen Tutar 92,90 NÜ ak - SE ke

* Hz aa > T “ÖĞ

at vok KA Re 4

X $ OL Tükatlcı öv ce b” » o ağ Sr

vet İrt aliye Yerine Geçer Mo va, kB ş şk

vee Ş b” şilan WS Ül san

Va Merkez : SARAY MAlI, GIDACILAR CD. : > Ayk”

; NO:11 KAHRAMANKAZAN/ ANKARA <<. Ze rt YT
Web : Www. kooperaLifmarkel.com. tr BE BY Aa a ASİ
SARAY MAH, GIDACILAR CD.NO:11 “yü vd BT

F İADE İŞLEMLERİNDE SATIŞ FİŞİNİN VE SR Tig 7 Siğr E

4 KREDİ KARTININ İBRAZI GEREKLİDİR. ELE a ME

: Mersis No : 0845 0627 1450 00001 KT ME AR LE

Yl (00000 olumu dl roll Ci Yl Der. am
', '92.90', '2023-01-10T21:00:00.000Z', 'F JÜURKİYE TARIMA KAEDİ', 45, 'confirmed', '2026-01-24T09:43:26.703Z', '2026-01-24T09:43:26.703Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('e95e8b4c-281b-46ed-a4aa-b85913132b5e', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\expense\market\image-1769255556181-186498443.jpg', 'F JÜURKİYE TARIMA KAEDİ
Ky CÖOPERATIF
| i TK TARIM KREDİ PAZ. VE MARKETÇİLİK A.Ş ki
ki b: 4 YAYLACIK MAHALLESİ BAŞARI CD. ğ 2
kiç ak NO:24/A BUCA/İZMİR ri
a rg N 2 k.| Ankara Kurumlar V.D./8450627145 4 v
WEE NC ?

ME “TF Sa ÇEDAŞ ra / iş i i
ERA A e va N Üişı / | ” Ül i
WAR EŞ ; # i) d T «

bn da SAA ÜY Abrb — A du

SE Çete alla Ne VA HAP “> 4 "iş et

EĞ 3 xw : eee” çil dü ER RS

iy Ca ER iç Baf i Ef s./

#5 EM TÜR : e-ARŞİV FATURA Eler. fm

* <<” SE KS) F . * ğ.
e Bl : 11.01.2023 Mağaza No : 5757 ; yeğ
EŞ e saat : 13:19 Kasa No: 2 : A
Se rğr Belge No : 49 Z No : 205 gör yi RA

“a Tim a ER üs sss mE se GERE SER. LL... g "a '' ÜRE. ağ #
a RefNo : T172023000001615 VR . AR ŞA
A ETTİN : 51467467-9991-ed11-a3ce-eoed4cb3cesb — Mpa a İz
Bi 8690639001312 x 1 AD *34,90-B iler 3 Dağ zg
ÖĞ O) LtpTon EARL GREY DEM xo1 *34,90 Dy Ji <7
E O 8682615101925 x 1 AD *19,25-B UR ev RA
EO) K DEMLİK POŞET ÇAY &01 *19,25 Şi e $
TORİ 8682615101925 x 1 AD *19,25-B ''R.
çi TK DEMLİK POŞET ÇAY X01 *19,25 ÜRE RE 3 sa
8682615101925 x 1 AD *19,25-B “SEİR YA a # did
TK DEMLİK POŞET ÇAY X01 *19,25 A ör
8680643020461 x 1 AD *0,25-B Klee £ Tç ç.
TKK MARKET POŞETİ — X18 *0,25 KEY ATİ iz. ş
Toplam KDV : 10,06 — PER ES Dye
Toplam ğ *92,90 ET yaz EE AŞ
YALNIZDoksanİkiTLDoksankKr EE Yine ya
BANKA KREDİ KARTI *92,900 a e
EĞ © 3

$ Bu e-Arşiv Faturanızı, EKA ağ m

&arsiv.kooperatifmarket.com.tr şi hık, Ka

Çi adresinden Referans No girişi yaparak | HK EŞ

e görüntüleyebilirsiniz. e dir ül ; »

Bi ''n Firma VKN : 845 062 7145 SE LL b a

zel in Fatura No : T172023000001615 kei > AĞEBSİİ

i ğ Ödenen Tutar 92,90 NÜ ak - SE ke

* Hz aa > T “ÖĞ

at vok KA Re 4

X $ OL Tükatlcı öv ce b” » o ağ Sr

vet İrt aliye Yerine Geçer Mo va, kB ş şk

vee Ş b” şilan WS Ül san

Va Merkez : SARAY MAlI, GIDACILAR CD. : > Ayk”

; NO:11 KAHRAMANKAZAN/ ANKARA <<. Ze rt YT
Web : Www. kooperaLifmarkel.com. tr BE BY Aa a ASİ
SARAY MAH, GIDACILAR CD.NO:11 “yü vd BT

F İADE İŞLEMLERİNDE SATIŞ FİŞİNİN VE SR Tig 7 Siğr E

4 KREDİ KARTININ İBRAZI GEREKLİDİR. ELE a ME

: Mersis No : 0845 0627 1450 00001 KT ME AR LE

Yl (00000 olumu dl roll Ci Yl Der. am
', '92.90', '2023-01-10T21:00:00.000Z', 'F JÜURKİYE TARIMA KAEDİ', 45, 'confirmed', '2026-01-24T11:52:36.176Z', '2026-01-24T11:52:36.176Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('6b9b0885-c4b9-457f-8c17-d5f06e398c62', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\expense\market\image-1769258834232-4857956.jpg', 'F JÜURKİYE TARIMA KAEDİ
Ky CÖOPERATIF
| i TK TARIM KREDİ PAZ. VE MARKETÇİLİK A.Ş ki
ki b: 4 YAYLACIK MAHALLESİ BAŞARI CD. ğ 2
kiç ak NO:24/A BUCA/İZMİR ri
a rg N 2 k.| Ankara Kurumlar V.D./8450627145 4 v
WEE NC ?

ME “TF Sa ÇEDAŞ ra / iş i i
ERA A e va N Üişı / | ” Ül i
WAR EŞ ; # i) d T «

bn da SAA ÜY Abrb — A du

SE Çete alla Ne VA HAP “> 4 "iş et

EĞ 3 xw : eee” çil dü ER RS

iy Ca ER iç Baf i Ef s./

#5 EM TÜR : e-ARŞİV FATURA Eler. fm

* <<” SE KS) F . * ğ.
e Bl : 11.01.2023 Mağaza No : 5757 ; yeğ
EŞ e saat : 13:19 Kasa No: 2 : A
Se rğr Belge No : 49 Z No : 205 gör yi RA

“a Tim a ER üs sss mE se GERE SER. LL... g "a '' ÜRE. ağ #
a RefNo : T172023000001615 VR . AR ŞA
A ETTİN : 51467467-9991-ed11-a3ce-eoed4cb3cesb — Mpa a İz
Bi 8690639001312 x 1 AD *34,90-B iler 3 Dağ zg
ÖĞ O) LtpTon EARL GREY DEM xo1 *34,90 Dy Ji <7
E O 8682615101925 x 1 AD *19,25-B UR ev RA
EO) K DEMLİK POŞET ÇAY &01 *19,25 Şi e $
TORİ 8682615101925 x 1 AD *19,25-B ''R.
çi TK DEMLİK POŞET ÇAY X01 *19,25 ÜRE RE 3 sa
8682615101925 x 1 AD *19,25-B “SEİR YA a # did
TK DEMLİK POŞET ÇAY X01 *19,25 A ör
8680643020461 x 1 AD *0,25-B Klee £ Tç ç.
TKK MARKET POŞETİ — X18 *0,25 KEY ATİ iz. ş
Toplam KDV : 10,06 — PER ES Dye
Toplam ğ *92,90 ET yaz EE AŞ
YALNIZDoksanİkiTLDoksankKr EE Yine ya
BANKA KREDİ KARTI *92,900 a e
EĞ © 3

$ Bu e-Arşiv Faturanızı, EKA ağ m

&arsiv.kooperatifmarket.com.tr şi hık, Ka

Çi adresinden Referans No girişi yaparak | HK EŞ

e görüntüleyebilirsiniz. e dir ül ; »

Bi ''n Firma VKN : 845 062 7145 SE LL b a

zel in Fatura No : T172023000001615 kei > AĞEBSİİ

i ğ Ödenen Tutar 92,90 NÜ ak - SE ke

* Hz aa > T “ÖĞ

at vok KA Re 4

X $ OL Tükatlcı öv ce b” » o ağ Sr

vet İrt aliye Yerine Geçer Mo va, kB ş şk

vee Ş b” şilan WS Ül san

Va Merkez : SARAY MAlI, GIDACILAR CD. : > Ayk”

; NO:11 KAHRAMANKAZAN/ ANKARA <<. Ze rt YT
Web : Www. kooperaLifmarkel.com. tr BE BY Aa a ASİ
SARAY MAH, GIDACILAR CD.NO:11 “yü vd BT

F İADE İŞLEMLERİNDE SATIŞ FİŞİNİN VE SR Tig 7 Siğr E

4 KREDİ KARTININ İBRAZI GEREKLİDİR. ELE a ME

: Mersis No : 0845 0627 1450 00001 KT ME AR LE

Yl (00000 olumu dl roll Ci Yl Der. am
', '92.90', '2023-01-10T21:00:00.000Z', 'F JÜURKİYE TARIMA KAEDİ', 45, 'confirmed', '2026-01-24T12:47:14.227Z', '2026-01-24T12:47:14.227Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('63774951-55ba-4ae5-bcaa-b16e51548325', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\expense\market\image-1769258863567-275541334.jpg', 'F JÜURKİYE TARIMA KAEDİ
Ky CÖOPERATIF
| i TK TARIM KREDİ PAZ. VE MARKETÇİLİK A.Ş ki
ki b: 4 YAYLACIK MAHALLESİ BAŞARI CD. ğ 2
kiç ak NO:24/A BUCA/İZMİR ri
a rg N 2 k.| Ankara Kurumlar V.D./8450627145 4 v
WEE NC ?

ME “TF Sa ÇEDAŞ ra / iş i i
ERA A e va N Üişı / | ” Ül i
WAR EŞ ; # i) d T «

bn da SAA ÜY Abrb — A du

SE Çete alla Ne VA HAP “> 4 "iş et

EĞ 3 xw : eee” çil dü ER RS

iy Ca ER iç Baf i Ef s./

#5 EM TÜR : e-ARŞİV FATURA Eler. fm

* <<” SE KS) F . * ğ.
e Bl : 11.01.2023 Mağaza No : 5757 ; yeğ
EŞ e saat : 13:19 Kasa No: 2 : A
Se rğr Belge No : 49 Z No : 205 gör yi RA

“a Tim a ER üs sss mE se GERE SER. LL... g "a '' ÜRE. ağ #
a RefNo : T172023000001615 VR . AR ŞA
A ETTİN : 51467467-9991-ed11-a3ce-eoed4cb3cesb — Mpa a İz
Bi 8690639001312 x 1 AD *34,90-B iler 3 Dağ zg
ÖĞ O) LtpTon EARL GREY DEM xo1 *34,90 Dy Ji <7
E O 8682615101925 x 1 AD *19,25-B UR ev RA
EO) K DEMLİK POŞET ÇAY &01 *19,25 Şi e $
TORİ 8682615101925 x 1 AD *19,25-B ''R.
çi TK DEMLİK POŞET ÇAY X01 *19,25 ÜRE RE 3 sa
8682615101925 x 1 AD *19,25-B “SEİR YA a # did
TK DEMLİK POŞET ÇAY X01 *19,25 A ör
8680643020461 x 1 AD *0,25-B Klee £ Tç ç.
TKK MARKET POŞETİ — X18 *0,25 KEY ATİ iz. ş
Toplam KDV : 10,06 — PER ES Dye
Toplam ğ *92,90 ET yaz EE AŞ
YALNIZDoksanİkiTLDoksankKr EE Yine ya
BANKA KREDİ KARTI *92,900 a e
EĞ © 3

$ Bu e-Arşiv Faturanızı, EKA ağ m

&arsiv.kooperatifmarket.com.tr şi hık, Ka

Çi adresinden Referans No girişi yaparak | HK EŞ

e görüntüleyebilirsiniz. e dir ül ; »

Bi ''n Firma VKN : 845 062 7145 SE LL b a

zel in Fatura No : T172023000001615 kei > AĞEBSİİ

i ğ Ödenen Tutar 92,90 NÜ ak - SE ke

* Hz aa > T “ÖĞ

at vok KA Re 4

X $ OL Tükatlcı öv ce b” » o ağ Sr

vet İrt aliye Yerine Geçer Mo va, kB ş şk

vee Ş b” şilan WS Ül san

Va Merkez : SARAY MAlI, GIDACILAR CD. : > Ayk”

; NO:11 KAHRAMANKAZAN/ ANKARA <<. Ze rt YT
Web : Www. kooperaLifmarkel.com. tr BE BY Aa a ASİ
SARAY MAH, GIDACILAR CD.NO:11 “yü vd BT

F İADE İŞLEMLERİNDE SATIŞ FİŞİNİN VE SR Tig 7 Siğr E

4 KREDİ KARTININ İBRAZI GEREKLİDİR. ELE a ME

: Mersis No : 0845 0627 1450 00001 KT ME AR LE

Yl (00000 olumu dl roll Ci Yl Der. am
', '92.90', '2023-01-10T21:00:00.000Z', 'F JÜURKİYE TARIMA KAEDİ', 45, 'confirmed', '2026-01-24T12:47:43.566Z', '2026-01-24T12:47:43.566Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('46db65f0-4992-4541-80c5-63988dcc7797', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\expense\market\image-1769270081229-131849336.jpg', 'F JÜURKİYE TARIMA KAEDİ
Ky CÖOPERATIF
| i TK TARIM KREDİ PAZ. VE MARKETÇİLİK A.Ş ki
ki b: 4 YAYLACIK MAHALLESİ BAŞARI CD. ğ 2
kiç ak NO:24/A BUCA/İZMİR ri
a rg N 2 k.| Ankara Kurumlar V.D./8450627145 4 v
WEE NC ?

ME “TF Sa ÇEDAŞ ra / iş i i
ERA A e va N Üişı / | ” Ül i
WAR EŞ ; # i) d T «

bn da SAA ÜY Abrb — A du

SE Çete alla Ne VA HAP “> 4 "iş et

EĞ 3 xw : eee” çil dü ER RS

iy Ca ER iç Baf i Ef s./

#5 EM TÜR : e-ARŞİV FATURA Eler. fm

* <<” SE KS) F . * ğ.
e Bl : 11.01.2023 Mağaza No : 5757 ; yeğ
EŞ e saat : 13:19 Kasa No: 2 : A
Se rğr Belge No : 49 Z No : 205 gör yi RA

“a Tim a ER üs sss mE se GERE SER. LL... g "a '' ÜRE. ağ #
a RefNo : T172023000001615 VR . AR ŞA
A ETTİN : 51467467-9991-ed11-a3ce-eoed4cb3cesb — Mpa a İz
Bi 8690639001312 x 1 AD *34,90-B iler 3 Dağ zg
ÖĞ O) LtpTon EARL GREY DEM xo1 *34,90 Dy Ji <7
E O 8682615101925 x 1 AD *19,25-B UR ev RA
EO) K DEMLİK POŞET ÇAY &01 *19,25 Şi e $
TORİ 8682615101925 x 1 AD *19,25-B ''R.
çi TK DEMLİK POŞET ÇAY X01 *19,25 ÜRE RE 3 sa
8682615101925 x 1 AD *19,25-B “SEİR YA a # did
TK DEMLİK POŞET ÇAY X01 *19,25 A ör
8680643020461 x 1 AD *0,25-B Klee £ Tç ç.
TKK MARKET POŞETİ — X18 *0,25 KEY ATİ iz. ş
Toplam KDV : 10,06 — PER ES Dye
Toplam ğ *92,90 ET yaz EE AŞ
YALNIZDoksanİkiTLDoksankKr EE Yine ya
BANKA KREDİ KARTI *92,900 a e
EĞ © 3

$ Bu e-Arşiv Faturanızı, EKA ağ m

&arsiv.kooperatifmarket.com.tr şi hık, Ka

Çi adresinden Referans No girişi yaparak | HK EŞ

e görüntüleyebilirsiniz. e dir ül ; »

Bi ''n Firma VKN : 845 062 7145 SE LL b a

zel in Fatura No : T172023000001615 kei > AĞEBSİİ

i ğ Ödenen Tutar 92,90 NÜ ak - SE ke

* Hz aa > T “ÖĞ

at vok KA Re 4

X $ OL Tükatlcı öv ce b” » o ağ Sr

vet İrt aliye Yerine Geçer Mo va, kB ş şk

vee Ş b” şilan WS Ül san

Va Merkez : SARAY MAlI, GIDACILAR CD. : > Ayk”

; NO:11 KAHRAMANKAZAN/ ANKARA <<. Ze rt YT
Web : Www. kooperaLifmarkel.com. tr BE BY Aa a ASİ
SARAY MAH, GIDACILAR CD.NO:11 “yü vd BT

F İADE İŞLEMLERİNDE SATIŞ FİŞİNİN VE SR Tig 7 Siğr E

4 KREDİ KARTININ İBRAZI GEREKLİDİR. ELE a ME

: Mersis No : 0845 0627 1450 00001 KT ME AR LE

Yl (00000 olumu dl roll Ci Yl Der. am
', '92.90', '2023-01-10T21:00:00.000Z', 'F JÜURKİYE TARIMA KAEDİ', 45, 'confirmed', '2026-01-24T15:54:41.224Z', '2026-01-24T15:54:41.224Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('aa181340-99fc-4e53-a83b-025dfd3a9b4a', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\expense\market\image-1769271033637-854934237.jpg', 'F JÜURKİYE TARIMA KAEDİ
Ky CÖOPERATIF
| i TK TARIM KREDİ PAZ. VE MARKETÇİLİK A.Ş ki
ki b: 4 YAYLACIK MAHALLESİ BAŞARI CD. ğ 2
kiç ak NO:24/A BUCA/İZMİR ri
a rg N 2 k.| Ankara Kurumlar V.D./8450627145 4 v
WEE NC ?

ME “TF Sa ÇEDAŞ ra / iş i i
ERA A e va N Üişı / | ” Ül i
WAR EŞ ; # i) d T «

bn da SAA ÜY Abrb — A du

SE Çete alla Ne VA HAP “> 4 "iş et

EĞ 3 xw : eee” çil dü ER RS

iy Ca ER iç Baf i Ef s./

#5 EM TÜR : e-ARŞİV FATURA Eler. fm

* <<” SE KS) F . * ğ.
e Bl : 11.01.2023 Mağaza No : 5757 ; yeğ
EŞ e saat : 13:19 Kasa No: 2 : A
Se rğr Belge No : 49 Z No : 205 gör yi RA

“a Tim a ER üs sss mE se GERE SER. LL... g "a '' ÜRE. ağ #
a RefNo : T172023000001615 VR . AR ŞA
A ETTİN : 51467467-9991-ed11-a3ce-eoed4cb3cesb — Mpa a İz
Bi 8690639001312 x 1 AD *34,90-B iler 3 Dağ zg
ÖĞ O) LtpTon EARL GREY DEM xo1 *34,90 Dy Ji <7
E O 8682615101925 x 1 AD *19,25-B UR ev RA
EO) K DEMLİK POŞET ÇAY &01 *19,25 Şi e $
TORİ 8682615101925 x 1 AD *19,25-B ''R.
çi TK DEMLİK POŞET ÇAY X01 *19,25 ÜRE RE 3 sa
8682615101925 x 1 AD *19,25-B “SEİR YA a # did
TK DEMLİK POŞET ÇAY X01 *19,25 A ör
8680643020461 x 1 AD *0,25-B Klee £ Tç ç.
TKK MARKET POŞETİ — X18 *0,25 KEY ATİ iz. ş
Toplam KDV : 10,06 — PER ES Dye
Toplam ğ *92,90 ET yaz EE AŞ
YALNIZDoksanİkiTLDoksankKr EE Yine ya
BANKA KREDİ KARTI *92,900 a e
EĞ © 3

$ Bu e-Arşiv Faturanızı, EKA ağ m

&arsiv.kooperatifmarket.com.tr şi hık, Ka

Çi adresinden Referans No girişi yaparak | HK EŞ

e görüntüleyebilirsiniz. e dir ül ; »

Bi ''n Firma VKN : 845 062 7145 SE LL b a

zel in Fatura No : T172023000001615 kei > AĞEBSİİ

i ğ Ödenen Tutar 92,90 NÜ ak - SE ke

* Hz aa > T “ÖĞ

at vok KA Re 4

X $ OL Tükatlcı öv ce b” » o ağ Sr

vet İrt aliye Yerine Geçer Mo va, kB ş şk

vee Ş b” şilan WS Ül san

Va Merkez : SARAY MAlI, GIDACILAR CD. : > Ayk”

; NO:11 KAHRAMANKAZAN/ ANKARA <<. Ze rt YT
Web : Www. kooperaLifmarkel.com. tr BE BY Aa a ASİ
SARAY MAH, GIDACILAR CD.NO:11 “yü vd BT

F İADE İŞLEMLERİNDE SATIŞ FİŞİNİN VE SR Tig 7 Siğr E

4 KREDİ KARTININ İBRAZI GEREKLİDİR. ELE a ME

: Mersis No : 0845 0627 1450 00001 KT ME AR LE

Yl (00000 olumu dl roll Ci Yl Der. am
', '92.90', '2023-01-10T21:00:00.000Z', 'F JÜURKİYE TARIMA KAEDİ', 45, 'confirmed', '2026-01-24T16:10:33.634Z', '2026-01-24T16:10:33.634Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('dccabbd3-422d-4f38-a33f-6c1d24d988f8', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\expense\market\image-1769274051333-832534206.jpg', 'F JÜURKİYE TARIMA KAEDİ
Ky CÖOPERATIF
| i TK TARIM KREDİ PAZ. VE MARKETÇİLİK A.Ş ki
ki b: 4 YAYLACIK MAHALLESİ BAŞARI CD. ğ 2
kiç ak NO:24/A BUCA/İZMİR ri
a rg N 2 k.| Ankara Kurumlar V.D./8450627145 4 v
WEE NC ?

ME “TF Sa ÇEDAŞ ra / iş i i
ERA A e va N Üişı / | ” Ül i
WAR EŞ ; # i) d T «

bn da SAA ÜY Abrb — A du

SE Çete alla Ne VA HAP “> 4 "iş et

EĞ 3 xw : eee” çil dü ER RS

iy Ca ER iç Baf i Ef s./

#5 EM TÜR : e-ARŞİV FATURA Eler. fm

* <<” SE KS) F . * ğ.
e Bl : 11.01.2023 Mağaza No : 5757 ; yeğ
EŞ e saat : 13:19 Kasa No: 2 : A
Se rğr Belge No : 49 Z No : 205 gör yi RA

“a Tim a ER üs sss mE se GERE SER. LL... g "a '' ÜRE. ağ #
a RefNo : T172023000001615 VR . AR ŞA
A ETTİN : 51467467-9991-ed11-a3ce-eoed4cb3cesb — Mpa a İz
Bi 8690639001312 x 1 AD *34,90-B iler 3 Dağ zg
ÖĞ O) LtpTon EARL GREY DEM xo1 *34,90 Dy Ji <7
E O 8682615101925 x 1 AD *19,25-B UR ev RA
EO) K DEMLİK POŞET ÇAY &01 *19,25 Şi e $
TORİ 8682615101925 x 1 AD *19,25-B ''R.
çi TK DEMLİK POŞET ÇAY X01 *19,25 ÜRE RE 3 sa
8682615101925 x 1 AD *19,25-B “SEİR YA a # did
TK DEMLİK POŞET ÇAY X01 *19,25 A ör
8680643020461 x 1 AD *0,25-B Klee £ Tç ç.
TKK MARKET POŞETİ — X18 *0,25 KEY ATİ iz. ş
Toplam KDV : 10,06 — PER ES Dye
Toplam ğ *92,90 ET yaz EE AŞ
YALNIZDoksanİkiTLDoksankKr EE Yine ya
BANKA KREDİ KARTI *92,900 a e
EĞ © 3

$ Bu e-Arşiv Faturanızı, EKA ağ m

&arsiv.kooperatifmarket.com.tr şi hık, Ka

Çi adresinden Referans No girişi yaparak | HK EŞ

e görüntüleyebilirsiniz. e dir ül ; »

Bi ''n Firma VKN : 845 062 7145 SE LL b a

zel in Fatura No : T172023000001615 kei > AĞEBSİİ

i ğ Ödenen Tutar 92,90 NÜ ak - SE ke

* Hz aa > T “ÖĞ

at vok KA Re 4

X $ OL Tükatlcı öv ce b” » o ağ Sr

vet İrt aliye Yerine Geçer Mo va, kB ş şk

vee Ş b” şilan WS Ül san

Va Merkez : SARAY MAlI, GIDACILAR CD. : > Ayk”

; NO:11 KAHRAMANKAZAN/ ANKARA <<. Ze rt YT
Web : Www. kooperaLifmarkel.com. tr BE BY Aa a ASİ
SARAY MAH, GIDACILAR CD.NO:11 “yü vd BT

F İADE İŞLEMLERİNDE SATIŞ FİŞİNİN VE SR Tig 7 Siğr E

4 KREDİ KARTININ İBRAZI GEREKLİDİR. ELE a ME

: Mersis No : 0845 0627 1450 00001 KT ME AR LE

Yl (00000 olumu dl roll Ci Yl Der. am
', '92.90', '2023-01-10T21:00:00.000Z', 'F JÜURKİYE TARIMA KAEDİ', 45, 'confirmed', '2026-01-24T17:00:51.332Z', '2026-01-24T17:00:51.332Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('0cc8dc0d-de79-4d30-b0df-3445e99b5a9a', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\expense\a-rlama\image-1769281709687-280525859.jpg', 'F JÜURKİYE TARIMA KAEDİ
Ky CÖOPERATIF
| i TK TARIM KREDİ PAZ. VE MARKETÇİLİK A.Ş ki
ki b: 4 YAYLACIK MAHALLESİ BAŞARI CD. ğ 2
kiç ak NO:24/A BUCA/İZMİR ri
a rg N 2 k.| Ankara Kurumlar V.D./8450627145 4 v
WEE NC ?

ME “TF Sa ÇEDAŞ ra / iş i i
ERA A e va N Üişı / | ” Ül i
WAR EŞ ; # i) d T «

bn da SAA ÜY Abrb — A du

SE Çete alla Ne VA HAP “> 4 "iş et

EĞ 3 xw : eee” çil dü ER RS

iy Ca ER iç Baf i Ef s./

#5 EM TÜR : e-ARŞİV FATURA Eler. fm

* <<” SE KS) F . * ğ.
e Bl : 11.01.2023 Mağaza No : 5757 ; yeğ
EŞ e saat : 13:19 Kasa No: 2 : A
Se rğr Belge No : 49 Z No : 205 gör yi RA

“a Tim a ER üs sss mE se GERE SER. LL... g "a '' ÜRE. ağ #
a RefNo : T172023000001615 VR . AR ŞA
A ETTİN : 51467467-9991-ed11-a3ce-eoed4cb3cesb — Mpa a İz
Bi 8690639001312 x 1 AD *34,90-B iler 3 Dağ zg
ÖĞ O) LtpTon EARL GREY DEM xo1 *34,90 Dy Ji <7
E O 8682615101925 x 1 AD *19,25-B UR ev RA
EO) K DEMLİK POŞET ÇAY &01 *19,25 Şi e $
TORİ 8682615101925 x 1 AD *19,25-B ''R.
çi TK DEMLİK POŞET ÇAY X01 *19,25 ÜRE RE 3 sa
8682615101925 x 1 AD *19,25-B “SEİR YA a # did
TK DEMLİK POŞET ÇAY X01 *19,25 A ör
8680643020461 x 1 AD *0,25-B Klee £ Tç ç.
TKK MARKET POŞETİ — X18 *0,25 KEY ATİ iz. ş
Toplam KDV : 10,06 — PER ES Dye
Toplam ğ *92,90 ET yaz EE AŞ
YALNIZDoksanİkiTLDoksankKr EE Yine ya
BANKA KREDİ KARTI *92,900 a e
EĞ © 3

$ Bu e-Arşiv Faturanızı, EKA ağ m

&arsiv.kooperatifmarket.com.tr şi hık, Ka

Çi adresinden Referans No girişi yaparak | HK EŞ

e görüntüleyebilirsiniz. e dir ül ; »

Bi ''n Firma VKN : 845 062 7145 SE LL b a

zel in Fatura No : T172023000001615 kei > AĞEBSİİ

i ğ Ödenen Tutar 92,90 NÜ ak - SE ke

* Hz aa > T “ÖĞ

at vok KA Re 4

X $ OL Tükatlcı öv ce b” » o ağ Sr

vet İrt aliye Yerine Geçer Mo va, kB ş şk

vee Ş b” şilan WS Ül san

Va Merkez : SARAY MAlI, GIDACILAR CD. : > Ayk”

; NO:11 KAHRAMANKAZAN/ ANKARA <<. Ze rt YT
Web : Www. kooperaLifmarkel.com. tr BE BY Aa a ASİ
SARAY MAH, GIDACILAR CD.NO:11 “yü vd BT

F İADE İŞLEMLERİNDE SATIŞ FİŞİNİN VE SR Tig 7 Siğr E

4 KREDİ KARTININ İBRAZI GEREKLİDİR. ELE a ME

: Mersis No : 0845 0627 1450 00001 KT ME AR LE

Yl (00000 olumu dl roll Ci Yl Der. am
', '92.90', '2023-01-10T21:00:00.000Z', 'F JÜURKİYE TARIMA KAEDİ', 45, 'confirmed', '2026-01-24T19:08:29.686Z', '2026-01-24T19:08:29.686Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('ab4f0d07-137d-457b-832e-0ed2c0c6fb7b', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\expense\market\image-1769282260112-175276219.jpg', 'F JÜURKİYE TARIMA KAEDİ
Ky CÖOPERATIF
| i TK TARIM KREDİ PAZ. VE MARKETÇİLİK A.Ş ki
ki b: 4 YAYLACIK MAHALLESİ BAŞARI CD. ğ 2
kiç ak NO:24/A BUCA/İZMİR ri
a rg N 2 k.| Ankara Kurumlar V.D./8450627145 4 v
WEE NC ?

ME “TF Sa ÇEDAŞ ra / iş i i
ERA A e va N Üişı / | ” Ül i
WAR EŞ ; # i) d T «

bn da SAA ÜY Abrb — A du

SE Çete alla Ne VA HAP “> 4 "iş et

EĞ 3 xw : eee” çil dü ER RS

iy Ca ER iç Baf i Ef s./

#5 EM TÜR : e-ARŞİV FATURA Eler. fm

* <<” SE KS) F . * ğ.
e Bl : 11.01.2023 Mağaza No : 5757 ; yeğ
EŞ e saat : 13:19 Kasa No: 2 : A
Se rğr Belge No : 49 Z No : 205 gör yi RA

“a Tim a ER üs sss mE se GERE SER. LL... g "a '' ÜRE. ağ #
a RefNo : T172023000001615 VR . AR ŞA
A ETTİN : 51467467-9991-ed11-a3ce-eoed4cb3cesb — Mpa a İz
Bi 8690639001312 x 1 AD *34,90-B iler 3 Dağ zg
ÖĞ O) LtpTon EARL GREY DEM xo1 *34,90 Dy Ji <7
E O 8682615101925 x 1 AD *19,25-B UR ev RA
EO) K DEMLİK POŞET ÇAY &01 *19,25 Şi e $
TORİ 8682615101925 x 1 AD *19,25-B ''R.
çi TK DEMLİK POŞET ÇAY X01 *19,25 ÜRE RE 3 sa
8682615101925 x 1 AD *19,25-B “SEİR YA a # did
TK DEMLİK POŞET ÇAY X01 *19,25 A ör
8680643020461 x 1 AD *0,25-B Klee £ Tç ç.
TKK MARKET POŞETİ — X18 *0,25 KEY ATİ iz. ş
Toplam KDV : 10,06 — PER ES Dye
Toplam ğ *92,90 ET yaz EE AŞ
YALNIZDoksanİkiTLDoksankKr EE Yine ya
BANKA KREDİ KARTI *92,900 a e
EĞ © 3

$ Bu e-Arşiv Faturanızı, EKA ağ m

&arsiv.kooperatifmarket.com.tr şi hık, Ka

Çi adresinden Referans No girişi yaparak | HK EŞ

e görüntüleyebilirsiniz. e dir ül ; »

Bi ''n Firma VKN : 845 062 7145 SE LL b a

zel in Fatura No : T172023000001615 kei > AĞEBSİİ

i ğ Ödenen Tutar 92,90 NÜ ak - SE ke

* Hz aa > T “ÖĞ

at vok KA Re 4

X $ OL Tükatlcı öv ce b” » o ağ Sr

vet İrt aliye Yerine Geçer Mo va, kB ş şk

vee Ş b” şilan WS Ül san

Va Merkez : SARAY MAlI, GIDACILAR CD. : > Ayk”

; NO:11 KAHRAMANKAZAN/ ANKARA <<. Ze rt YT
Web : Www. kooperaLifmarkel.com. tr BE BY Aa a ASİ
SARAY MAH, GIDACILAR CD.NO:11 “yü vd BT

F İADE İŞLEMLERİNDE SATIŞ FİŞİNİN VE SR Tig 7 Siğr E

4 KREDİ KARTININ İBRAZI GEREKLİDİR. ELE a ME

: Mersis No : 0845 0627 1450 00001 KT ME AR LE

Yl (00000 olumu dl roll Ci Yl Der. am
', '92.90', '2023-01-10T21:00:00.000Z', 'F JÜURKİYE TARIMA KAEDİ', 45, 'confirmed', '2026-01-24T19:17:40.107Z', '2026-01-24T19:17:40.107Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('61510440-435b-4c6a-ab20-bd9b22bd1556', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1769282373931-804422309.jpeg', '& NE SEL GAEL EM TV | VE MBA TL L'' <a
Gü ANL Ç Ala Â 4 | Çe A. ML EMA EU
İNK Ğ i Ni BATIN Vr SR b Ç Me a
Gür j Ka Ke... A kA
ALSA ALM | N i i TE MA
s VİRAN Yi <8
A VA KLAN N in k 2
AN, h Ra | | EÇ k i Ğ
ARL EREN E “AYUR
KAÇTI SU ŞA | KİREÇBURNU FIRIN GIDA i Ğİ
İV YARİ LTD.ŞTİ. y |
Ü Aİ ç kk | HAYDAR ALİYEV CD.NO:48 vt CELİ
KASLUŞ Wet KİREÇBURNU/SARIYER/ İST ALA A
SOLEUA ALE | TEL : 0212 262 10 59 SERİ Aç!
UT UVEN MU SARIYER V.D. 5631402579 t b. iç
i WI | J 4
SALMA ÖĞ min > 24/01/2026 | SA tb
ÇANLUSLAN | SAAT : 19:09:20 | Â
> Va FİŞ NO 0123 $ R
Vb Ban AĞA VEKEK $10 *2.974,80 * " VULU ''
$ ş sa zi L EĞ $ yar a A Ü
LİN: EĞ Topkov «270,44 BR GU
ORÇALUN | — TOPLAM «2.974,80 BER ,
'' KREDİ *12,974,60 BR i hM
b © GARANTİ BBVA SEA A |
N Aaa k i | #kktiktitt**3008 $ i
ğ Â r N | İ İ
ER | — T.SİCİL NO: O k KEKİ vu
A $ Ve | E | X > i e SUE N
5 GER iç İ —Ekü No:0001 2 NO:1101 KA gSK, i
* Yek 1: 2361236 T:037 İ öze ş VİN X
Me : : 64 DEE o arala O AN TR
O eman eimber EE
Ri Tb V VER:S807S8DT “ARRELEISbank vrsa — BERE ANE A bip ER |
Ş y il: SARPA KN: ****t*txkkay AAA LAL VELA SARAN, 6
ş aş : Çi öğ çt W ***30098 (Bl SUR ANN KE A DAN â * Kİ
SEL se ES GÜN Re
A LKLAMA MAR 2.074.606 NE EE
DYAN ANA RA BU İŞLER TEMASSIZ BİR KART LE Ya ON ANL |
ya BRAD SEREN GERÇEKLEŞTİRİLMİŞTİR. YERE
EAOM O AR Sİ SOR ONAY KUMARASI:544122 REF NO: 602478070 KAM a |
SERER — <--0077702000060000n 084 ANLA N
ANAM N e İŞLERİNİZ ŞİFRENİZ İLE DOĞRULANMIŞTIR. AA
VEM AR e
SAY (
NU ar Garanti BBVA
Z HERSİS NO: 0879 0017 5660 0379
VUY .GARANTIBBUA.COK.TR
KART SAHİBİNE ALTTIR.
») Visa payWave
EKÜ NO:0001 Z NO: 1101
; AMAR
', '974.80', '2026-01-23T21:00:00.000Z', '& NE SEL GAEL EM TV | VE MBA TL L'' <a', 35, 'pending', '2026-01-24T19:19:33.929Z', '2026-01-24T19:19:33.929Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('c330d144-140c-4271-9b70-680770002c0c', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\expense\a-rlama\image-1769282388035-159363284.jpeg', '& NE SEL GAEL EM TV | VE MBA TL L'' <a
Gü ANL Ç Ala Â 4 | Çe A. ML EMA EU
İNK Ğ i Ni BATIN Vr SR b Ç Me a
Gür j Ka Ke... A kA
ALSA ALM | N i i TE MA
s VİRAN Yi <8
A VA KLAN N in k 2
AN, h Ra | | EÇ k i Ğ
ARL EREN E “AYUR
KAÇTI SU ŞA | KİREÇBURNU FIRIN GIDA i Ğİ
İV YARİ LTD.ŞTİ. y |
Ü Aİ ç kk | HAYDAR ALİYEV CD.NO:48 vt CELİ
KASLUŞ Wet KİREÇBURNU/SARIYER/ İST ALA A
SOLEUA ALE | TEL : 0212 262 10 59 SERİ Aç!
UT UVEN MU SARIYER V.D. 5631402579 t b. iç
i WI | J 4
SALMA ÖĞ min > 24/01/2026 | SA tb
ÇANLUSLAN | SAAT : 19:09:20 | Â
> Va FİŞ NO 0123 $ R
Vb Ban AĞA VEKEK $10 *2.974,80 * " VULU ''
$ ş sa zi L EĞ $ yar a A Ü
LİN: EĞ Topkov «270,44 BR GU
ORÇALUN | — TOPLAM «2.974,80 BER ,
'' KREDİ *12,974,60 BR i hM
b © GARANTİ BBVA SEA A |
N Aaa k i | #kktiktitt**3008 $ i
ğ Â r N | İ İ
ER | — T.SİCİL NO: O k KEKİ vu
A $ Ve | E | X > i e SUE N
5 GER iç İ —Ekü No:0001 2 NO:1101 KA gSK, i
* Yek 1: 2361236 T:037 İ öze ş VİN X
Me : : 64 DEE o arala O AN TR
O eman eimber EE
Ri Tb V VER:S807S8DT “ARRELEISbank vrsa — BERE ANE A bip ER |
Ş y il: SARPA KN: ****t*txkkay AAA LAL VELA SARAN, 6
ş aş : Çi öğ çt W ***30098 (Bl SUR ANN KE A DAN â * Kİ
SEL se ES GÜN Re
A LKLAMA MAR 2.074.606 NE EE
DYAN ANA RA BU İŞLER TEMASSIZ BİR KART LE Ya ON ANL |
ya BRAD SEREN GERÇEKLEŞTİRİLMİŞTİR. YERE
EAOM O AR Sİ SOR ONAY KUMARASI:544122 REF NO: 602478070 KAM a |
SERER — <--0077702000060000n 084 ANLA N
ANAM N e İŞLERİNİZ ŞİFRENİZ İLE DOĞRULANMIŞTIR. AA
VEM AR e
SAY (
NU ar Garanti BBVA
Z HERSİS NO: 0879 0017 5660 0379
VUY .GARANTIBBUA.COK.TR
KART SAHİBİNE ALTTIR.
») Visa payWave
EKÜ NO:0001 Z NO: 1101
; AMAR
', '974.80', '2026-01-23T21:00:00.000Z', '& NE SEL GAEL EM TV | VE MBA TL L'' <a', 35, 'confirmed', '2026-01-24T19:19:48.033Z', '2026-01-24T19:19:48.033Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('6912d134-ce3b-4021-aa43-20928abaa363', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\expense\market\image-1769283212241-309007368.jpeg', '& NE SEL GAEL EM TV | VE MBA TL L'' <a
Gü ANL Ç Ala Â 4 | Çe A. ML EMA EU
İNK Ğ i Ni BATIN Vr SR b Ç Me a
Gür j Ka Ke... A kA
ALSA ALM | N i i TE MA
s VİRAN Yi <8
A VA KLAN N in k 2
AN, h Ra | | EÇ k i Ğ
ARL EREN E “AYUR
KAÇTI SU ŞA | KİREÇBURNU FIRIN GIDA i Ğİ
İV YARİ LTD.ŞTİ. y |
Ü Aİ ç kk | HAYDAR ALİYEV CD.NO:48 vt CELİ
KASLUŞ Wet KİREÇBURNU/SARIYER/ İST ALA A
SOLEUA ALE | TEL : 0212 262 10 59 SERİ Aç!
UT UVEN MU SARIYER V.D. 5631402579 t b. iç
i WI | J 4
SALMA ÖĞ min > 24/01/2026 | SA tb
ÇANLUSLAN | SAAT : 19:09:20 | Â
> Va FİŞ NO 0123 $ R
Vb Ban AĞA VEKEK $10 *2.974,80 * " VULU ''
$ ş sa zi L EĞ $ yar a A Ü
LİN: EĞ Topkov «270,44 BR GU
ORÇALUN | — TOPLAM «2.974,80 BER ,
'' KREDİ *12,974,60 BR i hM
b © GARANTİ BBVA SEA A |
N Aaa k i | #kktiktitt**3008 $ i
ğ Â r N | İ İ
ER | — T.SİCİL NO: O k KEKİ vu
A $ Ve | E | X > i e SUE N
5 GER iç İ —Ekü No:0001 2 NO:1101 KA gSK, i
* Yek 1: 2361236 T:037 İ öze ş VİN X
Me : : 64 DEE o arala O AN TR
O eman eimber EE
Ri Tb V VER:S807S8DT “ARRELEISbank vrsa — BERE ANE A bip ER |
Ş y il: SARPA KN: ****t*txkkay AAA LAL VELA SARAN, 6
ş aş : Çi öğ çt W ***30098 (Bl SUR ANN KE A DAN â * Kİ
SEL se ES GÜN Re
A LKLAMA MAR 2.074.606 NE EE
DYAN ANA RA BU İŞLER TEMASSIZ BİR KART LE Ya ON ANL |
ya BRAD SEREN GERÇEKLEŞTİRİLMİŞTİR. YERE
EAOM O AR Sİ SOR ONAY KUMARASI:544122 REF NO: 602478070 KAM a |
SERER — <--0077702000060000n 084 ANLA N
ANAM N e İŞLERİNİZ ŞİFRENİZ İLE DOĞRULANMIŞTIR. AA
VEM AR e
SAY (
NU ar Garanti BBVA
Z HERSİS NO: 0879 0017 5660 0379
VUY .GARANTIBBUA.COK.TR
KART SAHİBİNE ALTTIR.
») Visa payWave
EKÜ NO:0001 Z NO: 1101
; AMAR
', '2974.80', '2026-01-23T21:00:00.000Z', 'KAÇTI SU ŞA | KİREÇBURNU FIRIN GIDA i Ğİ', 35, 'confirmed', '2026-01-24T19:33:32.238Z', '2026-01-24T19:33:32.238Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('4ed3acf8-7bcf-4185-8ab5-cb1831fbfd0a', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1769442317629-663058347.jpg', 'Ye Rar 6 Ca SAMUR a AN i i FERRE İKE ge
Ni > kağ Na hi BA Se Va ş EKR lk ;
şe a N ç RUM 7 ş PAS, TU ğ ğ ç |
t EK yi < FE yi "NA Çaç Bi ti N
KW ON ;
YANSA > NI SAĞLA GARA a
3>eER. bunda
Pi SEN DA âo Me. E-tweşiv Fatura VA TE ann
RR AYAN ALAN AU NI AA ZMN DR
Sİ AAA V aa e ; Eli ** VE AI e rsi Ğİ
Sn O kk NAZ GE S : BİM BİRLESİK MAĞAZALAR A vi viğ b. | Ü: UZ ği
KAAN > ANA SANIT SR a Ğ ( 4 BU ZEK 4 AZA iy
SARAN EA RÜBU Sİ , Ke 4 ZOMĞZ GAL DE ED
NN GSRAN : YO , | M0 bu TARIM V SURA
SANAN #” SAS . Dikilitaş Mah. Yeni dağan | AA AM ÜZE
XX xx BE AR
iğ MR A AN : Başiklaş İSTANBU! v ; ş iç PZR A
HA Gi NN B>. 4) Üz ş . ; ni v; İPAEZĞZ >
9 Sİ a N a < | YUYI İk Nİ | U | | Gİ | ©) Vİ YMM 1 SULU NV *& vi ŞT dp ri
ENNE Y : ELİ dl Â be SR
SAA b ) NN id D184db N 8 R
EN $ o ha FATURA NO: 1T0120261329603904 SA KASA Pe
1 N VA BEG 20 01.2026 16:30 lıra NN A
MS No MEST & -
SÜRE DD ğ S ETTNde0i 5665-97e5-463b-9583-41f si
7 k. ZA d20174987 £ Da tef
a VURUR) (ED RA KUL REN! TT | 5
A Ka 11011). ĞTLAACA (OZ İl il | :
» 41410012301608340287 S hs
w Oy AE TOKN/VKN:11111111111-NIHAL TÜKE al R
A W EĞ yICcI OR RE N
a N ESPRESSO KAHVE 2506 #1 ; AI b
, bü, NERE x300,00 SR
N © 5 İBMR EE
A NN * TERM amn Mı MET Yy 4 | Ö RE RG
N de KRE MÂ eLÜMİ A | Nİ S1 Al OR SM a ;
K ; N x TÜDÜ DE
OLA N TODI KDV KUS.
> xe A TOPLAM K AS
; N $ KA TÜL PN
N Ödenecek KDV Dahi | Dutab EB
x405.Ü0 BA
b. ” J/ Banka Kredi Kartı (1) SE) > -
a Ko x405 00 a ENR
5 GARANTİ BANKASI ğ İN KK
e (Ü 1.278269 7:03781306 516840xxxx — BE ''
N e Bt YA
KAYI ADE GELE O DA;
A Diz DI #506 16 31 B:İ/71 S$S:908 GE ş
Onay No:0851392 Ref. No:6023611
TRBALE A)
eğ ATRA- Kn EA
KON CÜARA" KÜV TUTAR K
iy A DV DAH iş ;
v4 o A0Ü , 99 Per
EN RAP x40D. ş
» Ğİ S Dene / iy KAN KL
BH / o N — YEM MER nda
4 / “ VRini Öuht çi RS RES
Kar a M Db hi HÜR NA
S YASSI” 5 TETA TR ra 4
DB OC « ağ yana KA
> Sİ ; b Tg AA Mr BAL A, j
yil ni © PA İZ hı AU N
b ; KP iş KYA 3
Posar - ETDRN EZ k
- SS RM ik
TAVSİM11 ÖXkxx Ty
İ141 DADpDU» Xxx m”)
> No: pr BERANE / pro,
> © GG ÜCSİKT
', '300.00', NULL, 'KAAN > ANA SANIT SR a Ğ ( 4 BU ZEK 4 AZA iy', 34, 'pending', '2026-01-26T15:45:17.623Z', '2026-01-26T15:45:17.623Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('15303684-4307-4faa-8f19-6f5b9722fa18', '51c6dea5-f8c6-4ea0-9cef-5f568d2c91df', 'uploads\expense\di-er-giderler\image-1769462127051-992368017.jpeg', '& NE SEL GAEL EM TV | VE MBA TL L'' <a
Gü ANL Ç Ala Â 4 | Çe A. ML EMA EU
İNK Ğ i Ni BATIN Vr SR b Ç Me a
Gür j Ka Ke... A kA
ALSA ALM | N i i TE MA
s VİRAN Yi <8
A VA KLAN N in k 2
AN, h Ra | | EÇ k i Ğ
ARL EREN E “AYUR
KAÇTI SU ŞA | KİREÇBURNU FIRIN GIDA i Ğİ
İV YARİ LTD.ŞTİ. y |
Ü Aİ ç kk | HAYDAR ALİYEV CD.NO:48 vt CELİ
KASLUŞ Wet KİREÇBURNU/SARIYER/ İST ALA A
SOLEUA ALE | TEL : 0212 262 10 59 SERİ Aç!
UT UVEN MU SARIYER V.D. 5631402579 t b. iç
i WI | J 4
SALMA ÖĞ min > 24/01/2026 | SA tb
ÇANLUSLAN | SAAT : 19:09:20 | Â
> Va FİŞ NO 0123 $ R
Vb Ban AĞA VEKEK $10 *2.974,80 * " VULU ''
$ ş sa zi L EĞ $ yar a A Ü
LİN: EĞ Topkov «270,44 BR GU
ORÇALUN | — TOPLAM «2.974,80 BER ,
'' KREDİ *12,974,60 BR i hM
b © GARANTİ BBVA SEA A |
N Aaa k i | #kktiktitt**3008 $ i
ğ Â r N | İ İ
ER | — T.SİCİL NO: O k KEKİ vu
A $ Ve | E | X > i e SUE N
5 GER iç İ —Ekü No:0001 2 NO:1101 KA gSK, i
* Yek 1: 2361236 T:037 İ öze ş VİN X
Me : : 64 DEE o arala O AN TR
O eman eimber EE
Ri Tb V VER:S807S8DT “ARRELEISbank vrsa — BERE ANE A bip ER |
Ş y il: SARPA KN: ****t*txkkay AAA LAL VELA SARAN, 6
ş aş : Çi öğ çt W ***30098 (Bl SUR ANN KE A DAN â * Kİ
SEL se ES GÜN Re
A LKLAMA MAR 2.074.606 NE EE
DYAN ANA RA BU İŞLER TEMASSIZ BİR KART LE Ya ON ANL |
ya BRAD SEREN GERÇEKLEŞTİRİLMİŞTİR. YERE
EAOM O AR Sİ SOR ONAY KUMARASI:544122 REF NO: 602478070 KAM a |
SERER — <--0077702000060000n 084 ANLA N
ANAM N e İŞLERİNİZ ŞİFRENİZ İLE DOĞRULANMIŞTIR. AA
VEM AR e
SAY (
NU ar Garanti BBVA
Z HERSİS NO: 0879 0017 5660 0379
VUY .GARANTIBBUA.COK.TR
KART SAHİBİNE ALTTIR.
») Visa payWave
EKÜ NO:0001 Z NO: 1101
; AMAR
', '2974.80', '2026-01-23T21:00:00.000Z', 'KAÇTI SU ŞA | KİREÇBURNU FIRIN GIDA i Ğİ', 35, 'confirmed', '2026-01-26T21:15:27.051Z', '2026-01-26T21:15:27.051Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('584f2e5e-9adc-48c2-9ed1-93275fbb4118', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\expense\market\image-1769627927218-128911164.jpeg', '& NE SEL GAEL EM TV | VE MBA TL L'' <a
Gü ANL Ç Ala Â 4 | Çe A. ML EMA EU
İNK Ğ i Ni BATIN Vr SR b Ç Me a
Gür j Ka Ke... A kA
ALSA ALM | N i i TE MA
s VİRAN Yi <8
A VA KLAN N in k 2
AN, h Ra | | EÇ k i Ğ
ARL EREN E “AYUR
KAÇTI SU ŞA | KİREÇBURNU FIRIN GIDA i Ğİ
İV YARİ LTD.ŞTİ. y |
Ü Aİ ç kk | HAYDAR ALİYEV CD.NO:48 vt CELİ
KASLUŞ Wet KİREÇBURNU/SARIYER/ İST ALA A
SOLEUA ALE | TEL : 0212 262 10 59 SERİ Aç!
UT UVEN MU SARIYER V.D. 5631402579 t b. iç
i WI | J 4
SALMA ÖĞ min > 24/01/2026 | SA tb
ÇANLUSLAN | SAAT : 19:09:20 | Â
> Va FİŞ NO 0123 $ R
Vb Ban AĞA VEKEK $10 *2.974,80 * " VULU ''
$ ş sa zi L EĞ $ yar a A Ü
LİN: EĞ Topkov «270,44 BR GU
ORÇALUN | — TOPLAM «2.974,80 BER ,
'' KREDİ *12,974,60 BR i hM
b © GARANTİ BBVA SEA A |
N Aaa k i | #kktiktitt**3008 $ i
ğ Â r N | İ İ
ER | — T.SİCİL NO: O k KEKİ vu
A $ Ve | E | X > i e SUE N
5 GER iç İ —Ekü No:0001 2 NO:1101 KA gSK, i
* Yek 1: 2361236 T:037 İ öze ş VİN X
Me : : 64 DEE o arala O AN TR
O eman eimber EE
Ri Tb V VER:S807S8DT “ARRELEISbank vrsa — BERE ANE A bip ER |
Ş y il: SARPA KN: ****t*txkkay AAA LAL VELA SARAN, 6
ş aş : Çi öğ çt W ***30098 (Bl SUR ANN KE A DAN â * Kİ
SEL se ES GÜN Re
A LKLAMA MAR 2.074.606 NE EE
DYAN ANA RA BU İŞLER TEMASSIZ BİR KART LE Ya ON ANL |
ya BRAD SEREN GERÇEKLEŞTİRİLMİŞTİR. YERE
EAOM O AR Sİ SOR ONAY KUMARASI:544122 REF NO: 602478070 KAM a |
SERER — <--0077702000060000n 084 ANLA N
ANAM N e İŞLERİNİZ ŞİFRENİZ İLE DOĞRULANMIŞTIR. AA
VEM AR e
SAY (
NU ar Garanti BBVA
Z HERSİS NO: 0879 0017 5660 0379
VUY .GARANTIBBUA.COK.TR
KART SAHİBİNE ALTTIR.
») Visa payWave
EKÜ NO:0001 Z NO: 1101
; AMAR
', '2974.80', '2026-01-23T21:00:00.000Z', 'KAÇTI SU ŞA | KİREÇBURNU FIRIN GIDA i Ğİ', 35, 'confirmed', '2026-01-28T19:18:47.217Z', '2026-01-28T19:18:47.217Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('329ae96f-5157-48e6-8d39-45518d4c2e65', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\expense\market\image-1769627958970-996728300.jpeg', '& NE SEL GAEL EM TV | VE MBA TL L'' <a
Gü ANL Ç Ala Â 4 | Çe A. ML EMA EU
İNK Ğ i Ni BATIN Vr SR b Ç Me a
Gür j Ka Ke... A kA
ALSA ALM | N i i TE MA
s VİRAN Yi <8
A VA KLAN N in k 2
AN, h Ra | | EÇ k i Ğ
ARL EREN E “AYUR
KAÇTI SU ŞA | KİREÇBURNU FIRIN GIDA i Ğİ
İV YARİ LTD.ŞTİ. y |
Ü Aİ ç kk | HAYDAR ALİYEV CD.NO:48 vt CELİ
KASLUŞ Wet KİREÇBURNU/SARIYER/ İST ALA A
SOLEUA ALE | TEL : 0212 262 10 59 SERİ Aç!
UT UVEN MU SARIYER V.D. 5631402579 t b. iç
i WI | J 4
SALMA ÖĞ min > 24/01/2026 | SA tb
ÇANLUSLAN | SAAT : 19:09:20 | Â
> Va FİŞ NO 0123 $ R
Vb Ban AĞA VEKEK $10 *2.974,80 * " VULU ''
$ ş sa zi L EĞ $ yar a A Ü
LİN: EĞ Topkov «270,44 BR GU
ORÇALUN | — TOPLAM «2.974,80 BER ,
'' KREDİ *12,974,60 BR i hM
b © GARANTİ BBVA SEA A |
N Aaa k i | #kktiktitt**3008 $ i
ğ Â r N | İ İ
ER | — T.SİCİL NO: O k KEKİ vu
A $ Ve | E | X > i e SUE N
5 GER iç İ —Ekü No:0001 2 NO:1101 KA gSK, i
* Yek 1: 2361236 T:037 İ öze ş VİN X
Me : : 64 DEE o arala O AN TR
O eman eimber EE
Ri Tb V VER:S807S8DT “ARRELEISbank vrsa — BERE ANE A bip ER |
Ş y il: SARPA KN: ****t*txkkay AAA LAL VELA SARAN, 6
ş aş : Çi öğ çt W ***30098 (Bl SUR ANN KE A DAN â * Kİ
SEL se ES GÜN Re
A LKLAMA MAR 2.074.606 NE EE
DYAN ANA RA BU İŞLER TEMASSIZ BİR KART LE Ya ON ANL |
ya BRAD SEREN GERÇEKLEŞTİRİLMİŞTİR. YERE
EAOM O AR Sİ SOR ONAY KUMARASI:544122 REF NO: 602478070 KAM a |
SERER — <--0077702000060000n 084 ANLA N
ANAM N e İŞLERİNİZ ŞİFRENİZ İLE DOĞRULANMIŞTIR. AA
VEM AR e
SAY (
NU ar Garanti BBVA
Z HERSİS NO: 0879 0017 5660 0379
VUY .GARANTIBBUA.COK.TR
KART SAHİBİNE ALTTIR.
») Visa payWave
EKÜ NO:0001 Z NO: 1101
; AMAR
', '2974.80', '2026-01-23T21:00:00.000Z', 'KAÇTI SU ŞA | KİREÇBURNU FIRIN GIDA i Ğİ', 35, 'confirmed', '2026-01-28T19:19:18.968Z', '2026-01-28T19:19:18.968Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('33fd4d59-3119-4261-aad8-33aeb5196603', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770573412506-969264211.jpeg', '& NE SEL GAEL EM TV | VE MBA TL L'' <a
Gü ANL Ç Ala Â 4 | Çe A. ML EMA EU
İNK Ğ i Ni BATIN Vr SR b Ç Me a
Gür j Ka Ke... A kA
ALSA ALM | N i i TE MA
s VİRAN Yi <8
A VA KLAN N in k 2
AN, h Ra | | EÇ k i Ğ
ARL EREN E “AYUR
KAÇTI SU ŞA | KİREÇBURNU FIRIN GIDA i Ğİ
İV YARİ LTD.ŞTİ. y |
Ü Aİ ç kk | HAYDAR ALİYEV CD.NO:48 vt CELİ
KASLUŞ Wet KİREÇBURNU/SARIYER/ İST ALA A
SOLEUA ALE | TEL : 0212 262 10 59 SERİ Aç!
UT UVEN MU SARIYER V.D. 5631402579 t b. iç
i WI | J 4
SALMA ÖĞ min > 24/01/2026 | SA tb
ÇANLUSLAN | SAAT : 19:09:20 | Â
> Va FİŞ NO 0123 $ R
Vb Ban AĞA VEKEK $10 *2.974,80 * " VULU ''
$ ş sa zi L EĞ $ yar a A Ü
LİN: EĞ Topkov «270,44 BR GU
ORÇALUN | — TOPLAM «2.974,80 BER ,
'' KREDİ *12,974,60 BR i hM
b © GARANTİ BBVA SEA A |
N Aaa k i | #kktiktitt**3008 $ i
ğ Â r N | İ İ
ER | — T.SİCİL NO: O k KEKİ vu
A $ Ve | E | X > i e SUE N
5 GER iç İ —Ekü No:0001 2 NO:1101 KA gSK, i
* Yek 1: 2361236 T:037 İ öze ş VİN X
Me : : 64 DEE o arala O AN TR
O eman eimber EE
Ri Tb V VER:S807S8DT “ARRELEISbank vrsa — BERE ANE A bip ER |
Ş y il: SARPA KN: ****t*txkkay AAA LAL VELA SARAN, 6
ş aş : Çi öğ çt W ***30098 (Bl SUR ANN KE A DAN â * Kİ
SEL se ES GÜN Re
A LKLAMA MAR 2.074.606 NE EE
DYAN ANA RA BU İŞLER TEMASSIZ BİR KART LE Ya ON ANL |
ya BRAD SEREN GERÇEKLEŞTİRİLMİŞTİR. YERE
EAOM O AR Sİ SOR ONAY KUMARASI:544122 REF NO: 602478070 KAM a |
SERER — <--0077702000060000n 084 ANLA N
ANAM N e İŞLERİNİZ ŞİFRENİZ İLE DOĞRULANMIŞTIR. AA
VEM AR e
SAY (
NU ar Garanti BBVA
Z HERSİS NO: 0879 0017 5660 0379
VUY .GARANTIBBUA.COK.TR
KART SAHİBİNE ALTTIR.
») Visa payWave
EKÜ NO:0001 Z NO: 1101
; AMAR
', '2974.80', '2026-01-23T21:00:00.000Z', 'KAÇTI SU ŞA | KİREÇBURNU FIRIN GIDA i Ğİ', 35, 'pending', '2026-02-08T17:56:52.502Z', '2026-02-08T17:56:52.502Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('dd9c8243-112d-433a-bdce-72a578d51ed2', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'uploads\image-1769639147551-936089101.jpg', 'Ür» / A İY A /
NY. Vay)
ş Vo / ANA zi
pe 4 Ni Ür , / 1) j AA
AYLA vey A y y Ve
AR RA ; da yi
BK RAN |
3 BER ON f
AŞA / 4 e ÜR R ÜN
ERER NA ; y ,
KE vE # , Wc) vay 4; |
fe ŞE Ak ide YAR £
A YARAR SENA AA
/ y , A , “ y VW
NE t
ye —- - b Kr” k a
—U) > RR — MÜ
ca mm —- > ae
C > Ç R ck ü Üz, Gizli >
e —z — — oL MA
sır '' " & y— GE bar e Te di e
i ze ) ş De pan çer
l in Sz ; CA AZ " >—
X KI Ci > o SEE yep >
A hp ww J KL var “k> f —
x > — 6 a z “Si “z İl çe
< k ke Fe Pa > Gr HO ZI —
v 9 VT Pe — ( 1 —
gra r - Z GN EÇEÇ MZ CE
- ” Ma Deği az GE m
> Kd çe RC
gene HERE —-. ( li m 4
NN CR si liç -
, “ümre marer | e hu & a -— © — Za Z
aa” — Hm he 0 SR
> m — rat der a |
f 4m lü A hug Lav ) LAN — ı Ğ #
? vana: ame m. ( ç "ni S. O OO CİA m Ai
i " 3 — Rİ ; ©) - : mr DD) MER Ker Da Di
A — LE ÜRE 5. mame i & A sh Mm lm BAP 7 Eğ
, | Kr Dm O> pere t 5 Ez harik” Ya Yebaz — <7 : de 7
idik - C - en — —-— — /
Ü ( | Kar —r3 hdi İh T ZU) RR 4 Ç / ;
e SR FA ! DD ( i — a *
by 4 ş re? 2 L CĞ TI > içer AR —rn— --—
; A Ke Me 4 r—A c — SE
4 Km Çı) — in le SA hh Or >
4 ar Lı) ke : ip ği ii RR Â -
* — SI © Jİ -w â
C—? © önün (O N BU / /
e » G4 Ge ze Tm NU HÜ:
1 > m ap çe) f & |gİ
; Ç RET. mik ÇE Gi Ç yi ş ( ri
DYK NA piri re ac yü ş i 4
Te & > ile''ike de 4 ; * Coral
j ş F Yİ
| ) “ i
SAYAN Dan ir EAA çile VA E dk e; y yi
İlini : A MAD A DANALAR NAZ KAD Be iz SENE ASRARMYR gön Dİ m - KİYESA
r 4 > Ak MEDYA SSM 4 ALLAR Ye CR May AZ Pak Â "a ş TRAP XE VPS şi rk, O, y İŞ Eğ
> ) beğ - Ve ARA Af İK lale Da Be RA KE SA ÇE SÜR ? TARÜERENZ ii VARA ş j nı RAN
V , Par a YAAR YE ar # YTA TANSAŞ XX OA KAYA ŞA 7 Re PEN ğ ZA AZ Es Gi L STA YENİ SD £ y Jj Y ri Pe
y # iy > y Çele Xi VAN PA SA e VA DORE öpee AZA PeŞk PE <> e e3 : ge Piç ye örn yy My; ; Üz Ür Va ÇAN B çi 4 kr çü <,
KAY RR SL SA KATRANI ERER AZ. A ERAT KELAM TA KAŞ? iş Sta) PE e //
YAŞ ME. ADN te > SARAR AE SN A Za ARL ANAN AN VZ ŞA ? BE Arse b U/ 3
Vi ye NR, YARRA Va, ŞE LASRANAİAR TN SER DEE TAN. SAPLI 4; Snğş ; * NAL DR
$ YUN * aç Vel N Hi / Ke A KİN e AYAR SO AS özi De çi y uğ) VAAD ÖZ. 4 7 kg ? ç $ Te Ş Aki JİN j
* yi NA yoğ GS GN Y SWAN RR IB DAİ DT El SARE AÜ SARAR YARAL Ve e VEL ( ŞER UY Şa A
v RAN ARA SARIM LANA SEZ SÜRE si DUAA RAN pi AZAR SEL EŞE SEO A
NU ar PAP YAT EZ ELAN SEL ERER vE BEYRER ARALARA OS İN dr ASAN SEZ SİSE ÇÖ SUR
i ş AML, YAZ YAŞI EAA SNRA İLA Ko KEKE PLA A URAĞRL Dd e ÖMRE KA ye > SEE EAA /
Ni $ ARYA Fr 4 / A ye td SR ne ARR, YER AP TA BÜY AR KUSAN 4 yi Ğ 4 Sağ ; Pe ca Pat Fu A ;
; Çi KN YDP 4 * OVA ) ye EN Kk A Kor Sn EYE SER Ri KEK PİŞİR a > SAYA râ e 4 ş ij ŞT SGN EE YOR |
KARA & YAAA Hi SEZA LR. ERA KERE SURU R LAR SATA TU TAAA LR ip. YAŞA SA > SHİN AN SARIP A
#4? A AANAK / 2 PL ARE RATR AMR KAR AAA A ŞAMAN SE SE BALI
N / ER V4. ye VA / AR $ ei der k AR 5 VA Si ke Kzb vi PA AMA Üç RT ÇAK ESME ME RR SL EN ( N 7 i > SARA NER Ne İ
er YA MAĞ AMARE ARAN AÇ CEP PSD SEAN OL AMIİZ AN YARA Vi DELER A 0 Ö; PARAM A Ki > Nİ ŞE ŞUNUN / VA
h RS 7 YARKO / SAYI AM DAĞ Ç3 ie NE diğ Za 4 Köy Biz SANAR AR > YELE KA RX ER ROY PA PAN
r SÜR CA KA ZA IN ES ARSA KEL SE SL | SELİ ARP ARAR AA TERERDP a YEN YEL AT ON YA 4 YENE SR) EE
| Erk ileri AĞ YAN ipi ğe Be SA b Sik e AŞ ŞALLAR. YALE ARAT CA YA ARAN KE A LAYAN KE AĞ x BE AĞ Sa 5 > LI;
Ak : BNA ; vg ye yer X " SERA RİDA EE AA Çi LAN k FL NY EN Ri y » ş < $ â ğ J Yi RYAN
DYS AMANIN Y 1 7 ZOORORAN Lr, '' bea MAL LP i A A ÇARE ÇO SARIN AMAŞIR AREKAIM ARANMA NA FÜR ARA YAR AS AZ ARZ
ARALAR ŞE ANE YAA DEN EA İRLA SI ERA ŞERİ AE A PE e ARA» YAZAR KAN 1 YOĞRAN ANNAN A MEY His
Beş ZE, RON VAAD AL - yy SA ği NE KALAN. 7 YAL ADR 5 Y ler YAAA RNA A ADANA MP i y SA Ağ te STA NN TO ANI PİPER;
DAA AVAM ARZ ZAR EN RE AURA ADAN NAM SON SE YL OMN
Fi > m , 4 RL LAN  y y WE weğ ÜRN MP A Pil y7 ARA NS! Uf KRM Kh KALANLARA YA BAL EN kN &N Sa BR) EN ALOE TAN 7 pis N ey
Wa ef * A NA is * ÇAK” AN m AÇ iş Süli © KAPIN AZ KT BULAR İk | çe“ o, 1 iki , Webefçi ; Se * y NC Ni RE SE EN f A
iş Yı Va SAÇA * vi ESİRİ MA ii, Da” We İZ Rİ A YON Ale “CB KUYT ma b “ iŞ ( YA YALA VASOYA e y DANSA iy Pa vi NZZ. KN YARAR
k * CAR TAN f Sd KIRAR Tar RE, DP ÇA SP ENG AELA AMA SY NAC Cr Ve ANY KARLAR BE EA AR YBta ysk tt! e YA j
A / TA ap 47 DAL iü «yi VE rae SARIZ AARPNI > SANLY VA UYE AĞ AN KAFEYE TARANAN y VT ön Ge 4 P NAS V 2 YAK SS > YIRaRyA Wi
KEVAN YIK  , CA TL ARA Rİ TED ARAYA YA, VERA KAR SEAN İLERİYİ N, Çi f SU yAS''N ENNE ADN Çala fp & NY çi R rai
.» KA / AAA YAAR İŞE ZAN İNN ÇAN PARRAN, HERARN A AA ; OLE NAL DESİ ÇAYI VAR NE AR ARON AZ YUNAN ÜN Ör A ASİ fr)
MT La vi | ERA KE, EV YANI KATARAK OVA AV ALU NR YEAR TA V 4 “ACAR DENE ir KAR RA A ASRA ALAN İSMİN RL 13
j ALAY '' , VA YE LA Se D “ERER rRl TÜ YARALAR Çtoğak Yl YAŞ YI MTA DEN LANA WÜ EL ANIN ''N Fy La EE EA
£ "ni pen SV YA Bp ci e FA KE A UL SİL RA a KULA NY 7 VAR AI Â HAN BAY Ya SEA EN NÜN DAŞ ADN GARA PAN YAŞ 4 ER AY /
A; Lr e / FS AN RAN SAÇAN DE SNDU FE ati side KOLA TELİN AM ARYA f / OUR / & SK NR ARP AR ARI i, E iğ KK SI YI
F e YUN. / AYARA YUN PET ZAR “o pa SARAR ler YARAL Ü (ig? vale Yari FAA UYUR j bAaAe: MEK /0 YAR Ko Xr X / Şt a)
Hs a ci / REN RR Sr 1 ADE AİN LAR RR RE Ae AMD TAŞ Kel a TAM FARC K COUAN FAYA A ” SL ş ME Vo f ;
Gk ; | end © BRE TAN MARE ZO YUN SARA A RE BYS KAN AM rak TA SANA > ; KAN Ka "OR N 7
Hu | Keçi Kün | Fiğ NE YASAR VALA AMP kağ yar a DR a İĞER Vu SR «5 KA PR İRAN Ye ğ VA
4 Mv Vİ ARMA Rİ AYARI OSURAN IR YAMAN yin TAA LANNI Mya Pe SR YEAR ERA Aİ DEN
AV / VARA A DAN DEDE AYET ORMALAİ  ADNARAN  AŞLEARNN ŞAURZ  MEARE RR EMAR VE Md ZİN
', '0.00', NULL, 'NU ar PAP YAT EZ ELAN SEL ERER vE BEYRER ARALARA OS İN dr ASAN SEZ SİSE ÇÖ SUR', 26, 'pending', '2026-01-28T22:25:47.549Z', '2026-01-28T22:25:47.549Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('36bb171b-9034-44b4-9feb-b4e4ea70ae3e', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'uploads\image-1769639132439-306059601.jpg', 'SER Şe
ça ç Vi
ş /
yp a VA 7
ve 4
i j FELÇ i r
VA A
z >
vi yu pa —U b
Ro Ran j - — Nr h
Ğ - -— Re el Ma “€
k in yiz z e & ct ünü im
» | — — — m >
h bü z : SOR
; i Un —b e
yere co C 5 — 4 SR e. >
; K.S“Un a ÖN ke BE
a 5 Rl AZ 4 Er
Da : ÇRŞ m all 4 | “m
Ülke 2 25 e İRAT A A —— <
Mad yağa ŞA
ği Aman a ıç Raf
: ğ ett ; nom
2 , 3 N RES
& SA — T en a ( > " dr ze 5
* ? imei l . y | yam tt a , A
ş k n h © (ÖĞ) ME yeli e k j
f ) DC nn A j
ç m Evi — > Ni a AZ Nea ?
AÇ U - > Bar an Ma TT f
ba my ek > a (Ea a Ça —-
m3 A“ l Ea >aAk ;
k ” 3 Dı. Kd da Ar a 4 PP
. BE | ( - ük 0G kr 3 — #0.
ÜL) ya Ban Be RC LE A y
LU € ) vi BADE UL Aaron H— & i
> Co ö ge da 4 —
e. ya flar eu e MH ör a
, i. m Gİ — VA —-
t > CA hari
r ''« o Ni 4 DAL
- — e , Üy
-— p ye / riy
/ , z e Ya
N ç /*» N f 4 :
ğ KAŞ Se; AZ bil Pedi
/ '') Ş i YAŞ yz y FRİ i. 4 ği ) ; ğ iyi
; E/ YAYA t YA “Fiil “4
/ , y f â YA ; YA KS a > y ÇAY RK Kii ç Rc!
/ F i y RO / SL A e EIA ACIR RA PAR İLİRN / i şi  Tayiye ÜN
< 4 NEY YAZ şi WrE XYZ DE SA AREA AYAŞ TR , Eğ Lr AVA A
Vi A AAA Kü EE LARA GRAZ A ; KEN LE
« MA vti YARN N iy4$ YA iy # VAR LA ? ) UR /
RU R |) ş Re Y diğ Fiğ > ÇAL ALIR RE dü ASİ Fy Va DO, we Ş 4 ) rn 4
/ ” t et / k VAN ARSİN, ÇEREZ ENAZ vecd Mr Ün ER N KAŞINA p / Ve
# ”) U / A / > / YER LARN O Fay, ş > ALA $E Vu, e < ye ye, BİK Li A PA İş FA YA
/ yy EE p y > yk n NN Y OYUN KÖL Vİ ği BA YAŞINA J : Ayı
Yeg / y ir / Ç NE riler SON FRİ YAR YEL vi KU A ay PATARA CAL / i y / i ye Mi
'' v4 AA BULUR TINARI BP SDP E YBR YANMA RE
* 4 , < bi ; KÖRİ j EMA KOREAN ELA KASAR ALİYA, > AL SN Nü VEYA
di : © j Üy VANDE LARA Av BAŞA A SM / YET A
4 b KUŞ r A YA YP ALİR AA ARŞ e DA LEMAN // RENDA ş FARM
i Na a ? j 1 ROD EVE dr DUAA SARUN YA RAN ŞE MŞL AŞ MAR > slİ 4 / , e | r Fm Be ÇE, > We A
Ya, a DO / SİSER HT SE DOK HANA AR A ASAR ai YES EDER RA e (Xy PX / E'' fi LI BE
f > Ni j PO4 NY “e YA YAR YAA KA ÜLeRin yer, / KAKA RAN Mr NR AKOYA ş * / #5 y Â
Arl, ş AYŞE YE FS £ / / AT AE RE LAN ARİN KER i TALAŞ ÇAYAN Sy j GE v SAL KAN Loiş /
“ii / €kİy Â KRT ALA ARR LAN ALAK LEY ALE bie a * / >. ) REP
Yi 4 ş * PE ŞA ş WİN yl f ÇIRPMA MR AREA AYN U MOLU ört SAA o | v KAL uv R : y / ko //7
, KAT ARORA ÇAN VERE DEAR SAN Ti SUAN ĞU YUŞA ANİ RS YATAR KEMAN ON
* şi & '' ys / ye VA / AŞ PT TA bel ÜF ANL kr Cf “A b BNA DYAN , VARTA a SN) AA y i Yy #
VA ''N, | y &V/ DS VA A İP Sek KİNE AA VAN LAN (çi vi NU: i AN AL YARN EĞ İli
; ; GOAT 7 A 7. BARDAN ARNAZINE A ra Tl o e SL ÜYE ANAN çe SALAN Z ii İei yl
/ Pa / SEŞALI İZ Şaç EYE ANDY AA deye ye SUR AL MEY / SOYA 1, Sen har ERO ki Hi
; i ; dde Ye / MAYIN ART LR ASA YA ÇAM ; ES” FO” MP j AĞ
vŞ Y.A CESR A / YALAR ŞER SAL IR.” TAPE ARİ ANMA vi '' YA ASE : ; SR Vİ Vi
$ 4*.ü SN SEE A KAR Aa BELİ ieDAR vi vi ye hi, aa FLyd , A A Bane Fa 0g , AMY Te vi yer Ke / vik
, *& Ye / ÖGE / / AN © iy Ye, "SA Nİ vi vr OY AY LAR lap HAN gb FADE 1 > ERA <A SEA RE j İ, K
YA v/ / SKRE < DAR SA » 3 FAN i , vir / AN O f Ny, KM "$ /
j A YRA SA NEY e SŞİ v) Ve iye i ÇI SAYAR YAY > CEN iy KI EL RNA vor A dü ''$ VEN Kü HE ele VEYEY J Nk,
ği A Pp Ji MA Kiş YARA ÇA YAP ALANA GAP m "Ko / TÜYÜ Si / 4 4; / e MEŞE 4 y MB NEĞİ Üy
k BB / b j / BEİ A / BARLAR SİZ OD SR REN SOU. (ALANI A Kışı) DHA vyra, VE YLM KA A ÇAL SEY REZ İM
4 HA BET ŞAM WA AP GE SU AYATA ARP Yür yillar Sad if A ESA ç YAYA VERİ 4 Wo 17
PP * hb HARRY, ALA PAD Ma AP / 4 BURASI Va YAA ARA 6; j
', '0.00', NULL, ', KAT ARORA ÇAN VERE DEAR SAN Ti SUAN ĞU YUŞA ANİ RS YATAR KEMAN ON', 27, 'pending', '2026-01-28T22:25:32.436Z', '2026-01-28T22:25:32.436Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('119b5f24-1219-469e-b2d0-d76b886173e3', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770573689332-182117089.jpeg', '& NE SEL GAEL EM TV | VE MBA TL L'' <a
Gü ANL Ç Ala Â 4 | Çe A. ML EMA EU
İNK Ğ i Ni BATIN Vr SR b Ç Me a
Gür j Ka Ke... A kA
ALSA ALM | N i i TE MA
s VİRAN Yi <8
A VA KLAN N in k 2
AN, h Ra | | EÇ k i Ğ
ARL EREN E “AYUR
KAÇTI SU ŞA | KİREÇBURNU FIRIN GIDA i Ğİ
İV YARİ LTD.ŞTİ. y |
Ü Aİ ç kk | HAYDAR ALİYEV CD.NO:48 vt CELİ
KASLUŞ Wet KİREÇBURNU/SARIYER/ İST ALA A
SOLEUA ALE | TEL : 0212 262 10 59 SERİ Aç!
UT UVEN MU SARIYER V.D. 5631402579 t b. iç
i WI | J 4
SALMA ÖĞ min > 24/01/2026 | SA tb
ÇANLUSLAN | SAAT : 19:09:20 | Â
> Va FİŞ NO 0123 $ R
Vb Ban AĞA VEKEK $10 *2.974,80 * " VULU ''
$ ş sa zi L EĞ $ yar a A Ü
LİN: EĞ Topkov «270,44 BR GU
ORÇALUN | — TOPLAM «2.974,80 BER ,
'' KREDİ *12,974,60 BR i hM
b © GARANTİ BBVA SEA A |
N Aaa k i | #kktiktitt**3008 $ i
ğ Â r N | İ İ
ER | — T.SİCİL NO: O k KEKİ vu
A $ Ve | E | X > i e SUE N
5 GER iç İ —Ekü No:0001 2 NO:1101 KA gSK, i
* Yek 1: 2361236 T:037 İ öze ş VİN X
Me : : 64 DEE o arala O AN TR
O eman eimber EE
Ri Tb V VER:S807S8DT “ARRELEISbank vrsa — BERE ANE A bip ER |
Ş y il: SARPA KN: ****t*txkkay AAA LAL VELA SARAN, 6
ş aş : Çi öğ çt W ***30098 (Bl SUR ANN KE A DAN â * Kİ
SEL se ES GÜN Re
A LKLAMA MAR 2.074.606 NE EE
DYAN ANA RA BU İŞLER TEMASSIZ BİR KART LE Ya ON ANL |
ya BRAD SEREN GERÇEKLEŞTİRİLMİŞTİR. YERE
EAOM O AR Sİ SOR ONAY KUMARASI:544122 REF NO: 602478070 KAM a |
SERER — <--0077702000060000n 084 ANLA N
ANAM N e İŞLERİNİZ ŞİFRENİZ İLE DOĞRULANMIŞTIR. AA
VEM AR e
SAY (
NU ar Garanti BBVA
Z HERSİS NO: 0879 0017 5660 0379
VUY .GARANTIBBUA.COK.TR
KART SAHİBİNE ALTTIR.
») Visa payWave
EKÜ NO:0001 Z NO: 1101
; AMAR
', '2974.80', '2026-01-23T21:00:00.000Z', 'KAÇTI SU ŞA | KİREÇBURNU FIRIN GIDA i Ğİ', 35, 'pending', '2026-02-08T18:01:29.328Z', '2026-02-08T18:01:29.328Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('03787289-61e2-4b4e-8753-71d70f441be7', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770573924306-208446864.jpeg', '&    NE SEL GAEL EM     TV 1 VE MBA TL      L a
Gü ANL Ç  Ala     4    il    Çe       A.                 ML A MLE EU
İNK Ğ      i    Ni    BATIN   Vr SR         b           iÇ Me a
Gür   j              Ka Ke...    A                   kA
   ALSA ALM   1      N                          i    i             TE MA
s    VİRAN                                                                 Yi şt
A    VA KLAN                                                        N          in     k    2
AN, h      Ra      İ                              EÇ k         i            Ğ
ARL EREN        E                     AYUR
KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ
İV     YARİ         LTD.ŞTİ.                   y         İ
Ü Aİ ç    kk       HAYDAR ALİYEV CD.NO:48        vt CELİ
KASLUŞ      eeli    KİREÇBURNU/SARIYER/ İST                ALA A
SOLEUA        ALE      TEL : 0212 262 10 59        SERİ               Aç:
UT UVEN      MU     SARIYER V.D. 5631402579     t              b.    iç
i   GI          İ                            J         4
SALMA      ÖĞ min: 24/01/2026         İ           SA tb
ÇANLUSLAN        İ SAAT     : 19:09:20          İ        Çi
   Va                FİŞ NO    0123                                i     R
Vb Ban      AĞA       VEKEK        *10 *2.974,80  *    VULU     ı
t             ş           sa zi L EĞ  yar  a    A      Ü
LİN:       EĞ Topkov       *270,44 BR    GU
ORÇALUN            İ TOPLAM        *2.974,80 BER             ,
ı                        KREDİ            *12,974,60 BR       i              hM
b                   Ü GARANTİ BBVA                   SEA      A
N    Aaa    k      i     İ    Akktiktitt**3008              *                i
ğ                                         r        N    İ      İ    İ
ER     İ  T.SİCİL NO: O                k   KEKİ    vu
A         Ş     Ve      E                               İ Ş         y      i      e SUE    N
 5 GER    iç       İ Ekü No:0001       2 NO:1101 KA  gSK,        i
* Yek             1: 2361236     T:037      İ   öze ş VİN
Me             :          :   64   DEE o arala O AN TR
O eman eimber EE
Ri    Tb V     VER:S807S8DT     ARRELEISbank vrsa BERE ANE A bip ER ı
Ş   y    il:     SARPA      KN: ****t*trkkay       AAA LAL VELA SARAN, 6
ş aş  :   Çi öğ  çt                          ***30098 Bl SUR ANN KE A DAN a * Kİ
SEL se               ES GÜN Re
A LKLAMA MAR           2.074.606 NE EE
DYAN     ANA RA      BU İŞLER TEMASSIZ BİR KART LE    Ya ON      ANL
ya BRAD SEREN       GERÇEKLEŞTİRİLMİŞTİR.      YERE
EAOM O AR Sİ SOR    ONAY KUMARASI:544122 REF NO: 602478070     KAM           a     i
SERER  ---0077702000060000n 084    ANLA       N
ANAM N         e             İŞLERİNİZ ŞİFRENİZ İLE DOĞRULANMIŞTIR.      AA
VEM       AR e
SAY          C
NU                 ar Garanti BBVA
Z                             HERSİS NO: 0879 0017 5660 0379
VUY .GARANTIBBUA.COK.TR
KART SAHİBİNE ALTTIR.
 Visa payave
EKÜ NO:0001           Z NO: 1101
 AMAR
', '2974.80', '2026-01-23T21:00:00.000Z', 'KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ', 30, 'pending', '2026-02-08T18:05:24.299Z', '2026-02-08T18:05:24.299Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('3fa86194-9de1-406f-b9c0-54511ad6a308', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770574051045-932107340.jpeg', 'NE SEL GAEL EM     TV 1 VE MBA TL      L a
Gü ANL Ç  Ala     4    il    Çe       A.                 ML A MLE EU
ALSA ALM   1      N                          i    i             TE MA
A    VA KLAN                                                        N          in     k    2
KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ
Ü Aİ ç    kk       HAYDAR ALİYEV CD.NO:48        vt CELİ
KASLUŞ      eeli    KİREÇBURNU/SARIYER/ İST                ALA A
SOLEUA        ALE      TEL : 0212 262 10 59        SERİ               Aç
UT UVEN      MU     SARIYER V.D. 5631402579     t              b.    iç
i   GI          İ                            J         4
SALMA      ÖĞ min: 24/01/2026         İ           SA tb
ÇANLUSLAN        İ SAAT     : 19:09:20          İ        Çi
Va                FİŞ NO    0123                                i     R
Vb Ban      AĞA       VEKEK        *10 *2.974,80  *    VULU     ı
LİN:       EĞ Topkov       *270,44 BR    GU
ORÇALUN            İ TOPLAM        *2.974,80 BER
ı                        KREDİ            *12,974,60 BR       i              hM
N    Aaa    k      i     İ    Akktiktitt**3008              *                i
5 GER    iç       İ Ekü No:0001       2 NO:1101 KA  gSK,        i
Yek             1: 2361236     T:037      İ   öze ş VİN
Me             :          :   64   DEE o arala O AN TR
O eman eimber EE
Ri    Tb V     VER:S807S8DT     ARRELEISbank vrsa BERE ANE A bip ER ı
Ş   y    il:     SARPA      KN: ****t*trkkay       AAA LAL VELA SARAN, 6
ş aş  :   Çi öğ  çt                          ***30098 Bl SUR ANN KE A DAN a * Kİ
SEL se               ES GÜN Re
A LKLAMA MAR           2.074.606 NE EE
DYAN     ANA RA      BU İŞLER TEMASSIZ BİR KART LE    Ya ON      ANL
ya BRAD SEREN       GERÇEKLEŞTİRİLMİŞTİR.      YERE
EAOM O AR Sİ SOR    ONAY KUMARASI:544122 REF NO: 602478070     KAM           a     i
SERER  ---0077702000060000n 084    ANLA       N
ANAM N         e             İŞLERİNİZ ŞİFRENİZ İLE DOĞRULANMIŞTIR.      AA
VEM       AR e
NU                 ar Garanti BBVA
Z                             HERSİS NO: 0879 0017 5660 0379
VUY .GARANTIBBUA.COK.TR
KART SAHİBİNE ALTTIR
Visa payave
EKÜ NO:0001           Z NO: 1101
AMAR', '2974.80', '2026-01-23T21:00:00.000Z', 'KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ', 30, 'pending', '2026-02-08T18:07:31.039Z', '2026-02-08T18:07:31.039Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('4f22f218-d669-4848-821f-1d2eb3b86987', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770574339806-584870519.jpeg', 'KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ

TARİH: 2026-01-24  SAAT: 19:09:20
FİŞ NO: 0123
--------------------------------
NE SEL GAEL EM     TV 1 VE MBA TL      L a
Gü ANL Ç  Ala     4    il    Çe       A.                 ML A MLE EU
ALSA ALM   1      N                          i    i             TE MA
A    VA KLAN                                                        N          in     k    2
KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ
...
--------------------------------
TOPLAM: 2974.80 TL
', '2974.80', '2026-01-23T21:00:00.000Z', 'KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ', 30, 'pending', '2026-02-08T18:12:19.801Z', '2026-02-08T18:12:19.801Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('82868120-a0e7-4e3f-9ce2-7b2f37ac3192', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770574652078-170185144.jpeg', '--- FİŞ / FATURA DETAYI ---

KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ

TARİH: 24/01/2026   SAAT: 19:09:20
FİŞ NO: 0123
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPLAM:                        2974.80 TL

ÖDEME: Kredi Kartı
', '2974.80', '2026-01-23T21:00:00.000Z', 'KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ', 30, 'pending', '2026-02-08T18:17:32.070Z', '2026-02-08T18:17:32.070Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('516bea04-a5f8-4e78-a7a1-268de7f83423', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770574889354-515119248.jpeg', '--- FİŞ / FATURA DETAYI ---

KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ

TARİH: 24.01.2026   SAAT: 19:09:20
FİŞ NO: 0123
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPLAM:                        2974.80 TL

ÖDEME: Kredi Kartı
', '2974.80', '2026-01-23T21:00:00.000Z', 'KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ', 30, 'pending', '2026-02-08T18:21:29.348Z', '2026-02-08T18:21:29.348Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('009e6586-168a-4a0a-936e-04335321804c', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770574958611-704537355.jpeg', '--- FİŞ / FATURA DETAYI ---

KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ

TARİH: 24.01.2026   SAAT: 19:09:20
FİŞ NO: 0123
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPLAM:                        2974.80 TL

ÖDEME: Kredi Kartı
', '2974.80', '2026-01-23T21:00:00.000Z', 'KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ', 30, 'pending', '2026-02-08T18:22:38.608Z', '2026-02-08T18:22:38.608Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('df25161c-674d-45f4-b6d0-409739a39569', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770575888513-530893465.jpeg', '--- FİŞ / FATURA DETAYI ---

KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ

TARİH: 24.01.2026   SAAT: 19:09:20
FİŞ NO: 0123
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPLAM:                        2974.80 TL

ÖDEME: Kredi Kartı
', '2974.80', '2026-01-23T21:00:00.000Z', 'KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ', 30, 'pending', '2026-02-08T18:38:08.508Z', '2026-02-08T18:38:08.508Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('63071fe7-b727-41e2-9c68-35753366ba8a', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\expense\market\image-1770575966196-788053845.jpeg', '--- FİŞ / FATURA DETAYI ---

KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ

TARİH: 24.01.2026   SAAT: 19:09:20
FİŞ NO: 0123
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPLAM:                        2974.80 TL

ÖDEME: Kredi Kartı
', '2974.80', '2026-01-23T21:00:00.000Z', 'KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ', 30, 'confirmed', '2026-02-08T18:39:26.189Z', '2026-02-08T18:39:26.189Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('504e4ff5-e7ba-4e51-b577-bba99208d8fd', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\expense\market\image-1770576031971-362105211.jpeg', '--- FİŞ / FATURA DETAYI ---

KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ

TARİH: 24.01.2026   SAAT: 19:09:20
FİŞ NO: 0123
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPLAM:                        2974.80 TL

ÖDEME: Kredi Kartı
', '2974.80', '2026-01-23T21:00:00.000Z', 'KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ', 30, 'confirmed', '2026-02-08T18:40:31.970Z', '2026-02-08T18:40:31.970Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('71209356-abbb-4edf-b8ce-97aa5e0a29eb', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\expense\market\image-1770576066735-770270770.jpeg', '--- FİŞ / FATURA DETAYI ---

KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ

TARİH: 24.01.2026   SAAT: 19:09:20
FİŞ NO: 0123
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPLAM:                        2974.80 TL

ÖDEME: Kredi Kartı
', '2974.80', '2026-01-23T21:00:00.000Z', 'KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ', 30, 'confirmed', '2026-02-08T18:41:06.734Z', '2026-02-08T18:41:06.734Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('7339837d-a104-4612-a542-43843304980f', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770576354648-785730973.jpeg', '--- FİŞ / FATURA DETAYI ---

KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ

TARİH: 24.01.2026   SAAT: 19:09:20
FİŞ NO: 0123
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPLAM:                        2974.80 TL

ÖDEME: Kredi Kartı
', '2974.80', '2026-01-23T21:00:00.000Z', 'KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ', 30, 'pending', '2026-02-08T18:45:54.647Z', '2026-02-08T18:45:54.647Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('b33ba4b0-d358-4d34-9d79-f298261a8b8b', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770576368940-79539450.jpeg', '--- FİŞ / FATURA DETAYI ---

KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ

TARİH: 24.01.2026   SAAT: 19:09:20
FİŞ NO: 0123
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPLAM:                        2974.80 TL

ÖDEME: Kredi Kartı
', '2974.80', '2026-01-23T21:00:00.000Z', 'KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ', 30, 'pending', '2026-02-08T18:46:08.938Z', '2026-02-08T18:46:08.938Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('4ecdf9fd-24be-49f0-8c06-a1e21fd738aa', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770576503705-744571459.jpeg', '--- FİŞ / FATURA DETAYI ---

KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ

TARİH: 24.01.2026   SAAT: 19:09:20
FİŞ NO: 0123
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPLAM:                        2974.80 TL

ÖDEME: Kredi Kartı
', '2974.80', '2026-01-23T21:00:00.000Z', 'KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ', 30, 'pending', '2026-02-08T18:48:23.699Z', '2026-02-08T18:48:23.699Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('8fa26b7d-13c4-414e-9adf-ec0a14120b0e', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770576662231-674778436.jpeg', '--- FİŞ / FATURA DETAYI ---

KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ

TARİH: 24.01.2026   SAAT: 19:09:20
FİŞ NO: 0123
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPLAM:                        2974.80 TL

ÖDEME: Kredi Kartı
', '2974.80', '2026-01-23T21:00:00.000Z', 'KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ', 30, 'pending', '2026-02-08T18:51:02.223Z', '2026-02-08T18:51:02.223Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('f1cb73b2-4ee7-44b9-bb02-6f1a69883771', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\expense\market\image-1770576809410-813127185.jpeg', '--- FİŞ / FATURA DETAYI ---

KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ

TARİH: 24.01.2026   SAAT: 19:09:20
FİŞ NO: 0123
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPKDV:                         270.44 TL
TOPLAM:                        2974.80 TL

ÖDEME: Kredi Kartı
', '2974.80', '2026-01-23T21:00:00.000Z', 'KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ', 30, 'confirmed', '2026-02-08T18:53:29.404Z', '2026-02-08T18:53:29.404Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('ceed1f68-15ab-49a2-9208-092b7893f20c', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\expense\market\image-1770620483610-833290274.jpeg', '--- FİŞ / FATURA DETAYI ---

KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ

TARİH: 24.01.2026   SAAT: 19:09:20
FİŞ NO: 0123
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPKDV:                         270.44 TL
TOPLAM:                        2974.80 TL

ÖDEME: Kredi Kartı
', '2974.80', '2026-01-23T21:00:00.000Z', 'KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ', 30, 'confirmed', '2026-02-09T07:01:23.607Z', '2026-02-09T07:01:23.607Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('65f051c7-671c-4f41-85b7-d10fb8398379', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770640133118-928097212.jpg', '--- FİŞ / FATURA DETAYI ---

BİLİNMEYEN İŞLETME

TARİH: 09.02.2026   SAAT: 15:07
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPKDV:                           6.00 TL
TOPLAM:                           0.00 TL

', '0.00', '2026-02-08T21:00:00.000Z', NULL, 26, 'pending', '2026-02-09T12:28:53.111Z', '2026-02-09T12:28:53.111Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('52ad2264-c912-4f1b-a571-a5d250fca29c', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770640171060-242911020.jpg', '--- FİŞ / FATURA DETAYI ---

BİLİNMEYEN İŞLETME

TARİH: 09.02.2026   SAAT: 15:07
FİŞ NO: 8344751
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPLAM:                           0.00 TL

', '0.00', '2026-02-08T21:00:00.000Z', NULL, 29, 'pending', '2026-02-09T12:29:31.058Z', '2026-02-09T12:29:31.058Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('7b8a7812-572a-428e-9c69-103909dfaaae', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770668371516-751201579.jpeg', '--- FİŞ / FATURA DETAYI ---

KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ

TARİH: 24.01.2026   SAAT: 19:09:20
FİŞ NO: 0123
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPKDV:                         270.44 TL
TOPLAM:                        2974.80 TL

ÖDEME: Kredi Kartı
', '2974.80', '2026-01-23T21:00:00.000Z', 'KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ', 30, 'pending', '2026-02-09T20:19:31.513Z', '2026-02-09T20:19:31.513Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('d7ee3a93-c637-4494-8573-0558d9e96519', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770670295746-247274352.jpeg', '--- FİŞ / FATURA DETAYI ---

BİLİNMEYEN İŞLETME

TARİH: ---   SAAT: 15:07
FİŞ NO: 6041067
-------------------------------------------
.02. 202  15:07 B:1807             9.02
S1. 470.83                       470.83
67.50       s                     67.50
-------------------------------------------
TOPKDV:                           1.00 TL
TOPLAM:                         547.35 TL

', '547.35', NULL, NULL, 36, 'pending', '2026-02-09T20:51:35.741Z', '2026-02-09T20:51:35.741Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('02a3f3be-234e-4649-9618-dc3a0797f557', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770670964638-268914844.jpeg', '--- FİŞ / FATURA DETAYI ---

BİLİNMEYEN İŞLETME

TARİH: ---   SAAT: --:--
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPLAM:                           0.00 TL

', '0.00', NULL, NULL, 28, 'pending', '2026-02-09T21:02:44.628Z', '2026-02-09T21:02:44.628Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('2f7bc12d-b4c8-44d2-8bd2-58e5d7de8502', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770671082375-827461800.jpeg', '--- FİŞ / FATURA DETAYI ---

BİLİNMEYEN İŞLETME

TARİH: ---   SAAT: --:--
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPLAM:                           0.00 TL

', '0.00', NULL, NULL, 28, 'pending', '2026-02-09T21:04:42.374Z', '2026-02-09T21:04:42.374Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('40cbc1b1-53f2-4363-a039-0515687c2239', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770671239341-121317825.jpeg', '--- FİŞ / FATURA DETAYI ---

BİLİNMEYEN İŞLETME
G,  ş YA NI / Bir

TARİH: ---   SAAT: --:--
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPLAM:                           0.00 TL

', '0.00', NULL, NULL, 28, 'pending', '2026-02-09T21:07:19.339Z', '2026-02-09T21:07:19.339Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('c652b531-3f5e-4cd7-9244-d3285d8d7e9c', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770671255406-121010092.jpeg', '--- FİŞ / FATURA DETAYI ---

BİLİNMEYEN İŞLETME
G,  ş YA NI / Bir

TARİH: ---   SAAT: --:--
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPLAM:                           0.00 TL

', '0.00', NULL, NULL, 28, 'pending', '2026-02-09T21:07:35.407Z', '2026-02-09T21:07:35.407Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('90fc407c-f4fb-4532-87f5-437a14d768d6', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770671386822-299137703.jpeg', '--- FİŞ / FATURA DETAYI ---

BİLİNMEYEN İŞLETME

TARİH: ---   SAAT: --:--
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPKDV:                           6.00 TL
TOPLAM:                           0.00 TL



--- RAW TESSERACT OUTPUT ---
ği                vd    NY 440
/ İŞL DA   /     HAR
ç     4 YAN   S   4/4
R            4   İŞ   Üç   A      5  ç               N
4    a     7 IR   -   ÇA      j              :
-        JA ARZ
4         a        NDE           MAN  AY
gi    Tı NE     Z    ğ Ne ,
Ağ          ş         N                       e
me Ü 4 GA K                       ğj     Ki   Çi & a a
      CAS e                             J , ,   Kk   N Ce . NAR
VA Va  * &                  Z      j N &     J vi
e ÖL AY     o  5. b5
,             i      ğ   eşiktaş  ISTANBUL           &      4        4
ya o  ,             ÖNEN UD TS      y7    b
:   Se                            BR    :
       ETTNda103      y   cs9-a54  E.
                       af                      İn                   p
:       o     TOLU      FE         a
b           BAU yorgi D            /     BE uş
c      :                   tez     b
ZARİ     İN
        İ                 :        :
NE      ki
V        a      ü
öç           Tl
a            da ava      :
LA            ALIŞVERİ  Beeti BIM                        y
Ş              TOPLA21   MDani Tutar                      VA
OJ                   GARANTİ. BANKASI                      J
4   AM    ER        /
ER ça      a0
KDV MATRAH    KO RTTAR 6
DV DAHİL
Kİ   470       n
475 54
20  67.5      :
*81.00
ARİ DZ
', '0.00', NULL, NULL, 30, 'pending', '2026-02-09T21:09:46.813Z', '2026-02-09T21:09:46.813Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('8bc19788-6dcf-405d-bc86-98b30e4d1677', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770671482418-409771090.jpeg', '--- FİŞ / FATURA DETAYI ---

BİLİNMEYEN İŞLETME
G,  ş YA NI / Bir

TARİH: ---   SAAT: --:--
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPLAM:                           0.00 TL



--- RAW TESSERACT OUTPUT ---
4              Hf FARM, p SK             HAR
:            H   4  *   4   S9  VA   De ,               FAN,
/ OLARA AU
A                 4   O                     iğ k
AA f       mEĞ e      A       YÜ     &
*-   GL                          ğ      Ki   yi & 5
y*     SS  ay                            J y/   e . N SAR
z   DA /                     Y     VA     DD
         G,  ş YA NI / Bir
/  0             Yas DM İTS      y7 z   -
o */ EE  3
      o    TOLU    EE       BE.
DA  :    ART    KR    b   AM
ZAR     İN
4        i                 :        n
yl
öz         le: İl
:    Cf             5
C            Aa Clan      i
Ş              TOPLA 21   Ohani Tutar                      4
Ş          SBBL körü 0             /
BR çe aR Roto: 6080
KON MATRAH    Köy TUtAR ik
DV DAHİL                 V
ki   470       N
K475,54
20 67.5      1
*81.00
yaya
ÜLA RE
ARD
', '0.00', NULL, NULL, 28, 'pending', '2026-02-09T21:11:22.411Z', '2026-02-09T21:11:22.411Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('f8ed173a-b5cb-47a0-bac7-125343872b70', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770671583259-672038510.jpeg', '--- FİŞ / FATURA DETAYI ---

BİLİNMEYEN İŞLETME

TARİH: ---   SAAT: 15:07
FİŞ NO: 834751
-------------------------------------------
S1. 470.83                       470.83
-------------------------------------------
TOPKDV:                         556.54 TL
TOPLAM:                         470.83 TL



--- RAW TESSERACT OUTPUT ---
ğ     YE      *-
ği                     y      EE MM
4      NA      N  dd                    vi        NR
ASH ARIN    j
:            A VA    liği      Ğ   İç 3  v         /
ği      Rim 8            NA       4                   z         ş
Öd           v    4      8    /
g           VR                /
g   Ç     MA   *          Ür    Z TAR  v
iğ       a                          a           ,
4                                Dp              J          :
4                             o               /
/                               2         vy             Hn
:     Ğ        EĞ Je           Mp     a        e                     Ü
yp   GA ç                                 9        &      ç      KS
:    :     PA                                   ç   e  Le         o
3  e jp  NE                      BE Çi  ir
SÜ an                 arsiv Fatura              AZ
Re  -          VA
,      a5     IM AğRLESİK MAGACIN           /     ev
e YANA    N    kk   4
A    Dikilita: Mah Yenic an Sok EE
n  ç VA   .         No:16-18 O aç  İSTANBU         E      vi      şe
i                      / Mükel1aflE jpm 17SUU      Be         k
a                                 t    Kk MUKE   Til                       Va     z           R
NE         HU        184
Nr        ,   FATURA NO: AET 0260006846607                ğü          a
GN,.                                  a DR       3
N      KK J       ETİNAa103cAE    15e3-9659-0    y     Be            ği
a                    TL           FA
a                     TL          7              ğ
& a           41410010902608660202       KAZ    SAR
TOKN/VKN: 28528594288            Ğ     se Ö Suzi
b     m                    A                        y                  Na
a         3  Vi  i Dai  i                              N
o A
A   e       Beşikta    tstanbul
2 *        Nİ
İTHAL Mİ             1
N       a          206
V          N
R             158
Kk   5   &             CALİ
              en AMPUL POERKY o *Z20
C                  KI L AK ÇUBUĞU 200LÜ   2l
BUĞDAYIN SKGEFSANE g1                      r
* 120.00
Belg nis 09
p               j    mtg POŞETİ pim *20                            y
4        VAZ             ALIŞVERİŞ POŞET                               ,
 DA                   TOPLAM KDV                                             yp
Pa                  Gğuna ek KDV panil Tutar
yg                      556.54         k
ve                       Banka Kr di Karti
B                       GARANTİ. BANKASI
1:278269 T:/ 17813906 S1684dÜKAAA
Ka1393     ı
09.02. 202  15:07 B:1807   3654
lay No:834751    ü        i
A DMM    Ref .No:6040E
KOV MATRAH     KDV TUTAR
DV DAHİLİ.                  K
S1. 470.83     Kayn
475 ,54
20 67.50         19.50
*81.00             ç
İOTra    ESAD
TİR NİLARİ
TR.
', '470.83', NULL, NULL, 35, 'pending', '2026-02-09T21:13:03.249Z', '2026-02-09T21:13:03.249Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('e07eaf8c-3888-4ee1-89fb-d3d89374bd59', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770671717494-227988360.jpeg', '--- FİŞ / FATURA DETAYI ---

BİLİNMEYEN İŞLETME

TARİH: ---   SAAT: 15:07
FİŞ NO: 834751
-------------------------------------------
S1. 470.83                       470.83
-------------------------------------------
TOPKDV:                         556.54 TL
TOPLAM:                         470.83 TL



--- RAW TESSERACT OUTPUT ---
ğ     YE      *-
ği                     y      EE MM
4      NA      N  dd                    vi        NR
ASH ARIN    j
:            A VA    liği      Ğ   İç 3  v         /
ği      Rim 8            NA       4                   z         ş
Öd           v    4      8    /
g           VR                /
g   Ç     MA   *          Ür    Z TAR  v
iğ       a                          a           ,
4                                Dp              J          :
4                             o               /
/                               2         vy             Hn
:     Ğ        EĞ Je           Mp     a        e                     Ü
yp   GA ç                                 9        &      ç      KS
:    :     PA                                   ç   e  Le         o
3  e jp  NE                      BE Çi  ir
SÜ an                 arsiv Fatura              AZ
Re  -          VA
,      a5     IM AğRLESİK MAGACIN           /     ev
e YANA    N    kk   4
A    Dikilita: Mah Yenic an Sok EE
n  ç VA   .         No:16-18 O aç  İSTANBU         E      vi      şe
i                      / Mükel1aflE jpm 17SUU      Be         k
a                                 t    Kk MUKE   Til                       Va     z           R
NE         HU        184
Nr        ,   FATURA NO: AET 0260006846607                ğü          a
GN,.                                  a DR       3
N      KK J       ETİNAa103cAE    15e3-9659-0    y     Be            ği
a                    TL           FA
a                     TL          7              ğ
& a           41410010902608660202       KAZ    SAR
TOKN/VKN: 28528594288            Ğ     se Ö Suzi
b     m                    A                        y                  Na
a         3  Vi  i Dai  i                              N
o A
A   e       Beşikta    tstanbul
2 *        Nİ
İTHAL Mİ             1
N       a          206
V          N
R             158
Kk   5   &             CALİ
              en AMPUL POERKY o *Z20
C                  KI L AK ÇUBUĞU 200LÜ   2l
BUĞDAYIN SKGEFSANE g1                      r
* 120.00
Belg nis 09
p               j    mtg POŞETİ pim *20                            y
4        VAZ             ALIŞVERİŞ POŞET                               ,
 DA                   TOPLAM KDV                                             yp
Pa                  Gğuna ek KDV panil Tutar
yg                      556.54         k
ve                       Banka Kr di Karti
B                       GARANTİ. BANKASI
1:278269 T:/ 17813906 S1684dÜKAAA
Ka1393     ı
09.02. 202  15:07 B:1807   3654
lay No:834751    ü        i
A DMM    Ref .No:6040E
KOV MATRAH     KDV TUTAR
DV DAHİLİ.                  K
S1. 470.83     Kayn
475 ,54
20 67.50         19.50
*81.00             ç
İOTra    ESAD
TİR NİLARİ
TR.
', '470.83', NULL, NULL, 35, 'pending', '2026-02-09T21:15:17.492Z', '2026-02-09T21:15:17.492Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('9736c9c9-fd67-41c2-b235-06e7230592a4', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\expense\market\image-1770672117602-219561210.jpeg', '--- FİŞ / FATURA DETAYI ---

ASH ARIN    j

TARİH: ---   SAAT: 15:07
-------------------------------------------
. 202  15:07 B:1807   365          9.02
S1.      Kayn                    470.83
20 67.50                          19.50
-------------------------------------------
TOPLAM:                         556.54 TL



--- RAW TESSERACT OUTPUT ---
ğ     YE      *-
ği                     y      EE MM
4      NA      N  dd                    vi        NR
ASH ARIN    j
:            A VA    liği      Ğ   İç 3  v         /
ği      Rim 8            NA       4                   z         ş
Öd           v    4      8    /
g           VR                /
g   Ç     MA   *          Ür    Z TAR  v
iğ       a                          a           ,
4                                Dp              J          :
4                             o               /
/                               2         vy             Hn
:     Ğ        EĞ Je           Mp     a        e                     Ü
yp   GA ç                                 9        &      ç      KS
:    :     PA                                   ç   e  Le         o
3  e jp  NE                      BE Çi  ir
SÜ an                 arsiv Fatura              AZ
Re  -          VA
,      a5     IM AğRLESİK MAGACIN           /     ev
e YANA    N    kk   4
A    Dikilita: Mah Yenic an Sok EE
n  ç VA   .         No:16-18 O aç  İSTANBU         E      vi      şe
i                      / Mükel1aflE jpm 17SUU      Be         k
a                                 t    Kk MUKE   Til                       Va     z           R
NE         HU        184
Nr        ,   FATURA NO: AET 0260006846607                ğü          a
GN,.                                  a DR       3
N      KK J       ETİNAa103cAE    15e3-9659-0    y     Be            ği
a                    TL           FA
a                     TL          7              ğ
& a           41410010902608660202       KAZ    SAR
TOKN/VKN: 28528594288            Ğ     se Ö Suzi
b     m                    A                        y                  Na
a         3  Vi  i Dai  i                              N
o A
A   e       Beşikta    tstanbul
2 *        Nİ
İTHAL Mİ             1
N       a          206
V          N
R             158
Kk   5   &             CALİ
              en AMPUL POERKY o *Z20
C                  KI L AK ÇUBUĞU 200LÜ   2l
BUĞDAYIN SKGEFSANE g1                      r
* 120.00
Belg nis 09
p               j    mtg POŞETİ pim *20                            y
4        VAZ             ALIŞVERİŞ POŞET                               ,
 DA                   TOPLAM KDV                                             yp
Pa                  Gğuna ek KDV panil Tutar
yg                      556.54         k
ve                       Banka Kr di Karti
B                       GARANTİ. BANKASI
1:278269 T:/ 17813906 S1684dÜKAAA
Ka1393     ı
09.02. 202  15:07 B:1807   3654
lay No:834751    ü        i
A DMM    Ref .No:6040E
KOV MATRAH     KDV TUTAR
DV DAHİLİ.                  K
S1. 470.83     Kayn
475 ,54
20 67.50         19.50
*81.00             ç
İOTra    ESAD
TİR NİLARİ
TR.
', '556.54', NULL, 'ASH ARIN    j', 35, 'confirmed', '2026-02-09T21:21:57.595Z', '2026-02-09T21:21:57.595Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('22cff8e2-94aa-494d-be98-dc188d6b879b', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770672281911-545192191.jpeg', '--- FİŞ / FATURA DETAYI ---

Gü NON bi  MN  *   VALA Vb    Çer ULA      EL            ME A MLE EE

TARİH: 2026-01-24   SAAT: 19:09:20
-------------------------------------------
KN      Ak        yek     %2    2974.80
SLİM        OL Topkov     %27    270.44
-------------------------------------------
TOPLAM:                        2974.80 TL

ÖDEME: Kredi Kartı


--- RAW TESSERACT OUTPUT ---
E    VELA   4.    iü      OO LO LU   sc EL       LL
Gü NON bi  MN  *   VALA Vb    Çer ULA      EL            ME A MLE EE
Ab LAL     A   :         İ         ÇUSKA
EVER VE         azam 5 MER      ı           KA Mara
N  ÜGA, N                       b                tt NER
A   VA İMLA      it      İ                                Vİ       i    e KU       ç
AN, N       b       İ                          ÇE         5           TAİ
AĞLA          :                       i     CAVA
DAL SU ÇA   KİREÇBURNU FIRIN GIDA                   Ğİ
İLLA AGİ     SALI         LTD.ŞTİ.                   Ü         ü
Ç AU İ    :    A      HAYDAR ALİYEV CD.NO:48       N       t CER
KAĞLUŞ    Me LULU    KİREÇBURNU/SARIYER/ İST              ve
AALRNAN        AM      TEL : 0212 262 10 59            ,               Üç
UT ULEN      A     SARIYER V.D. 5631402579     i              b.    t
Vb LU         İ                           İ        E
SUN NU      BL    1: 24/01/2026         İ           e EREL
YAYLUILA N        İ SAAT     1: 19:09:20        Ğİ
   GU                FİŞ NO    10123                                i     R
KN      Ak        yek         K10 *2.974,80  iL ela YAY LG
SLİM *       OL Topkov       *270,44 BARBER    Gü :
ARÇLUN           İ TOPLAM       *2.974,s80 MER          ÖK
ı                      KREDİ           *2,974,80       y             bi
i                   Ü GARANTİ BBVA                   SÜRE      A     İ
N    AS    *      ğ     İ    Hkktiktitt**3008              Ki                İ
i    Ve                               ş      İ   N     4   ç
e      İ  T.SİCİL NO: O            i    CEN    VEE
Çi       ş yi     ,   b          İ      E                            İ bi  Şİ Ni     İ     beli   Ni    i
5 Rİ     iş        İ EkÜ NO:0001        Z NO:1101 KA   MAL AŞ         ş
KUR a Nak          I: 2361236    1:037648s0 AA RAN Ak
Si  YAY   dl,      AlotAoaa0000a3 1010 APP vak saman ve KEN  SA Nİ t
N        att               LABEL:       ve   NONE KARİ
RAL    A RUKAK      VER:SB0TSBDT         İSBANK VİSA RENE   AŞ  FLAN A 1 a
pr          t               PARK RH KR   ş       SAN Tok Vine      KÜN   1
N  i     ili  - Çi kğ      K.M      ******33008 BB SM Nİ KO TAN Se  Ci
VAN    OMÜ A LER                            AN  MA A LANAN LALA
A     Üy      KLAS   EKV SATIŞ TUTARI               KALALIM  Öğ   İİ  SA U
bh MİR O NN           2.9       SAĞIN ER 6
ML CAN ÖÇ                     .-974,80 TL1 ME    VE
İMAN    NE NE DANLA     BU İŞLER TEMASSIZ BİR KART İLE    NK RANAN VAN     CR KR
VA  SAN A       GERÇEKLEŞTİRİLMİŞTİR..       SANAN
SAN  No SA a Sü   ONAY KUMARASI :544122 REF NO: 6024786070084 RR NU it          a     i
FAVA ÜL              NE                    İŞLERİNİZ ŞİFRENİZ 1LE DOĞRULAMISTR DE
 AM AĞ A        AAA     FR.    N
BÜLA                            Bi
NÜA         C
SU                      ae Garanti BBVA
ğ                              HERSİS NO: 0879 0017 5660 0379
VYUY .GARANTIBBUR.COH. TR
KART SAHİBİNE ALTTIR.
 Visa payave
EKÜ NO:0001           7 No:101
l    İLE VF 26 51374 Ae  ,
', '2974.80', '2026-01-23T21:00:00.000Z', 'Gü NON bi  MN  *   VALA Vb    Çer ULA      EL            ME A MLE EE', 32, 'pending', '2026-02-09T21:24:41.909Z', '2026-02-09T21:24:41.909Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('e2cce54a-f46a-4dd6-a9d2-93216ce9347e', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770823823071-758140408.jpg', '--- FİŞ / FATURA DETAYI ---

Tmamamamaz

TARİH: 2026-02-03   SAAT: 14:32
-------------------------------------------
1141, Ml .2026 14:33 B:17          3.02
-------------------------------------------
TOPLAM:                         460.40 TL

ÖDEME: Kredi Kartı


--- RAW TESSERACT OUTPUT ---
Tmamamamaz
 E-Arsiv Fatura                              A      E
BR       yor v,  Ke    ,                 p                              şa AYET   çi zim   a  l
e           BİM BİRLESTK MAGAZALAR A:            var NEEİN AMÜPZ        elli
İ Dikilitaf Mah. Yefiidosan Sok.          j BATAR
No: 10-10                                             iğ                :
:                                                               Befiktaf / YSTANBUL                                                          j
j         Büvük Mi ike veftler VÜM 1 7500                                             r    :      z
V 51846                                              ş
V EATURA NÖO:AE02026000570653                              Z     Z
     VERE               ,                                                                          vü
                                          İ                                          ş                                                  :
9                               İ   03.0242020   14:32                    Sira
İ    NO De                          Tl                                             :
ETTNb2e0ddıdb  A4d7b-deD2-aede-vöd                                               Z     Zİ      ı       :
-               İ      ş  DREN  Dd   MU  /                                KE ÇE -
İ          İ     İ                     l    l                                                      ,         -
ODVDDDRDANDANLD NIN           BELLE
A*    a   Pa  bi /t  e    ÖM                                     Ğ     iz   Z      :
           41410010302608540182                                               AE
TOKN/VKN: 23528594288                       v goz
İ         ş            SOTYIM AR    bi   . mn                                              z         Ür   e ÇEP  SE A E ZE
5     İstm/ Unvan:  SEVCAN  GÜRLER                                               iŞ           e e te
Dalı    İ                            VA         ef      ÖÇ DE EM Aa e
J Vergi Dairesi                                  Beam mma Ze
Adres: BESİKTAS
A    Befiktaf / ystanbul
TOj                     e AN                                                                 ENAZ AŞINI İRİ T A SE      a     Kama          -
Fi ağı VD UL                                               Hİ YZ Vr LERE er EL  vr FER
                                                                    YANE TAAN A ER İY GE EE
ÜĞE e TT İl-1DOST               Yı                                    KATE A Ür a ir te
Çi    SI Biz  ÜL ke                    f0 ll                                           id  PA ei KARİM EE DEE e a
Shp Ç*184.00                                                           ve İMİer, lere DE ETE EE
sahi   PS a A EA SDO TN                                                   KARL Ü A AR Aİ EE RE SEE
4  aÜü A  09 00                                         dei PTT Bae BEAR kr SÜ DEAR e
a                                                                  Vi VUK na ÇO EEE A
* Eri ee ati       Bc      EE EE RET
GAR            a      SA     RoaRORO Yİ                                        SPAM SD. AE FT e ROL çta
S4 YUMURTASGÜ EU öğr oLan                                 Tale e ERE GE EE ER
i  j  İN  RA  ç                                               Pişik yz e ER A A ve RE EE
SEL       *198.0U                        :                                        Dae PERE ÜL ELE TES
Sd            Ba  TATAR                     in PT    ver e skini se. TM öç Tr ee EE e
*j    HAMUR KAB. TÜZÜLÜK 106 Ri.                        e  E f ği ERER SE Dam Z Ar
Fa f   j         EB   ala                                                  ir   öz, Aa Rİ    4   KE YE GA ve m  a ER ez Es
ÇA KA Toe bARINE edu                                OE
KAKAC İ0Ü0li  DAPHNE       Rİ.                                      Eş ÖKE gt YK Si Sar TE Sa
AAAAL   BAŞ                                           :    AE Er air em Ra e
İp a AĞ  SÜ                                                             :   Ze  ş ee ci ŞE GÜRE Za ze -
437      MERİÇ    Mİ     Nİ05G 5                           de    OE RE EE EE e rr EK m
343 NEKERLY VANYLYNİOKSG Gİ.                    art ba yy & Siyer 3 Rt
/DA            ear GEN                                                               Ke KAR Yi RR Rar ME ESET RE aş ar
Di.      ALM DO                              KE os e a
DV O Zad İL                                            SART AAA GM çe BELES ars
L     4 e                                                            ERİM ÇE Yİ Katla İğ   ee  DS ES ERER     ç
İ                                                                        teri  VERİ . ğa Şo sa kı es 5
ğ                        man rr    vE    0m                           HAR DiTAE SİLE GE ck sy m EM
*138İl ALIMVYERYAL PONETY BİM kel                      ORA RU      ü BU as Sel 3S
DAN     ALA be                                     Gb 4 Ea SR
K20         2,00                                         TURAL LLL ÖN Lek GS EEE EE
*48     TOPLAM KDV                                      :     Re RS
ş      SE NE ee CU R ES R  Nak   Si Böy Sa erer   una     ae
YA SIMETUĞOR      tar                     TE ÖNE SR ERKAM SS Eni Ef SE Aka ER
Ödenecek KDV Dahil Tutal                 ADR
Re SEA                                 i         ş      ER EE TT
KAB7. CU               yaş                                                      SORA RR
Banka Kredi Karti 1                                                                              -
KAD 7 00                                                                   :
çiy   e   ii  a                                                         4
GARANTI BANKASI
ss AA VT DAGİ N    EF  6BAÜK *
POS  1       J  2 ob 4 OA SDÜ  S7  10 16    vE he
9560414     KK 139 İ      ,               n     104 *    YE OR        kü ii EL ETÜ         *         ie
1141, Ml 03.02.2026 14:33 B:1794 5:259      al LT ET A ETER
N          Cl                                                      TS ARE RAMA RT
ike                                          N34dD                                 SARAN BRA SARMA SE
Onay No: OSOBEU a yaRR TANA BUJADA                              HA ASAR
:       S1b0ÜZ1                            ,     ,                  İAAA aş ASA NA See    Mi Sa     ş şa
KDV   MATRAH      KDV TUTAR   K            SEN   SSU     AŞARAK
DV DAHLI                          Kan         A   ş     Sa
YAN    460.40        * 4 60                      a          :
KAB, DO                                ka   ARR   A
BELİ      1 .6/                    KÜ Vu                                                          ş         mü                  s
ULU                                                              :   iş    KAR  :  AS       &    a
YAS A rak BE
KALA    MEN  Yağa rise                                                              ş
Tb TESLA KUPA MRT yıSr                                                                             NAR          ki     e
b TAR ARAYAN DM                     AN
    ÜL NN NN
:               GE Yale ber AŞA LYA
ARREST ADN
                      Üy ie Yen DE
:              Ay TALU Ha Dre Si                                  :
.         kumla ra TK
ED POS  i    4386 İ    KKKA ÇK
i DOODAYALI       ş
Ddld1, DARPHANE / BEPYKTAP       G                     :              A          :
PERTEMTEN TC Y BRAD 56 ARABA                                        ERLER         :
/
', '460.40', '2026-02-02T21:00:00.000Z', 'Tmamamamaz', 26, 'pending', '2026-02-11T15:30:23.070Z', '2026-02-11T15:30:23.070Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('d447177e-a8fc-413e-abe5-c735cc1cfd55', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770837386785-859581648.jpeg', '--- FİŞ / FATURA DETAYI ---

ASH ARIN    j

TARİH: ---   SAAT: 15:07
-------------------------------------------
. 202  15:07 B:1807   365          9.02
S1.      Kayn                    470.83
20 67.50                          19.50
-------------------------------------------
TOPLAM:                         556.54 TL



--- RAW TESSERACT OUTPUT ---
ğ     YE      *-
ği                     y      EE MM
4      NA      N  dd                    vi        NR
ASH ARIN    j
:            A VA    liği      Ğ   İç 3  v         /
ği      Rim 8            NA       4                   z         ş
Öd           v    4      8    /
g           VR                /
g   Ç     MA   *          Ür    Z TAR  v
iğ       a                          a           ,
4                                Dp              J          :
4                             o               /
/                               2         vy             Hn
:     Ğ        EĞ Je           Mp     a        e                     Ü
yp   GA ç                                 9        &      ç      KS
:    :     PA                                   ç   e  Le         o
3  e jp  NE                      BE Çi  ir
SÜ an                 arsiv Fatura              AZ
Re  -          VA
,      a5     IM AğRLESİK MAGACIN           /     ev
e YANA    N    kk   4
A    Dikilita: Mah Yenic an Sok EE
n  ç VA   .         No:16-18 O aç  İSTANBU         E      vi      şe
i                      / Mükel1aflE jpm 17SUU      Be         k
a                                 t    Kk MUKE   Til                       Va     z           R
NE         HU        184
Nr        ,   FATURA NO: AET 0260006846607                ğü          a
GN,.                                  a DR       3
N      KK J       ETİNAa103cAE    15e3-9659-0    y     Be            ği
a                    TL           FA
a                     TL          7              ğ
& a           41410010902608660202       KAZ    SAR
TOKN/VKN: 28528594288            Ğ     se Ö Suzi
b     m                    A                        y                  Na
a         3  Vi  i Dai  i                              N
o A
A   e       Beşikta    tstanbul
2 *        Nİ
İTHAL Mİ             1
N       a          206
V          N
R             158
Kk   5   &             CALİ
              en AMPUL POERKY o *Z20
C                  KI L AK ÇUBUĞU 200LÜ   2l
BUĞDAYIN SKGEFSANE g1                      r
* 120.00
Belg nis 09
p               j    mtg POŞETİ pim *20                            y
4        VAZ             ALIŞVERİŞ POŞET                               ,
 DA                   TOPLAM KDV                                             yp
Pa                  Gğuna ek KDV panil Tutar
yg                      556.54         k
ve                       Banka Kr di Karti
B                       GARANTİ. BANKASI
1:278269 T:/ 17813906 S1684dÜKAAA
Ka1393     ı
09.02. 202  15:07 B:1807   3654
lay No:834751    ü        i
A DMM    Ref .No:6040E
KOV MATRAH     KDV TUTAR
DV DAHİLİ.                  K
S1. 470.83     Kayn
475 ,54
20 67.50         19.50
*81.00             ç
İOTra    ESAD
TİR NİLARİ
TR.
', '556.54', NULL, 'ASH ARIN    j', 35, 'pending', '2026-02-11T19:16:26.782Z', '2026-02-11T19:16:26.782Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('3834c5a6-11fe-450e-b453-52039940dfd2', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770837737698-671139354.jpeg', '--- FİŞ / FATURA DETAYI ---

ASH ARIN    j

TARİH: ---   SAAT: 15:07
-------------------------------------------
. 202  15:07 B:1807   365          9.02
S1.      Kayn                    470.83
20 67.50                          19.50
-------------------------------------------
TOPLAM:                         556.54 TL



--- RAW TESSERACT OUTPUT ---
ğ     YE      *-
ği                     y      EE MM
4      NA      N  dd                    vi        NR
ASH ARIN    j
:            A VA    liği      Ğ   İç 3  v         /
ği      Rim 8            NA       4                   z         ş
Öd           v    4      8    /
g           VR                /
g   Ç     MA   *          Ür    Z TAR  v
iğ       a                          a           ,
4                                Dp              J          :
4                             o               /
/                               2         vy             Hn
:     Ğ        EĞ Je           Mp     a        e                     Ü
yp   GA ç                                 9        &      ç      KS
:    :     PA                                   ç   e  Le         o
3  e jp  NE                      BE Çi  ir
SÜ an                 arsiv Fatura              AZ
Re  -          VA
,      a5     IM AğRLESİK MAGACIN           /     ev
e YANA    N    kk   4
A    Dikilita: Mah Yenic an Sok EE
n  ç VA   .         No:16-18 O aç  İSTANBU         E      vi      şe
i                      / Mükel1aflE jpm 17SUU      Be         k
a                                 t    Kk MUKE   Til                       Va     z           R
NE         HU        184
Nr        ,   FATURA NO: AET 0260006846607                ğü          a
GN,.                                  a DR       3
N      KK J       ETİNAa103cAE    15e3-9659-0    y     Be            ği
a                    TL           FA
a                     TL          7              ğ
& a           41410010902608660202       KAZ    SAR
TOKN/VKN: 28528594288            Ğ     se Ö Suzi
b     m                    A                        y                  Na
a         3  Vi  i Dai  i                              N
o A
A   e       Beşikta    tstanbul
2 *        Nİ
İTHAL Mİ             1
N       a          206
V          N
R             158
Kk   5   &             CALİ
              en AMPUL POERKY o *Z20
C                  KI L AK ÇUBUĞU 200LÜ   2l
BUĞDAYIN SKGEFSANE g1                      r
* 120.00
Belg nis 09
p               j    mtg POŞETİ pim *20                            y
4        VAZ             ALIŞVERİŞ POŞET                               ,
 DA                   TOPLAM KDV                                             yp
Pa                  Gğuna ek KDV panil Tutar
yg                      556.54         k
ve                       Banka Kr di Karti
B                       GARANTİ. BANKASI
1:278269 T:/ 17813906 S1684dÜKAAA
Ka1393     ı
09.02. 202  15:07 B:1807   3654
lay No:834751    ü        i
A DMM    Ref .No:6040E
KOV MATRAH     KDV TUTAR
DV DAHİLİ.                  K
S1. 470.83     Kayn
475 ,54
20 67.50         19.50
*81.00             ç
İOTra    ESAD
TİR NİLARİ
TR.
', '556.54', NULL, 'ASH ARIN    j', 35, 'pending', '2026-02-11T19:22:17.693Z', '2026-02-11T19:22:17.693Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('47187db1-b17a-4a19-94b1-cacf3ed897ca', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\image-1770838369015-797369634.jpeg', '--- FİŞ / FATURA DETAYI ---

GOL EUR ME AU LE ELA Kc

TARİH: 2024-02-11   SAAT: --:--
-------------------------------------------
1,000 AD FARILIA FECETE Z         74.95
Ü 6 ico m0 FTA TMLET KĞİD        219.90
e   1,000 AD BRES İKG FAS        175.90
2.246 KG  MNV.PATATES TAZ         38.07
KOV C420     :  TL      O         65.80
-------------------------------------------
TOPLAM:                         219.90 TL



--- RAW TESSERACT OUTPUT ---
GOL EUR ME AU LE ELA Kc
VUK VU A a A  LİN VRAY KR 0 GE Ke
AR   Ül A Ü Kli Vi Üç en  VU NU SAA   AS VU Nİ  YALE ENNI
ÜNL  İY Üç     il YAN Ül SAK İ  ONU VE e AU  SUNİ Nİ ÜN
OR LU BOS EYER KUL ÖNDERİ BARUN, SONA MAR DÜ VU KOKU
OL  GÜLE  KR RU   MAN LAL LA Vi AML AARAN   ANADAN OUR  AU
OL   MEL MEL Mİ İ SELE LAND be AR ARAN  KAMOLUL U  ÖN İN
UL  Vi   KÜ a  KAN KOLU A A  Ge SOLU  V0 V
VU AU İ  İ    L  Üz İba b J MN  S3 ÜN YAN ÖN MUM VA AU ENİ  Nİ
GM YAL YU  Lee Hass            RC   N
Np N      TT           a                         ANPA GR0SS MAĞAZACILIK A.S: / BEŞİKTAŞ FULA  N          A     İ
YÜ y       ger5        Ee      :        ÇETİRZN Şahe Diz Mah, Hakkı Yetön ÇAtrANUL Ü  ALM
VAN      ranpa g..77   iç     EN Kan Yöre za, baik 2100 60 8305 191 lola       N    V
   İ aa AAÇI Alışverişin Adr a ,       iy  TESe Ng RAE a MARES Apa Vin Canter   8 Mu,
BP    -                                   Ne:70/22 Başakşehir / İST. İkitelli V.DNo 070 107 4251            Vie MÜM
İ                                KAR OR EE          kt
  A    Fat. Tip  * Arsiv                 Bilgi Fişi                                   o       Ül
Ki        Fat. No 3 P102025000004269                                               A
YAL        Tar. : 11.02.2024                                                    KULL
MN       5a İN VR  i             11111111i1İ                                       TN
Ş 6 Çin: 60016-00010-155-0134        Nihai Tuketici                                  o        KO
ki                                                                          İ
KA          Kasiyer : 16075-BEBUMHAN KOZANDGLU                                                                  İ
EB  o                                                            o
TC      ETM :590ab837-5407-f11i-aa49-ağaSİİZbİYZİ                         i                  Ve
HK   o    Sorgulama Adresi : https://um.anpagirass . COM/                                                     İ
YK     Tade Barkodu : O0155L10226000160001000154                            o      İ
AL        ş    Eki
 İ    Dn    Hiktar Birim Ad                                    Iskonto Birim Fiyat KOV Orani     Tutar
İ        2,000. AD PNVLAVOKADD ADETK                OE aa 1    ban *
         1,000 AD FARILIA FECETE Z00LU                 0     74,95 20     74,95            ü
Ü 6 ico m0 FTA TMLET KĞİDİ MOLU BeN Ol    0 219,90
Hes a Ve                     a   20   219,90
ş            . YABAN MERSİNİ ADET                       0       öde Gİ        87,95     o            U
04192 KG A.DARET JAMBON DAKA KG                 Slbgiso Gi 27MM       MA SA
 co 0 FLZMKRİN 0 GR ATA SEKRİYEREkEK        ÖL e ARL 1        20,9:            Ve
000 AD FİLİZ MAKARNA 500 GR ERİSTEkKbklik         RE BE       5 Bl
04400. KG ALEV ERİSTESİ KG               Kn  Como   z    AZ      Kaş
 200 0 KANETİN, 10 CR TURK KAMESE ORTAM     YA sas           Üz       SİRŞERİ
O 2,000 AD MuPazI anET              NA Çi   1 190 e
     Ge KB MVAPIRASA VG               ORA UZ     OĞLU
n    VR yen Çapalı                                    KAÇA
e   1,000 AD BRES İKG FASULYE KURULİİK         0 175,90   i    zle      AN Üç i
1,000 AD B.DURU 1 KG KÖFTELİK HAGİR            o 5495           SEZ O
1,000 AD SUTAS SUT Gk180 MDRkRkkt                 o     RS Şa     ji      SİN         KOLU
 0728 KG MU.MC 6           A     5 RE    A    79,93       UM
1,000 AD FNV.MAYDANIZ ADET      De       Ğ   b Se    BE       AM
 07 Ko MM.PACAR KIRMIZI 6  ÇA       * TART TE      SAKİ
 ğrzza KG MV.SOGAN TAZE KG     N        ORA   91 ç RL
2.246 KG  MNV.PATATES TAZE KG 4           0   AE,   i    38,07     i    KA
 Ta KE MULSOĞAN KURU IG. 47,               GER Cio eze          VU
0,960 KG MAU.DONATES SALKIM KG              A cs OE  Nu
14000. AD PANTENE SAPP.GOOML ONARICI VE KORUYUCU    m CACENN    DE     KULU
o                                                        Hal Hizmet Toplani : 2163,68 TL         NO
Toplam Tskonto 3:0 TL        e -L AN
a          ,                                        KV C4 1        117,51 1.         CORA
                                  KOV C420     : 65,80 TL      ORAL
İş                                             Glenecek Tutar: 2165.        ee,
İ                                           F 1: 2165,68 TL     . SÜR
l                                                  KARUM
e                                 ÖDEMELER  Ül
                     CTLAİ tmisSekizkr         SİSE CÜZİ - 9   e  İ 3 ARL
N iü AN
e on
                                                                                                      Vİ Yep YAYA
                                                                                                                                                                                        Bi Kİ Op
GA
                                                                C  SU İ
İ                                                                                                                 SR UM
                                                                                                                        ÜN
                                                                e  DA
VOKAL
İ                                                                     e  Ge Ü
İADE İŞ                                                 VU
İADE İŞLEMLERİNDE                       SUSAN
ı ARR m      İNDE SATIŞ FATURASININ İBRAZ ZORUNLUDUR *                         o    UL MU
-                                           ANL
ÇEV  İ 4
YARAR Ü KON
0 Ae NPC
VEE GAR
VEL
KR NE
VA AL
RS ODUR
', '219.90', '2024-02-10T21:00:00.000Z', 'GOL EUR ME AU LE ELA Kc', 33, 'pending', '2026-02-11T19:32:49.010Z', '2026-02-11T19:32:49.010Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('67ea1535-0a19-499e-b1e1-b0dbdfb75a72', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770841263198-202635311.jpeg', NULL, NULL, NULL, NULL, NULL, 'failed', '2026-02-11T20:21:03.192Z', '2026-02-11T20:21:03.192Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('25a055d3-1e47-4b2a-ac8b-d596197bf38c', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770841303333-535410640.jpeg', NULL, NULL, NULL, NULL, NULL, 'failed', '2026-02-11T20:21:43.332Z', '2026-02-11T20:21:43.332Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('41594af3-03c1-4db4-9030-9e17d81de761', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770841876042-617151224.jpeg', NULL, NULL, NULL, NULL, NULL, 'failed', '2026-02-11T20:31:16.037Z', '2026-02-11T20:31:16.037Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('d8f92dca-f93a-4763-a716-9c260ccc9107', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770842067242-797234676.jpeg', NULL, NULL, NULL, NULL, NULL, 'failed', '2026-02-11T20:34:27.241Z', '2026-02-11T20:34:27.241Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('65f4cbf1-a8ea-4fe5-9572-d74b57466d55', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770842225593-763634432.jpeg', NULL, NULL, NULL, NULL, NULL, 'failed', '2026-02-11T20:37:05.588Z', '2026-02-11T20:37:05.588Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('7760dcf7-61ed-4363-8cc4-87196ff8bce0', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770842269954-764853074.jpeg', NULL, NULL, NULL, NULL, NULL, 'failed', '2026-02-11T20:37:49.953Z', '2026-02-11T20:37:49.953Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('d4bf7ed5-6bcd-4cd1-b579-2d5a47773f85', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770842518063-710603190.jpeg', '[{"name":"YEMEK %10*2.","total_price":974.8,"vat_rate":10,"confidence":0.9,"quantity":1,"unit_price":974.8,"vat_amount":97.48},{"name":"KREDI *2.","total_price":974.8,"vat_rate":2,"confidence":0.9,"quantity":1,"unit_price":974.8,"vat_amount":19.496},{"name":"BU ISLEN TEHASSIZ BIR KART ILE 2.TL","total_price":974.8,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":974.8,"vat_amount":0}]', '974.80', '2026-01-23T21:00:00.000Z', 'KiRECBURNU FIRIN GIDA', 85, 'failed', '2026-02-11T20:41:58.059Z', '2026-02-11T20:41:58.059Z', '2026-02-11T20:42:03.885Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('10dc53df-452c-4bea-96b1-b09ca5299d99', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770842549202-413498344.jpeg', '[{"name":"YEMEK %10*2.","total_price":974.8,"vat_rate":10,"confidence":0.9,"quantity":1,"unit_price":974.8,"vat_amount":97.48},{"name":"KREDI *2.","total_price":974.8,"vat_rate":2,"confidence":0.9,"quantity":1,"unit_price":974.8,"vat_amount":19.496},{"name":"BU ISLEN TEHASSIZ BIR KART ILE 2.TL","total_price":974.8,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":974.8,"vat_amount":0}]', '974.80', '2026-01-23T21:00:00.000Z', 'KiRECBURNU FIRIN GIDA', 85, 'failed', '2026-02-11T20:42:29.200Z', '2026-02-11T20:42:29.200Z', '2026-02-11T20:42:34.813Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('8322980e-9b4d-4669-a87d-72061d55b484', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770842794169-887321817.jpeg', '[{"name":".202615:06","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"Unknown Product","total_price":206.04,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":206.04,"vat_amount":0},{"name":"3ad X","total_price":46,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":46,"vat_amount":0},{"name":"*","total_price":138,"vat_rate":13,"confidence":0.9,"quantity":1,"unit_price":138,"vat_amount":17.94},{"name":"Unknown Product","total_price":11.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":11.5,"vat_amount":0},{"name":"%20","total_price":49,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":49,"vat_amount":9.8},{"name":"Unknown Product","total_price":120,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":120,"vat_amount":0},{"name":"2adx","total_price":1,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":1,"vat_amount":0},{"name":"Unknown Product","total_price":556.54,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":556.54,"vat_amount":0},{"name":".202615:07","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"DV DAHIL","total_price":4.71,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":4.71,"vat_amount":0},{"name":"%1","total_price":470.83,"vat_rate":1,"confidence":0.9,"quantity":1,"unit_price":470.83,"vat_amount":4.7083},{"name":"475.54","total_price":13.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":13.5,"vat_amount":0},{"name":"%20","total_price":67.5,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":67.5,"vat_amount":13.5},{"name":"Unknown Product","total_price":81,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":81,"vat_amount":0}]', '1783.66', '2026-02-08T21:00:00.000Z', 'C', 85, 'failed', '2026-02-11T20:46:34.168Z', '2026-02-11T20:46:34.168Z', '2026-02-11T20:46:41.569Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('7ef1314c-4d3f-4ba4-bb49-c80e5696e751', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770842913222-145943429.jpeg', NULL, NULL, NULL, NULL, NULL, 'failed', '2026-02-11T20:48:33.217Z', '2026-02-11T20:48:33.217Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('658cafa8-737e-4de0-83fc-0374fe0bdf4f', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770843153821-343332333.jpeg', '[{"name":".202615:06","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"Unknown Product","total_price":206.04,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":206.04,"vat_amount":0},{"name":"3ad X","total_price":46,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":46,"vat_amount":0},{"name":"*","total_price":138,"vat_rate":13,"confidence":0.9,"quantity":1,"unit_price":138,"vat_amount":17.94},{"name":"Unknown Product","total_price":11.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":11.5,"vat_amount":0},{"name":"%20","total_price":49,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":49,"vat_amount":9.8},{"name":"Unknown Product","total_price":120,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":120,"vat_amount":0},{"name":"2adx","total_price":1,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":1,"vat_amount":0},{"name":"Unknown Product","total_price":556.54,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":556.54,"vat_amount":0},{"name":".202615:07","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"DV DAHIL","total_price":4.71,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":4.71,"vat_amount":0},{"name":"%1","total_price":470.83,"vat_rate":1,"confidence":0.9,"quantity":1,"unit_price":470.83,"vat_amount":4.7083},{"name":"475.54","total_price":13.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":13.5,"vat_amount":0},{"name":"%20","total_price":67.5,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":67.5,"vat_amount":13.5},{"name":"Unknown Product","total_price":81,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":81,"vat_amount":0}]', '1783.66', '2026-02-08T21:00:00.000Z', 'C', 85, 'completed', '2026-02-11T20:52:33.816Z', '2026-02-11T20:52:33.816Z', '2026-02-11T20:52:33.878Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('94dbffbf-ff85-4977-afee-a0d34113ad39', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770843325517-514976711.jpeg', '[{"name":".202615:06","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"Unknown Product","total_price":206.04,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":206.04,"vat_amount":0},{"name":"3ad X","total_price":46,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":46,"vat_amount":0},{"name":"*","total_price":138,"vat_rate":13,"confidence":0.9,"quantity":1,"unit_price":138,"vat_amount":17.94},{"name":"Unknown Product","total_price":11.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":11.5,"vat_amount":0},{"name":"%20","total_price":49,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":49,"vat_amount":9.8},{"name":"Unknown Product","total_price":120,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":120,"vat_amount":0},{"name":"2adx","total_price":1,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":1,"vat_amount":0},{"name":"Unknown Product","total_price":556.54,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":556.54,"vat_amount":0},{"name":".202615:07","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"DV DAHIL","total_price":4.71,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":4.71,"vat_amount":0},{"name":"%1","total_price":470.83,"vat_rate":1,"confidence":0.9,"quantity":1,"unit_price":470.83,"vat_amount":4.7083},{"name":"475.54","total_price":13.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":13.5,"vat_amount":0},{"name":"%20","total_price":67.5,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":67.5,"vat_amount":13.5},{"name":"Unknown Product","total_price":81,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":81,"vat_amount":0}]', '1783.66', '2026-02-08T21:00:00.000Z', 'C', 85, 'completed', '2026-02-11T20:55:25.513Z', '2026-02-11T20:55:25.513Z', '2026-02-11T20:55:25.566Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('14f8411c-e320-4f12-8f6a-56f7ad26d1e3', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770843532107-239337383.jpeg', '[{"name":".202615:06","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"Unknown Product","total_price":206.04,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":206.04,"vat_amount":0},{"name":"3ad X","total_price":46,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":46,"vat_amount":0},{"name":"*","total_price":138,"vat_rate":13,"confidence":0.9,"quantity":1,"unit_price":138,"vat_amount":17.94},{"name":"Unknown Product","total_price":11.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":11.5,"vat_amount":0},{"name":"%20","total_price":49,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":49,"vat_amount":9.8},{"name":"Unknown Product","total_price":120,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":120,"vat_amount":0},{"name":"2adx","total_price":1,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":1,"vat_amount":0},{"name":"Unknown Product","total_price":556.54,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":556.54,"vat_amount":0},{"name":".202615:07","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"DV DAHIL","total_price":4.71,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":4.71,"vat_amount":0},{"name":"%1","total_price":470.83,"vat_rate":1,"confidence":0.9,"quantity":1,"unit_price":470.83,"vat_amount":4.7083},{"name":"475.54","total_price":13.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":13.5,"vat_amount":0},{"name":"%20","total_price":67.5,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":67.5,"vat_amount":13.5},{"name":"Unknown Product","total_price":81,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":81,"vat_amount":0}]', '1783.66', '2026-02-08T21:00:00.000Z', 'C', 85, 'completed', '2026-02-11T20:58:52.101Z', '2026-02-11T20:58:52.101Z', '2026-02-11T20:58:52.149Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('21231ef8-1b0b-4167-a05c-e765ba768ea9', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770843549910-429089815.jpeg', '[{"name":"Fat.Tar..2026 1111111111 O","total_price":11.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":11.02,"vat_amount":0},{"name":"Miktar Birim Ad 0 99,95 1","total_price":199.9,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":199.9,"vat_amount":0},{"name":"O 2,000 AD V.AVOKADO ADET  20 74,95","total_price":74.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":74.95,"vat_amount":0},{"name":"1.000 AD 0  20 219,90","total_price":219.9,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":219.9,"vat_amount":0},{"name":"1,000 FAMILIA TUVALET KAGIDI 4OLI BAMBU OZLU $6°68 1","total_price":89.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":89.95,"vat_amount":0},{"name":"A.DANET JANBON DANA KG 0 1079,90 1","total_price":207.34,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":207.34,"vat_amount":0},{"name":"0,192KG 0  1 24,95","total_price":24.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":24.95,"vat_amount":0},{"name":"1,000 FILIZMAKARNA 500GR ARPASEHRIYE","total_price":24.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":24.95,"vat_amount":0},{"name":"O 1,000 AD FILIZ MAKAR500GR ERISTE*** 0  1","total_price":24.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":24.95,"vat_amount":0},{"name":"A.EV ERISTESI KG 0 249,90 1","total_price":99.96,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":99.96,"vat_amount":0},{"name":"0.400 KG 0 54,95 1","total_price":109.9,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":109.9,"vat_amount":0},{"name":"2,000 AD KAHVE DN.100 GR TURK KAHVESI ORTA KA","total_price":159.9,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":159.9,"vat_amount":0},{"name":"2,000 AD V.PAZI ADET 0  1","total_price":79.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":79.95,"vat_amount":0},{"name":"MV.PIRASA KG 64,95 1","total_price":52.61,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":52.61,"vat_amount":0},{"name":"0,810 KG 0  1 143,90","total_price":143.9,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":143.9,"vat_amount":0},{"name":"1,000 AD BREIS1KGFASLYEKURU***** 54.95 1","total_price":54.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":54.95,"vat_amount":0},{"name":"1 79,95","total_price":79.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":79.95,"vat_amount":0},{"name":"1,000AD SUTASSUT6180M*","total_price":22.4,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":22.4,"vat_amount":0},{"name":"0,748 KG MNV.HAVUC KG 0  1","total_price":29.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":29.95,"vat_amount":0},{"name":"NV.KEREVIZ KG 0 74,95 1","total_price":107.48,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":107.48,"vat_amount":0},{"name":"1,434 KG 0  1 24,95","total_price":24.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":24.95,"vat_amount":0},{"name":"1,000AD INV.MAYDANOZ ADET 139,95","total_price":139.11,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":139.11,"vat_amount":0},{"name":"0,994 KG 0 169,95 1","total_price":38.07,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":38.07,"vat_amount":0},{"name":"0,224 KG NV.S0GAN TAZE KG","total_price":56.04,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":56.04,"vat_amount":0},{"name":"2.246 KG N.PATATES TAZE KG  1","total_price":24.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":24.95,"vat_amount":0},{"name":"V.SOGAN KURU KG. 15,95 1","total_price":27.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":27.02,"vat_amount":0},{"name":"1,694 KG 109,95 1","total_price":105.55,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":105.55,"vat_amount":0},{"name":"0.960 KG .DOMATES SALKIM KG 20","total_price":99.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":99.95,"vat_amount":0},{"name":"1,000 AD PANTENE SAP.400ONRICI VE KORUYUCU","total_price":99.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":99.95,"vat_amount":0}]', '2163.68', '2026-02-10T21:00:00.000Z', '00014', 85, 'completed', '2026-02-11T20:59:09.908Z', '2026-02-11T20:59:09.908Z', '2026-02-11T20:59:09.958Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('7ff7c27b-9030-46fc-9149-4b3858a8427e', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'uploads\image-1770640175260-365200188.jpg', '--- FİŞ / FATURA DETAYI ---

BİLİNMEYEN İŞLETME

TARİH: ---   SAAT: --:--
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPLAM:                           0.00 TL

', '0.00', NULL, NULL, 23, 'pending', '2026-02-09T12:29:35.257Z', '2026-02-09T12:29:35.257Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('68fb70d2-80a3-429a-9be2-e4fbb32bddde', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770843652721-176015760.jpeg', '[{"name":".202615:06","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"Unknown Product","total_price":206.04,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":206.04,"vat_amount":0},{"name":"3ad X","total_price":46,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":46,"vat_amount":0},{"name":"*","total_price":138,"vat_rate":13,"confidence":0.9,"quantity":1,"unit_price":138,"vat_amount":17.94},{"name":"Unknown Product","total_price":11.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":11.5,"vat_amount":0},{"name":"%20","total_price":49,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":49,"vat_amount":9.8},{"name":"Unknown Product","total_price":120,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":120,"vat_amount":0},{"name":"2adx","total_price":1,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":1,"vat_amount":0},{"name":"Unknown Product","total_price":556.54,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":556.54,"vat_amount":0},{"name":".202615:07","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"DV DAHIL","total_price":4.71,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":4.71,"vat_amount":0},{"name":"%1","total_price":470.83,"vat_rate":1,"confidence":0.9,"quantity":1,"unit_price":470.83,"vat_amount":4.7083},{"name":"475.54","total_price":13.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":13.5,"vat_amount":0},{"name":"%20","total_price":67.5,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":67.5,"vat_amount":13.5},{"name":"Unknown Product","total_price":81,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":81,"vat_amount":0}]', '1783.66', '2026-02-08T21:00:00.000Z', 'C', 85, 'completed', '2026-02-11T21:00:52.720Z', '2026-02-11T21:00:52.720Z', '2026-02-11T21:00:52.764Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('02b25bc0-d98a-459d-846d-ea63365e4628', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770843953617-41171432.jpeg', '[{"name":".202615:06","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"Unknown Product","total_price":206.04,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":206.04,"vat_amount":0},{"name":"3ad X","total_price":46,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":46,"vat_amount":0},{"name":"*","total_price":138,"vat_rate":13,"confidence":0.9,"quantity":1,"unit_price":138,"vat_amount":17.94},{"name":"Unknown Product","total_price":11.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":11.5,"vat_amount":0},{"name":"%20","total_price":49,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":49,"vat_amount":9.8},{"name":"Unknown Product","total_price":120,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":120,"vat_amount":0},{"name":"2adx","total_price":1,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":1,"vat_amount":0},{"name":"Unknown Product","total_price":556.54,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":556.54,"vat_amount":0},{"name":".202615:07","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"DV DAHIL","total_price":4.71,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":4.71,"vat_amount":0},{"name":"%1","total_price":470.83,"vat_rate":1,"confidence":0.9,"quantity":1,"unit_price":470.83,"vat_amount":4.7083},{"name":"475.54","total_price":13.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":13.5,"vat_amount":0},{"name":"%20","total_price":67.5,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":67.5,"vat_amount":13.5},{"name":"Unknown Product","total_price":81,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":81,"vat_amount":0}]', '1783.66', '2026-02-08T21:00:00.000Z', 'C', 85, 'completed', '2026-02-11T21:05:53.613Z', '2026-02-11T21:05:53.613Z', '2026-02-11T21:05:53.673Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('c36e1dc4-3c2b-48c7-a117-ff0f8cdd27d0', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770844067799-487565479.jpeg', '[{"name":".202615:06","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"Unknown Product","total_price":206.04,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":206.04,"vat_amount":0},{"name":"3ad X","total_price":46,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":46,"vat_amount":0},{"name":"*","total_price":138,"vat_rate":13,"confidence":0.9,"quantity":1,"unit_price":138,"vat_amount":17.94},{"name":"Unknown Product","total_price":11.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":11.5,"vat_amount":0},{"name":"%20","total_price":49,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":49,"vat_amount":9.8},{"name":"Unknown Product","total_price":120,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":120,"vat_amount":0},{"name":"2adx","total_price":1,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":1,"vat_amount":0},{"name":"Unknown Product","total_price":556.54,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":556.54,"vat_amount":0},{"name":".202615:07","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"DV DAHIL","total_price":4.71,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":4.71,"vat_amount":0},{"name":"%1","total_price":470.83,"vat_rate":1,"confidence":0.9,"quantity":1,"unit_price":470.83,"vat_amount":4.7083},{"name":"475.54","total_price":13.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":13.5,"vat_amount":0},{"name":"%20","total_price":67.5,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":67.5,"vat_amount":13.5},{"name":"Unknown Product","total_price":81,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":81,"vat_amount":0}]', '1783.66', '2026-02-08T21:00:00.000Z', 'C', 85, 'completed', '2026-02-11T21:07:47.794Z', '2026-02-11T21:07:47.794Z', '2026-02-11T21:07:47.845Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770844105486-617498586.jpeg', '[{"name":"Fat.Tar..2026 1111111111 O","total_price":11.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":11.02,"vat_amount":0},{"name":"Miktar Birim Ad 0 99,95 1","total_price":199.9,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":199.9,"vat_amount":0},{"name":"O 2,000 AD V.AVOKADO ADET  20 74,95","total_price":74.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":74.95,"vat_amount":0},{"name":"1.000 AD 0  20 219,90","total_price":219.9,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":219.9,"vat_amount":0},{"name":"1,000 FAMILIA TUVALET KAGIDI 4OLI BAMBU OZLU $6°68 1","total_price":89.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":89.95,"vat_amount":0},{"name":"A.DANET JANBON DANA KG 0 1079,90 1","total_price":207.34,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":207.34,"vat_amount":0},{"name":"0,192KG 0  1 24,95","total_price":24.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":24.95,"vat_amount":0},{"name":"1,000 FILIZMAKARNA 500GR ARPASEHRIYE","total_price":24.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":24.95,"vat_amount":0},{"name":"O 1,000 AD FILIZ MAKAR500GR ERISTE*** 0  1","total_price":24.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":24.95,"vat_amount":0},{"name":"A.EV ERISTESI KG 0 249,90 1","total_price":99.96,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":99.96,"vat_amount":0},{"name":"0.400 KG 0 54,95 1","total_price":109.9,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":109.9,"vat_amount":0},{"name":"2,000 AD KAHVE DN.100 GR TURK KAHVESI ORTA KA","total_price":159.9,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":159.9,"vat_amount":0},{"name":"2,000 AD V.PAZI ADET 0  1","total_price":79.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":79.95,"vat_amount":0},{"name":"MV.PIRASA KG 64,95 1","total_price":52.61,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":52.61,"vat_amount":0},{"name":"0,810 KG 0  1 143,90","total_price":143.9,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":143.9,"vat_amount":0},{"name":"1,000 AD BREIS1KGFASLYEKURU***** 54.95 1","total_price":54.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":54.95,"vat_amount":0},{"name":"1 79,95","total_price":79.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":79.95,"vat_amount":0},{"name":"1,000AD SUTASSUT6180M*","total_price":22.4,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":22.4,"vat_amount":0},{"name":"0,748 KG MNV.HAVUC KG 0  1","total_price":29.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":29.95,"vat_amount":0},{"name":"NV.KEREVIZ KG 0 74,95 1","total_price":107.48,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":107.48,"vat_amount":0},{"name":"1,434 KG 0  1 24,95","total_price":24.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":24.95,"vat_amount":0},{"name":"1,000AD INV.MAYDANOZ ADET 139,95","total_price":139.11,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":139.11,"vat_amount":0},{"name":"0,994 KG 0 169,95 1","total_price":38.07,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":38.07,"vat_amount":0},{"name":"0,224 KG NV.S0GAN TAZE KG","total_price":56.04,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":56.04,"vat_amount":0},{"name":"2.246 KG N.PATATES TAZE KG  1","total_price":24.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":24.95,"vat_amount":0},{"name":"V.SOGAN KURU KG. 15,95 1","total_price":27.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":27.02,"vat_amount":0},{"name":"1,694 KG 109,95 1","total_price":105.55,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":105.55,"vat_amount":0},{"name":"0.960 KG .DOMATES SALKIM KG 20","total_price":99.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":99.95,"vat_amount":0},{"name":"1,000 AD PANTENE SAP.400ONRICI VE KORUYUCU","total_price":99.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":99.95,"vat_amount":0}]', '2163.68', '2026-02-10T21:00:00.000Z', '00014', 85, 'completed', '2026-02-11T21:08:25.485Z', '2026-02-11T21:08:25.485Z', '2026-02-11T21:08:25.528Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('5c520ae1-d615-4a36-b95e-b3ff5f667a20', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'uploads\image-1770640250845-207547863.jpg', '--- FİŞ / FATURA DETAYI ---

BİLİNMEYEN İŞLETME

TARİH: ---   SAAT: 15:07
FİŞ NO: 8834751
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPKDV:                           7.00 TL
TOPLAM:                           0.00 TL

', '0.00', NULL, NULL, 29, 'pending', '2026-02-09T12:30:50.844Z', '2026-02-09T12:30:50.844Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('c23bef8a-8dd4-41dc-9ae5-02329a93f011', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770844881709-46916447.jpeg', '[{"name":".202615:06","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"Unknown Product","total_price":206.04,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":206.04,"vat_amount":0},{"name":"3ad X","total_price":46,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":46,"vat_amount":0},{"name":"*","total_price":138,"vat_rate":13,"confidence":0.9,"quantity":1,"unit_price":138,"vat_amount":17.94},{"name":"Unknown Product","total_price":11.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":11.5,"vat_amount":0},{"name":"%20","total_price":49,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":49,"vat_amount":9.8},{"name":"Unknown Product","total_price":120,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":120,"vat_amount":0},{"name":"2adx","total_price":1,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":1,"vat_amount":0},{"name":"Unknown Product","total_price":556.54,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":556.54,"vat_amount":0},{"name":".202615:07","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"DV DAHIL","total_price":4.71,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":4.71,"vat_amount":0},{"name":"%1","total_price":470.83,"vat_rate":1,"confidence":0.9,"quantity":1,"unit_price":470.83,"vat_amount":4.7083},{"name":"475.54","total_price":13.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":13.5,"vat_amount":0},{"name":"%20","total_price":67.5,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":67.5,"vat_amount":13.5},{"name":"Unknown Product","total_price":81,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":81,"vat_amount":0}]', '1783.66', '2026-02-08T21:00:00.000Z', 'C', 85, 'completed', '2026-02-11T21:21:21.706Z', '2026-02-11T21:21:21.706Z', '2026-02-11T21:21:21.747Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('d664b36c-ed06-4c61-9833-1aa0d68ec1ef', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770845065368-390771796.jpeg', '[{"name":".202615:06","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"Unknown Product","total_price":206.04,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":206.04,"vat_amount":0},{"name":"3ad X","total_price":46,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":46,"vat_amount":0},{"name":"*","total_price":138,"vat_rate":13,"confidence":0.9,"quantity":1,"unit_price":138,"vat_amount":17.94},{"name":"Unknown Product","total_price":11.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":11.5,"vat_amount":0},{"name":"%20","total_price":49,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":49,"vat_amount":9.8},{"name":"Unknown Product","total_price":120,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":120,"vat_amount":0},{"name":"2adx","total_price":1,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":1,"vat_amount":0},{"name":"Unknown Product","total_price":556.54,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":556.54,"vat_amount":0},{"name":".202615:07","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"DV DAHIL","total_price":4.71,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":4.71,"vat_amount":0},{"name":"%1","total_price":470.83,"vat_rate":1,"confidence":0.9,"quantity":1,"unit_price":470.83,"vat_amount":4.7083},{"name":"475.54","total_price":13.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":13.5,"vat_amount":0},{"name":"%20","total_price":67.5,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":67.5,"vat_amount":13.5},{"name":"Unknown Product","total_price":81,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":81,"vat_amount":0}]', '1783.66', '2026-02-08T21:00:00.000Z', 'C', 85, 'completed', '2026-02-11T21:24:25.365Z', '2026-02-11T21:24:25.365Z', '2026-02-11T21:24:25.412Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('1acf90f2-9448-4bef-888b-46b38dba5306', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770845090878-696648458.jpeg', '[{"name":"YEMEK %10*2.","total_price":974.8,"vat_rate":10,"confidence":0.9,"quantity":1,"unit_price":974.8,"vat_amount":97.48},{"name":"KREDI *2.","total_price":974.8,"vat_rate":2,"confidence":0.9,"quantity":1,"unit_price":974.8,"vat_amount":19.496},{"name":"BU ISLEN TEHASSIZ BIR KART ILE 2.TL","total_price":974.8,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":974.8,"vat_amount":0}]', '974.80', '2026-01-23T21:00:00.000Z', 'KiRECBURNU FIRIN GIDA', 85, 'completed', '2026-02-11T21:24:50.878Z', '2026-02-11T21:24:50.878Z', '2026-02-11T21:24:51.022Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('09e2d068-f1eb-4cc7-a74b-471be3216e03', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770845108678-838372883.jpeg', '[{"name":"Fat.Tar..2026 1111111111 O","total_price":11.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":11.02,"vat_amount":0},{"name":"Miktar Birim Ad 0 99,95 1","total_price":199.9,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":199.9,"vat_amount":0},{"name":"O 2,000 AD V.AVOKADO ADET  20 74,95","total_price":74.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":74.95,"vat_amount":0},{"name":"1.000 AD 0  20 219,90","total_price":219.9,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":219.9,"vat_amount":0},{"name":"1,000 FAMILIA TUVALET KAGIDI 4OLI BAMBU OZLU $6°68 1","total_price":89.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":89.95,"vat_amount":0},{"name":"A.DANET JANBON DANA KG 0 1079,90 1","total_price":207.34,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":207.34,"vat_amount":0},{"name":"0,192KG 0  1 24,95","total_price":24.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":24.95,"vat_amount":0},{"name":"1,000 FILIZMAKARNA 500GR ARPASEHRIYE","total_price":24.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":24.95,"vat_amount":0},{"name":"O 1,000 AD FILIZ MAKAR500GR ERISTE*** 0  1","total_price":24.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":24.95,"vat_amount":0},{"name":"A.EV ERISTESI KG 0 249,90 1","total_price":99.96,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":99.96,"vat_amount":0},{"name":"0.400 KG 0 54,95 1","total_price":109.9,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":109.9,"vat_amount":0},{"name":"2,000 AD KAHVE DN.100 GR TURK KAHVESI ORTA KA","total_price":159.9,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":159.9,"vat_amount":0},{"name":"2,000 AD V.PAZI ADET 0  1","total_price":79.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":79.95,"vat_amount":0},{"name":"MV.PIRASA KG 64,95 1","total_price":52.61,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":52.61,"vat_amount":0},{"name":"0,810 KG 0  1 143,90","total_price":143.9,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":143.9,"vat_amount":0},{"name":"1,000 AD BREIS1KGFASLYEKURU***** 54.95 1","total_price":54.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":54.95,"vat_amount":0},{"name":"1 79,95","total_price":79.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":79.95,"vat_amount":0},{"name":"1,000AD SUTASSUT6180M*","total_price":22.4,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":22.4,"vat_amount":0},{"name":"0,748 KG MNV.HAVUC KG 0  1","total_price":29.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":29.95,"vat_amount":0},{"name":"NV.KEREVIZ KG 0 74,95 1","total_price":107.48,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":107.48,"vat_amount":0},{"name":"1,434 KG 0  1 24,95","total_price":24.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":24.95,"vat_amount":0},{"name":"1,000AD INV.MAYDANOZ ADET 139,95","total_price":139.11,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":139.11,"vat_amount":0},{"name":"0,994 KG 0 169,95 1","total_price":38.07,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":38.07,"vat_amount":0},{"name":"0,224 KG NV.S0GAN TAZE KG","total_price":56.04,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":56.04,"vat_amount":0},{"name":"2.246 KG N.PATATES TAZE KG  1","total_price":24.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":24.95,"vat_amount":0},{"name":"V.SOGAN KURU KG. 15,95 1","total_price":27.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":27.02,"vat_amount":0},{"name":"1,694 KG 109,95 1","total_price":105.55,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":105.55,"vat_amount":0},{"name":"0.960 KG .DOMATES SALKIM KG 20","total_price":99.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":99.95,"vat_amount":0},{"name":"1,000 AD PANTENE SAP.400ONRICI VE KORUYUCU","total_price":99.95,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":99.95,"vat_amount":0}]', '2163.68', '2026-02-10T21:00:00.000Z', '00014', 85, 'completed', '2026-02-11T21:25:08.677Z', '2026-02-11T21:25:08.677Z', '2026-02-11T21:25:08.833Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('d4988860-199b-4241-9460-00e323894113', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'uploads\expense\di-er-giderler\image-1770823943128-336672966.jpeg', '--- FİŞ / FATURA DETAYI ---

ll Arsiv Fatura

TARİH: ---   SAAT: 14:32
-------------------------------------------
4           NE a Kr TT FE         12.00
4    SEEESİ ELE                   59.50
-------------------------------------------
TOPLAM:                         467.00 TL

ÖDEME: Kredi Kartı


--- RAW TESSERACT OUTPUT ---
ll Arsiv Fatura
BİM BİRLE  TK*MAGAZALAR İN
ShikiTitaf Mah   Risrm seli
D N0:16-18
/        Befiktaf   STANBUL
Büyük Mükellefler VOM 1751
518dE
FATURA NO: AE0202600l  UR.
    p
j  03   2026 14:32        Gk
No   162      ki
i  ETTNb2e044d6-4A7b-4e52-aede-88d
s               l  730030685
VOBLL   MER KR
TO
414100 10302608540182
TOKN/VKN: 2 3528594288
Isim/Ünvan: SEV AN GÜRLER                     :
Vergi Dairesi                         e
Adres: BESİKTAS                                        Bs
A Befiktaf / ystanbul
    SL a   NCT          YAN               iü f  Ara A Kur Ekme
SÜT il DOSİ                      e AE EE Sezen
Y   184.UU                               yi      TM ende Hk SB
Ba   ad 93                            ir  a ike
ş                                        Pon OLan   b Dr
:             k               POR CE ER RR
SA YUMURTA 80 Lİ 53-626 *İ               Ee  Ula
198.00     10106 &İ                ğ  : DEDE si
T:İ HAMUR KAB. TOZULO106 4    DS EN
4                   EE TE SE EET BRE
12.00         4           NE a Kr TT FETEIŞ
O kaKAO 1006 DAPHNE    Yi             ia DP o iş
59,50                                     4    SEEESİ ELE
N          ANL YN105G Bİ                    BiR a
REKERLY VANYLYNİ                           EE o e
 ,    i                            OREREŞİ  REEL a
K     11.50 ,                          AŞ ü ie
YA          ik   MET BUM *20                 bk RR EEE   Süre
SİN ALınyerya PONETY BAM 82               Hİ Hmm
A     2.00                        YER BER SR
İİ TOPLAM KDV                           NER TESA Ez
y     4,93    r   v Tutal                YEN EZ
ödenecek KOV Dahi l TUYal                  R Sa e
4467.00                            SR YARN SN
467.00                                         RR
BK Kredi Karti 1/                        SUR  Gü SE
467 DU    3
GARANTI BANKASI
18269 T:03781300 SİGEİÜKKAA
1141   Yi. Ve                   e           YES NN
il   Raf No:6093453           Setter
i       h      i  İ                     NÜ   TERA
6021               Öd                     ARE
tpy MATRAH    KOY TUTAR KK                SEA
V DAHLİ             :
Vi ov        k        Ale
y    460,4
YAT   bey             00,0
i       VU ny mrs rr AT
İl Ül KAR
YARANIN
DAYANAN
YERİNİ İYA
ETANAN Aas DİM
bek area öğe
KR KR ARAR
BİRR Geli K
pos:1 - 433461   KKAK ÇAKAN
PU,  1    356041 11              şi
,SGO41 4141, DARPHANE / BERYKTAM
4141,    No: 854
No: İ
', '467.00', NULL, 'll Arsiv Fatura', 33, 'confirmed', '2026-02-11T15:32:23.127Z', '2026-02-11T15:32:23.127Z', NULL, NULL);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('642f18b9-b470-4a82-86de-93177220ebb4', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770845157759-480702560.jpeg', '[{"name":".202615:06","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"Unknown Product","total_price":206.04,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":206.04,"vat_amount":0},{"name":"3ad X","total_price":46,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":46,"vat_amount":0},{"name":"*","total_price":138,"vat_rate":13,"confidence":0.9,"quantity":1,"unit_price":138,"vat_amount":17.94},{"name":"Unknown Product","total_price":11.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":11.5,"vat_amount":0},{"name":"%20","total_price":49,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":49,"vat_amount":9.8},{"name":"Unknown Product","total_price":120,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":120,"vat_amount":0},{"name":"2adx","total_price":1,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":1,"vat_amount":0},{"name":"Unknown Product","total_price":556.54,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":556.54,"vat_amount":0},{"name":".202615:07","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"DV DAHIL","total_price":4.71,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":4.71,"vat_amount":0},{"name":"%1","total_price":470.83,"vat_rate":1,"confidence":0.9,"quantity":1,"unit_price":470.83,"vat_amount":4.7083},{"name":"475.54","total_price":13.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":13.5,"vat_amount":0},{"name":"%20","total_price":67.5,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":67.5,"vat_amount":13.5},{"name":"Unknown Product","total_price":81,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":81,"vat_amount":0}]', '1783.66', '2026-02-08T21:00:00.000Z', 'C', 85, 'completed', '2026-02-11T21:25:57.757Z', '2026-02-11T21:25:57.757Z', '2026-02-11T21:25:57.816Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('02ab9781-3b22-4d04-891a-02d2c422e20e', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770845335412-624186600.jpeg', '[{"name":".202615:06","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"Unknown Product","total_price":206.04,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":206.04,"vat_amount":0},{"name":"3ad X","total_price":46,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":46,"vat_amount":0},{"name":"*","total_price":138,"vat_rate":13,"confidence":0.9,"quantity":1,"unit_price":138,"vat_amount":17.94},{"name":"Unknown Product","total_price":11.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":11.5,"vat_amount":0},{"name":"%20","total_price":49,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":49,"vat_amount":9.8},{"name":"Unknown Product","total_price":120,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":120,"vat_amount":0},{"name":"2adx","total_price":1,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":1,"vat_amount":0},{"name":"Unknown Product","total_price":556.54,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":556.54,"vat_amount":0},{"name":".202615:07","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"DV DAHIL","total_price":4.71,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":4.71,"vat_amount":0},{"name":"%1","total_price":470.83,"vat_rate":1,"confidence":0.9,"quantity":1,"unit_price":470.83,"vat_amount":4.7083},{"name":"475.54","total_price":13.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":13.5,"vat_amount":0},{"name":"%20","total_price":67.5,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":67.5,"vat_amount":13.5},{"name":"Unknown Product","total_price":81,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":81,"vat_amount":0}]', '1783.66', '2026-02-08T21:00:00.000Z', 'C', 85, 'completed', '2026-02-11T21:28:55.411Z', '2026-02-11T21:28:55.411Z', '2026-02-11T21:28:55.423Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('61a0a75f-0b51-47a7-8445-479ff83e1366', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770845533556-71201952.jpeg', '[{"name":".202615:06","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"Unknown Product","total_price":206.04,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":206.04,"vat_amount":0},{"name":"3ad X","total_price":46,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":46,"vat_amount":0},{"name":"*","total_price":138,"vat_rate":13,"confidence":0.9,"quantity":1,"unit_price":138,"vat_amount":17.94},{"name":"Unknown Product","total_price":11.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":11.5,"vat_amount":0},{"name":"%20","total_price":49,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":49,"vat_amount":9.8},{"name":"Unknown Product","total_price":120,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":120,"vat_amount":0},{"name":"2adx","total_price":1,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":1,"vat_amount":0},{"name":"Unknown Product","total_price":556.54,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":556.54,"vat_amount":0},{"name":".202615:07","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"DV DAHIL","total_price":4.71,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":4.71,"vat_amount":0},{"name":"%1","total_price":470.83,"vat_rate":1,"confidence":0.9,"quantity":1,"unit_price":470.83,"vat_amount":4.7083},{"name":"475.54","total_price":13.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":13.5,"vat_amount":0},{"name":"%20","total_price":67.5,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":67.5,"vat_amount":13.5},{"name":"Unknown Product","total_price":81,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":81,"vat_amount":0}]', '1783.66', '2026-02-08T21:00:00.000Z', 'C', 85, 'completed', '2026-02-11T21:32:13.553Z', '2026-02-11T21:32:13.553Z', '2026-02-11T21:32:13.607Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('80f308f7-4e55-4a4c-8edc-8bbc2daa7aeb', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770845627035-457051287.jpeg', '[{"name":".202615:06","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"Unknown Product","total_price":206.04,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":206.04,"vat_amount":0},{"name":"3ad X","total_price":46,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":46,"vat_amount":0},{"name":"*","total_price":138,"vat_rate":13,"confidence":0.9,"quantity":1,"unit_price":138,"vat_amount":17.94},{"name":"Unknown Product","total_price":11.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":11.5,"vat_amount":0},{"name":"%20","total_price":49,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":49,"vat_amount":9.8},{"name":"Unknown Product","total_price":120,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":120,"vat_amount":0},{"name":"2adx","total_price":1,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":1,"vat_amount":0},{"name":"Unknown Product","total_price":556.54,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":556.54,"vat_amount":0},{"name":".202615:07","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"DV DAHIL","total_price":4.71,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":4.71,"vat_amount":0},{"name":"%1","total_price":470.83,"vat_rate":1,"confidence":0.9,"quantity":1,"unit_price":470.83,"vat_amount":4.7083},{"name":"475.54","total_price":13.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":13.5,"vat_amount":0},{"name":"%20","total_price":67.5,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":67.5,"vat_amount":13.5},{"name":"Unknown Product","total_price":81,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":81,"vat_amount":0}]', '1783.66', '2026-02-08T21:00:00.000Z', 'C', 85, 'completed', '2026-02-11T21:33:47.034Z', '2026-02-11T21:33:47.034Z', '2026-02-11T21:33:47.081Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('28acef7f-f8db-45e1-8ff5-e80249615636', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770845805545-825648099.jpeg', '[{"name":".202615:06","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"Unknown Product","total_price":206.04,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":206.04,"vat_amount":0},{"name":"3ad X","total_price":46,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":46,"vat_amount":0},{"name":"*","total_price":138,"vat_rate":13,"confidence":0.9,"quantity":1,"unit_price":138,"vat_amount":17.94},{"name":"Unknown Product","total_price":11.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":11.5,"vat_amount":0},{"name":"%20","total_price":49,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":49,"vat_amount":9.8},{"name":"Unknown Product","total_price":120,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":120,"vat_amount":0},{"name":"2adx","total_price":1,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":1,"vat_amount":0},{"name":"Unknown Product","total_price":556.54,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":556.54,"vat_amount":0},{"name":".202615:07","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"DV DAHIL","total_price":4.71,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":4.71,"vat_amount":0},{"name":"%1","total_price":470.83,"vat_rate":1,"confidence":0.9,"quantity":1,"unit_price":470.83,"vat_amount":4.7083},{"name":"475.54","total_price":13.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":13.5,"vat_amount":0},{"name":"%20","total_price":67.5,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":67.5,"vat_amount":13.5},{"name":"Unknown Product","total_price":81,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":81,"vat_amount":0}]', '1783.66', '2026-02-08T21:00:00.000Z', 'C', 85, 'completed', '2026-02-11T21:36:45.540Z', '2026-02-11T21:36:45.540Z', '2026-02-11T21:36:45.564Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('1a768bf8-7d57-492b-942f-87001317e0c7', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770846140967-251841116.jpeg', '[{"name":".202615:06","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"Unknown Product","total_price":206.04,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":206.04,"vat_amount":0},{"name":"3ad X","total_price":46,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":46,"vat_amount":0},{"name":"*","total_price":138,"vat_rate":13,"confidence":0.9,"quantity":1,"unit_price":138,"vat_amount":17.94},{"name":"Unknown Product","total_price":11.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":11.5,"vat_amount":0},{"name":"%20","total_price":49,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":49,"vat_amount":9.8},{"name":"Unknown Product","total_price":120,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":120,"vat_amount":0},{"name":"2adx","total_price":1,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":1,"vat_amount":0},{"name":"Unknown Product","total_price":556.54,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":556.54,"vat_amount":0},{"name":".202615:07","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"DV DAHIL","total_price":4.71,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":4.71,"vat_amount":0},{"name":"%1","total_price":470.83,"vat_rate":1,"confidence":0.9,"quantity":1,"unit_price":470.83,"vat_amount":4.7083},{"name":"475.54","total_price":13.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":13.5,"vat_amount":0},{"name":"%20","total_price":67.5,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":67.5,"vat_amount":13.5},{"name":"Unknown Product","total_price":81,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":81,"vat_amount":0}]', '1783.66', '2026-02-08T21:00:00.000Z', 'C', 85, 'completed', '2026-02-11T21:42:20.965Z', '2026-02-11T21:42:20.965Z', '2026-02-11T21:42:21.007Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('ed0171e1-284d-4221-9493-a72a0d5360e3', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770846296754-655201481.jpeg', '[{"name":".202615:06","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"Unknown Product","total_price":206.04,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":206.04,"vat_amount":0},{"name":"3ad X","total_price":46,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":46,"vat_amount":0},{"name":"*","total_price":138,"vat_rate":13,"confidence":0.9,"quantity":1,"unit_price":138,"vat_amount":17.94},{"name":"Unknown Product","total_price":11.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":11.5,"vat_amount":0},{"name":"%20","total_price":49,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":49,"vat_amount":9.8},{"name":"Unknown Product","total_price":120,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":120,"vat_amount":0},{"name":"2adx","total_price":1,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":1,"vat_amount":0},{"name":"Unknown Product","total_price":556.54,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":556.54,"vat_amount":0},{"name":".202615:07","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"DV DAHIL","total_price":4.71,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":4.71,"vat_amount":0},{"name":"%1","total_price":470.83,"vat_rate":1,"confidence":0.9,"quantity":1,"unit_price":470.83,"vat_amount":4.7083},{"name":"475.54","total_price":13.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":13.5,"vat_amount":0},{"name":"%20","total_price":67.5,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":67.5,"vat_amount":13.5},{"name":"Unknown Product","total_price":81,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":81,"vat_amount":0}]', '1783.66', '2026-02-08T21:00:00.000Z', 'C', 85, 'completed', '2026-02-11T21:44:56.750Z', '2026-02-11T21:44:56.750Z', '2026-02-11T21:44:56.765Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('521ce52d-375a-494f-857a-7da858651dbd', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770846448012-124286181.jpeg', '[{"name":".202615:06","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"Unknown Product","total_price":206.04,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":206.04,"vat_amount":0},{"name":"3ad X","total_price":46,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":46,"vat_amount":0},{"name":"*","total_price":138,"vat_rate":13,"confidence":0.9,"quantity":1,"unit_price":138,"vat_amount":17.94},{"name":"Unknown Product","total_price":11.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":11.5,"vat_amount":0},{"name":"%20","total_price":49,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":49,"vat_amount":9.8},{"name":"Unknown Product","total_price":120,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":120,"vat_amount":0},{"name":"2adx","total_price":1,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":1,"vat_amount":0},{"name":"Unknown Product","total_price":556.54,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":556.54,"vat_amount":0},{"name":".202615:07","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"DV DAHIL","total_price":4.71,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":4.71,"vat_amount":0},{"name":"%1","total_price":470.83,"vat_rate":1,"confidence":0.9,"quantity":1,"unit_price":470.83,"vat_amount":4.7083},{"name":"475.54","total_price":13.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":13.5,"vat_amount":0},{"name":"%20","total_price":67.5,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":67.5,"vat_amount":13.5},{"name":"Unknown Product","total_price":81,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":81,"vat_amount":0}]', '1783.66', '2026-02-08T21:00:00.000Z', 'C', 85, 'completed', '2026-02-11T21:47:28.008Z', '2026-02-11T21:47:28.008Z', '2026-02-11T21:47:28.034Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('35d78754-1628-4e8f-b283-753f37a55a33', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\ocr\proc-1770846575088-646116130.jpeg', '[{"name":".202615:06","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"Unknown Product","total_price":206.04,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":206.04,"vat_amount":0},{"name":"3ad X","total_price":46,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":46,"vat_amount":0},{"name":"*","total_price":138,"vat_rate":13,"confidence":0.9,"quantity":1,"unit_price":138,"vat_amount":17.94},{"name":"Unknown Product","total_price":11.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":11.5,"vat_amount":0},{"name":"%20","total_price":49,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":49,"vat_amount":9.8},{"name":"Unknown Product","total_price":120,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":120,"vat_amount":0},{"name":"2adx","total_price":1,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":1,"vat_amount":0},{"name":"Unknown Product","total_price":556.54,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":556.54,"vat_amount":0},{"name":".202615:07","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"DV DAHIL","total_price":4.71,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":4.71,"vat_amount":0},{"name":"%1","total_price":470.83,"vat_rate":1,"confidence":0.9,"quantity":1,"unit_price":470.83,"vat_amount":4.7083},{"name":"475.54","total_price":13.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":13.5,"vat_amount":0},{"name":"%20","total_price":67.5,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":67.5,"vat_amount":13.5},{"name":"Unknown Product","total_price":81,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":81,"vat_amount":0}]', '1783.66', '2026-02-08T21:00:00.000Z', 'C', 85, 'completed', '2026-02-11T21:49:35.086Z', '2026-02-11T21:49:35.086Z', '2026-02-11T21:49:35.101Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('6ea427ab-50e3-4193-8b77-074aaacd27d8', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'uploads\ocr\proc-1770921724086-834174050.jfif', '[{"name":".202614:32 sira","total_price":3.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":3.02,"vat_amount":0},{"name":"4 ad X","total_price":46,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":46,"vat_amount":0},{"name":"*","total_price":184,"vat_rate":18,"confidence":0.9,"quantity":1,"unit_price":184,"vat_amount":33.12},{"name":"Ba 2ad x","total_price":99,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":99,"vat_amount":0},{"name":"Unknown Product","total_price":198,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":198,"vat_amount":0},{"name":"%1","total_price":12,"vat_rate":1,"confidence":0.9,"quantity":1,"unit_price":12,"vat_amount":0.12},{"name":"Unknown Product","total_price":59.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":59.5,"vat_amount":0},{"name":"Unknown Product","total_price":11.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":11.5,"vat_amount":0},{"name":"2ad x","total_price":1,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":1,"vat_amount":0},{"name":"%20","total_price":2,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":2,"vat_amount":0.4},{"name":"x","total_price":4.93,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":4.93,"vat_amount":0},{"name":"Unknown Product","total_price":467,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":467,"vat_amount":0},{"name":"Unknown Product","total_price":467,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":467,"vat_amount":0},{"name":"POS .2026 14:33B:1794S:2595 x1393","total_price":3.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":3.02,"vat_amount":0},{"name":"DV DAHIL","total_price":4.6,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":4.6,"vat_amount":0},{"name":"%1,","total_price":460.4,"vat_rate":1,"confidence":0.9,"quantity":1,"unit_price":460.4,"vat_amount":4.604},{"name":"*465.00","total_price":0.33,"vat_rate":46,"confidence":0.9,"quantity":1,"unit_price":0.33,"vat_amount":0.15180000000000002},{"name":"%20","total_price":91.67,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":91.67,"vat_amount":18.334},{"name":"*8","total_price":2,"vat_rate":8,"confidence":0.9,"quantity":1,"unit_price":2,"vat_amount":0.16}]', '2116.97', '2026-02-01T21:00:00.000Z', 'E-Arsiv Fatura', 85, 'completed', '2026-02-12T18:42:04.085Z', '2026-02-12T18:42:04.085Z', '2026-02-12T18:42:04.144Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('c6c35ef6-2a30-4e94-8185-38af625194e1', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\expense\market\proc-1770925082087-958947147.jpeg', '[{"name":".202615:06","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"Unknown Product","total_price":206.04,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":206.04,"vat_amount":0},{"name":"3ad X","total_price":46,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":46,"vat_amount":0},{"name":"*","total_price":138,"vat_rate":13,"confidence":0.9,"quantity":1,"unit_price":138,"vat_amount":17.94},{"name":"Unknown Product","total_price":11.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":11.5,"vat_amount":0},{"name":"%20","total_price":49,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":49,"vat_amount":9.8},{"name":"Unknown Product","total_price":120,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":120,"vat_amount":0},{"name":"2adx","total_price":1,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":1,"vat_amount":0},{"name":"Unknown Product","total_price":556.54,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":556.54,"vat_amount":0},{"name":".202615:07","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"DV DAHIL","total_price":4.71,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":4.71,"vat_amount":0},{"name":"%1","total_price":470.83,"vat_rate":1,"confidence":0.9,"quantity":1,"unit_price":470.83,"vat_amount":4.7083},{"name":"475.54","total_price":13.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":13.5,"vat_amount":0},{"name":"%20","total_price":67.5,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":67.5,"vat_amount":13.5},{"name":"Unknown Product","total_price":81,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":81,"vat_amount":0}]', '1783.66', '2026-02-08T21:00:00.000Z', 'C', 85, 'confirmed', '2026-02-12T19:38:02.087Z', '2026-02-12T19:38:02.087Z', '2026-02-12T19:38:02.162Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('3eb77e88-c1c7-4afd-a4f4-7dea436464f7', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'uploads\expense\market\proc-1770925249031-974585230.jpeg', '[{"name":"YEMEK %10*2.","total_price":974.8,"vat_rate":10,"confidence":0.9,"quantity":1,"unit_price":974.8,"vat_amount":97.48},{"name":"KREDI *2.","total_price":974.8,"vat_rate":2,"confidence":0.9,"quantity":1,"unit_price":974.8,"vat_amount":19.496},{"name":"BU ISLEN TEHASSIZ BIR KART ILE 2.TL","total_price":974.8,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":974.8,"vat_amount":0}]', '974.80', '2026-01-23T21:00:00.000Z', 'KiRECBURNU FIRIN GIDA', 85, 'confirmed', '2026-02-12T19:40:49.030Z', '2026-02-12T19:40:49.030Z', '2026-02-12T19:40:49.080Z', [object Object]);
INSERT INTO ocr_records (id, user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status, created_at, updated_at, processed_at, validation_summary) VALUES ('a164944e-f29f-46fe-9ba0-7edfaee33df1', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'uploads\ocr\proc-1771158597114-898334565.jpg', NULL, NULL, NULL, NULL, NULL, 'failed', '2026-02-15T12:29:57.108Z', '2026-02-15T12:29:57.108Z', NULL, NULL);

-- Table: orders (59 rows)
TRUNCATE TABLE orders CASCADE;
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('22df252f-f43b-4d2b-96d0-3af64944fa4e', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-230732-11', NULL, '[{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","type":"product","price":200,"quantity":1,"discount_percent":25},{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","type":"product","price":500,"quantity":1,"discount_percent":0}]', '650.00', 'completed', '', '2026-02-15T21:00:30.732Z', '2026-02-15T21:01:03.668Z', NULL, NULL, 'Misafir', NULL, NULL, NULL, NULL, NULL, '2026-02-15T21:01:03.668Z', 'takeaway', '700.00', '50.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('b4504a48-f450-446b-a8d8-06b7b9fb0fe8', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-823936', 'Masa 1', '[{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1},{"id":"d21a8c5b-659a-454e-8b39-f2d42566fe42","name":"Kola","price":50,"quantity":1}]', '370.00', 'completed', NULL, '2026-02-15T21:24:50.109Z', '2026-02-15T21:25:30.536Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-15T21:25:30.536Z', 'dine-in', '0.00', '0.00', '1ee9a90f-7b0b-4cdf-857f-3ff796fb0f95', 'TBL-BMNGMJ');
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('74639d15-fd02-4849-a090-818f1736f117', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-863226', 'Masa 1', '[{"id":"90432b31-042a-4972-9c80-28f3e98fc5b2","name":"test","price":4321,"quantity":1},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1},{"id":"d21a8c5b-659a-454e-8b39-f2d42566fe42","name":"Kola","price":50,"quantity":1}]', '4491.00', 'completed', NULL, '2026-02-15T21:03:30.849Z', '2026-02-15T21:07:53.360Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-15T21:07:53.360Z', 'dine-in', '0.00', '0.00', '1ee9a90f-7b0b-4cdf-857f-3ff796fb0f95', 'TBL-BMNGMJ');
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('f2fc7619-e127-441b-a856-5487ea42d691', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-520480', 'Masa 1', '[{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1},{"id":"d21a8c5b-659a-454e-8b39-f2d42566fe42","name":"Kola","price":50,"quantity":1},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1}]', '370.00', 'completed', NULL, '2026-02-15T21:08:03.792Z', '2026-02-15T21:09:45.389Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-15T21:09:45.389Z', 'dine-in', '0.00', '0.00', '1ee9a90f-7b0b-4cdf-857f-3ff796fb0f95', 'TBL-BMNGMJ');
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('2e231125-6d96-4c86-9a9d-cbd48fb3d182', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-746608', 'Masa 1', '[{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1},{"id":"d21a8c5b-659a-454e-8b39-f2d42566fe42","name":"Kola","price":50,"quantity":1}]', '370.00', 'rejected', NULL, '2026-02-15T21:14:51.088Z', '2026-02-15T21:18:16.251Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-15T21:18:16.251Z', 'dine-in', '0.00', '0.00', '1ee9a90f-7b0b-4cdf-857f-3ff796fb0f95', 'TBL-BMNGMJ');
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('ec257d08-3925-4dc2-ae0b-28ddcbddf85b', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-374862', 'Masa 1', '[{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":3},{"id":"d21a8c5b-659a-454e-8b39-f2d42566fe42","name":"Kola","price":50,"quantity":4},{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":7},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":3}]', '4660.00', 'completed', NULL, '2026-02-14T20:02:17.881Z', '2026-02-14T20:46:44.657Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-14T20:46:44.657Z', 'dine-in', '0.00', '0.00', '1ee9a90f-7b0b-4cdf-857f-3ff796fb0f95', 'TBL-BMNGMJ');
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('5ee3c6c1-ac4a-472f-a741-cd0c96f161ef', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-416949', 'Masa 2', '[{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1},{"id":"d21a8c5b-659a-454e-8b39-f2d42566fe42","name":"Kola","price":50,"quantity":1},{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":1}]', '670.00', 'completed', NULL, '2026-02-15T21:21:51.886Z', '2026-02-15T21:22:52.508Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-15T21:22:52.508Z', 'dine-in', '0.00', '0.00', '505c6c9c-8b62-44e7-88a9-c831f2d4fd05', 'TBL-PJGK69');
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('98569f1d-3624-42a3-9431-4e929a7630ab', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-645896', 'Masa 1', '[{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1},{"id":"d21a8c5b-659a-454e-8b39-f2d42566fe42","name":"Kola","price":50,"quantity":1}]', '370.00', 'completed', NULL, '2026-02-15T20:53:25.989Z', '2026-02-15T20:54:15.816Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-15T20:54:15.816Z', 'dine-in', '0.00', '0.00', '1ee9a90f-7b0b-4cdf-857f-3ff796fb0f95', 'TBL-BMNGMJ');
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('a8f0cf4d-2742-4194-8bba-eecb2cdb3524', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-858947', 'Masa 1', '[{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1},{"id":"d21a8c5b-659a-454e-8b39-f2d42566fe42","name":"Kola","price":50,"quantity":1},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1}]', '370.00', 'completed', NULL, '2026-02-15T21:23:07.339Z', '2026-02-15T21:23:23.087Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-15T21:23:23.087Z', 'dine-in', '0.00', '0.00', '1ee9a90f-7b0b-4cdf-857f-3ff796fb0f95', 'TBL-BMNGMJ');
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('4d7dbca6-bebb-486f-a7b3-16975bd52603', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-868966', 'Masa 2', '[{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":1},{"id":"d21a8c5b-659a-454e-8b39-f2d42566fe42","name":"Kola","price":50,"quantity":1}]', '550.00', 'completed', NULL, '2026-02-15T21:27:11.677Z', '2026-02-15T21:27:23.041Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-15T21:27:23.041Z', 'dine-in', '0.00', '0.00', '505c6c9c-8b62-44e7-88a9-c831f2d4fd05', 'TBL-PJGK69');
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('fe171d5d-bc72-4188-b076-46c532669143', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-272215', 'Masa 1', '[{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1},{"id":"d21a8c5b-659a-454e-8b39-f2d42566fe42","name":"Kola","price":50,"quantity":1},{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":1}]', '669.00', 'completed', NULL, '2026-02-15T21:27:47.322Z', '2026-02-15T21:29:46.065Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-15T21:29:46.065Z', 'dine-in', '0.00', '1.00', '1ee9a90f-7b0b-4cdf-857f-3ff796fb0f95', 'TBL-BMNGMJ');
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('af6ee05d-b291-4ac7-a3bd-d0628ba317b7', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-352097', 'Masa 1', '[{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1},{"id":"d21a8c5b-659a-454e-8b39-f2d42566fe42","name":"Kola","price":50,"quantity":1}]', '367.00', 'completed', NULL, '2026-02-15T21:29:58.415Z', '2026-02-15T21:30:09.478Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-15T21:30:09.478Z', 'dine-in', '0.00', '3.00', '1ee9a90f-7b0b-4cdf-857f-3ff796fb0f95', 'TBL-BMNGMJ');
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('dae17e3f-0376-410f-92c0-a6a12214b624', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-945318-2', '', '[{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":1},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":2},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":2}]', '1140.00', 'rejected', '', '2026-02-09T06:52:25.319Z', '2026-02-09T06:52:38.060Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-12T20:31:42.633Z', 'dine-in', NULL, '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('9b551920-e102-4d3e-9ab7-627c41197a52', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-795565-59', 'Caner Okcuoğlu', '[{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":2},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":2},{"id":"d21a8c5b-659a-454e-8b39-f2d42566fe42","name":"Kola","price":50,"quantity":2}]', '1500.00', 'completed', 'Test', '2026-02-09T06:33:15.566Z', '2026-02-09T06:55:02.716Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-12T20:31:42.633Z', 'dine-in', NULL, '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('3e03877a-cf93-4b68-804a-d16eedf12760', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-787962-18', 'Masa Test', '[{"id":"024d0a94-a724-43a7-ba05-6ddc6981b97b","name":"Test Product","price":100,"quantity":2}]', '200.00', 'pending', 'Test Sipariş Script', '2026-02-09T06:33:07.963Z', '2026-02-09T06:33:07.963Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-12T20:31:42.633Z', 'dine-in', NULL, '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('35efef92-c49a-4781-8138-8913c1522695', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-332337', 'Masa 2', '[{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":1},{"id":"d21a8c5b-659a-454e-8b39-f2d42566fe42","name":"Kola","price":50,"quantity":1}]', '550.00', 'completed', NULL, '2026-02-15T20:53:32.372Z', '2026-02-15T20:54:22.553Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-15T20:54:22.553Z', 'dine-in', '0.00', '0.00', '505c6c9c-8b62-44e7-88a9-c831f2d4fd05', 'TBL-PJGK69');
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('b53593de-758d-429a-bbb4-c8b7421b98c0', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-890306', 'Masa 2', '[{"id":"2da00c9f-522b-403b-926d-04e89c670125","name":"Su","price":10,"quantity":1},{"id":"ffaa46c8-4046-4986-a49b-77fdf4a727c1","name":"Soda","price":20,"quantity":1}]', '30.00', 'completed', NULL, '2026-02-15T21:03:59.202Z', '2026-02-15T21:07:48.986Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-15T21:07:48.986Z', 'dine-in', '0.00', '0.00', '505c6c9c-8b62-44e7-88a9-c831f2d4fd05', 'TBL-PJGK69');
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('e1fac8ac-7608-4668-b84c-2e4d71e1752c', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-759307-3', 'Caner Okcuoğlu', '[{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":1},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":2},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1},{"id":"ffaa46c8-4046-4986-a49b-77fdf4a727c1","name":"Soda","price":20,"quantity":2},{"id":"0a947cc9-9682-45b6-9819-c6aceeac7260","name":"Paçanga","price":200,"quantity":1}]', '1180.00', 'completed', 'Test', '2026-02-09T06:32:39.308Z', '2026-02-09T06:55:19.150Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-12T20:30:31.952Z', 'dine-in', NULL, '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('275243c4-a02e-48c8-afcf-1d0180a22e8a', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-162600-28', '', '[{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":2},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":2},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":3}]', '1760.00', 'completed', '', '2026-02-09T06:56:02.603Z', '2026-02-09T06:56:46.002Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-12T20:31:42.633Z', 'dine-in', NULL, '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('09c97213-441e-447c-9ac4-8a83a30a18a0', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'TEST-ORD-1', 'T1', '[]', '100.00', 'completed', 'Test', '2026-02-09T07:50:08.194Z', '2026-02-09T07:54:55.433Z', NULL, 'df7432ad-d243-45d5-a2d1-4c8c80752484', 'Test Customer', '5551234567', 'Addr', NULL, NULL, NULL, '2026-02-12T20:31:42.633Z', 'dine-in', NULL, '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('8fa192bd-5789-4d2b-b20a-34b3ba52c1d4', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-679219-82', '', '[{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":1},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1}]', '700.00', 'completed', '', '2026-02-09T07:54:39.219Z', '2026-02-09T07:55:01.780Z', NULL, NULL, '', '', '', NULL, NULL, NULL, '2026-02-12T20:31:42.633Z', 'dine-in', NULL, '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('af9dd4d3-5edd-4b73-aa20-9e34ea952fc0', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-806278-88', '', '[{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":3},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":3}]', '2100.00', 'completed', '', '2026-02-09T08:13:26.279Z', '2026-02-09T08:13:39.950Z', NULL, '93b3f5b1-68bd-423a-af74-684d9243c9e1', 'Caner2', '5309022660', 'Test', 'İstanbul', 'Beşiktaş', 'Dikilitaş', '2026-02-12T20:31:42.633Z', 'dine-in', NULL, '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('b980c425-8c6d-443b-865b-9fa7a535c36e', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-732812-48', '', '[{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":2},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1}]', '1200.00', 'completed', '', '2026-02-09T07:55:32.814Z', '2026-02-09T08:13:44.262Z', NULL, '93b3f5b1-68bd-423a-af74-684d9243c9e1', 'Caner Okcuoğlu', '5309022660', 'Dikilitaş', NULL, NULL, NULL, '2026-02-12T20:31:42.633Z', 'dine-in', NULL, '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('5460c2d7-0911-434b-96ef-b9540f8fe1ff', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-891689-9', '', '[{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":3},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":3}]', '2060.00', 'completed', '', '2026-02-09T12:24:51.691Z', '2026-02-09T12:25:35.086Z', NULL, NULL, '', '', '', '', '', '', '2026-02-12T20:31:42.633Z', 'dine-in', NULL, '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('c46a2f40-0eee-45f3-9bb4-bc15b350d1af', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-988096-26', '', '[{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":1},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":3}]', '1060.00', 'rejected', '', '2026-02-09T12:26:28.096Z', '2026-02-09T20:00:13.241Z', NULL, NULL, '', '', '', '', '', '', '2026-02-12T20:31:42.633Z', 'dine-in', NULL, '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('05d14667-d401-4878-8503-287ece2f7063', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-872874-46', '', '[{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":2},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1}]', '1200.00', 'rejected', '', '2026-02-09T08:14:32.874Z', '2026-02-09T20:00:15.842Z', NULL, 'e21eaf99-2417-4de2-9f51-6dcd72b757fd', 'Caner3', '5309022661', 'Test', 'İstanbul', 'Beşiktaş', 'Dikilitaş', '2026-02-12T20:31:42.633Z', 'dine-in', NULL, '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('1769111c-15b3-4abb-aa0d-2e9bd5b3d409', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-853983-40', '', '[{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":2},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":2}]', '1400.00', 'rejected', '', '2026-02-09T08:14:13.983Z', '2026-02-09T20:00:19.506Z', NULL, 'e21eaf99-2417-4de2-9f51-6dcd72b757fd', 'Caner2', '5309022661', 'Test', 'İstanbul', 'Beşiktaş', 'Dikilitaş', '2026-02-12T20:31:42.633Z', 'dine-in', NULL, '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('cc3927d3-c1c1-42ca-a913-81185f6a6158', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-188016-41', '', '[{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":2}]', '1000.00', 'completed', '', '2026-02-10T18:29:48.017Z', '2026-02-10T18:30:13.985Z', NULL, NULL, '', '', '', '', '', '', '2026-02-12T20:31:42.633Z', 'dine-in', NULL, '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('54812d86-90c3-4921-9fdc-dbdd0f8f5726', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-571384-68', '', '[{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":1},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":3}]', '1100.00', 'completed', '', '2026-02-10T18:36:11.385Z', '2026-02-10T18:36:30.859Z', NULL, NULL, '', '', '', '', '', '', '2026-02-12T20:31:42.633Z', 'dine-in', NULL, '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('bd0dff88-7964-4048-bdb6-71cfaf6004ef', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-206061-90', '', '[{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":2}]', '1000.00', 'completed', '', '2026-02-10T18:46:46.062Z', '2026-02-10T18:46:59.919Z', NULL, NULL, '', '', '', '', '', '', '2026-02-12T20:31:42.633Z', 'dine-in', NULL, '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('77496051-84d3-4b83-8f70-a02718e25a75', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-869673-63', '', '[{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":2}]', '400.00', 'completed', '', '2026-02-10T18:57:49.673Z', '2026-02-10T18:58:32.063Z', NULL, NULL, '', '', '', '', '', '', '2026-02-12T20:31:42.633Z', 'dine-in', NULL, '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('98864c38-483e-417e-9eac-1df185b994be', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-150665-60', '', '[{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1}]', '320.00', 'completed', '', '2026-02-10T19:02:30.666Z', '2026-02-10T19:02:41.388Z', NULL, NULL, '', '', '', '', '', '', '2026-02-12T20:31:42.633Z', 'dine-in', NULL, '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('5d17b848-3604-47fa-b04a-c07414d3564f', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-088787-12', '', '[{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":2}]', '1000.00', 'completed', '', '2026-02-10T19:18:08.787Z', '2026-02-10T19:18:27.178Z', NULL, NULL, '', '', '', '', '', '', '2026-02-12T20:31:42.633Z', 'dine-in', NULL, '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('1141012f-eab3-42d9-ba91-eaa4b265570d', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'TEST-1770926927077', 'Masa 5', '[{"name":"Test Ürün 1","price":50,"quantity":2},{"name":"Test Ürün 2","price":30,"quantity":1}]', '130.00', 'completed', NULL, '2026-02-11T20:08:47.077Z', '2026-02-12T20:08:47.079Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-12T20:31:42.633Z', 'dine-in', NULL, '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('02dc68d7-6f0d-4b61-9669-c42a7eeb908a', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-245083', 'Masa 2', '[{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":2},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":2},{"id":"d21a8c5b-659a-454e-8b39-f2d42566fe42","name":"Kola","price":50,"quantity":2},{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":1}]', '1240.00', 'completed', NULL, '2026-02-14T20:03:45.481Z', '2026-02-14T20:46:39.052Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-14T20:46:39.052Z', 'dine-in', '0.00', '0.00', '505c6c9c-8b62-44e7-88a9-c831f2d4fd05', 'TBL-PJGK69');
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('886b23c3-8785-4305-b6f7-5eecd89fb0ea', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-842580-27', NULL, '[{"id":"b8a18152-d22b-4c36-b62b-0a3b6e1cff87","name":"test","type":"campaign","price":220,"quantity":1,"campaign_price":198}]', '198.00', 'completed', '', '2026-02-15T20:54:02.580Z', '2026-02-15T20:54:24.892Z', NULL, NULL, 'Misafir', NULL, NULL, NULL, NULL, NULL, '2026-02-15T20:54:24.892Z', 'takeaway', '220.00', '22.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('97a33beb-6fa1-41c0-9423-51270ac08d8d', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-375993-38', '', '[{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":2},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1}]', '1200.00', 'completed', '', '2026-02-12T20:32:55.994Z', '2026-02-12T20:33:09.104Z', NULL, NULL, '', '', '', '', '', '', '2026-02-13T01:00:00.081Z', 'dine-in', NULL, '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('753d5807-401a-4d08-8559-d3959034524b', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-401830-48', '', '[{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1}]', '320.00', 'completed', '', '2026-02-13T11:16:41.830Z', '2026-02-13T11:23:06.811Z', NULL, NULL, '', '', '', '', '', '', '2026-02-13T11:23:06.811Z', 'dine-in', NULL, '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('c5ee9a30-db46-40fb-aafb-b796ce732bcd', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-774321-11', '', '[{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1,"discount_percent":0},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1,"discount_percent":0}]', '320.00', 'completed', '', '2026-02-13T11:22:54.321Z', '2026-02-13T11:31:37.659Z', NULL, NULL, '', '', '', '', '', '', '2026-02-13T11:31:37.659Z', 'dine-in', '320.00', '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('532b5d98-0992-4c18-95a5-7e5362daf585', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-305829-33', '', '[{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1,"discount_percent":25},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1,"discount_percent":10}]', '258.00', 'completed', '', '2026-02-13T11:31:45.830Z', '2026-02-13T11:33:41.413Z', NULL, NULL, '', '', '', '', '', '', '2026-02-13T11:33:41.413Z', 'takeaway', '320.00', '62.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('ca22cfcc-63d4-4532-9132-a435415f9dc7', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-577226-94', '', '[{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1,"discount_percent":25},{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":1,"discount_percent":0},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1,"discount_percent":10}]', '758.00', 'completed', '', '2026-02-13T11:36:17.226Z', '2026-02-13T11:36:36.404Z', NULL, NULL, '', '', '', '', '', '', '2026-02-13T11:36:36.404Z', 'takeaway', '820.00', '62.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('27634d5a-5334-443c-8f8c-e6cb20875c5e', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-498099-75', '', '[{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":2}]', '440.00', 'completed', '', '2026-02-12T22:14:58.099Z', '2026-02-12T22:15:37.155Z', NULL, NULL, '', '', '', '', '', '', '2026-02-13T11:39:12.593Z', 'dine-in', NULL, '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('b6a7f2db-52d9-445f-91ba-23cc0318bcc9', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-676696-96', '', '[{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1}]', '320.00', 'completed', '', '2026-02-12T23:07:56.696Z', '2026-02-12T23:08:14.304Z', NULL, NULL, '', '', '', '', '', '', '2026-02-13T11:39:12.593Z', 'dine-in', NULL, '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('c996e9d9-e82c-41bb-a691-6996349fbddb', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-830617-32', '', '[{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1,"discount_percent":25},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1,"discount_percent":10}]', '258.00', 'completed', '', '2026-02-13T11:40:30.617Z', '2026-02-13T11:40:46.350Z', NULL, NULL, '', '', '', '', '', '', '2026-02-13T11:40:46.350Z', 'takeaway', '320.00', '62.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('cbe074d3-88e6-49c4-9a56-beddda261ec7', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-903378-14', '', '[{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1,"discount_percent":25},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1,"discount_percent":10}]', '258.00', 'completed', '', '2026-02-13T11:41:43.378Z', '2026-02-13T11:41:52.363Z', NULL, NULL, '', '', '', '', '', '', '2026-02-13T11:41:52.363Z', 'takeaway', '320.00', '62.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('4421fbc7-d7cc-403a-9143-be2f6981d459', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-944693-33', '', '[{"id":"b8a18152-d22b-4c36-b62b-0a3b6e1cff87","name":"test","type":"campaign","price":220,"quantity":1,"campaign_price":198}]', '198.00', 'completed', '', '2026-02-13T11:59:04.694Z', '2026-02-13T11:59:28.486Z', NULL, NULL, '', '', '', '', '', '', '2026-02-13T11:59:28.486Z', 'takeaway', '220.00', '22.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('42713608-f439-48de-b143-966d7c233797', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-139292-94', NULL, '[{"id":"80979d45-4fb5-4a0c-9bd2-4b4cbd4ff513","name":"Öğle Menusu","type":"campaign","price":212,"quantity":1,"campaign_price":169.60000000000002}]', '169.60', 'completed', '', '2026-02-13T20:55:39.293Z', '2026-02-13T20:55:54.126Z', NULL, NULL, 'Misafir', NULL, NULL, NULL, NULL, NULL, '2026-02-13T20:55:54.126Z', 'takeaway', '212.00', '42.40', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('cbe9e55b-3722-4816-ba2b-03782e9267ba', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-635611-15', NULL, '[{"id":"90432b31-042a-4972-9c80-28f3e98fc5b2","name":"test","type":"product","price":4321,"quantity":2,"discount_percent":0},{"id":"bbbf24d5-2717-4745-a5b9-8906ac8f1c40","name":"testtttttt","type":"product","price":123,"quantity":1,"discount_percent":0},{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","type":"product","price":500,"quantity":2,"discount_percent":0}]', '9765.00', 'rejected', '', '2026-02-13T20:30:35.611Z', '2026-02-13T20:55:57.772Z', NULL, NULL, 'Misafir', NULL, NULL, NULL, NULL, NULL, '2026-02-13T20:55:57.772Z', 'dine-in', '9765.00', '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('755139bb-87e8-459c-bb18-806aa02bb346', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-779725', NULL, '[]', '0.00', 'rejected', NULL, '2026-02-13T20:50:20.923Z', '2026-02-14T08:14:31.652Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-14T08:14:31.652Z', 'dine-in', NULL, '0.00', '505c6c9c-8b62-44e7-88a9-c831f2d4fd05', 'TBL-PJGK69');
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('a1c61d36-6594-45ab-ad59-ba8ba86d8313', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-856406', NULL, '[]', '0.00', 'rejected', NULL, '2026-02-13T20:27:21.135Z', '2026-02-14T08:14:33.635Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-14T08:14:33.635Z', 'dine-in', NULL, '0.00', '1ee9a90f-7b0b-4cdf-857f-3ff796fb0f95', 'TBL-BMNGMJ');
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('5c195679-9110-489e-b690-7c0a2a1910c0', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-390791', 'Masa 1', '[{"id":"179d6eda-a6a9-4655-96ee-f5e5e240657c","name":"test","price":12,"quantity":5}]', '60.00', 'completed', NULL, '2026-02-15T21:44:34.088Z', '2026-02-15T21:44:39.584Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-15T21:44:39.584Z', 'dine-in', '0.00', '0.00', '1ee9a90f-7b0b-4cdf-857f-3ff796fb0f95', 'TBL-BMNGMJ');
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('0a831ff4-ca9a-4c50-b1fd-1c260648b024', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-526711', 'Masa 1', '[{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1},{"id":"d21a8c5b-659a-454e-8b39-f2d42566fe42","name":"Kola","price":50,"quantity":1}]', '370.00', 'completed', NULL, '2026-02-15T21:33:57.387Z', '2026-02-15T21:34:02.283Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-15T21:34:02.283Z', 'dine-in', '0.00', '0.00', '1ee9a90f-7b0b-4cdf-857f-3ff796fb0f95', 'TBL-BMNGMJ');
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('5a500b24-08af-4308-86d2-5e7668078667', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-264924', 'Masa 2', '[{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1},{"id":"d21a8c5b-659a-454e-8b39-f2d42566fe42","name":"Kola","price":50,"quantity":1}]', '370.00', 'completed', NULL, '2026-02-15T21:35:37.834Z', '2026-02-15T21:35:46.046Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-15T21:35:46.046Z', 'dine-in', '0.00', '0.00', '505c6c9c-8b62-44e7-88a9-c831f2d4fd05', 'TBL-PJGK69');
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('bb54e585-9e14-41d4-8f59-232b550acf2d', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-656480', 'Masa 1', '[{"id":"179d6eda-a6a9-4655-96ee-f5e5e240657c","name":"test","price":12,"quantity":1}]', '12.00', 'completed', NULL, '2026-02-15T21:37:58.125Z', '2026-02-15T21:38:04.351Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-15T21:38:04.351Z', 'dine-in', '0.00', '0.00', '1ee9a90f-7b0b-4cdf-857f-3ff796fb0f95', 'TBL-BMNGMJ');
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('c5cfcce6-460d-41ae-b886-6d8603101028', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-880329', 'Masa 1', '[{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":1},{"id":"d21a8c5b-659a-454e-8b39-f2d42566fe42","name":"Kola","price":50,"quantity":1},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1}]', '670.00', 'completed', NULL, '2026-02-15T21:38:28.535Z', '2026-02-15T21:38:45.483Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-15T21:38:45.483Z', 'dine-in', '0.00', '0.00', '1ee9a90f-7b0b-4cdf-857f-3ff796fb0f95', 'TBL-BMNGMJ');
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('720a075d-f0bd-450c-ae64-5e1b8db9f7fc', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-633730', 'Masa 1', '[{"id":"ffaa46c8-4046-4986-a49b-77fdf4a727c1","name":"Soda","price":20,"quantity":5}]', '100.00', 'completed', NULL, '2026-02-15T21:45:16.247Z', '2026-02-15T21:45:23.255Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-15T21:45:23.255Z', 'dine-in', '0.00', '0.00', '1ee9a90f-7b0b-4cdf-857f-3ff796fb0f95', 'TBL-BMNGMJ');
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('ee1b12d6-e470-4cd3-b540-3b9654912bac', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'ORD-288081-53', '', '[{"id":"0a55c683-512e-44a8-a60d-cfb3b68b0607","name":"Kamelya","price":300,"quantity":1},{"id":"044bf12a-bf84-49d0-b166-f60791cc3e71","name":"Nevra","price":335,"quantity":2}]', '970.00', 'completed', '', '2026-02-12T19:08:08.082Z', '2026-02-12T19:08:41.584Z', NULL, NULL, '', '', '', '', '', '', '2026-02-12T22:00:00.085Z', 'dine-in', NULL, '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('62fa2598-4727-4493-951b-112a71a5954c', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'ORD-237800-9', '', '[{"id":"0a55c683-512e-44a8-a60d-cfb3b68b0607","name":"Kamelya","price":300,"quantity":2},{"id":"044bf12a-bf84-49d0-b166-f60791cc3e71","name":"Nevra","price":335,"quantity":3},{"id":"e2372372-d858-4cb6-aa86-be63c4f2bc39","name":"Süsen","price":335,"quantity":1}]', '1940.00', 'rejected', 'Hızı gelsin', '2026-02-09T12:47:17.800Z', '2026-02-12T18:44:29.159Z', NULL, 'fcf5407d-dea3-4420-8a6d-64c44d6637d3', 'Caner Okcuoğlu ', '5309022660', 'Dödkxm', 'İstanbul', 'Beşiktaş', 'Dikilitaş', '2026-02-12T17:31:42.633Z', 'dine-in', NULL, '0.00', NULL, NULL);
INSERT INTO orders (id, user_id, order_number, table_number, items, total_amount, status, note, created_at, updated_at, deleted_at, customer_id, customer_name, customer_phone, customer_address, customer_city, customer_district, customer_neighborhood, archived_at, order_type, base_amount, discount_amount, table_id, table_code) VALUES ('f36762d6-58b4-49a1-8b14-0e489d4ad2af', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ORD-144278', 'Masa 1', '[{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1},{"id":"d21a8c5b-659a-454e-8b39-f2d42566fe42","name":"Kola","price":50,"quantity":1}]', '370.00', 'completed', NULL, '2026-02-16T18:27:31.968Z', '2026-02-16T20:16:33.672Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-16T20:16:33.672Z', 'dine-in', '0.00', '0.00', '1ee9a90f-7b0b-4cdf-857f-3ff796fb0f95', 'TBL-BMNGMJ');

-- Table: products (60 rows)
TRUNCATE TABLE products CASCADE;
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('2da00c9f-522b-403b-926d-04e89c670125', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Su', '10.00', NULL, 'bg-white', TRUE, '2026-01-29T21:53:18.787Z', NULL, '01278280-fb38-4e93-a042-d7967cd9fde4', 0, NULL, '2026-01-29T21:53:18.787Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('ffaa46c8-4046-4986-a49b-77fdf4a727c1', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Soda', '20.00', NULL, 'bg-white', TRUE, '2026-01-29T21:53:30.575Z', NULL, '01278280-fb38-4e93-a042-d7967cd9fde4', 1, '', '2026-01-29T21:53:30.575Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('5af0b94d-d49c-472d-a068-6640afbbd6f7', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Pilav', '120.00', NULL, 'bg-white', TRUE, '2026-02-08T19:47:51.441Z', '/uploads/be8b8541-f427-4287-a00b-a0e9783e5209/production/1770581132761-26870301.jpg', '80225371-fb1d-4e2f-a508-dd0c7e802440', 0, '', '2026-02-08T19:47:51.441Z', '10.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('d21a8c5b-659a-454e-8b39-f2d42566fe42', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Kola', '50.00', NULL, 'bg-white', TRUE, '2026-01-29T21:53:02.647Z', '/uploads/be8b8541-f427-4287-a00b-a0e9783e5209/production/1769723582649-879321100.jpg', '01278280-fb38-4e93-a042-d7967cd9fde4', 2, '', '2026-01-29T21:53:02.647Z', '3.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('e34e35a8-7e77-4e92-a90e-98c37058324c', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Lüfer', '500.00', NULL, 'bg-white', TRUE, '2026-01-29T21:51:58.299Z', '/uploads/be8b8541-f427-4287-a00b-a0e9783e5209/production/1770581107330-573958017.jpg', 'e06cbb09-c0ad-4d7d-9ad3-73bc2ac01aec', 0, 'Balık, Roka,Limon. Balık ızgarada yapılmaktadır.', '2026-01-29T21:51:58.299Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('e2372372-d858-4cb6-aa86-be63c4f2bc39', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Süsen', '335.00', NULL, 'bg-white', TRUE, '2026-02-09T12:42:40.505Z', '/uploads/e0bce7e4-a9a2-4c0e-9841-e11cea1cff57/production/1770641160407-555804081.jpg', '9c1b29f6-10fb-4e92-b54c-ece79b2f46ad', 3, 'Taze çilek , muz arasına Fransız Bisküvisi ve Belçika çikolatası ile
', '2026-02-09T12:42:40.505Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('bf5ea433-e823-4f80-8c7a-e0d216edb82f', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Begonya', '335.00', NULL, 'bg-white', TRUE, '2026-02-09T12:38:37.929Z', NULL, '9c1b29f6-10fb-4e92-b54c-ece79b2f46ad', 4, 'Islak kek üzerinde özel kreması ve böğürtlen, yanında çilek, muz parçaları üzerine lotus bisküvisi ve Belçika çikolatası', '2026-02-09T12:38:37.929Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('60f98dfe-f3eb-4bd3-b3c1-6b803bb7e612', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Manolya', '310.00', NULL, 'bg-white', TRUE, '2026-02-10T19:10:42.034Z', '/uploads/e0bce7e4-a9a2-4c0e-9841-e11cea1cff57/production/1770750672349-965858047.jpg', '9c1b29f6-10fb-4e92-b54c-ece79b2f46ad', 6, 'Özel magnolia kreması taze çilek ,muz parçaları ve üzerine belçika çikolatası', '2026-02-10T19:10:42.034Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('ded948e7-dd54-4f8b-a46c-0fbef9afd547', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Çikolatalı Kruvasan', '285.00', NULL, 'bg-white', TRUE, '2026-02-10T19:12:36.588Z', '/uploads/e0bce7e4-a9a2-4c0e-9841-e11cea1cff57/production/1770816442919-858292063.jpg', '9c1b29f6-10fb-4e92-b54c-ece79b2f46ad', 12, '', '2026-02-10T19:12:36.588Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('e67d3c7a-6125-4f50-be6f-6ebdb34134e5', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Çilek Kruvasan', '305.00', NULL, 'bg-white', TRUE, '2026-02-10T19:12:45.979Z', '/uploads/e0bce7e4-a9a2-4c0e-9841-e11cea1cff57/production/1770816429629-220234802.jpg', '9c1b29f6-10fb-4e92-b54c-ece79b2f46ad', 10, 'Özel kreması taze çilek dilimleri ve Belçika çikotalası ile', '2026-02-10T19:12:45.979Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('e6c13932-2f7b-4741-82b8-f7f68195ede7', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Kruvasan', '260.00', NULL, 'bg-white', TRUE, '2026-02-10T19:12:19.436Z', NULL, '9c1b29f6-10fb-4e92-b54c-ece79b2f46ad', 8, '', '2026-02-10T19:12:19.436Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('4f6c2669-74d5-40d7-8404-55614750b3c4', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Kare Waffle', '305.00', NULL, 'bg-white', TRUE, '2026-02-10T19:12:02.111Z', NULL, '9c1b29f6-10fb-4e92-b54c-ece79b2f46ad', 9, '', '2026-02-10T19:12:02.111Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('4a9c492a-4a8a-4d46-9cdd-c615a61bf318', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'ESPRESSO', '90.00', NULL, 'bg-white', TRUE, '2026-02-11T11:09:34.666Z', NULL, '1d75df37-0c6a-44a1-a528-36a876c28f51', 1, NULL, '2026-02-11T11:09:34.666Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('c926b0c3-270e-40a0-8d56-db2dbb550ef8', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'DOUBLE ESPRESSO', '95.00', NULL, 'bg-white', TRUE, '2026-02-11T11:09:52.919Z', NULL, '1d75df37-0c6a-44a1-a528-36a876c28f51', 2, NULL, '2026-02-11T11:09:52.919Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('a2f054b6-0eb7-47a8-aa5b-d9f8f2c8ed04', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'AMERICANO', '125.00', NULL, 'bg-white', TRUE, '2026-02-11T11:10:06.384Z', NULL, '1d75df37-0c6a-44a1-a528-36a876c28f51', 3, NULL, '2026-02-11T11:10:06.384Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('f529e9c4-ea3a-442d-b9a1-350e7f4ddb9c', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'MACCHIATO', '120.00', NULL, 'bg-white', TRUE, '2026-02-11T11:10:21.201Z', NULL, '1d75df37-0c6a-44a1-a528-36a876c28f51', 4, NULL, '2026-02-11T11:10:21.201Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('72cbe2ff-af06-4058-b612-96562c72e77b', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'CORTADO', '130.00', NULL, 'bg-white', TRUE, '2026-02-11T11:10:30.527Z', NULL, '1d75df37-0c6a-44a1-a528-36a876c28f51', 5, NULL, '2026-02-11T11:10:30.527Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('cef65d01-5967-4628-8eb6-1218014b1db4', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'FLAT WHITE', '130.00', NULL, 'bg-white', TRUE, '2026-02-11T11:10:43.740Z', NULL, '1d75df37-0c6a-44a1-a528-36a876c28f51', 6, NULL, '2026-02-11T11:10:43.740Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('2bc58ecb-cea3-4ae5-bdce-572c54d2be5b', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'CAPPUCINO', '135.00', NULL, 'bg-white', TRUE, '2026-02-11T11:10:58.183Z', NULL, '1d75df37-0c6a-44a1-a528-36a876c28f51', 7, NULL, '2026-02-11T11:10:58.183Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('e64e7cde-1691-45cc-a8e9-114b315bad9b', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'NUT LATTE', '140.00', NULL, 'bg-white', TRUE, '2026-02-11T11:11:09.378Z', NULL, '1d75df37-0c6a-44a1-a528-36a876c28f51', 8, NULL, '2026-02-11T11:11:09.378Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('e8b80f5f-ae12-4953-9ef6-c8bc157c10f2', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'CARAMEL LATTE', '140.00', NULL, 'bg-white', TRUE, '2026-02-11T11:11:20.567Z', NULL, '1d75df37-0c6a-44a1-a528-36a876c28f51', 9, NULL, '2026-02-11T11:11:20.567Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('0a947cc9-9682-45b6-9819-c6aceeac7260', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Paçanga', '200.00', NULL, 'bg-white', TRUE, '2026-01-30T19:48:40.176Z', NULL, '51453b73-f4db-410e-8948-5911c3e4fee7', 0, NULL, '2026-01-30T19:48:40.176Z', '10.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'KuruFasulye', '200.00', NULL, 'bg-white', TRUE, '2026-02-08T19:48:02.669Z', '/uploads/be8b8541-f427-4287-a00b-a0e9783e5209/production/1770581122880-969168095.jpg', '80225371-fb1d-4e2f-a508-dd0c7e802440', 0, '', '2026-02-08T19:48:02.669Z', '25.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('179d6eda-a6a9-4655-96ee-f5e5e240657c', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'test', '12.00', NULL, 'bg-white', TRUE, '2026-02-11T11:18:52.935Z', NULL, '01278280-fb38-4e93-a042-d7967cd9fde4', 0, NULL, '2026-02-11T11:18:52.935Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('bbbf24d5-2717-4745-a5b9-8906ac8f1c40', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'testtttttt', '123.00', NULL, 'bg-white', TRUE, '2026-02-11T11:48:40.307Z', NULL, '07cf17ab-5099-40d1-9157-b820eb7a1890', 0, NULL, '2026-02-11T11:48:40.307Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('90432b31-042a-4972-9c80-28f3e98fc5b2', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'test', '4321.00', NULL, 'bg-white', TRUE, '2026-02-11T12:20:05.736Z', NULL, '07cf17ab-5099-40d1-9157-b820eb7a1890', 0, NULL, '2026-02-11T12:20:05.736Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('b3909324-15dc-4853-8353-47377f176b0c', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'LATTE', '135.00', NULL, 'bg-white', TRUE, '2026-02-11T11:11:31.186Z', NULL, '1d75df37-0c6a-44a1-a528-36a876c28f51', 10, NULL, '2026-02-11T11:11:31.186Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('791566e4-3b8d-4619-ba08-9a3ddca39b68', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'MOCHA', '145.00', NULL, 'bg-white', TRUE, '2026-02-11T11:11:46.088Z', NULL, '1d75df37-0c6a-44a1-a528-36a876c28f51', 11, NULL, '2026-02-11T11:11:46.088Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('07008929-20e0-4453-a6af-9cc352918088', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'FİLTRE KAHVE', '120.00', NULL, 'bg-white', TRUE, '2026-02-11T11:11:56.812Z', NULL, '1d75df37-0c6a-44a1-a528-36a876c28f51', 12, NULL, '2026-02-11T11:11:56.812Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('c0ee0914-df52-436f-991b-d3a86fdeec7a', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'TÜRK KAHVESİ', '80.00', NULL, 'bg-white', TRUE, '2026-02-11T11:12:16.562Z', NULL, '1d75df37-0c6a-44a1-a528-36a876c28f51', 13, NULL, '2026-02-11T11:12:16.562Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('200e7c6e-ffa7-4301-9b3d-2f5f4ad10e49', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'ICE ESPRESSO', '110.00', NULL, 'bg-white', TRUE, '2026-02-11T11:39:21.458Z', NULL, '2dee550b-fd7d-4c5a-87e4-9403eb7504ee', 6, NULL, '2026-02-11T11:39:21.458Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('058308a8-f25b-4bd2-845a-cc5668dad33b', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'ICE CARAMEL LATTE', '155.00', NULL, 'bg-white', TRUE, '2026-02-11T11:39:32.635Z', NULL, '2dee550b-fd7d-4c5a-87e4-9403eb7504ee', 7, NULL, '2026-02-11T11:39:32.635Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('19f4bb1a-52e2-4775-be12-2677f597f41d', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'ICE VANİLYA LATTE', '155.00', NULL, 'bg-white', TRUE, '2026-02-11T11:39:48.537Z', NULL, '2dee550b-fd7d-4c5a-87e4-9403eb7504ee', 8, NULL, '2026-02-11T11:39:48.537Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('cb8d130e-8106-4103-9d62-6f4fc79887a2', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'ICE FİLTRE KAHVE', '135.00', NULL, 'bg-white', TRUE, '2026-02-11T11:40:05.548Z', NULL, '2dee550b-fd7d-4c5a-87e4-9403eb7504ee', 9, NULL, '2026-02-11T11:40:05.548Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('dd95b529-aff3-4d10-9732-bae6813c5d38', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'ICE CARAMEL FRAPPE', '160.00', NULL, 'bg-white', TRUE, '2026-02-11T11:40:17.664Z', NULL, '2dee550b-fd7d-4c5a-87e4-9403eb7504ee', 10, NULL, '2026-02-11T11:40:17.664Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('4e54c015-dddb-4e9b-9938-cc4cb38b87de', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'ICE VANİLYA FRAPPE', '160.00', NULL, 'bg-white', TRUE, '2026-02-11T11:40:29.658Z', NULL, '2dee550b-fd7d-4c5a-87e4-9403eb7504ee', 11, NULL, '2026-02-11T11:40:29.658Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('69282fc2-73fa-4841-ba71-7345c468bbd2', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'LİMONATA', '110.00', NULL, 'bg-white', TRUE, '2026-02-11T11:41:11.546Z', NULL, '614fdffb-80c7-4ff7-b131-742cf972d97a', 1, NULL, '2026-02-11T11:41:11.546Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('fad887d3-36a6-49f2-bc7e-25e70292d600', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'ÇİLEKLİ LİMONATA', '130.00', NULL, 'bg-white', TRUE, '2026-02-11T11:41:20.670Z', NULL, '614fdffb-80c7-4ff7-b131-742cf972d97a', 2, NULL, '2026-02-11T11:41:20.670Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('3267597e-68b0-4cc1-9d8d-83d19adde702', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'BÖĞÜRTLENLİ LİMONATA', '130.00', NULL, 'bg-white', TRUE, '2026-02-11T11:41:39.566Z', NULL, '614fdffb-80c7-4ff7-b131-742cf972d97a', 3, NULL, '2026-02-11T11:41:39.566Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('5bee60aa-dc36-4801-8c95-a6a3733b0032', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'ÇAY', '25.00', NULL, 'bg-white', TRUE, '2026-02-11T11:42:22.673Z', NULL, 'c302f79b-0e33-4bc0-99a0-558f9529faaa', 1, NULL, '2026-02-11T11:42:22.673Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('7ccb8e3d-c981-42f7-8105-1a6208b35264', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'FİNCAN ÇAY', '30.00', NULL, 'bg-white', TRUE, '2026-02-11T11:42:29.973Z', NULL, 'c302f79b-0e33-4bc0-99a0-558f9529faaa', 2, NULL, '2026-02-11T11:42:29.973Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('b4e53365-5dc8-40cb-a987-3af9a9e9ba02', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'SODA', '45.00', NULL, 'bg-white', TRUE, '2026-02-11T11:42:40.987Z', NULL, 'c302f79b-0e33-4bc0-99a0-558f9529faaa', 3, NULL, '2026-02-11T11:42:40.987Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('ba14e427-3b25-49d9-92a2-bb550b04a908', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'MEYVELİ SODA', '50.00', NULL, 'bg-white', TRUE, '2026-02-11T11:42:48.831Z', NULL, 'c302f79b-0e33-4bc0-99a0-558f9529faaa', 4, NULL, '2026-02-11T11:42:48.831Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('0d2d5710-e146-47de-8fb0-79a47419e707', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'DOUBLE TÜRK KAHESİ', '100.00', NULL, 'bg-white', TRUE, '2026-02-11T11:12:42.156Z', NULL, '1d75df37-0c6a-44a1-a528-36a876c28f51', 14, NULL, '2026-02-11T11:12:42.156Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('2ad182c5-589d-4848-8202-d8b29b7f4810', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'SICAK ÇİKOLATA', '150.00', NULL, 'bg-white', TRUE, '2026-02-11T11:12:55.229Z', NULL, '1d75df37-0c6a-44a1-a528-36a876c28f51', 15, NULL, '2026-02-11T11:12:55.229Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('72210e2e-9687-4e25-b7b5-73bd83b52423', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'ICE AMERICANO', '140.00', NULL, 'bg-white', TRUE, '2026-02-11T11:13:12.138Z', NULL, '2dee550b-fd7d-4c5a-87e4-9403eb7504ee', 1, NULL, '2026-02-11T11:13:12.138Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('adf9dff9-0ca0-4066-bf78-23127814eba4', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'ICE FLAT WHITE', '145.00', NULL, 'bg-white', TRUE, '2026-02-11T11:38:33.431Z', NULL, '2dee550b-fd7d-4c5a-87e4-9403eb7504ee', 2, NULL, '2026-02-11T11:38:33.431Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('f693c2e3-46e9-46ba-8b36-b31dabf24de8', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Alice Secret Product', '100.00', NULL, 'bg-red-50', FALSE, '2026-02-11T19:39:45.610Z', NULL, NULL, 0, NULL, '2026-02-11T19:39:45.610Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('faa568a0-2baa-438a-b295-8102c6133625', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'Bob Public Product', '100.00', NULL, 'bg-red-50', FALSE, '2026-02-11T19:39:45.617Z', NULL, NULL, 0, NULL, '2026-02-11T19:39:45.617Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('d757ed97-b5f9-48d9-befa-0a42dbd49c54', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'ICE LATTE', '150.00', NULL, 'bg-white', TRUE, '2026-02-11T11:38:44.225Z', NULL, '2dee550b-fd7d-4c5a-87e4-9403eb7504ee', 3, NULL, '2026-02-11T11:38:44.225Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('ad63a316-8aed-4266-be81-bffa754dcd0d', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'ICE MOCHA', '160.00', NULL, 'bg-white', TRUE, '2026-02-11T11:38:55.742Z', NULL, '2dee550b-fd7d-4c5a-87e4-9403eb7504ee', 4, NULL, '2026-02-11T11:38:55.742Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('46b3db56-cc55-48f8-98de-251fc0a0c4c9', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'ICE CHOCOLATE', '155.00', NULL, 'bg-white', TRUE, '2026-02-11T11:39:07.146Z', NULL, '2dee550b-fd7d-4c5a-87e4-9403eb7504ee', 5, NULL, '2026-02-11T11:39:07.146Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('7a511e4a-2fb7-46f6-a332-7399c44471fc', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'CHURCHILL', '75.00', NULL, 'bg-white', TRUE, '2026-02-11T11:43:00.005Z', NULL, 'c302f79b-0e33-4bc0-99a0-558f9529faaa', 5, NULL, '2026-02-11T11:43:00.005Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('52f5f698-bdd8-4a50-815b-b8dae5df458a', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'SU', '15.00', NULL, 'bg-white', TRUE, '2026-02-11T11:43:08.294Z', NULL, 'c302f79b-0e33-4bc0-99a0-558f9529faaa', 6, NULL, '2026-02-11T11:43:08.294Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('044bf12a-bf84-49d0-b166-f60791cc3e71', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Nevra', '335.00', NULL, 'bg-white', TRUE, '2026-02-09T12:42:51.227Z', '/uploads/e0bce7e4-a9a2-4c0e-9841-e11cea1cff57/production/1770641118011-976931521.jpg', '9c1b29f6-10fb-4e92-b54c-ece79b2f46ad', 2, 'Küp küp doğranmış ıslak kek parçaları,çilek,muz üzerine belçika çikolatas', '2026-02-09T12:42:51.227Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('48b59574-03d3-4a8b-8ed5-c7bf7897dfc8', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Lotus Manolya', '320.00', NULL, 'bg-white', TRUE, '2026-02-10T19:11:30.052Z', '/uploads/e0bce7e4-a9a2-4c0e-9841-e11cea1cff57/production/1770750690053-810659458.jpg', '9c1b29f6-10fb-4e92-b54c-ece79b2f46ad', 5, 'Özel magnolia kreması taze çilek,muz parçaları , lotus bisküvisi ve üzerine belçika çikolatas', '2026-02-10T19:11:30.052Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('3d7ab88e-d426-4d86-b8f6-d27ec047c8ae', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Mug Cup', '290.00', NULL, 'bg-white', TRUE, '2026-02-10T19:13:34.676Z', '/uploads/e0bce7e4-a9a2-4c0e-9841-e11cea1cff57/production/1770750814678-849510060.jpg', '84a79213-5623-4e36-8114-595ead40266c', 0, 'Özel magnolia kreması taze çilek,muz ve bebe bisküvisi', '2026-02-10T19:13:34.676Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('95b6ebf9-f5e9-4144-9934-d1495fd691bc', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Çilek & Muz Kruvasan', '315.00', NULL, 'bg-white', TRUE, '2026-02-10T19:13:13.729Z', '/uploads/e0bce7e4-a9a2-4c0e-9841-e11cea1cff57/production/1770816436154-170608595.jpg', '9c1b29f6-10fb-4e92-b54c-ece79b2f46ad', 11, 'Özel kreması taze çilek ve muz dilimleri üzerinde Belçika çikolatası ile', '2026-02-10T19:13:13.729Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('1339201b-b2de-4e4b-97a1-8a4424a0060c', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Muz Kruvasan', '305.00', NULL, 'bg-white', TRUE, '2026-02-10T19:12:55.015Z', '/uploads/e0bce7e4-a9a2-4c0e-9841-e11cea1cff57/production/1770816419208-395598936.jpg', '9c1b29f6-10fb-4e92-b54c-ece79b2f46ad', 7, 'Özel kreması taze muz dilimleri ve Belçika çikotalası ile', '2026-02-10T19:12:55.015Z', '0.00');
INSERT INTO products (id, user_id, name, price, category_id, color, is_active, created_at, image_url, menu_category_id, sort_order, description, updated_at, takeaway_discount_percent) VALUES ('0a55c683-512e-44a8-a60d-cfb3b68b0607', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'Kamelya', '300.00', NULL, 'bg-white', TRUE, '2026-02-09T12:36:34.505Z', '/uploads/e0bce7e4-a9a2-4c0e-9841-e11cea1cff57/production/1770640594508-983282175.jpg', '9c1b29f6-10fb-4e92-b54c-ece79b2f46ad', 1, 'Kek arasına taze çilek,muz parçaları,özel kreması ve üzerine belçika çikolatas', '2026-02-09T12:36:34.505Z', '0.00');

-- Table: tables (2 rows)
TRUNCATE TABLE tables CASCADE;
INSERT INTO tables (id, user_id, unique_code, name, type, rotation, capacity, area, status, pos_x, pos_y, deleted_at, created_at, updated_at) VALUES ('1ee9a90f-7b0b-4cdf-857f-3ff796fb0f95', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'TBL-BMNGMJ', 'Masa 1', 'square', 0, 2, 'Genel', 'available', 17.889222318295104, 14.243861607142858, NULL, '2026-02-13T20:27:07.951Z', '2026-02-15T21:15:14.769Z');
INSERT INTO tables (id, user_id, unique_code, name, type, rotation, capacity, area, status, pos_x, pos_y, deleted_at, created_at, updated_at) VALUES ('505c6c9c-8b62-44e7-88a9-c831f2d4fd05', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'TBL-PJGK69', 'Masa 2', 'rectangle', 0, 4, 'Genel', 'available', 76.2219622603123, 12.243861607142858, NULL, '2026-02-13T20:27:07.981Z', '2026-02-14T20:04:45.450Z');

-- Table: transaction_items (385 rows)
TRUNCATE TABLE transaction_items CASCADE;
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('0878cd20-ca03-41df-9cc6-ee1b7a3f81df', NULL, '.202615:06', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T20:52:33.878Z', '2026-02-11T20:52:33.878Z', TRUE, '658cafa8-737e-4de0-83fc-0374fe0bdf4f', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('c01ea9ba-d304-403f-9cc6-1f44b384e685', NULL, 'Unknown Product', '1.00', '206.04', '206.04', '0.00', '0.00', 0.9, '2026-02-11T20:52:33.878Z', '2026-02-11T20:52:33.878Z', TRUE, '658cafa8-737e-4de0-83fc-0374fe0bdf4f', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('f2a65c95-e1aa-4d5f-b00d-fee82cf8418d', NULL, '3ad X', '1.00', '46.00', '46.00', '0.00', '0.00', 0.9, '2026-02-11T20:52:33.878Z', '2026-02-11T20:52:33.878Z', TRUE, '658cafa8-737e-4de0-83fc-0374fe0bdf4f', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('0c6e3bca-cf23-4091-bedb-f34b434d25c5', NULL, '*', '1.00', '138.00', '138.00', '13.00', '17.94', 0.9, '2026-02-11T20:52:33.878Z', '2026-02-11T20:52:33.878Z', TRUE, '658cafa8-737e-4de0-83fc-0374fe0bdf4f', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('f54534f0-bb90-4dbb-98a9-1698b648b5dd', NULL, 'Unknown Product', '1.00', '11.50', '11.50', '0.00', '0.00', 0.9, '2026-02-11T20:52:33.878Z', '2026-02-11T20:52:33.878Z', TRUE, '658cafa8-737e-4de0-83fc-0374fe0bdf4f', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('6a83499d-9113-44b8-b161-3ea7452d9ca5', NULL, '%20', '1.00', '49.00', '49.00', '20.00', '9.80', 0.9, '2026-02-11T20:52:33.878Z', '2026-02-11T20:52:33.878Z', TRUE, '658cafa8-737e-4de0-83fc-0374fe0bdf4f', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('96ef075d-855d-4326-966a-cfc0a5f17082', NULL, 'Unknown Product', '1.00', '120.00', '120.00', '0.00', '0.00', 0.9, '2026-02-11T20:52:33.878Z', '2026-02-11T20:52:33.878Z', TRUE, '658cafa8-737e-4de0-83fc-0374fe0bdf4f', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('d5cc3ce3-c9b6-4417-951f-f4206cf1a32b', NULL, '2adx', '1.00', '1.00', '1.00', '0.00', '0.00', 0.9, '2026-02-11T20:52:33.878Z', '2026-02-11T20:52:33.878Z', TRUE, '658cafa8-737e-4de0-83fc-0374fe0bdf4f', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('bf38167e-3b62-4890-bb3e-8134cc3ab177', NULL, 'Unknown Product', '1.00', '556.54', '556.54', '0.00', '0.00', 0.9, '2026-02-11T20:52:33.878Z', '2026-02-11T20:52:33.878Z', TRUE, '658cafa8-737e-4de0-83fc-0374fe0bdf4f', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('48cf91e9-5ff2-47ba-ba2c-15b7c12eac4e', NULL, '.202615:07', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T20:52:33.878Z', '2026-02-11T20:52:33.878Z', TRUE, '658cafa8-737e-4de0-83fc-0374fe0bdf4f', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('e1036fca-dad2-4935-9a65-c40499842722', NULL, 'DV DAHIL', '1.00', '4.71', '4.71', '0.00', '0.00', 0.9, '2026-02-11T20:52:33.878Z', '2026-02-11T20:52:33.878Z', TRUE, '658cafa8-737e-4de0-83fc-0374fe0bdf4f', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('837b48bb-ea34-429f-8d23-7478dfbb1b50', NULL, '%1', '1.00', '470.83', '470.83', '1.00', '4.71', 0.9, '2026-02-11T20:52:33.878Z', '2026-02-11T20:52:33.878Z', TRUE, '658cafa8-737e-4de0-83fc-0374fe0bdf4f', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('3eedf7f9-c1d0-403b-b8a4-36dc83ce7d19', NULL, '475.54', '1.00', '13.50', '13.50', '0.00', '0.00', 0.9, '2026-02-11T20:52:33.878Z', '2026-02-11T20:52:33.878Z', TRUE, '658cafa8-737e-4de0-83fc-0374fe0bdf4f', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('e8f52f1b-6c9d-4ff0-bf2d-d4b503de7eb0', NULL, '%20', '1.00', '67.50', '67.50', '20.00', '13.50', 0.9, '2026-02-11T20:52:33.878Z', '2026-02-11T20:52:33.878Z', TRUE, '658cafa8-737e-4de0-83fc-0374fe0bdf4f', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('2b7cb52f-a1a3-48b8-bc63-b692ce026541', NULL, 'Unknown Product', '1.00', '81.00', '81.00', '0.00', '0.00', 0.9, '2026-02-11T20:52:33.878Z', '2026-02-11T20:52:33.878Z', TRUE, '658cafa8-737e-4de0-83fc-0374fe0bdf4f', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('108e0605-d69e-458a-aa9e-44ee63dfb39b', NULL, '.202615:06', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T20:55:25.566Z', '2026-02-11T20:55:25.566Z', TRUE, '94dbffbf-ff85-4977-afee-a0d34113ad39', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('28896546-bcbf-423b-bb1e-cc41152f4a6f', NULL, 'Unknown Product', '1.00', '206.04', '206.04', '0.00', '0.00', 0.9, '2026-02-11T20:55:25.566Z', '2026-02-11T20:55:25.566Z', TRUE, '94dbffbf-ff85-4977-afee-a0d34113ad39', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('e7e671a5-de43-4906-81db-f1773fff7f83', NULL, '3ad X', '1.00', '46.00', '46.00', '0.00', '0.00', 0.9, '2026-02-11T20:55:25.566Z', '2026-02-11T20:55:25.566Z', TRUE, '94dbffbf-ff85-4977-afee-a0d34113ad39', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('78cf31e9-1e87-44be-ada4-83bdd0b4c495', NULL, '*', '1.00', '138.00', '138.00', '13.00', '17.94', 0.9, '2026-02-11T20:55:25.566Z', '2026-02-11T20:55:25.566Z', TRUE, '94dbffbf-ff85-4977-afee-a0d34113ad39', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('2ec8cd04-1806-4977-a5d9-bb15e2531c3e', NULL, 'Unknown Product', '1.00', '11.50', '11.50', '0.00', '0.00', 0.9, '2026-02-11T20:55:25.566Z', '2026-02-11T20:55:25.566Z', TRUE, '94dbffbf-ff85-4977-afee-a0d34113ad39', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('6a333be9-9a02-40ff-8bfe-62383dfeb3b8', NULL, '%20', '1.00', '49.00', '49.00', '20.00', '9.80', 0.9, '2026-02-11T20:55:25.566Z', '2026-02-11T20:55:25.566Z', TRUE, '94dbffbf-ff85-4977-afee-a0d34113ad39', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('967de625-156c-4a97-9412-8bc941f06626', NULL, 'Unknown Product', '1.00', '120.00', '120.00', '0.00', '0.00', 0.9, '2026-02-11T20:55:25.566Z', '2026-02-11T20:55:25.566Z', TRUE, '94dbffbf-ff85-4977-afee-a0d34113ad39', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('ef78afda-2486-4785-adc0-9c57a6aefe91', NULL, '2adx', '1.00', '1.00', '1.00', '0.00', '0.00', 0.9, '2026-02-11T20:55:25.566Z', '2026-02-11T20:55:25.566Z', TRUE, '94dbffbf-ff85-4977-afee-a0d34113ad39', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('b881fa8f-5940-4e91-af7c-3d41a7566536', NULL, 'Unknown Product', '1.00', '556.54', '556.54', '0.00', '0.00', 0.9, '2026-02-11T20:55:25.566Z', '2026-02-11T20:55:25.566Z', TRUE, '94dbffbf-ff85-4977-afee-a0d34113ad39', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('b23c6b81-cc2b-4a4e-9ca7-4cf3ae908386', NULL, '.202615:07', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T20:55:25.566Z', '2026-02-11T20:55:25.566Z', TRUE, '94dbffbf-ff85-4977-afee-a0d34113ad39', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('69f450b2-73f6-4731-8550-e47c143a1d94', NULL, 'DV DAHIL', '1.00', '4.71', '4.71', '0.00', '0.00', 0.9, '2026-02-11T20:55:25.566Z', '2026-02-11T20:55:25.566Z', TRUE, '94dbffbf-ff85-4977-afee-a0d34113ad39', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('0f380f6c-e3ff-4412-8b0e-2c786182ad85', NULL, '%1', '1.00', '470.83', '470.83', '1.00', '4.71', 0.9, '2026-02-11T20:55:25.566Z', '2026-02-11T20:55:25.566Z', TRUE, '94dbffbf-ff85-4977-afee-a0d34113ad39', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('662c32e4-1cea-470d-b273-ac1bbca1e692', NULL, '475.54', '1.00', '13.50', '13.50', '0.00', '0.00', 0.9, '2026-02-11T20:55:25.566Z', '2026-02-11T20:55:25.566Z', TRUE, '94dbffbf-ff85-4977-afee-a0d34113ad39', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('8a31577d-a682-4b89-a858-0a0dfe615afc', NULL, '%20', '1.00', '67.50', '67.50', '20.00', '13.50', 0.9, '2026-02-11T20:55:25.566Z', '2026-02-11T20:55:25.566Z', TRUE, '94dbffbf-ff85-4977-afee-a0d34113ad39', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('bcca90a5-6b03-4124-a418-69eff7ae7506', NULL, 'Unknown Product', '1.00', '81.00', '81.00', '0.00', '0.00', 0.9, '2026-02-11T20:55:25.566Z', '2026-02-11T20:55:25.566Z', TRUE, '94dbffbf-ff85-4977-afee-a0d34113ad39', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('ffdbe4ac-53f9-4e70-a9d4-a9d6075d6e00', NULL, '.202615:06', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T20:58:52.149Z', '2026-02-11T20:58:52.149Z', TRUE, '14f8411c-e320-4f12-8f6a-56f7ad26d1e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('26ceb993-d553-41e0-b908-a800f85c8dfe', NULL, 'Unknown Product', '1.00', '206.04', '206.04', '0.00', '0.00', 0.9, '2026-02-11T20:58:52.149Z', '2026-02-11T20:58:52.149Z', TRUE, '14f8411c-e320-4f12-8f6a-56f7ad26d1e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('f1464dc1-b6e4-40a5-91df-e06c0a6a8f05', NULL, '3ad X', '1.00', '46.00', '46.00', '0.00', '0.00', 0.9, '2026-02-11T20:58:52.149Z', '2026-02-11T20:58:52.149Z', TRUE, '14f8411c-e320-4f12-8f6a-56f7ad26d1e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('74c51ee2-dc4f-4a0a-a4ee-5dec885e4922', NULL, '*', '1.00', '138.00', '138.00', '13.00', '17.94', 0.9, '2026-02-11T20:58:52.149Z', '2026-02-11T20:58:52.149Z', TRUE, '14f8411c-e320-4f12-8f6a-56f7ad26d1e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('0295452a-e7c3-47e4-a311-5ce62a8955ca', NULL, 'Unknown Product', '1.00', '11.50', '11.50', '0.00', '0.00', 0.9, '2026-02-11T20:58:52.149Z', '2026-02-11T20:58:52.149Z', TRUE, '14f8411c-e320-4f12-8f6a-56f7ad26d1e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('4b2729f0-2b44-4fbc-b482-4c4c902bb2a7', NULL, '%20', '1.00', '49.00', '49.00', '20.00', '9.80', 0.9, '2026-02-11T20:58:52.149Z', '2026-02-11T20:58:52.149Z', TRUE, '14f8411c-e320-4f12-8f6a-56f7ad26d1e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('516bdf4d-2fcf-4713-b953-c1cade27f80c', NULL, 'Unknown Product', '1.00', '120.00', '120.00', '0.00', '0.00', 0.9, '2026-02-11T20:58:52.149Z', '2026-02-11T20:58:52.149Z', TRUE, '14f8411c-e320-4f12-8f6a-56f7ad26d1e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('bf46268b-68e0-47fb-8a4b-bcffe9934519', NULL, '2adx', '1.00', '1.00', '1.00', '0.00', '0.00', 0.9, '2026-02-11T20:58:52.149Z', '2026-02-11T20:58:52.149Z', TRUE, '14f8411c-e320-4f12-8f6a-56f7ad26d1e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('79b4d377-296b-4638-b530-0849c036a34a', NULL, 'Unknown Product', '1.00', '556.54', '556.54', '0.00', '0.00', 0.9, '2026-02-11T20:58:52.149Z', '2026-02-11T20:58:52.149Z', TRUE, '14f8411c-e320-4f12-8f6a-56f7ad26d1e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('bf2970f3-fa7d-4ffc-987e-1776076faced', NULL, '.202615:07', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T20:58:52.149Z', '2026-02-11T20:58:52.149Z', TRUE, '14f8411c-e320-4f12-8f6a-56f7ad26d1e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('57f81080-bed3-4f8a-84ae-347aa45f0239', NULL, 'DV DAHIL', '1.00', '4.71', '4.71', '0.00', '0.00', 0.9, '2026-02-11T20:58:52.149Z', '2026-02-11T20:58:52.149Z', TRUE, '14f8411c-e320-4f12-8f6a-56f7ad26d1e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('04a8569e-dc21-4ca2-9754-6115cc2e1244', NULL, '%1', '1.00', '470.83', '470.83', '1.00', '4.71', 0.9, '2026-02-11T20:58:52.149Z', '2026-02-11T20:58:52.149Z', TRUE, '14f8411c-e320-4f12-8f6a-56f7ad26d1e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('72ede657-1f6d-497c-83e4-1804fcc91d03', NULL, '475.54', '1.00', '13.50', '13.50', '0.00', '0.00', 0.9, '2026-02-11T20:58:52.149Z', '2026-02-11T20:58:52.149Z', TRUE, '14f8411c-e320-4f12-8f6a-56f7ad26d1e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('6715ef5a-db7e-47fb-b606-3e6a0834b927', NULL, '%20', '1.00', '67.50', '67.50', '20.00', '13.50', 0.9, '2026-02-11T20:58:52.149Z', '2026-02-11T20:58:52.149Z', TRUE, '14f8411c-e320-4f12-8f6a-56f7ad26d1e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('ae37a15c-4daf-427e-8338-2144c9bed0c1', NULL, 'Unknown Product', '1.00', '81.00', '81.00', '0.00', '0.00', 0.9, '2026-02-11T20:58:52.149Z', '2026-02-11T20:58:52.149Z', TRUE, '14f8411c-e320-4f12-8f6a-56f7ad26d1e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('cc27fe68-6168-4789-ad0a-c6684f3d3262', NULL, 'Fat.Tar..2026 1111111111 O', '1.00', '11.02', '11.02', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('e2c40b9b-d736-40be-b909-f53b922562f1', NULL, 'Miktar Birim Ad 0 99,95 1', '1.00', '199.90', '199.90', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('3af06588-3378-497f-a565-8412577decae', NULL, 'O 2,000 AD V.AVOKADO ADET  20 74,95', '1.00', '74.95', '74.95', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('2a59f68a-990a-4ac8-80dc-aecefd913f87', NULL, '1.000 AD 0  20 219,90', '1.00', '219.90', '219.90', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('18069554-28a6-4612-85e1-ee1cbfab1378', NULL, '1,000 FAMILIA TUVALET KAGIDI 4OLI BAMBU OZLU $6°68 1', '1.00', '89.95', '89.95', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('9014cb53-0753-41fb-846e-346226594cf9', NULL, 'A.DANET JANBON DANA KG 0 1079,90 1', '1.00', '207.34', '207.34', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('80f29ef6-d9e3-442d-a54f-82a62a97143c', NULL, '0,192KG 0  1 24,95', '1.00', '24.95', '24.95', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('59342c8d-5893-48f2-bc6a-06273ae69eaf', NULL, '1,000 FILIZMAKARNA 500GR ARPASEHRIYE', '1.00', '24.95', '24.95', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('25ef5554-64dd-4679-9b8d-15582d23e408', NULL, 'O 1,000 AD FILIZ MAKAR500GR ERISTE*** 0  1', '1.00', '24.95', '24.95', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('240a864e-fc58-419d-9986-ccc739b003a1', NULL, 'A.EV ERISTESI KG 0 249,90 1', '1.00', '99.96', '99.96', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('58344c85-e29e-48f0-b12a-f77aac768a10', NULL, '0.400 KG 0 54,95 1', '1.00', '109.90', '109.90', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('e1b8ae18-9cd6-4e14-b85f-b78b2c3e9e53', NULL, '*', '1.00', '138.00', '138.00', '13.00', '17.94', 0.9, '2026-02-11T21:24:25.412Z', '2026-02-11T21:24:25.412Z', TRUE, 'd664b36c-ed06-4c61-9833-1aa0d68ec1ef', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('1107a11e-1143-4b74-95ea-d3ed51a087af', NULL, '2,000 AD KAHVE DN.100 GR TURK KAHVESI ORTA KA', '1.00', '159.90', '159.90', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('3ff6f8f1-611b-4cec-9ff3-1daa88fc87f8', NULL, '2,000 AD V.PAZI ADET 0  1', '1.00', '79.95', '79.95', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('66b39e2c-c1c1-4073-862a-a595af8b427f', NULL, 'MV.PIRASA KG 64,95 1', '1.00', '52.61', '52.61', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('729d8e99-1cb4-4487-b12c-9139ba89697b', NULL, '0,810 KG 0  1 143,90', '1.00', '143.90', '143.90', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('4432f2ac-604e-4851-b788-63215be25bc3', NULL, '1,000 AD BREIS1KGFASLYEKURU***** 54.95 1', '1.00', '54.95', '54.95', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('b962afb9-b777-4958-ab59-151f84b4706e', NULL, '1 79,95', '1.00', '79.95', '79.95', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('0d2af7e3-545b-4682-8c21-9eff58975c73', NULL, '1,000AD SUTASSUT6180M*', '1.00', '22.40', '22.40', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('a6344a65-fbd2-4ce0-9b89-5185bccfa645', NULL, '0,748 KG MNV.HAVUC KG 0  1', '1.00', '29.95', '29.95', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('7b78d9cf-3e33-419c-9bd6-5a977508cd05', NULL, 'NV.KEREVIZ KG 0 74,95 1', '1.00', '107.48', '107.48', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('4bba5ce8-62e5-423a-b6b2-62081620cb72', NULL, '1,434 KG 0  1 24,95', '1.00', '24.95', '24.95', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('7850fa0e-1245-4139-bdd0-0e0eac61e64e', NULL, '1,000AD INV.MAYDANOZ ADET 139,95', '1.00', '139.11', '139.11', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('ccf317bc-0036-4514-93b9-cf0c8a3fbdca', NULL, '0,994 KG 0 169,95 1', '1.00', '38.07', '38.07', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('55fb78d3-e3fb-4ae2-b785-624f925c98f5', NULL, '0,224 KG NV.S0GAN TAZE KG', '1.00', '56.04', '56.04', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('dd42660d-6987-464e-95a0-df8b1a6a0a3b', NULL, '2.246 KG N.PATATES TAZE KG  1', '1.00', '24.95', '24.95', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('67c53f8f-046a-4798-9a12-d9796f8f67bd', NULL, 'V.SOGAN KURU KG. 15,95 1', '1.00', '27.02', '27.02', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('89d44ad3-91d0-45ea-91cb-75279c489c02', NULL, '1,694 KG 109,95 1', '1.00', '105.55', '105.55', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('9f3d60f0-de12-4d85-a60a-4379b84cf382', NULL, '0.960 KG .DOMATES SALKIM KG 20', '1.00', '99.95', '99.95', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('a18085b1-69f3-4f6e-8558-d33e3ef38a57', NULL, '1,000 AD PANTENE SAP.400ONRICI VE KORUYUCU', '1.00', '99.95', '99.95', '0.00', '0.00', 0.9, '2026-02-11T20:59:09.958Z', '2026-02-11T20:59:09.958Z', TRUE, '21231ef8-1b0b-4167-a05c-e765ba768ea9', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('2ec61da1-8eee-46d5-9cf2-6196dbdef5c9', NULL, '.202615:06', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:00:52.764Z', '2026-02-11T21:00:52.764Z', TRUE, '68fb70d2-80a3-429a-9be2-e4fbb32bddde', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('02e7eabf-d5ac-41f4-8c81-1632dd9ce7fa', NULL, 'Unknown Product', '1.00', '206.04', '206.04', '0.00', '0.00', 0.9, '2026-02-11T21:00:52.764Z', '2026-02-11T21:00:52.764Z', TRUE, '68fb70d2-80a3-429a-9be2-e4fbb32bddde', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('05df3d13-faea-4ca4-bc9f-b34ecb19ef23', NULL, '3ad X', '1.00', '46.00', '46.00', '0.00', '0.00', 0.9, '2026-02-11T21:00:52.764Z', '2026-02-11T21:00:52.764Z', TRUE, '68fb70d2-80a3-429a-9be2-e4fbb32bddde', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('59e22342-da8f-4504-9721-9ed41c48cc7d', NULL, '*', '1.00', '138.00', '138.00', '13.00', '17.94', 0.9, '2026-02-11T21:00:52.764Z', '2026-02-11T21:00:52.764Z', TRUE, '68fb70d2-80a3-429a-9be2-e4fbb32bddde', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('f47b0fdd-b3f3-4453-ae1c-9e350da443ba', NULL, 'Unknown Product', '1.00', '11.50', '11.50', '0.00', '0.00', 0.9, '2026-02-11T21:00:52.764Z', '2026-02-11T21:00:52.764Z', TRUE, '68fb70d2-80a3-429a-9be2-e4fbb32bddde', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('decc64c1-eaa7-4d74-b17a-566bcc685225', NULL, '%20', '1.00', '49.00', '49.00', '20.00', '9.80', 0.9, '2026-02-11T21:00:52.764Z', '2026-02-11T21:00:52.764Z', TRUE, '68fb70d2-80a3-429a-9be2-e4fbb32bddde', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('40e40cd1-a7fc-45cc-a6d1-fc1f879de920', NULL, 'Unknown Product', '1.00', '120.00', '120.00', '0.00', '0.00', 0.9, '2026-02-11T21:00:52.764Z', '2026-02-11T21:00:52.764Z', TRUE, '68fb70d2-80a3-429a-9be2-e4fbb32bddde', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('0f142f6e-4969-4695-b7ba-f5721047864b', NULL, '2adx', '1.00', '1.00', '1.00', '0.00', '0.00', 0.9, '2026-02-11T21:00:52.764Z', '2026-02-11T21:00:52.764Z', TRUE, '68fb70d2-80a3-429a-9be2-e4fbb32bddde', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('0d71f55f-3213-4b25-bd89-b0c35bf8356f', NULL, 'Unknown Product', '1.00', '556.54', '556.54', '0.00', '0.00', 0.9, '2026-02-11T21:00:52.764Z', '2026-02-11T21:00:52.764Z', TRUE, '68fb70d2-80a3-429a-9be2-e4fbb32bddde', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('c88e27e7-667b-458a-8a63-bc74a7e1a770', NULL, '.202615:07', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:00:52.764Z', '2026-02-11T21:00:52.764Z', TRUE, '68fb70d2-80a3-429a-9be2-e4fbb32bddde', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('51bc5cee-a9ed-40f4-9e40-d52ae3266af9', NULL, 'DV DAHIL', '1.00', '4.71', '4.71', '0.00', '0.00', 0.9, '2026-02-11T21:00:52.764Z', '2026-02-11T21:00:52.764Z', TRUE, '68fb70d2-80a3-429a-9be2-e4fbb32bddde', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('770c528f-7e95-4aeb-9e89-9d0b449692ab', NULL, '%1', '1.00', '470.83', '470.83', '1.00', '4.71', 0.9, '2026-02-11T21:00:52.764Z', '2026-02-11T21:00:52.764Z', TRUE, '68fb70d2-80a3-429a-9be2-e4fbb32bddde', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('f87e979e-92e6-4d5d-ba10-3fcb6c6e97e4', NULL, '475.54', '1.00', '13.50', '13.50', '0.00', '0.00', 0.9, '2026-02-11T21:00:52.764Z', '2026-02-11T21:00:52.764Z', TRUE, '68fb70d2-80a3-429a-9be2-e4fbb32bddde', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('66e0de6f-485a-4801-9cab-e03c0ca9b0c3', NULL, '%20', '1.00', '67.50', '67.50', '20.00', '13.50', 0.9, '2026-02-11T21:00:52.764Z', '2026-02-11T21:00:52.764Z', TRUE, '68fb70d2-80a3-429a-9be2-e4fbb32bddde', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('7ed5c4f3-73aa-41c8-9793-e9e79fcbff70', NULL, 'Unknown Product', '1.00', '81.00', '81.00', '0.00', '0.00', 0.9, '2026-02-11T21:00:52.764Z', '2026-02-11T21:00:52.764Z', TRUE, '68fb70d2-80a3-429a-9be2-e4fbb32bddde', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('c7359cce-270b-44e5-873f-4e17e5b405c7', NULL, '.202615:06', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:05:53.673Z', '2026-02-11T21:05:53.673Z', TRUE, '02b25bc0-d98a-459d-846d-ea63365e4628', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('280d6707-280a-4c40-aab1-e6a772c62e32', NULL, 'Unknown Product', '1.00', '206.04', '206.04', '0.00', '0.00', 0.9, '2026-02-11T21:05:53.673Z', '2026-02-11T21:05:53.673Z', TRUE, '02b25bc0-d98a-459d-846d-ea63365e4628', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('5f7f6802-f908-4169-a028-fc3368d5b8cc', NULL, '3ad X', '1.00', '46.00', '46.00', '0.00', '0.00', 0.9, '2026-02-11T21:05:53.673Z', '2026-02-11T21:05:53.673Z', TRUE, '02b25bc0-d98a-459d-846d-ea63365e4628', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('cfd300dc-e177-4e53-b0e5-607e2a88d5d1', NULL, '*', '1.00', '138.00', '138.00', '13.00', '17.94', 0.9, '2026-02-11T21:05:53.673Z', '2026-02-11T21:05:53.673Z', TRUE, '02b25bc0-d98a-459d-846d-ea63365e4628', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('0f500fbf-0bad-4102-aa43-29d212a180d5', NULL, 'Unknown Product', '1.00', '11.50', '11.50', '0.00', '0.00', 0.9, '2026-02-11T21:05:53.673Z', '2026-02-11T21:05:53.673Z', TRUE, '02b25bc0-d98a-459d-846d-ea63365e4628', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('4d6f7f66-b407-4f5a-b778-57d28b6f4d44', NULL, '%20', '1.00', '49.00', '49.00', '20.00', '9.80', 0.9, '2026-02-11T21:05:53.673Z', '2026-02-11T21:05:53.673Z', TRUE, '02b25bc0-d98a-459d-846d-ea63365e4628', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('4c2c141f-da7b-4d2e-922d-27894ebf13b3', NULL, 'Unknown Product', '1.00', '120.00', '120.00', '0.00', '0.00', 0.9, '2026-02-11T21:05:53.673Z', '2026-02-11T21:05:53.673Z', TRUE, '02b25bc0-d98a-459d-846d-ea63365e4628', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('e457dbe3-4b39-48fa-98c7-35b04c4df86f', NULL, '2adx', '1.00', '1.00', '1.00', '0.00', '0.00', 0.9, '2026-02-11T21:05:53.673Z', '2026-02-11T21:05:53.673Z', TRUE, '02b25bc0-d98a-459d-846d-ea63365e4628', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('dbb80dbe-1efa-4a49-8828-3aaec658412e', NULL, 'Unknown Product', '1.00', '556.54', '556.54', '0.00', '0.00', 0.9, '2026-02-11T21:05:53.673Z', '2026-02-11T21:05:53.673Z', TRUE, '02b25bc0-d98a-459d-846d-ea63365e4628', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('fb182b94-ae74-462e-8623-468c1f1d9a93', NULL, '.202615:07', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:05:53.673Z', '2026-02-11T21:05:53.673Z', TRUE, '02b25bc0-d98a-459d-846d-ea63365e4628', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('635aad39-a18b-42d6-a274-c38900331b7e', NULL, 'DV DAHIL', '1.00', '4.71', '4.71', '0.00', '0.00', 0.9, '2026-02-11T21:05:53.673Z', '2026-02-11T21:05:53.673Z', TRUE, '02b25bc0-d98a-459d-846d-ea63365e4628', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('a628e255-98b8-48d8-ab88-58417120a6b7', NULL, '%1', '1.00', '470.83', '470.83', '1.00', '4.71', 0.9, '2026-02-11T21:05:53.673Z', '2026-02-11T21:05:53.673Z', TRUE, '02b25bc0-d98a-459d-846d-ea63365e4628', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('9741c432-bebb-4644-8940-b75c58f945ab', NULL, '475.54', '1.00', '13.50', '13.50', '0.00', '0.00', 0.9, '2026-02-11T21:05:53.673Z', '2026-02-11T21:05:53.673Z', TRUE, '02b25bc0-d98a-459d-846d-ea63365e4628', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('f8b8c84c-43b5-4a4b-bec1-4a415151a531', NULL, '%20', '1.00', '67.50', '67.50', '20.00', '13.50', 0.9, '2026-02-11T21:05:53.673Z', '2026-02-11T21:05:53.673Z', TRUE, '02b25bc0-d98a-459d-846d-ea63365e4628', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('9bc79cfd-b366-4f0e-9d54-6be65adea7d1', NULL, 'Unknown Product', '1.00', '81.00', '81.00', '0.00', '0.00', 0.9, '2026-02-11T21:05:53.673Z', '2026-02-11T21:05:53.673Z', TRUE, '02b25bc0-d98a-459d-846d-ea63365e4628', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('40f84625-84b4-4b8a-b17b-87433262f805', NULL, '.202615:06', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:07:47.845Z', '2026-02-11T21:07:47.845Z', TRUE, 'c36e1dc4-3c2b-48c7-a117-ff0f8cdd27d0', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('597b9613-24eb-4258-a89c-11d5f55d2052', NULL, 'Unknown Product', '1.00', '206.04', '206.04', '0.00', '0.00', 0.9, '2026-02-11T21:07:47.845Z', '2026-02-11T21:07:47.845Z', TRUE, 'c36e1dc4-3c2b-48c7-a117-ff0f8cdd27d0', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('7a0e7fd8-ef3a-4d84-82bb-a43c0c8bbf89', NULL, '3ad X', '1.00', '46.00', '46.00', '0.00', '0.00', 0.9, '2026-02-11T21:07:47.845Z', '2026-02-11T21:07:47.845Z', TRUE, 'c36e1dc4-3c2b-48c7-a117-ff0f8cdd27d0', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('3244c851-08f5-4830-b24c-aafc0753e920', NULL, '*', '1.00', '138.00', '138.00', '13.00', '17.94', 0.9, '2026-02-11T21:07:47.845Z', '2026-02-11T21:07:47.845Z', TRUE, 'c36e1dc4-3c2b-48c7-a117-ff0f8cdd27d0', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('67c744b4-7f95-4ed2-94a7-e733935e4354', NULL, 'Unknown Product', '1.00', '11.50', '11.50', '0.00', '0.00', 0.9, '2026-02-11T21:07:47.845Z', '2026-02-11T21:07:47.845Z', TRUE, 'c36e1dc4-3c2b-48c7-a117-ff0f8cdd27d0', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('5fbbfd06-683e-48ee-9436-19d838d0a39e', NULL, '%20', '1.00', '49.00', '49.00', '20.00', '9.80', 0.9, '2026-02-11T21:07:47.845Z', '2026-02-11T21:07:47.845Z', TRUE, 'c36e1dc4-3c2b-48c7-a117-ff0f8cdd27d0', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('b71a2d10-2927-4e34-bcd9-f6600c832ade', NULL, 'Unknown Product', '1.00', '120.00', '120.00', '0.00', '0.00', 0.9, '2026-02-11T21:07:47.845Z', '2026-02-11T21:07:47.845Z', TRUE, 'c36e1dc4-3c2b-48c7-a117-ff0f8cdd27d0', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('c0141416-674c-459d-a8f1-2705faf6b6b6', NULL, '2adx', '1.00', '1.00', '1.00', '0.00', '0.00', 0.9, '2026-02-11T21:07:47.845Z', '2026-02-11T21:07:47.845Z', TRUE, 'c36e1dc4-3c2b-48c7-a117-ff0f8cdd27d0', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('7c4d0cbe-a331-44e5-a1a7-1a630f4802d5', NULL, 'Unknown Product', '1.00', '556.54', '556.54', '0.00', '0.00', 0.9, '2026-02-11T21:07:47.845Z', '2026-02-11T21:07:47.845Z', TRUE, 'c36e1dc4-3c2b-48c7-a117-ff0f8cdd27d0', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('33c4c7a6-b8ed-407c-bc48-63d9e294447f', NULL, '.202615:07', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:07:47.845Z', '2026-02-11T21:07:47.845Z', TRUE, 'c36e1dc4-3c2b-48c7-a117-ff0f8cdd27d0', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('e032293d-4ace-460b-bb58-fd5c8c7c2f07', NULL, 'DV DAHIL', '1.00', '4.71', '4.71', '0.00', '0.00', 0.9, '2026-02-11T21:07:47.845Z', '2026-02-11T21:07:47.845Z', TRUE, 'c36e1dc4-3c2b-48c7-a117-ff0f8cdd27d0', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('a4b759cc-e88d-4342-8887-0e3f3df65d30', NULL, '%1', '1.00', '470.83', '470.83', '1.00', '4.71', 0.9, '2026-02-11T21:07:47.845Z', '2026-02-11T21:07:47.845Z', TRUE, 'c36e1dc4-3c2b-48c7-a117-ff0f8cdd27d0', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('e6479c0d-e32c-497f-8dff-da3b9c7f76ea', NULL, '475.54', '1.00', '13.50', '13.50', '0.00', '0.00', 0.9, '2026-02-11T21:07:47.845Z', '2026-02-11T21:07:47.845Z', TRUE, 'c36e1dc4-3c2b-48c7-a117-ff0f8cdd27d0', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('376c7ee0-2f64-4efc-8f43-cd68068babd2', NULL, '%20', '1.00', '67.50', '67.50', '20.00', '13.50', 0.9, '2026-02-11T21:07:47.845Z', '2026-02-11T21:07:47.845Z', TRUE, 'c36e1dc4-3c2b-48c7-a117-ff0f8cdd27d0', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('f4ef9ecf-af45-4af9-a574-1d242ed976dd', NULL, 'Unknown Product', '1.00', '81.00', '81.00', '0.00', '0.00', 0.9, '2026-02-11T21:07:47.845Z', '2026-02-11T21:07:47.845Z', TRUE, 'c36e1dc4-3c2b-48c7-a117-ff0f8cdd27d0', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('a6118440-6dc6-4452-aacc-791b91711f09', NULL, 'Fat.Tar..2026 1111111111 O', '1.00', '11.02', '11.02', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('16243c4f-dcc7-49d6-9423-81fa4ecd1e77', NULL, 'Miktar Birim Ad 0 99,95 1', '1.00', '199.90', '199.90', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('83ae735c-e470-4568-8745-8b9624b881cb', NULL, 'O 2,000 AD V.AVOKADO ADET  20 74,95', '1.00', '74.95', '74.95', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('20e63e0b-a42d-4f0c-a879-6ca5b74d00ae', NULL, '1.000 AD 0  20 219,90', '1.00', '219.90', '219.90', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('a2c3038c-27a1-45bb-8e1e-4eba2310cb10', NULL, '1,000 FAMILIA TUVALET KAGIDI 4OLI BAMBU OZLU $6°68 1', '1.00', '89.95', '89.95', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('6752af8a-84d1-45a4-a5be-fb46b0785646', NULL, 'A.DANET JANBON DANA KG 0 1079,90 1', '1.00', '207.34', '207.34', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('3d749c02-f74c-4867-820a-209b44aea5cb', NULL, '0,192KG 0  1 24,95', '1.00', '24.95', '24.95', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('9f8376a6-81cc-400e-9dff-05b54aa6d7ff', NULL, '1,000 FILIZMAKARNA 500GR ARPASEHRIYE', '1.00', '24.95', '24.95', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('39d17fca-2dce-4b4a-8184-9ae81a7c0639', NULL, 'O 1,000 AD FILIZ MAKAR500GR ERISTE*** 0  1', '1.00', '24.95', '24.95', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('a3023509-1d97-4635-ba79-99464a3c4496', NULL, 'A.EV ERISTESI KG 0 249,90 1', '1.00', '99.96', '99.96', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('6c821417-f29d-402a-bc5c-bb4fcea2c0bf', NULL, '0.400 KG 0 54,95 1', '1.00', '109.90', '109.90', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('1c531e34-dea4-4563-95aa-a708673c1774', NULL, '2,000 AD KAHVE DN.100 GR TURK KAHVESI ORTA KA', '1.00', '159.90', '159.90', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('118588bd-e517-4384-bc7c-727d1d47ba5d', NULL, '2,000 AD V.PAZI ADET 0  1', '1.00', '79.95', '79.95', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('6525932b-1171-4dc8-bebf-d5a2d2e938f9', NULL, 'MV.PIRASA KG 64,95 1', '1.00', '52.61', '52.61', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('96f903cd-43d4-474c-811a-429fd4a94eb5', NULL, '0,810 KG 0  1 143,90', '1.00', '143.90', '143.90', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('d0403a1d-442d-470f-875c-5894537e9300', NULL, '1,000 AD BREIS1KGFASLYEKURU***** 54.95 1', '1.00', '54.95', '54.95', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('a8bbb5db-8363-4624-98f4-bceb766452ab', NULL, '1 79,95', '1.00', '79.95', '79.95', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('ec29ff14-4915-4240-95f9-d52ec5940b9f', NULL, '1,000AD SUTASSUT6180M*', '1.00', '22.40', '22.40', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('83d613cb-fdc4-4293-ac75-f00c9773152b', NULL, '0,748 KG MNV.HAVUC KG 0  1', '1.00', '29.95', '29.95', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('8f72fed7-81aa-47aa-aed6-f4ec52d4395a', NULL, 'NV.KEREVIZ KG 0 74,95 1', '1.00', '107.48', '107.48', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('628a6961-4e78-4a2d-a58e-a225835c6cb7', NULL, '1,434 KG 0  1 24,95', '1.00', '24.95', '24.95', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('82d580fa-30b7-4545-a282-7abe8d5cae7b', NULL, '1,000AD INV.MAYDANOZ ADET 139,95', '1.00', '139.11', '139.11', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('56d0f29d-95ba-410e-a86d-eb79c9084778', NULL, '0,994 KG 0 169,95 1', '1.00', '38.07', '38.07', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('7464fe56-0807-4d4b-ba9c-8d29aecec97f', NULL, '0,224 KG NV.S0GAN TAZE KG', '1.00', '56.04', '56.04', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('65110212-19d5-483e-b415-51ce413f1f7f', NULL, '2.246 KG N.PATATES TAZE KG  1', '1.00', '24.95', '24.95', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('1d820e14-dec3-4f4b-86fd-752f20d2948f', NULL, 'V.SOGAN KURU KG. 15,95 1', '1.00', '27.02', '27.02', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('bff22719-8ffd-4a3c-ace9-24f29d2ee0d5', NULL, '1,694 KG 109,95 1', '1.00', '105.55', '105.55', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('260bd982-1df1-45bc-839a-78afb15d8dd6', NULL, '0.960 KG .DOMATES SALKIM KG 20', '1.00', '99.95', '99.95', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('c6cc402b-495e-4314-b829-ad1f7dc7ee2a', NULL, '1,000 AD PANTENE SAP.400ONRICI VE KORUYUCU', '1.00', '99.95', '99.95', '0.00', '0.00', 0.9, '2026-02-11T21:08:25.528Z', '2026-02-11T21:08:25.528Z', TRUE, 'fa3ad106-7bc3-4529-a7d4-5852e5bb79bd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('6fded5bc-0e1f-42d9-aae9-c8090745f394', NULL, '.202615:06', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:21:21.747Z', '2026-02-11T21:21:21.747Z', TRUE, 'c23bef8a-8dd4-41dc-9ae5-02329a93f011', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('63d47115-41cf-413e-9506-effe98b9b63b', NULL, 'Unknown Product', '1.00', '206.04', '206.04', '0.00', '0.00', 0.9, '2026-02-11T21:21:21.747Z', '2026-02-11T21:21:21.747Z', TRUE, 'c23bef8a-8dd4-41dc-9ae5-02329a93f011', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('27d34c1c-e41d-456c-adfb-a2adfbf2ecfe', NULL, '3ad X', '1.00', '46.00', '46.00', '0.00', '0.00', 0.9, '2026-02-11T21:21:21.747Z', '2026-02-11T21:21:21.747Z', TRUE, 'c23bef8a-8dd4-41dc-9ae5-02329a93f011', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('4375ba3a-c282-432a-81a4-4552ac9b7609', NULL, '*', '1.00', '138.00', '138.00', '13.00', '17.94', 0.9, '2026-02-11T21:21:21.747Z', '2026-02-11T21:21:21.747Z', TRUE, 'c23bef8a-8dd4-41dc-9ae5-02329a93f011', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('a253589d-0766-4c4b-b952-5cb732b81ed1', NULL, 'Unknown Product', '1.00', '11.50', '11.50', '0.00', '0.00', 0.9, '2026-02-11T21:21:21.747Z', '2026-02-11T21:21:21.747Z', TRUE, 'c23bef8a-8dd4-41dc-9ae5-02329a93f011', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('9c6ce92b-0c69-47f9-87b6-4eef00aee051', NULL, '%20', '1.00', '49.00', '49.00', '20.00', '9.80', 0.9, '2026-02-11T21:21:21.747Z', '2026-02-11T21:21:21.747Z', TRUE, 'c23bef8a-8dd4-41dc-9ae5-02329a93f011', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('d1e06690-c9e5-46e8-80b1-cf437210f417', NULL, 'Unknown Product', '1.00', '120.00', '120.00', '0.00', '0.00', 0.9, '2026-02-11T21:21:21.747Z', '2026-02-11T21:21:21.747Z', TRUE, 'c23bef8a-8dd4-41dc-9ae5-02329a93f011', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('3d0cfb50-0006-48b3-93e0-23529215ea50', NULL, '2adx', '1.00', '1.00', '1.00', '0.00', '0.00', 0.9, '2026-02-11T21:21:21.747Z', '2026-02-11T21:21:21.747Z', TRUE, 'c23bef8a-8dd4-41dc-9ae5-02329a93f011', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('c28a25c7-71c9-4532-855c-c5dbef7dd90b', NULL, 'Unknown Product', '1.00', '556.54', '556.54', '0.00', '0.00', 0.9, '2026-02-11T21:21:21.747Z', '2026-02-11T21:21:21.747Z', TRUE, 'c23bef8a-8dd4-41dc-9ae5-02329a93f011', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('36b56039-bd17-4110-9c52-5f523ef728bf', NULL, '.202615:07', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:21:21.747Z', '2026-02-11T21:21:21.747Z', TRUE, 'c23bef8a-8dd4-41dc-9ae5-02329a93f011', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('fb296d3c-3432-49c9-a703-93d717bbc96a', NULL, 'DV DAHIL', '1.00', '4.71', '4.71', '0.00', '0.00', 0.9, '2026-02-11T21:21:21.747Z', '2026-02-11T21:21:21.747Z', TRUE, 'c23bef8a-8dd4-41dc-9ae5-02329a93f011', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('9f86b1f0-c3a7-41f1-87b8-e04d98a27c27', NULL, '%1', '1.00', '470.83', '470.83', '1.00', '4.71', 0.9, '2026-02-11T21:21:21.747Z', '2026-02-11T21:21:21.747Z', TRUE, 'c23bef8a-8dd4-41dc-9ae5-02329a93f011', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('a4c27183-bb10-4378-8886-c9bc8ffc2e54', NULL, '475.54', '1.00', '13.50', '13.50', '0.00', '0.00', 0.9, '2026-02-11T21:21:21.747Z', '2026-02-11T21:21:21.747Z', TRUE, 'c23bef8a-8dd4-41dc-9ae5-02329a93f011', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('b0f3c511-fbee-4ff9-a72e-0c55adf9a3c8', NULL, '%20', '1.00', '67.50', '67.50', '20.00', '13.50', 0.9, '2026-02-11T21:21:21.747Z', '2026-02-11T21:21:21.747Z', TRUE, 'c23bef8a-8dd4-41dc-9ae5-02329a93f011', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('08a0507d-b2f8-40cf-997f-67bc9d35ad23', NULL, 'Unknown Product', '1.00', '81.00', '81.00', '0.00', '0.00', 0.9, '2026-02-11T21:21:21.747Z', '2026-02-11T21:21:21.747Z', TRUE, 'c23bef8a-8dd4-41dc-9ae5-02329a93f011', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('a56b700f-4a2e-4930-b1bd-c5975d268435', NULL, '.202615:06', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:24:25.412Z', '2026-02-11T21:24:25.412Z', TRUE, 'd664b36c-ed06-4c61-9833-1aa0d68ec1ef', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('57b6219b-9cd5-410e-ad58-2bc477389fe5', NULL, 'Unknown Product', '1.00', '206.04', '206.04', '0.00', '0.00', 0.9, '2026-02-11T21:24:25.412Z', '2026-02-11T21:24:25.412Z', TRUE, 'd664b36c-ed06-4c61-9833-1aa0d68ec1ef', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('372ad939-1855-4ea3-aeb2-dd08fa231bf5', NULL, '3ad X', '1.00', '46.00', '46.00', '0.00', '0.00', 0.9, '2026-02-11T21:24:25.412Z', '2026-02-11T21:24:25.412Z', TRUE, 'd664b36c-ed06-4c61-9833-1aa0d68ec1ef', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('63829e55-6976-4660-b12f-54aa7a482343', NULL, 'Unknown Product', '1.00', '11.50', '11.50', '0.00', '0.00', 0.9, '2026-02-11T21:24:25.412Z', '2026-02-11T21:24:25.412Z', TRUE, 'd664b36c-ed06-4c61-9833-1aa0d68ec1ef', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('a5eb7a06-8841-4294-8705-6cc19b931218', NULL, '%20', '1.00', '49.00', '49.00', '20.00', '9.80', 0.9, '2026-02-11T21:24:25.412Z', '2026-02-11T21:24:25.412Z', TRUE, 'd664b36c-ed06-4c61-9833-1aa0d68ec1ef', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('87e22a90-9dac-4b52-9203-7e171ff1d146', NULL, 'Unknown Product', '1.00', '120.00', '120.00', '0.00', '0.00', 0.9, '2026-02-11T21:24:25.412Z', '2026-02-11T21:24:25.412Z', TRUE, 'd664b36c-ed06-4c61-9833-1aa0d68ec1ef', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('8371d0a0-1825-49df-b620-0fc8fe91ea95', NULL, '2adx', '1.00', '1.00', '1.00', '0.00', '0.00', 0.9, '2026-02-11T21:24:25.412Z', '2026-02-11T21:24:25.412Z', TRUE, 'd664b36c-ed06-4c61-9833-1aa0d68ec1ef', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('af96feba-b773-4d57-9d5b-5a1345bb59f7', NULL, 'Unknown Product', '1.00', '556.54', '556.54', '0.00', '0.00', 0.9, '2026-02-11T21:24:25.412Z', '2026-02-11T21:24:25.412Z', TRUE, 'd664b36c-ed06-4c61-9833-1aa0d68ec1ef', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('ebb0f485-f4b2-43ea-8e5f-83738daf2c5f', NULL, '.202615:07', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:24:25.412Z', '2026-02-11T21:24:25.412Z', TRUE, 'd664b36c-ed06-4c61-9833-1aa0d68ec1ef', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('a4fc025f-6c7b-4284-adfb-900019ae114c', NULL, 'DV DAHIL', '1.00', '4.71', '4.71', '0.00', '0.00', 0.9, '2026-02-11T21:24:25.412Z', '2026-02-11T21:24:25.412Z', TRUE, 'd664b36c-ed06-4c61-9833-1aa0d68ec1ef', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('593c0d8f-a190-4d53-b0e5-9b58ce4f051c', NULL, '%1', '1.00', '470.83', '470.83', '1.00', '4.71', 0.9, '2026-02-11T21:24:25.412Z', '2026-02-11T21:24:25.412Z', TRUE, 'd664b36c-ed06-4c61-9833-1aa0d68ec1ef', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('1e4c081e-7573-49ed-93de-7feadd57d4e8', NULL, '475.54', '1.00', '13.50', '13.50', '0.00', '0.00', 0.9, '2026-02-11T21:24:25.412Z', '2026-02-11T21:24:25.412Z', TRUE, 'd664b36c-ed06-4c61-9833-1aa0d68ec1ef', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('693cd4cf-488c-4c52-a625-d1a1dd6ba554', NULL, '%20', '1.00', '67.50', '67.50', '20.00', '13.50', 0.9, '2026-02-11T21:24:25.412Z', '2026-02-11T21:24:25.412Z', TRUE, 'd664b36c-ed06-4c61-9833-1aa0d68ec1ef', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('65b139dd-0f5f-4223-b492-c3e4126d569d', NULL, 'Unknown Product', '1.00', '81.00', '81.00', '0.00', '0.00', 0.9, '2026-02-11T21:24:25.412Z', '2026-02-11T21:24:25.412Z', TRUE, 'd664b36c-ed06-4c61-9833-1aa0d68ec1ef', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('067e0eb5-649a-4dec-8a78-6abba5b7ccc0', NULL, 'YEMEK %10*2.', '1.00', '974.80', '974.80', '10.00', '97.48', 0.9, '2026-02-11T21:24:51.022Z', '2026-02-11T21:24:51.022Z', TRUE, '1acf90f2-9448-4bef-888b-46b38dba5306', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('3e83a8bb-e57c-4feb-9e65-d921dbeb2048', NULL, 'KREDI *2.', '1.00', '974.80', '974.80', '2.00', '19.50', 0.9, '2026-02-11T21:24:51.022Z', '2026-02-11T21:24:51.022Z', TRUE, '1acf90f2-9448-4bef-888b-46b38dba5306', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('a5be7a21-5f27-4f3f-a6e1-f01fd74db9f5', NULL, 'BU ISLEN TEHASSIZ BIR KART ILE 2.TL', '1.00', '974.80', '974.80', '0.00', '0.00', 0.9, '2026-02-11T21:24:51.022Z', '2026-02-11T21:24:51.022Z', TRUE, '1acf90f2-9448-4bef-888b-46b38dba5306', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('2e29ca2c-4807-4a86-a41a-1364a24029b4', NULL, 'Fat.Tar..2026 1111111111 O', '1.00', '11.02', '11.02', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('b028c9fe-8718-4602-a64d-43cbf457ec04', NULL, 'Miktar Birim Ad 0 99,95 1', '1.00', '199.90', '199.90', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('eec72cca-2042-4db3-8ad2-daee68315732', NULL, 'O 2,000 AD V.AVOKADO ADET  20 74,95', '1.00', '74.95', '74.95', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('387d0940-8b60-412b-91ab-046997b75487', NULL, '1.000 AD 0  20 219,90', '1.00', '219.90', '219.90', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('bd34150e-4000-4a03-a863-b294095826c1', NULL, '1,000 FAMILIA TUVALET KAGIDI 4OLI BAMBU OZLU $6°68 1', '1.00', '89.95', '89.95', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('6d9a3a87-4ff4-42ef-9fae-95bba26aef35', NULL, 'A.DANET JANBON DANA KG 0 1079,90 1', '1.00', '207.34', '207.34', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('87f931c6-edfa-4d0b-b81e-0f7a3634193a', NULL, '0,192KG 0  1 24,95', '1.00', '24.95', '24.95', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('eed2c75a-3a86-4fea-89e3-006631757e65', NULL, '1,000 FILIZMAKARNA 500GR ARPASEHRIYE', '1.00', '24.95', '24.95', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('2e048274-8a0a-4612-af29-e447e4373dd0', NULL, 'O 1,000 AD FILIZ MAKAR500GR ERISTE*** 0  1', '1.00', '24.95', '24.95', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('41850492-975a-498d-8ba2-7a697337b44a', NULL, 'A.EV ERISTESI KG 0 249,90 1', '1.00', '99.96', '99.96', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('ff6b7248-ea77-41c8-964d-3483f39a8992', NULL, '0.400 KG 0 54,95 1', '1.00', '109.90', '109.90', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('22e46c3c-5bad-4c6f-bbed-29d27d2cc5fb', NULL, '2,000 AD KAHVE DN.100 GR TURK KAHVESI ORTA KA', '1.00', '159.90', '159.90', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('75a73330-ccb8-4645-ae80-c4451a8253bc', NULL, '2,000 AD V.PAZI ADET 0  1', '1.00', '79.95', '79.95', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('ac61d0f4-3451-4cc5-80df-5e1fdb158c1f', NULL, 'MV.PIRASA KG 64,95 1', '1.00', '52.61', '52.61', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('e123e9a3-4db2-489a-9b36-cb264392e21d', NULL, '0,810 KG 0  1 143,90', '1.00', '143.90', '143.90', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('6b90ce69-5f4e-44a9-bfaa-37765b18c27b', NULL, '1,000 AD BREIS1KGFASLYEKURU***** 54.95 1', '1.00', '54.95', '54.95', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('85f13715-9719-4be1-a7a5-f363b172d35b', NULL, '1 79,95', '1.00', '79.95', '79.95', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('e672171c-b6af-4bc1-a57b-bd27407ae97f', NULL, '1,000AD SUTASSUT6180M*', '1.00', '22.40', '22.40', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('0e5aa563-281f-4db0-837d-d3ef0a6d942c', NULL, '0,748 KG MNV.HAVUC KG 0  1', '1.00', '29.95', '29.95', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('ac6d12bd-eb4c-4160-9131-c6bc59c203e5', NULL, 'NV.KEREVIZ KG 0 74,95 1', '1.00', '107.48', '107.48', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('bd3d83b7-9a23-44fb-83bc-411b0d0edbc7', NULL, '1,434 KG 0  1 24,95', '1.00', '24.95', '24.95', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('4a16cbd8-d9d3-4469-a772-aa8daadc1fc0', NULL, '1,000AD INV.MAYDANOZ ADET 139,95', '1.00', '139.11', '139.11', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('64beb953-50ad-4224-87b6-6088e3f7ae7b', NULL, '0,994 KG 0 169,95 1', '1.00', '38.07', '38.07', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('9d30453d-036c-48de-98ba-bee25a22914c', NULL, '0,224 KG NV.S0GAN TAZE KG', '1.00', '56.04', '56.04', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('98ed5350-1429-4c9d-a010-de3311882aab', NULL, '2.246 KG N.PATATES TAZE KG  1', '1.00', '24.95', '24.95', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('4142b859-6f67-4e32-8ee8-d23482f03fa3', NULL, 'V.SOGAN KURU KG. 15,95 1', '1.00', '27.02', '27.02', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('97ccfec0-ce8c-4296-8bf3-2d1301a9af52', NULL, '1,694 KG 109,95 1', '1.00', '105.55', '105.55', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('4089b982-de63-4ba0-94a4-e929502e5f0a', NULL, '0.960 KG .DOMATES SALKIM KG 20', '1.00', '99.95', '99.95', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('c266d069-2d5a-4c96-8547-e65ebf8f8da1', NULL, '1,000 AD PANTENE SAP.400ONRICI VE KORUYUCU', '1.00', '99.95', '99.95', '0.00', '0.00', 0.9, '2026-02-11T21:25:08.833Z', '2026-02-11T21:25:08.833Z', TRUE, '09e2d068-f1eb-4cc7-a74b-471be3216e03', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('1e1d3613-9857-4043-930f-9cdea7e0ece0', NULL, '.202615:06', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:25:57.816Z', '2026-02-11T21:25:57.816Z', TRUE, '642f18b9-b470-4a82-86de-93177220ebb4', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('01a90319-47af-43dd-836e-7d34a5e6649f', NULL, 'Unknown Product', '1.00', '206.04', '206.04', '0.00', '0.00', 0.9, '2026-02-11T21:25:57.816Z', '2026-02-11T21:25:57.816Z', TRUE, '642f18b9-b470-4a82-86de-93177220ebb4', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('14976d23-8ece-4727-ac31-78e85b9a9f96', NULL, '3ad X', '1.00', '46.00', '46.00', '0.00', '0.00', 0.9, '2026-02-11T21:25:57.816Z', '2026-02-11T21:25:57.816Z', TRUE, '642f18b9-b470-4a82-86de-93177220ebb4', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('b688f1b9-f63d-4b48-97c2-a951150f71f3', NULL, '*', '1.00', '138.00', '138.00', '13.00', '17.94', 0.9, '2026-02-11T21:25:57.816Z', '2026-02-11T21:25:57.816Z', TRUE, '642f18b9-b470-4a82-86de-93177220ebb4', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('bd49ae0a-1bf6-4061-a9fd-65b8f443cb45', NULL, 'Unknown Product', '1.00', '11.50', '11.50', '0.00', '0.00', 0.9, '2026-02-11T21:25:57.816Z', '2026-02-11T21:25:57.816Z', TRUE, '642f18b9-b470-4a82-86de-93177220ebb4', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('992719d8-d5e6-4eef-94aa-e81d7b4740d8', NULL, '%20', '1.00', '49.00', '49.00', '20.00', '9.80', 0.9, '2026-02-11T21:25:57.816Z', '2026-02-11T21:25:57.816Z', TRUE, '642f18b9-b470-4a82-86de-93177220ebb4', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('44f2a785-c833-4a54-ac0f-c66c944d1336', NULL, 'Unknown Product', '1.00', '120.00', '120.00', '0.00', '0.00', 0.9, '2026-02-11T21:25:57.816Z', '2026-02-11T21:25:57.816Z', TRUE, '642f18b9-b470-4a82-86de-93177220ebb4', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('8005a485-1c94-4425-b734-be26d87ffc27', NULL, '2adx', '1.00', '1.00', '1.00', '0.00', '0.00', 0.9, '2026-02-11T21:25:57.816Z', '2026-02-11T21:25:57.816Z', TRUE, '642f18b9-b470-4a82-86de-93177220ebb4', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('60b7c467-6d5f-4b4e-8099-e4a22b092323', NULL, 'Unknown Product', '1.00', '556.54', '556.54', '0.00', '0.00', 0.9, '2026-02-11T21:25:57.816Z', '2026-02-11T21:25:57.816Z', TRUE, '642f18b9-b470-4a82-86de-93177220ebb4', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('c5c0420d-fbba-48fe-8475-2ffc5540cce5', NULL, '.202615:07', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:25:57.816Z', '2026-02-11T21:25:57.816Z', TRUE, '642f18b9-b470-4a82-86de-93177220ebb4', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('c1bc30d1-8529-4d8b-a569-3b34879fa9e5', NULL, 'DV DAHIL', '1.00', '4.71', '4.71', '0.00', '0.00', 0.9, '2026-02-11T21:25:57.816Z', '2026-02-11T21:25:57.816Z', TRUE, '642f18b9-b470-4a82-86de-93177220ebb4', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('7e421925-97a2-47df-a858-ed12958180a4', NULL, '%1', '1.00', '470.83', '470.83', '1.00', '4.71', 0.9, '2026-02-11T21:25:57.816Z', '2026-02-11T21:25:57.816Z', TRUE, '642f18b9-b470-4a82-86de-93177220ebb4', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('c92f6f1d-5a4a-4ad4-b839-245bec279070', NULL, '475.54', '1.00', '13.50', '13.50', '0.00', '0.00', 0.9, '2026-02-11T21:25:57.816Z', '2026-02-11T21:25:57.816Z', TRUE, '642f18b9-b470-4a82-86de-93177220ebb4', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('def89575-0d78-427b-925f-74bd9e3f42fb', NULL, '%20', '1.00', '67.50', '67.50', '20.00', '13.50', 0.9, '2026-02-11T21:25:57.816Z', '2026-02-11T21:25:57.816Z', TRUE, '642f18b9-b470-4a82-86de-93177220ebb4', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('df755720-376f-430c-8fc9-f71af4f02d37', NULL, 'Unknown Product', '1.00', '81.00', '81.00', '0.00', '0.00', 0.9, '2026-02-11T21:25:57.816Z', '2026-02-11T21:25:57.816Z', TRUE, '642f18b9-b470-4a82-86de-93177220ebb4', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('14dc0716-b96c-4a23-b298-bbdb3aa88600', NULL, '.202615:06', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:28:55.423Z', '2026-02-11T21:28:55.423Z', TRUE, '02ab9781-3b22-4d04-891a-02d2c422e20e', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('d36f20f7-a11a-4d9b-99da-01c437bf756c', NULL, 'Unknown Product', '1.00', '206.04', '206.04', '0.00', '0.00', 0.9, '2026-02-11T21:28:55.423Z', '2026-02-11T21:28:55.423Z', TRUE, '02ab9781-3b22-4d04-891a-02d2c422e20e', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('2672dcfb-99a3-45b2-9b0e-701be9e33b30', NULL, '3ad X', '1.00', '46.00', '46.00', '0.00', '0.00', 0.9, '2026-02-11T21:28:55.423Z', '2026-02-11T21:28:55.423Z', TRUE, '02ab9781-3b22-4d04-891a-02d2c422e20e', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('3980a7c3-fb7f-456f-aee3-1301663d3603', NULL, '*', '1.00', '138.00', '138.00', '13.00', '17.94', 0.9, '2026-02-11T21:28:55.423Z', '2026-02-11T21:28:55.423Z', TRUE, '02ab9781-3b22-4d04-891a-02d2c422e20e', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('c1925fcd-b3bc-485a-8e3f-6dab07f65238', NULL, 'Unknown Product', '1.00', '11.50', '11.50', '0.00', '0.00', 0.9, '2026-02-11T21:28:55.423Z', '2026-02-11T21:28:55.423Z', TRUE, '02ab9781-3b22-4d04-891a-02d2c422e20e', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('9b2a18a5-08ea-4eb1-8b2a-a7d7924dfccb', NULL, '%20', '1.00', '49.00', '49.00', '20.00', '9.80', 0.9, '2026-02-11T21:28:55.423Z', '2026-02-11T21:28:55.423Z', TRUE, '02ab9781-3b22-4d04-891a-02d2c422e20e', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('5069f043-59c4-4b29-a1ba-d9cbf593c1b3', NULL, 'Unknown Product', '1.00', '120.00', '120.00', '0.00', '0.00', 0.9, '2026-02-11T21:28:55.423Z', '2026-02-11T21:28:55.423Z', TRUE, '02ab9781-3b22-4d04-891a-02d2c422e20e', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('697733f4-3d0f-431e-999f-c3a4dea371a5', NULL, '2adx', '1.00', '1.00', '1.00', '0.00', '0.00', 0.9, '2026-02-11T21:28:55.423Z', '2026-02-11T21:28:55.423Z', TRUE, '02ab9781-3b22-4d04-891a-02d2c422e20e', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('067dc809-3f7a-4bce-8d60-c082e8cca8d9', NULL, 'Unknown Product', '1.00', '556.54', '556.54', '0.00', '0.00', 0.9, '2026-02-11T21:28:55.423Z', '2026-02-11T21:28:55.423Z', TRUE, '02ab9781-3b22-4d04-891a-02d2c422e20e', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('1b4e9094-8382-4c02-a976-23408dc184f4', NULL, '.202615:07', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:28:55.423Z', '2026-02-11T21:28:55.423Z', TRUE, '02ab9781-3b22-4d04-891a-02d2c422e20e', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('028abe18-1ff6-4a05-bad4-f34162e21427', NULL, 'DV DAHIL', '1.00', '4.71', '4.71', '0.00', '0.00', 0.9, '2026-02-11T21:28:55.423Z', '2026-02-11T21:28:55.423Z', TRUE, '02ab9781-3b22-4d04-891a-02d2c422e20e', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('3f13c793-49e5-4bc8-9f0d-08a67541774a', NULL, '%1', '1.00', '470.83', '470.83', '1.00', '4.71', 0.9, '2026-02-11T21:28:55.423Z', '2026-02-11T21:28:55.423Z', TRUE, '02ab9781-3b22-4d04-891a-02d2c422e20e', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('36329e33-0b5f-4eb1-a4e0-a2946a388607', NULL, '475.54', '1.00', '13.50', '13.50', '0.00', '0.00', 0.9, '2026-02-11T21:28:55.423Z', '2026-02-11T21:28:55.423Z', TRUE, '02ab9781-3b22-4d04-891a-02d2c422e20e', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('77814d5f-d11e-4f55-8f71-c12d3376e025', NULL, '%20', '1.00', '67.50', '67.50', '20.00', '13.50', 0.9, '2026-02-11T21:28:55.423Z', '2026-02-11T21:28:55.423Z', TRUE, '02ab9781-3b22-4d04-891a-02d2c422e20e', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('f2cc2b98-b9cd-458d-902d-78ffa9c58dfc', NULL, 'Unknown Product', '1.00', '81.00', '81.00', '0.00', '0.00', 0.9, '2026-02-11T21:28:55.423Z', '2026-02-11T21:28:55.423Z', TRUE, '02ab9781-3b22-4d04-891a-02d2c422e20e', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('330338d1-6840-456e-98b3-f950572a8ff4', NULL, '.202615:06', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:32:13.607Z', '2026-02-11T21:32:13.607Z', TRUE, '61a0a75f-0b51-47a7-8445-479ff83e1366', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('744caf33-9929-4c4d-b324-fbbb65ad86ed', NULL, 'Unknown Product', '1.00', '206.04', '206.04', '0.00', '0.00', 0.9, '2026-02-11T21:32:13.607Z', '2026-02-11T21:32:13.607Z', TRUE, '61a0a75f-0b51-47a7-8445-479ff83e1366', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('f3741b14-6424-4c9b-bb87-c455d1ba7aa6', NULL, '3ad X', '1.00', '46.00', '46.00', '0.00', '0.00', 0.9, '2026-02-11T21:32:13.607Z', '2026-02-11T21:32:13.607Z', TRUE, '61a0a75f-0b51-47a7-8445-479ff83e1366', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('b8577b8f-d82b-44f1-b840-6bdaa7a60387', NULL, '*', '1.00', '138.00', '138.00', '13.00', '17.94', 0.9, '2026-02-11T21:32:13.607Z', '2026-02-11T21:32:13.607Z', TRUE, '61a0a75f-0b51-47a7-8445-479ff83e1366', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('ba159dff-6b53-46b7-8e6e-3b90f75ca2a8', NULL, 'Unknown Product', '1.00', '11.50', '11.50', '0.00', '0.00', 0.9, '2026-02-11T21:32:13.607Z', '2026-02-11T21:32:13.607Z', TRUE, '61a0a75f-0b51-47a7-8445-479ff83e1366', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('78aabf2a-4de3-4d32-b0b6-d4547707c314', NULL, '%20', '1.00', '49.00', '49.00', '20.00', '9.80', 0.9, '2026-02-11T21:32:13.607Z', '2026-02-11T21:32:13.607Z', TRUE, '61a0a75f-0b51-47a7-8445-479ff83e1366', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('59982bab-074a-48b9-9495-32ca610f7575', NULL, 'Unknown Product', '1.00', '120.00', '120.00', '0.00', '0.00', 0.9, '2026-02-11T21:32:13.607Z', '2026-02-11T21:32:13.607Z', TRUE, '61a0a75f-0b51-47a7-8445-479ff83e1366', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('002288ba-2f63-4f4b-b0b4-c604e7c84bb2', NULL, '2adx', '1.00', '1.00', '1.00', '0.00', '0.00', 0.9, '2026-02-11T21:32:13.607Z', '2026-02-11T21:32:13.607Z', TRUE, '61a0a75f-0b51-47a7-8445-479ff83e1366', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('294580af-ac14-41db-8d01-135dfb89dc1a', NULL, 'Unknown Product', '1.00', '556.54', '556.54', '0.00', '0.00', 0.9, '2026-02-11T21:32:13.607Z', '2026-02-11T21:32:13.607Z', TRUE, '61a0a75f-0b51-47a7-8445-479ff83e1366', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('4462c95a-df7f-4dae-8ef7-162c20725bd6', NULL, '.202615:07', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:32:13.607Z', '2026-02-11T21:32:13.607Z', TRUE, '61a0a75f-0b51-47a7-8445-479ff83e1366', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('ff738767-f6f8-4142-b35c-be470ba72a6b', NULL, 'DV DAHIL', '1.00', '4.71', '4.71', '0.00', '0.00', 0.9, '2026-02-11T21:32:13.607Z', '2026-02-11T21:32:13.607Z', TRUE, '61a0a75f-0b51-47a7-8445-479ff83e1366', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('0f9b155f-3ddf-416b-833a-01505ab75804', NULL, '%1', '1.00', '470.83', '470.83', '1.00', '4.71', 0.9, '2026-02-11T21:32:13.607Z', '2026-02-11T21:32:13.607Z', TRUE, '61a0a75f-0b51-47a7-8445-479ff83e1366', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('bb7fabd3-1427-4207-b24e-59580f1693d2', NULL, '475.54', '1.00', '13.50', '13.50', '0.00', '0.00', 0.9, '2026-02-11T21:32:13.607Z', '2026-02-11T21:32:13.607Z', TRUE, '61a0a75f-0b51-47a7-8445-479ff83e1366', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('dce91e0a-0da8-4285-8d04-09b60c39170a', NULL, '%20', '1.00', '67.50', '67.50', '20.00', '13.50', 0.9, '2026-02-11T21:32:13.607Z', '2026-02-11T21:32:13.607Z', TRUE, '61a0a75f-0b51-47a7-8445-479ff83e1366', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('17114f19-e7ba-430b-b12a-9a9c07501910', NULL, 'Unknown Product', '1.00', '81.00', '81.00', '0.00', '0.00', 0.9, '2026-02-11T21:32:13.607Z', '2026-02-11T21:32:13.607Z', TRUE, '61a0a75f-0b51-47a7-8445-479ff83e1366', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('9df46b77-2867-4b72-b76d-223e44e7a012', NULL, '.202615:06', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:33:47.081Z', '2026-02-11T21:33:47.081Z', TRUE, '80f308f7-4e55-4a4c-8edc-8bbc2daa7aeb', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('ff385acd-7c46-4c6b-a52d-484d3623ba1d', NULL, 'Unknown Product', '1.00', '206.04', '206.04', '0.00', '0.00', 0.9, '2026-02-11T21:33:47.081Z', '2026-02-11T21:33:47.081Z', TRUE, '80f308f7-4e55-4a4c-8edc-8bbc2daa7aeb', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('4ff7af13-3487-4749-baf0-4a1e67b4e256', NULL, '3ad X', '1.00', '46.00', '46.00', '0.00', '0.00', 0.9, '2026-02-11T21:33:47.081Z', '2026-02-11T21:33:47.081Z', TRUE, '80f308f7-4e55-4a4c-8edc-8bbc2daa7aeb', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('3a8a0e71-a906-4998-bd88-9e95b3d81102', NULL, '*', '1.00', '138.00', '138.00', '13.00', '17.94', 0.9, '2026-02-11T21:33:47.081Z', '2026-02-11T21:33:47.081Z', TRUE, '80f308f7-4e55-4a4c-8edc-8bbc2daa7aeb', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('779b1620-42b0-4472-a262-48621810f22c', NULL, 'Unknown Product', '1.00', '11.50', '11.50', '0.00', '0.00', 0.9, '2026-02-11T21:33:47.081Z', '2026-02-11T21:33:47.081Z', TRUE, '80f308f7-4e55-4a4c-8edc-8bbc2daa7aeb', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('ed4d98e6-532c-4c99-950c-c3a09c5958f8', NULL, '%20', '1.00', '49.00', '49.00', '20.00', '9.80', 0.9, '2026-02-11T21:33:47.081Z', '2026-02-11T21:33:47.081Z', TRUE, '80f308f7-4e55-4a4c-8edc-8bbc2daa7aeb', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('ecdfe81a-06fc-4730-bd00-60cf7b81b58b', NULL, 'Unknown Product', '1.00', '120.00', '120.00', '0.00', '0.00', 0.9, '2026-02-11T21:33:47.081Z', '2026-02-11T21:33:47.081Z', TRUE, '80f308f7-4e55-4a4c-8edc-8bbc2daa7aeb', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('2dcac094-4e6f-4d07-88fc-9468ad0dec13', NULL, '2adx', '1.00', '1.00', '1.00', '0.00', '0.00', 0.9, '2026-02-11T21:33:47.081Z', '2026-02-11T21:33:47.081Z', TRUE, '80f308f7-4e55-4a4c-8edc-8bbc2daa7aeb', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('3f67cfdf-d624-42bb-8f22-0586740b021d', NULL, 'Unknown Product', '1.00', '556.54', '556.54', '0.00', '0.00', 0.9, '2026-02-11T21:33:47.081Z', '2026-02-11T21:33:47.081Z', TRUE, '80f308f7-4e55-4a4c-8edc-8bbc2daa7aeb', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('135c0066-0ab7-497d-81a4-ab9e53d103b7', NULL, '.202615:07', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:33:47.081Z', '2026-02-11T21:33:47.081Z', TRUE, '80f308f7-4e55-4a4c-8edc-8bbc2daa7aeb', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('2684fece-579e-4aa4-9942-22f4afc22aff', NULL, 'DV DAHIL', '1.00', '4.71', '4.71', '0.00', '0.00', 0.9, '2026-02-11T21:33:47.081Z', '2026-02-11T21:33:47.081Z', TRUE, '80f308f7-4e55-4a4c-8edc-8bbc2daa7aeb', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('578bd6bb-caaf-4a50-a3e4-f4eb9fda8fee', NULL, '%1', '1.00', '470.83', '470.83', '1.00', '4.71', 0.9, '2026-02-11T21:33:47.081Z', '2026-02-11T21:33:47.081Z', TRUE, '80f308f7-4e55-4a4c-8edc-8bbc2daa7aeb', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('ee4a592a-c879-4308-b4dc-bd4efd66b19b', NULL, '475.54', '1.00', '13.50', '13.50', '0.00', '0.00', 0.9, '2026-02-11T21:33:47.081Z', '2026-02-11T21:33:47.081Z', TRUE, '80f308f7-4e55-4a4c-8edc-8bbc2daa7aeb', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('feb1b002-fbc6-4466-b795-1f493625b409', NULL, '%20', '1.00', '67.50', '67.50', '20.00', '13.50', 0.9, '2026-02-11T21:33:47.081Z', '2026-02-11T21:33:47.081Z', TRUE, '80f308f7-4e55-4a4c-8edc-8bbc2daa7aeb', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('4dea05c8-9dfe-4333-b1e0-82c8b3cbf30f', NULL, 'Unknown Product', '1.00', '81.00', '81.00', '0.00', '0.00', 0.9, '2026-02-11T21:33:47.081Z', '2026-02-11T21:33:47.081Z', TRUE, '80f308f7-4e55-4a4c-8edc-8bbc2daa7aeb', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('75bc15dc-602b-4918-8fa2-ef845571cef2', NULL, '.202615:06', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:36:45.564Z', '2026-02-11T21:36:45.564Z', TRUE, '28acef7f-f8db-45e1-8ff5-e80249615636', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('4b88931d-b6f3-4261-bd9a-43e4fc69b0e0', NULL, 'Unknown Product', '1.00', '206.04', '206.04', '0.00', '0.00', 0.9, '2026-02-11T21:36:45.564Z', '2026-02-11T21:36:45.564Z', TRUE, '28acef7f-f8db-45e1-8ff5-e80249615636', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('a1d22d73-207f-42ec-84ee-96fd1ef680d4', NULL, '3ad X', '1.00', '46.00', '46.00', '0.00', '0.00', 0.9, '2026-02-11T21:36:45.564Z', '2026-02-11T21:36:45.564Z', TRUE, '28acef7f-f8db-45e1-8ff5-e80249615636', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('8650546a-2995-4519-b6f1-5cb2c1612e39', NULL, '*', '1.00', '138.00', '138.00', '13.00', '17.94', 0.9, '2026-02-11T21:36:45.564Z', '2026-02-11T21:36:45.564Z', TRUE, '28acef7f-f8db-45e1-8ff5-e80249615636', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('b83850b2-0b44-4584-8df2-91def5af0f84', NULL, 'Unknown Product', '1.00', '11.50', '11.50', '0.00', '0.00', 0.9, '2026-02-11T21:36:45.564Z', '2026-02-11T21:36:45.564Z', TRUE, '28acef7f-f8db-45e1-8ff5-e80249615636', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('1f686a41-af67-4046-95a1-40113ea2b754', NULL, '%20', '1.00', '49.00', '49.00', '20.00', '9.80', 0.9, '2026-02-11T21:36:45.564Z', '2026-02-11T21:36:45.564Z', TRUE, '28acef7f-f8db-45e1-8ff5-e80249615636', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('a758b110-175a-409d-a7db-56bf6a1f5be8', NULL, 'Unknown Product', '1.00', '120.00', '120.00', '0.00', '0.00', 0.9, '2026-02-11T21:36:45.564Z', '2026-02-11T21:36:45.564Z', TRUE, '28acef7f-f8db-45e1-8ff5-e80249615636', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('50f1423e-7728-4ab9-9bf1-bab1fb69e6fd', NULL, '2adx', '1.00', '1.00', '1.00', '0.00', '0.00', 0.9, '2026-02-11T21:36:45.564Z', '2026-02-11T21:36:45.564Z', TRUE, '28acef7f-f8db-45e1-8ff5-e80249615636', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('c6d8fce9-378a-4f00-85b4-12609da22c39', NULL, 'Unknown Product', '1.00', '556.54', '556.54', '0.00', '0.00', 0.9, '2026-02-11T21:36:45.564Z', '2026-02-11T21:36:45.564Z', TRUE, '28acef7f-f8db-45e1-8ff5-e80249615636', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('2f3c5d60-8c1e-419d-a0fc-4d2e5645dc32', NULL, '.202615:07', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:36:45.564Z', '2026-02-11T21:36:45.564Z', TRUE, '28acef7f-f8db-45e1-8ff5-e80249615636', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('8e9659a2-b71e-45f6-a205-64f93e1417c7', NULL, 'DV DAHIL', '1.00', '4.71', '4.71', '0.00', '0.00', 0.9, '2026-02-11T21:36:45.564Z', '2026-02-11T21:36:45.564Z', TRUE, '28acef7f-f8db-45e1-8ff5-e80249615636', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('ac727ed6-03a6-4d26-a40f-16eb0e6258aa', NULL, '%1', '1.00', '470.83', '470.83', '1.00', '4.71', 0.9, '2026-02-11T21:36:45.564Z', '2026-02-11T21:36:45.564Z', TRUE, '28acef7f-f8db-45e1-8ff5-e80249615636', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('6e7964d4-ec9d-423b-a876-62809bb84c6a', NULL, '475.54', '1.00', '13.50', '13.50', '0.00', '0.00', 0.9, '2026-02-11T21:36:45.564Z', '2026-02-11T21:36:45.564Z', TRUE, '28acef7f-f8db-45e1-8ff5-e80249615636', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('9b840d8b-e8d5-4c51-9379-0d5f5a3a5f63', NULL, '%20', '1.00', '67.50', '67.50', '20.00', '13.50', 0.9, '2026-02-11T21:36:45.564Z', '2026-02-11T21:36:45.564Z', TRUE, '28acef7f-f8db-45e1-8ff5-e80249615636', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('7338abff-eeb4-4c84-b1da-5258a4960af2', NULL, 'Unknown Product', '1.00', '81.00', '81.00', '0.00', '0.00', 0.9, '2026-02-11T21:36:45.564Z', '2026-02-11T21:36:45.564Z', TRUE, '28acef7f-f8db-45e1-8ff5-e80249615636', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('2ab46c60-7db5-47c2-bfae-dcb1fdddb713', NULL, '.202615:06', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:42:21.007Z', '2026-02-11T21:42:21.007Z', TRUE, '1a768bf8-7d57-492b-942f-87001317e0c7', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('c4adb729-449e-4682-83b5-e7ea208cc80a', NULL, 'Unknown Product', '1.00', '206.04', '206.04', '0.00', '0.00', 0.9, '2026-02-11T21:42:21.007Z', '2026-02-11T21:42:21.007Z', TRUE, '1a768bf8-7d57-492b-942f-87001317e0c7', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('75d5f1a3-98a3-4006-94df-889e0bf5f88b', NULL, '3ad X', '1.00', '46.00', '46.00', '0.00', '0.00', 0.9, '2026-02-11T21:42:21.007Z', '2026-02-11T21:42:21.007Z', TRUE, '1a768bf8-7d57-492b-942f-87001317e0c7', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('ae18ff6d-9cee-48ec-812b-0910030c4dff', NULL, '*', '1.00', '138.00', '138.00', '13.00', '17.94', 0.9, '2026-02-11T21:42:21.007Z', '2026-02-11T21:42:21.007Z', TRUE, '1a768bf8-7d57-492b-942f-87001317e0c7', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('fb21f8c1-08b5-4cfd-a511-63f782f3bc40', NULL, 'Unknown Product', '1.00', '11.50', '11.50', '0.00', '0.00', 0.9, '2026-02-11T21:42:21.007Z', '2026-02-11T21:42:21.007Z', TRUE, '1a768bf8-7d57-492b-942f-87001317e0c7', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('fad55546-af73-4c7a-a03d-fef418092147', NULL, '%20', '1.00', '49.00', '49.00', '20.00', '9.80', 0.9, '2026-02-11T21:42:21.007Z', '2026-02-11T21:42:21.007Z', TRUE, '1a768bf8-7d57-492b-942f-87001317e0c7', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('4f0c87be-8d74-48a8-afc6-be8e7228e8c8', NULL, 'Unknown Product', '1.00', '120.00', '120.00', '0.00', '0.00', 0.9, '2026-02-11T21:42:21.007Z', '2026-02-11T21:42:21.007Z', TRUE, '1a768bf8-7d57-492b-942f-87001317e0c7', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('cfa34df8-f4f8-4a67-b475-f5a927ff4f62', NULL, '2adx', '1.00', '1.00', '1.00', '0.00', '0.00', 0.9, '2026-02-11T21:42:21.007Z', '2026-02-11T21:42:21.007Z', TRUE, '1a768bf8-7d57-492b-942f-87001317e0c7', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('fdb4b617-8273-4aff-a074-75dc4edeeeb3', NULL, 'Unknown Product', '1.00', '556.54', '556.54', '0.00', '0.00', 0.9, '2026-02-11T21:42:21.007Z', '2026-02-11T21:42:21.007Z', TRUE, '1a768bf8-7d57-492b-942f-87001317e0c7', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('594b911c-c1e8-4a82-a052-b59f0ab7635b', NULL, '.202615:07', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:42:21.007Z', '2026-02-11T21:42:21.007Z', TRUE, '1a768bf8-7d57-492b-942f-87001317e0c7', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('cbc0a9af-eede-4dc6-b8a3-71f88507acde', NULL, 'DV DAHIL', '1.00', '4.71', '4.71', '0.00', '0.00', 0.9, '2026-02-11T21:42:21.007Z', '2026-02-11T21:42:21.007Z', TRUE, '1a768bf8-7d57-492b-942f-87001317e0c7', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('ce7c96c7-15dd-41e7-9482-595388d2f1cb', NULL, '%1', '1.00', '470.83', '470.83', '1.00', '4.71', 0.9, '2026-02-11T21:42:21.007Z', '2026-02-11T21:42:21.007Z', TRUE, '1a768bf8-7d57-492b-942f-87001317e0c7', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('6c0e29e3-ecc7-4aa9-9b38-36282197f0ce', NULL, '475.54', '1.00', '13.50', '13.50', '0.00', '0.00', 0.9, '2026-02-11T21:42:21.007Z', '2026-02-11T21:42:21.007Z', TRUE, '1a768bf8-7d57-492b-942f-87001317e0c7', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('6b3533c0-ce0a-4124-b45f-151ea3a0651e', NULL, '%20', '1.00', '67.50', '67.50', '20.00', '13.50', 0.9, '2026-02-11T21:42:21.007Z', '2026-02-11T21:42:21.007Z', TRUE, '1a768bf8-7d57-492b-942f-87001317e0c7', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('1ba24f16-ba29-4871-985d-bbca93002e27', NULL, 'Unknown Product', '1.00', '81.00', '81.00', '0.00', '0.00', 0.9, '2026-02-11T21:42:21.007Z', '2026-02-11T21:42:21.007Z', TRUE, '1a768bf8-7d57-492b-942f-87001317e0c7', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('de27eade-c7ad-45da-9986-2c42d22ca3bd', NULL, '.202615:06', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:44:56.765Z', '2026-02-11T21:44:56.765Z', TRUE, 'ed0171e1-284d-4221-9493-a72a0d5360e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('91b54867-dd35-43a5-9853-fe54d0458c61', NULL, 'Unknown Product', '1.00', '206.04', '206.04', '0.00', '0.00', 0.9, '2026-02-11T21:44:56.765Z', '2026-02-11T21:44:56.765Z', TRUE, 'ed0171e1-284d-4221-9493-a72a0d5360e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('7d09dfc3-22b2-409c-a7c1-34cf699debff', NULL, '3ad X', '1.00', '46.00', '46.00', '0.00', '0.00', 0.9, '2026-02-11T21:44:56.765Z', '2026-02-11T21:44:56.765Z', TRUE, 'ed0171e1-284d-4221-9493-a72a0d5360e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('d6bbdd42-7122-44d8-9b69-f0e5a1636104', NULL, '*', '1.00', '138.00', '138.00', '13.00', '17.94', 0.9, '2026-02-11T21:44:56.765Z', '2026-02-11T21:44:56.765Z', TRUE, 'ed0171e1-284d-4221-9493-a72a0d5360e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('1fef2c7b-d5af-4ba6-aa09-b21823575a77', NULL, 'Unknown Product', '1.00', '11.50', '11.50', '0.00', '0.00', 0.9, '2026-02-11T21:44:56.765Z', '2026-02-11T21:44:56.765Z', TRUE, 'ed0171e1-284d-4221-9493-a72a0d5360e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('004e9ed3-257c-410c-9266-374758c44b8d', NULL, '%20', '1.00', '49.00', '49.00', '20.00', '9.80', 0.9, '2026-02-11T21:44:56.765Z', '2026-02-11T21:44:56.765Z', TRUE, 'ed0171e1-284d-4221-9493-a72a0d5360e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('dd79234f-307d-4b19-aba2-04a1cb37f35c', NULL, 'Unknown Product', '1.00', '120.00', '120.00', '0.00', '0.00', 0.9, '2026-02-11T21:44:56.765Z', '2026-02-11T21:44:56.765Z', TRUE, 'ed0171e1-284d-4221-9493-a72a0d5360e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('39a6de1c-69b7-4c8f-9bbb-8f8844d13565', NULL, '2adx', '1.00', '1.00', '1.00', '0.00', '0.00', 0.9, '2026-02-11T21:44:56.765Z', '2026-02-11T21:44:56.765Z', TRUE, 'ed0171e1-284d-4221-9493-a72a0d5360e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('1cbccbb0-cb3c-4b87-a362-cb45b430986d', NULL, 'Unknown Product', '1.00', '556.54', '556.54', '0.00', '0.00', 0.9, '2026-02-11T21:44:56.765Z', '2026-02-11T21:44:56.765Z', TRUE, 'ed0171e1-284d-4221-9493-a72a0d5360e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('0d9316e6-3845-4e92-9492-880885807818', NULL, '.202615:07', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:44:56.765Z', '2026-02-11T21:44:56.765Z', TRUE, 'ed0171e1-284d-4221-9493-a72a0d5360e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('ba22c214-d64b-4d70-ad93-0405cf4bab2e', NULL, 'DV DAHIL', '1.00', '4.71', '4.71', '0.00', '0.00', 0.9, '2026-02-11T21:44:56.765Z', '2026-02-11T21:44:56.765Z', TRUE, 'ed0171e1-284d-4221-9493-a72a0d5360e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('8fe33d1b-54ac-48ce-8dde-36b7f3ce76ba', NULL, '%1', '1.00', '470.83', '470.83', '1.00', '4.71', 0.9, '2026-02-11T21:44:56.765Z', '2026-02-11T21:44:56.765Z', TRUE, 'ed0171e1-284d-4221-9493-a72a0d5360e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('f20313f2-ab69-4b32-abb8-822b753078ac', NULL, '475.54', '1.00', '13.50', '13.50', '0.00', '0.00', 0.9, '2026-02-11T21:44:56.765Z', '2026-02-11T21:44:56.765Z', TRUE, 'ed0171e1-284d-4221-9493-a72a0d5360e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('942e8236-d9e3-4aa6-8611-55a54ff77e9e', NULL, '%20', '1.00', '67.50', '67.50', '20.00', '13.50', 0.9, '2026-02-11T21:44:56.765Z', '2026-02-11T21:44:56.765Z', TRUE, 'ed0171e1-284d-4221-9493-a72a0d5360e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('e9a9aab9-f224-48bf-8173-4923fba6df33', NULL, 'Unknown Product', '1.00', '81.00', '81.00', '0.00', '0.00', 0.9, '2026-02-11T21:44:56.765Z', '2026-02-11T21:44:56.765Z', TRUE, 'ed0171e1-284d-4221-9493-a72a0d5360e3', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('33a695fd-2fbe-416e-a84b-59eb42877f69', NULL, '.202615:06', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:47:28.034Z', '2026-02-11T21:47:28.034Z', TRUE, '521ce52d-375a-494f-857a-7da858651dbd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('ad8de0b7-12b9-475f-b424-71976c9e9773', NULL, 'Unknown Product', '1.00', '206.04', '206.04', '0.00', '0.00', 0.9, '2026-02-11T21:47:28.034Z', '2026-02-11T21:47:28.034Z', TRUE, '521ce52d-375a-494f-857a-7da858651dbd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('4e9cb2d1-4263-4cfb-915f-0dd7a501b576', NULL, '3ad X', '1.00', '46.00', '46.00', '0.00', '0.00', 0.9, '2026-02-11T21:47:28.034Z', '2026-02-11T21:47:28.034Z', TRUE, '521ce52d-375a-494f-857a-7da858651dbd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('d17f85d7-6170-492e-b38c-60638348fbf9', NULL, '*', '1.00', '138.00', '138.00', '13.00', '17.94', 0.9, '2026-02-11T21:47:28.034Z', '2026-02-11T21:47:28.034Z', TRUE, '521ce52d-375a-494f-857a-7da858651dbd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('0b4cfd00-36d9-4ec1-b3c7-a3119227ebe8', NULL, 'Unknown Product', '1.00', '11.50', '11.50', '0.00', '0.00', 0.9, '2026-02-11T21:47:28.034Z', '2026-02-11T21:47:28.034Z', TRUE, '521ce52d-375a-494f-857a-7da858651dbd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('5e933b9e-3aec-4aec-853b-ba7a6e6a4277', NULL, '%20', '1.00', '49.00', '49.00', '20.00', '9.80', 0.9, '2026-02-11T21:47:28.034Z', '2026-02-11T21:47:28.034Z', TRUE, '521ce52d-375a-494f-857a-7da858651dbd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('05c66dc5-7b29-4a89-baec-d39ded5be56e', NULL, 'Unknown Product', '1.00', '120.00', '120.00', '0.00', '0.00', 0.9, '2026-02-11T21:47:28.034Z', '2026-02-11T21:47:28.034Z', TRUE, '521ce52d-375a-494f-857a-7da858651dbd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('440832c8-55ba-44fd-8ad9-40ef6b8db003', NULL, '2adx', '1.00', '1.00', '1.00', '0.00', '0.00', 0.9, '2026-02-11T21:47:28.034Z', '2026-02-11T21:47:28.034Z', TRUE, '521ce52d-375a-494f-857a-7da858651dbd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('906b018e-1245-4c2a-aeb2-f9c24777d4db', NULL, 'Unknown Product', '1.00', '556.54', '556.54', '0.00', '0.00', 0.9, '2026-02-11T21:47:28.034Z', '2026-02-11T21:47:28.034Z', TRUE, '521ce52d-375a-494f-857a-7da858651dbd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('cdd820e3-ad1d-450a-b540-0f964421d8f3', NULL, '.202615:07', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:47:28.034Z', '2026-02-11T21:47:28.034Z', TRUE, '521ce52d-375a-494f-857a-7da858651dbd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('8fda156e-ccc0-4bda-b828-be3e4407c246', NULL, 'DV DAHIL', '1.00', '4.71', '4.71', '0.00', '0.00', 0.9, '2026-02-11T21:47:28.034Z', '2026-02-11T21:47:28.034Z', TRUE, '521ce52d-375a-494f-857a-7da858651dbd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('540b6d9c-6cae-42e0-8c73-c63b41a3176c', NULL, '%1', '1.00', '470.83', '470.83', '1.00', '4.71', 0.9, '2026-02-11T21:47:28.034Z', '2026-02-11T21:47:28.034Z', TRUE, '521ce52d-375a-494f-857a-7da858651dbd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('14b16b08-0352-48d8-8a3d-5e761b0f48d4', NULL, '475.54', '1.00', '13.50', '13.50', '0.00', '0.00', 0.9, '2026-02-11T21:47:28.034Z', '2026-02-11T21:47:28.034Z', TRUE, '521ce52d-375a-494f-857a-7da858651dbd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('1204587d-8c99-4f91-a4df-6acf3edf69a0', NULL, '%20', '1.00', '67.50', '67.50', '20.00', '13.50', 0.9, '2026-02-11T21:47:28.034Z', '2026-02-11T21:47:28.034Z', TRUE, '521ce52d-375a-494f-857a-7da858651dbd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('7bb85a36-0bc9-4fa1-b56b-74383b8874b2', NULL, 'Unknown Product', '1.00', '81.00', '81.00', '0.00', '0.00', 0.9, '2026-02-11T21:47:28.034Z', '2026-02-11T21:47:28.034Z', TRUE, '521ce52d-375a-494f-857a-7da858651dbd', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('211f0b7e-6b7c-4357-90cc-9686fd8e8c8e', NULL, '.202615:06', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:49:35.101Z', '2026-02-11T21:49:35.101Z', TRUE, '35d78754-1628-4e8f-b283-753f37a55a33', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('7f549e1f-bbf2-4b4f-ab6f-fc7307a4be68', NULL, 'Unknown Product', '1.00', '206.04', '206.04', '0.00', '0.00', 0.9, '2026-02-11T21:49:35.101Z', '2026-02-11T21:49:35.101Z', TRUE, '35d78754-1628-4e8f-b283-753f37a55a33', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('f0f75336-658d-4bfa-bda3-1c0b3c47a0f5', NULL, '3ad X', '1.00', '46.00', '46.00', '0.00', '0.00', 0.9, '2026-02-11T21:49:35.101Z', '2026-02-11T21:49:35.101Z', TRUE, '35d78754-1628-4e8f-b283-753f37a55a33', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('bb6f2a67-0b11-486b-9b01-a362a7555006', NULL, '*', '1.00', '138.00', '138.00', '13.00', '17.94', 0.9, '2026-02-11T21:49:35.101Z', '2026-02-11T21:49:35.101Z', TRUE, '35d78754-1628-4e8f-b283-753f37a55a33', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('2399e1a9-445b-4220-8f29-3f7c41f68960', NULL, 'Unknown Product', '1.00', '11.50', '11.50', '0.00', '0.00', 0.9, '2026-02-11T21:49:35.101Z', '2026-02-11T21:49:35.101Z', TRUE, '35d78754-1628-4e8f-b283-753f37a55a33', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('9cb640aa-3278-41f9-ab1e-0e89f335b514', NULL, '%20', '1.00', '49.00', '49.00', '20.00', '9.80', 0.9, '2026-02-11T21:49:35.101Z', '2026-02-11T21:49:35.101Z', TRUE, '35d78754-1628-4e8f-b283-753f37a55a33', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('77a7b660-1df7-440b-96f1-b5841022b00c', NULL, 'Unknown Product', '1.00', '120.00', '120.00', '0.00', '0.00', 0.9, '2026-02-11T21:49:35.101Z', '2026-02-11T21:49:35.101Z', TRUE, '35d78754-1628-4e8f-b283-753f37a55a33', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('8c2d82ab-6c45-43da-8c98-bfc4ed18bc2c', NULL, '2adx', '1.00', '1.00', '1.00', '0.00', '0.00', 0.9, '2026-02-11T21:49:35.101Z', '2026-02-11T21:49:35.101Z', TRUE, '35d78754-1628-4e8f-b283-753f37a55a33', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('09a4bd82-f189-4b07-a93b-5c51fe8dd43e', NULL, 'Unknown Product', '1.00', '556.54', '556.54', '0.00', '0.00', 0.9, '2026-02-11T21:49:35.101Z', '2026-02-11T21:49:35.101Z', TRUE, '35d78754-1628-4e8f-b283-753f37a55a33', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('034424f5-ee38-4c76-986f-1e7fc484eab9', NULL, '.202615:07', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-11T21:49:35.101Z', '2026-02-11T21:49:35.101Z', TRUE, '35d78754-1628-4e8f-b283-753f37a55a33', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('ee1585f4-fec1-448c-936c-db8dc4e4719b', NULL, 'DV DAHIL', '1.00', '4.71', '4.71', '0.00', '0.00', 0.9, '2026-02-11T21:49:35.101Z', '2026-02-11T21:49:35.101Z', TRUE, '35d78754-1628-4e8f-b283-753f37a55a33', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('26f63489-6c9a-4b9f-8533-3857234138bd', NULL, '%1', '1.00', '470.83', '470.83', '1.00', '4.71', 0.9, '2026-02-11T21:49:35.101Z', '2026-02-11T21:49:35.101Z', TRUE, '35d78754-1628-4e8f-b283-753f37a55a33', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('daa6c1a7-751c-42e6-95b3-8968749a4b86', NULL, '475.54', '1.00', '13.50', '13.50', '0.00', '0.00', 0.9, '2026-02-11T21:49:35.101Z', '2026-02-11T21:49:35.101Z', TRUE, '35d78754-1628-4e8f-b283-753f37a55a33', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('40088151-3c4c-4d4e-b695-666b55bfee40', NULL, '%20', '1.00', '67.50', '67.50', '20.00', '13.50', 0.9, '2026-02-11T21:49:35.101Z', '2026-02-11T21:49:35.101Z', TRUE, '35d78754-1628-4e8f-b283-753f37a55a33', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('c1b75f24-a716-42c8-bd4c-f68472bdc8b9', NULL, 'Unknown Product', '1.00', '81.00', '81.00', '0.00', '0.00', 0.9, '2026-02-11T21:49:35.101Z', '2026-02-11T21:49:35.101Z', TRUE, '35d78754-1628-4e8f-b283-753f37a55a33', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('de04d65a-3bf0-4864-b2eb-3afbdd889187', NULL, '.202614:32 sira', '1.00', '3.02', '3.02', '0.00', '0.00', 0.9, '2026-02-12T18:42:04.144Z', '2026-02-12T18:42:04.144Z', TRUE, '6ea427ab-50e3-4193-8b77-074aaacd27d8', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('f044f88f-1e28-474b-a709-37f696d90928', NULL, '4 ad X', '1.00', '46.00', '46.00', '0.00', '0.00', 0.9, '2026-02-12T18:42:04.144Z', '2026-02-12T18:42:04.144Z', TRUE, '6ea427ab-50e3-4193-8b77-074aaacd27d8', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('4379394a-fb64-4cae-9662-d146dcf8e05b', NULL, '*', '1.00', '184.00', '184.00', '18.00', '33.12', 0.9, '2026-02-12T18:42:04.144Z', '2026-02-12T18:42:04.144Z', TRUE, '6ea427ab-50e3-4193-8b77-074aaacd27d8', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('572275ed-ed31-4ce3-ba1d-f1c2ed5324b6', NULL, 'Ba 2ad x', '1.00', '99.00', '99.00', '0.00', '0.00', 0.9, '2026-02-12T18:42:04.144Z', '2026-02-12T18:42:04.144Z', TRUE, '6ea427ab-50e3-4193-8b77-074aaacd27d8', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('f68294e7-89a9-4a33-9232-18c99d4e4352', NULL, 'Unknown Product', '1.00', '198.00', '198.00', '0.00', '0.00', 0.9, '2026-02-12T18:42:04.144Z', '2026-02-12T18:42:04.144Z', TRUE, '6ea427ab-50e3-4193-8b77-074aaacd27d8', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('285593b6-9852-422f-bf92-29d9a737ff1a', NULL, '%1', '1.00', '12.00', '12.00', '1.00', '0.12', 0.9, '2026-02-12T18:42:04.144Z', '2026-02-12T18:42:04.144Z', TRUE, '6ea427ab-50e3-4193-8b77-074aaacd27d8', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('0b9eaf19-c4df-4af7-9bf5-f93c5db20937', NULL, 'Unknown Product', '1.00', '59.50', '59.50', '0.00', '0.00', 0.9, '2026-02-12T18:42:04.144Z', '2026-02-12T18:42:04.144Z', TRUE, '6ea427ab-50e3-4193-8b77-074aaacd27d8', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('7c672c77-aef0-459e-92a9-87193446806e', NULL, 'Unknown Product', '1.00', '11.50', '11.50', '0.00', '0.00', 0.9, '2026-02-12T18:42:04.144Z', '2026-02-12T18:42:04.144Z', TRUE, '6ea427ab-50e3-4193-8b77-074aaacd27d8', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('82110632-0d31-4377-9329-3b46faa2edc7', NULL, '2ad x', '1.00', '1.00', '1.00', '0.00', '0.00', 0.9, '2026-02-12T18:42:04.144Z', '2026-02-12T18:42:04.144Z', TRUE, '6ea427ab-50e3-4193-8b77-074aaacd27d8', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('84164899-c553-4804-8aa7-5caba650d4b0', NULL, '%20', '1.00', '2.00', '2.00', '20.00', '0.40', 0.9, '2026-02-12T18:42:04.144Z', '2026-02-12T18:42:04.144Z', TRUE, '6ea427ab-50e3-4193-8b77-074aaacd27d8', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('272ddae2-47f0-423a-9427-5c1f5136af05', NULL, 'x', '1.00', '4.93', '4.93', '0.00', '0.00', 0.9, '2026-02-12T18:42:04.144Z', '2026-02-12T18:42:04.144Z', TRUE, '6ea427ab-50e3-4193-8b77-074aaacd27d8', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('5564ad68-e2e9-4385-a720-a658e4e26074', NULL, 'Unknown Product', '1.00', '467.00', '467.00', '0.00', '0.00', 0.9, '2026-02-12T18:42:04.144Z', '2026-02-12T18:42:04.144Z', TRUE, '6ea427ab-50e3-4193-8b77-074aaacd27d8', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('ae904298-e174-45ff-92af-3634de6c1d6b', NULL, 'Unknown Product', '1.00', '467.00', '467.00', '0.00', '0.00', 0.9, '2026-02-12T18:42:04.144Z', '2026-02-12T18:42:04.144Z', TRUE, '6ea427ab-50e3-4193-8b77-074aaacd27d8', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('b7ff6af2-72d0-461d-bff8-0b1e109d77a8', NULL, 'POS .2026 14:33B:1794S:2595 x1393', '1.00', '3.02', '3.02', '0.00', '0.00', 0.9, '2026-02-12T18:42:04.144Z', '2026-02-12T18:42:04.144Z', TRUE, '6ea427ab-50e3-4193-8b77-074aaacd27d8', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('834903b2-d74f-46ba-a2ce-dc8961f1d459', NULL, 'DV DAHIL', '1.00', '4.60', '4.60', '0.00', '0.00', 0.9, '2026-02-12T18:42:04.144Z', '2026-02-12T18:42:04.144Z', TRUE, '6ea427ab-50e3-4193-8b77-074aaacd27d8', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('4b79725a-6dd8-4cea-96fc-c39da27fdd72', NULL, '%1,', '1.00', '460.40', '460.40', '1.00', '4.60', 0.9, '2026-02-12T18:42:04.144Z', '2026-02-12T18:42:04.144Z', TRUE, '6ea427ab-50e3-4193-8b77-074aaacd27d8', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('20c72337-0666-48f4-924f-8b06c7ef2452', NULL, '*465.00', '1.00', '0.33', '0.33', '46.00', '0.15', 0.9, '2026-02-12T18:42:04.144Z', '2026-02-12T18:42:04.144Z', TRUE, '6ea427ab-50e3-4193-8b77-074aaacd27d8', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('9f2e392e-9828-414a-aae8-f69ac8b2ceb8', NULL, '%20', '1.00', '91.67', '91.67', '20.00', '18.33', 0.9, '2026-02-12T18:42:04.144Z', '2026-02-12T18:42:04.144Z', TRUE, '6ea427ab-50e3-4193-8b77-074aaacd27d8', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('ccff4001-05fa-428b-ad0e-145f967d7c9c', NULL, '*8', '1.00', '2.00', '2.00', '8.00', '0.16', 0.9, '2026-02-12T18:42:04.144Z', '2026-02-12T18:42:04.144Z', TRUE, '6ea427ab-50e3-4193-8b77-074aaacd27d8', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('f6a44ec1-bd51-405b-8c4b-ebb5f30e5da7', 'b48214a6-0664-4c67-9288-d3a688b5fb95', '.202615:06', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-12T19:38:02.162Z', '2026-02-12T19:38:52.731Z', TRUE, 'c6c35ef6-2a30-4e94-8185-38af625194e1', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('c4b3ba2e-5555-4f9e-a7d2-b15e4b4c1f0f', 'b48214a6-0664-4c67-9288-d3a688b5fb95', 'Unknown Product', '1.00', '206.04', '206.04', '0.00', '0.00', 0.9, '2026-02-12T19:38:02.162Z', '2026-02-12T19:38:52.731Z', TRUE, 'c6c35ef6-2a30-4e94-8185-38af625194e1', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('6918691e-1899-40d2-9596-47eaa66a5ee2', 'b48214a6-0664-4c67-9288-d3a688b5fb95', '3ad X', '1.00', '46.00', '46.00', '0.00', '0.00', 0.9, '2026-02-12T19:38:02.162Z', '2026-02-12T19:38:52.731Z', TRUE, 'c6c35ef6-2a30-4e94-8185-38af625194e1', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('2dade825-5bd5-465f-b023-ed05ff40e55c', 'b48214a6-0664-4c67-9288-d3a688b5fb95', '*', '1.00', '138.00', '138.00', '13.00', '17.94', 0.9, '2026-02-12T19:38:02.162Z', '2026-02-12T19:38:52.731Z', TRUE, 'c6c35ef6-2a30-4e94-8185-38af625194e1', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('ae9fccba-6696-4da6-b3bf-e851a860ed87', 'b48214a6-0664-4c67-9288-d3a688b5fb95', 'Unknown Product', '1.00', '11.50', '11.50', '0.00', '0.00', 0.9, '2026-02-12T19:38:02.162Z', '2026-02-12T19:38:52.731Z', TRUE, 'c6c35ef6-2a30-4e94-8185-38af625194e1', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('7ff85356-daf9-4f9e-a4e9-0c888ce3320e', 'b48214a6-0664-4c67-9288-d3a688b5fb95', '%20', '1.00', '49.00', '49.00', '20.00', '9.80', 0.9, '2026-02-12T19:38:02.162Z', '2026-02-12T19:38:52.731Z', TRUE, 'c6c35ef6-2a30-4e94-8185-38af625194e1', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('4287b3d6-2f45-40cc-aca3-92e5d7ee4edc', 'b48214a6-0664-4c67-9288-d3a688b5fb95', 'Unknown Product', '1.00', '120.00', '120.00', '0.00', '0.00', 0.9, '2026-02-12T19:38:02.162Z', '2026-02-12T19:38:52.731Z', TRUE, 'c6c35ef6-2a30-4e94-8185-38af625194e1', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('4ad88552-6b6f-444f-9407-6bca15afbd05', 'b48214a6-0664-4c67-9288-d3a688b5fb95', '2adx', '1.00', '1.00', '1.00', '0.00', '0.00', 0.9, '2026-02-12T19:38:02.162Z', '2026-02-12T19:38:52.731Z', TRUE, 'c6c35ef6-2a30-4e94-8185-38af625194e1', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('7e27ba29-9572-421c-abe0-a06492c1bda9', 'b48214a6-0664-4c67-9288-d3a688b5fb95', 'Unknown Product', '1.00', '556.54', '556.54', '0.00', '0.00', 0.9, '2026-02-12T19:38:02.162Z', '2026-02-12T19:38:52.731Z', TRUE, 'c6c35ef6-2a30-4e94-8185-38af625194e1', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('925a5c4e-74d2-4b78-89ce-703c281ea4e9', 'b48214a6-0664-4c67-9288-d3a688b5fb95', '.202615:07', '1.00', '9.02', '9.02', '0.00', '0.00', 0.9, '2026-02-12T19:38:02.162Z', '2026-02-12T19:38:52.731Z', TRUE, 'c6c35ef6-2a30-4e94-8185-38af625194e1', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('ffcfa952-1b7e-4219-ac5f-93cdb1b2d88a', 'b48214a6-0664-4c67-9288-d3a688b5fb95', 'DV DAHIL', '1.00', '4.71', '4.71', '0.00', '0.00', 0.9, '2026-02-12T19:38:02.162Z', '2026-02-12T19:38:52.731Z', TRUE, 'c6c35ef6-2a30-4e94-8185-38af625194e1', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('a4c2d1db-78f0-42d9-b4d5-8676464dce4d', 'b48214a6-0664-4c67-9288-d3a688b5fb95', '%1', '1.00', '470.83', '470.83', '1.00', '4.71', 0.9, '2026-02-12T19:38:02.162Z', '2026-02-12T19:38:52.731Z', TRUE, 'c6c35ef6-2a30-4e94-8185-38af625194e1', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('dc794275-32a8-440a-b2d8-e92dfcb7e0b3', 'b48214a6-0664-4c67-9288-d3a688b5fb95', '475.54', '1.00', '13.50', '13.50', '0.00', '0.00', 0.9, '2026-02-12T19:38:02.162Z', '2026-02-12T19:38:52.731Z', TRUE, 'c6c35ef6-2a30-4e94-8185-38af625194e1', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('58875f30-5f43-432a-9368-5d1968cab10b', 'b48214a6-0664-4c67-9288-d3a688b5fb95', '%20', '1.00', '67.50', '67.50', '20.00', '13.50', 0.9, '2026-02-12T19:38:02.162Z', '2026-02-12T19:38:52.731Z', TRUE, 'c6c35ef6-2a30-4e94-8185-38af625194e1', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('1ff409aa-dcf7-4622-9d9f-b42d1b7235d9', 'b48214a6-0664-4c67-9288-d3a688b5fb95', 'Unknown Product', '1.00', '81.00', '81.00', '0.00', '0.00', 0.9, '2026-02-12T19:38:02.162Z', '2026-02-12T19:38:52.731Z', TRUE, 'c6c35ef6-2a30-4e94-8185-38af625194e1', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('bebc7100-fbbf-4ed6-a52d-b12f8a152bfa', 'c9645723-1c69-4b81-9028-f22748ed801f', 'YEMEK %10*2.', '1.00', '974.80', '974.80', '10.00', '97.48', 0.9, '2026-02-12T19:40:49.080Z', '2026-02-12T19:41:20.750Z', TRUE, '3eb77e88-c1c7-4afd-a4f4-7dea436464f7', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('8d0ae6d0-df76-4dbd-bf30-2b9dd67ab103', 'c9645723-1c69-4b81-9028-f22748ed801f', 'KREDI *2.', '1.00', '974.80', '974.80', '2.00', '19.50', 0.9, '2026-02-12T19:40:49.080Z', '2026-02-12T19:41:20.750Z', TRUE, '3eb77e88-c1c7-4afd-a4f4-7dea436464f7', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('d1e201c0-c01b-470b-a227-9bb406071c8d', 'c9645723-1c69-4b81-9028-f22748ed801f', 'BU ISLEN TEHASSIZ BIR KART ILE 2.TL', '1.00', '974.80', '974.80', '0.00', '0.00', 0.9, '2026-02-12T19:40:49.080Z', '2026-02-12T19:41:20.750Z', TRUE, '3eb77e88-c1c7-4afd-a4f4-7dea436464f7', FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('a462422b-8079-4049-b700-2f5faee60ac1', 'ee2b078d-c53b-482c-bf30-481e8d6e6b62', 'Un', '1.00', '500.00', '500.00', '10.00', '50.00', 1, '2026-02-15T14:27:27.095Z', '2026-02-15T14:27:27.095Z', TRUE, NULL, FALSE, 'kg');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('3ac4e7aa-a240-4ecf-ab5b-81ef8085699c', '3aa6085e-c34b-4be1-883c-7a2fe9d6c76b', 'Kira', '1.00', '18000.00', '18000.00', '0.00', '0.00', 1, '2026-02-15T14:28:03.510Z', '2026-02-15T14:28:03.510Z', TRUE, NULL, FALSE, 'adet');
INSERT INTO transaction_items (id, transaction_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence, created_at, updated_at, is_tax_deductible, ocr_record_id, is_stock, unit) VALUES ('636ab8b7-e06e-4ebb-944b-9ab305958925', '89120436-d2ab-4824-b1e3-86b0809a2c9c', 'Kira', '1.00', '18000.00', '18000.00', '0.00', '0.00', 1, '2026-02-15T14:35:17.606Z', '2026-02-15T14:35:17.606Z', TRUE, NULL, FALSE, 'adet');

-- Table: transactions (284 rows)
TRUNCATE TABLE transactions CASCADE;
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('23f60961-a158-4fbc-b677-e3e90f1590c2', 'ec606148-bad2-45ed-8e51-83c2422e8832', '4167260d-f848-49a1-85c3-ddda1b70b315', 'd80887b8-9b74-4f9d-b3a5-d9e76f867f2f', 'income', '1250.50', 'TRY', '2026-02-15T21:00:00.000Z', 'Günlük satış', NULL, NULL, NULL, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('77bb27c2-a86b-4b53-8014-f74e08cfa7ed', 'ec606148-bad2-45ed-8e51-83c2422e8832', 'db82561c-3a8d-491d-9e71-52d9c6e2f24e', '705da090-bab1-4581-92c9-c291a5a566dd', 'income', '850.00', 'TRY', '2026-02-15T21:00:00.000Z', 'Getir sipariş', NULL, NULL, NULL, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('3e646b22-b3d8-4268-8e37-2686c4f94597', 'ec606148-bad2-45ed-8e51-83c2422e8832', '4167260d-f848-49a1-85c3-ddda1b70b315', 'd80887b8-9b74-4f9d-b3a5-d9e76f867f2f', 'income', '1890.75', 'TRY', '2026-02-14T21:00:00.000Z', 'Günlük satış', NULL, NULL, NULL, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('80080112-f166-41be-a3aa-2bf1c04d0770', 'ec606148-bad2-45ed-8e51-83c2422e8832', '745de391-0126-4f29-8275-4b18a05f2816', '705da090-bab1-4581-92c9-c291a5a566dd', 'income', '425.00', 'TRY', '2026-02-14T21:00:00.000Z', 'Paket servis', NULL, NULL, NULL, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('eb545087-0335-4bd8-a86e-732221725eb5', 'ec606148-bad2-45ed-8e51-83c2422e8832', '4167260d-f848-49a1-85c3-ddda1b70b315', 'd80887b8-9b74-4f9d-b3a5-d9e76f867f2f', 'income', '2100.00', 'TRY', '2026-02-13T21:00:00.000Z', 'Günlük satış', NULL, NULL, NULL, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('76266edd-49ec-416c-b351-e1a3fa03ce6c', 'ec606148-bad2-45ed-8e51-83c2422e8832', '4167260d-f848-49a1-85c3-ddda1b70b315', 'd80887b8-9b74-4f9d-b3a5-d9e76f867f2f', 'income', '1650.30', 'TRY', '2026-02-12T21:00:00.000Z', 'Günlük satış', NULL, NULL, NULL, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('35495670-8f4c-45ca-bae0-04018b65e964', 'ec606148-bad2-45ed-8e51-83c2422e8832', 'db82561c-3a8d-491d-9e71-52d9c6e2f24e', '705da090-bab1-4581-92c9-c291a5a566dd', 'income', '720.00', 'TRY', '2026-02-12T21:00:00.000Z', 'Getir sipariş', NULL, NULL, NULL, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('3267f954-f15a-4d95-a160-cf5602059fcf', 'ec606148-bad2-45ed-8e51-83c2422e8832', '4167260d-f848-49a1-85c3-ddda1b70b315', 'd80887b8-9b74-4f9d-b3a5-d9e76f867f2f', 'income', '3200.00', 'TRY', '2026-02-08T21:00:00.000Z', 'Hafta sonu satış', NULL, NULL, NULL, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('a26272de-13d9-411c-b53b-05720d5cf30b', 'ec606148-bad2-45ed-8e51-83c2422e8832', '4167260d-f848-49a1-85c3-ddda1b70b315', 'd80887b8-9b74-4f9d-b3a5-d9e76f867f2f', 'income', '2800.00', 'TRY', '2026-02-01T21:00:00.000Z', 'Günlük satış', NULL, NULL, NULL, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('69a3c3a8-ef2d-4a06-8538-8f73c1fadf08', 'ec606148-bad2-45ed-8e51-83c2422e8832', 'db82561c-3a8d-491d-9e71-52d9c6e2f24e', '705da090-bab1-4581-92c9-c291a5a566dd', 'income', '1200.00', 'TRY', '2026-02-01T21:00:00.000Z', 'Getir sipariş', NULL, NULL, NULL, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('494d44d8-2997-4d1d-b445-cc51fac17c82', 'ec606148-bad2-45ed-8e51-83c2422e8832', '4167260d-f848-49a1-85c3-ddda1b70b315', 'd80887b8-9b74-4f9d-b3a5-d9e76f867f2f', 'income', '4500.00', 'TRY', '2026-01-25T21:00:00.000Z', 'Toplu satış', NULL, NULL, NULL, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('eb900a3e-918d-4058-91b1-46ffe607a22c', 'ec606148-bad2-45ed-8e51-83c2422e8832', '4167260d-f848-49a1-85c3-ddda1b70b315', 'd80887b8-9b74-4f9d-b3a5-d9e76f867f2f', 'income', '2900.00', 'TRY', '2026-01-18T21:00:00.000Z', 'Günlük satış', NULL, NULL, NULL, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('d1089fc6-49ee-44c3-9903-d559984f9d3a', 'ec606148-bad2-45ed-8e51-83c2422e8832', '0dea7732-85a9-4464-8215-cca208029f8d', '5e5e6231-e93e-4961-b899-493c05c96276', 'expense', '15000.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Ocak ayı kira', NULL, NULL, NULL, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('4a17648a-c21a-4c1b-8895-977b5fcd699f', 'ec606148-bad2-45ed-8e51-83c2422e8832', '7f587b7d-d3b2-47d4-8a9d-69a282dfc342', '5e5e6231-e93e-4961-b899-493c05c96276', 'expense', '18000.00', 'TRY', '2026-01-25T21:00:00.000Z', 'Kasiyer maaşı', NULL, NULL, NULL, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('611fa8bf-990c-45d2-8b28-fa5b32dbdff6', 'ec606148-bad2-45ed-8e51-83c2422e8832', 'a786ce47-e690-473c-a34a-5dedbacaa25b', '5e5e6231-e93e-4961-b899-493c05c96276', 'expense', '2500.00', 'TRY', '2026-02-08T21:00:00.000Z', 'Elektrik faturası', NULL, NULL, NULL, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('80591e2f-891f-48a0-ba35-ca37571b06f3', 'ec606148-bad2-45ed-8e51-83c2422e8832', '23a34d17-5f71-4e53-af74-2a3174e6d2f6', 'ae1a72cd-1158-486b-b98e-951fa52f3705', 'expense', '8500.00', 'TRY', '2026-02-10T21:00:00.000Z', 'Ürün alımı', NULL, NULL, NULL, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('9a69c7d3-3a4c-4a97-88bf-aeb50a9d470b', 'ec606148-bad2-45ed-8e51-83c2422e8832', '23a34d17-5f71-4e53-af74-2a3174e6d2f6', 'ae1a72cd-1158-486b-b98e-951fa52f3705', 'expense', '12000.00', 'TRY', '2026-01-31T21:00:00.000Z', 'Ürün alımı', NULL, NULL, NULL, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('42d5b599-a30a-456f-af08-0bcbb2ce6b70', 'ec606148-bad2-45ed-8e51-83c2422e8832', '23a34d17-5f71-4e53-af74-2a3174e6d2f6', 'ae1a72cd-1158-486b-b98e-951fa52f3705', 'expense', '9800.00', 'TRY', '2026-01-21T21:00:00.000Z', 'Ürün alımı', NULL, NULL, NULL, '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('570f9618-3239-4258-9cef-0cf2baaa894b', '11111111-1111-1111-1111-111111111111', '5261f2f5-9fe0-4510-a52d-bc93e1ee252d', '8b14d077-949f-4ac0-a0c6-ee439bddf0e2', 'income', '1000.00', 'TRY', '2026-02-15T21:00:00.000Z', 'User A Transaction', NULL, NULL, NULL, '2026-02-16T17:31:28.358Z', '2026-02-16T17:31:28.358Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('0008e049-567e-432d-bed0-3c06417ab8a0', '22222222-2222-2222-2222-222222222222', 'e73e6a3b-fab5-47a5-8fe7-ad567358318c', '0442418f-9e23-4207-ac2f-45c1cf36f7eb', 'income', '2000.00', 'TRY', '2026-02-15T21:00:00.000Z', 'User B Transaction', NULL, NULL, NULL, '2026-02-16T17:31:28.358Z', '2026-02-16T17:31:28.358Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('9095fb93-7e1b-4b63-874a-d9e5f5522608', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '1820.00', 'TRY', '2026-01-22T21:00:00.000Z', 'Adisyon: Çikolatalı Pasta x1, Meveli Pasta x1, Latte x1, Amaricano x1, Browni x1, Islak Kek x2', NULL, NULL, NULL, '2026-01-23T23:09:25.859Z', '2026-01-23T23:09:25.859Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('6cc29c4e-83eb-473a-9410-37897ed9fe8a', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '1520.00', 'TRY', '2026-01-23T21:00:00.000Z', 'Adisyon: Meveli Pasta x1, Latte x1, Amaricano x1, Browni x1, Islak Kek x1, Çikolatalı Pasta x1', NULL, NULL, NULL, '2026-01-24T07:07:59.574Z', '2026-01-24T07:07:59.574Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('3c249dff-752c-4adb-9e10-6490466141a9', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '550.00', 'TRY', '2026-01-23T21:00:00.000Z', 'Adisyon: Amaricano x1, Latte x1, Meveli Pasta x1', NULL, NULL, NULL, '2026-01-24T07:09:17.909Z', '2026-01-24T07:09:17.909Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('768c8fb3-67b3-4b86-95f1-0a2ef53e78c8', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'c94f97c8-228c-4383-a096-5e1479b930f7', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '850.00', 'TRY', '2026-01-23T21:00:00.000Z', 'Adisyon: Amaricano x1, Latte x1, Meveli Pasta x1, Islak Kek x1', NULL, NULL, NULL, '2026-01-24T07:14:42.176Z', '2026-01-24T07:14:42.176Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('0afae26c-aeba-464c-8efa-cbb86127ff62', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'd13142d0-ac10-4a28-a3f6-3aba86d8de77', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '1100.00', 'TRY', '2026-01-23T21:00:00.000Z', 'Adisyon: Çikolatalı Pasta x1, Meveli Pasta x1, Latte x1, Islak Kek x1', NULL, NULL, NULL, '2026-01-24T10:19:30.620Z', '2026-01-24T10:19:30.620Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('cf2f7851-b8dd-4271-8c80-e6945a8f1605', 'be8b8541-f427-4287-a00b-a0e9783e5209', '6612bef2-edfa-4f14-acc9-14062d7e0b36', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'expense', '15000.00', 'TRY', '2026-01-23T21:00:00.000Z', 'Aralık', NULL, NULL, NULL, '2026-01-24T10:24:11.015Z', '2026-01-24T10:24:11.015Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('d7f8b18f-8c8a-4993-85ba-327a089e578f', 'be8b8541-f427-4287-a00b-a0e9783e5209', '6612bef2-edfa-4f14-acc9-14062d7e0b36', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'expense', '150.00', 'TRY', '2026-01-23T21:00:00.000Z', 'Kahve Ismarlama', NULL, NULL, NULL, '2026-01-24T10:27:18.240Z', '2026-01-24T10:27:18.240Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('1e86906b-81ee-4d4b-93c1-6e6c1fe8b9da', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ec3d3430-4ff3-43b8-9267-77db9b2c03d9', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'expense', '150.00', 'TRY', '2026-01-23T21:00:00.000Z', '', NULL, NULL, NULL, '2026-01-24T11:49:23.188Z', '2026-01-24T11:49:23.188Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('ccda6435-9f2c-4a81-890d-89ea784bbe24', 'be8b8541-f427-4287-a00b-a0e9783e5209', '872ad2d1-c781-4872-8b19-13a4e5673867', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'expense', '350.00', 'TRY', '2026-01-23T21:00:00.000Z', 'kahve ısmarlama', NULL, NULL, NULL, '2026-01-24T11:51:10.672Z', '2026-01-24T11:51:10.672Z', NULL, 'personal', FALSE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('70943712-aef3-4e2b-a15c-e51412bb9122', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'df7cb357-7f74-4e01-b25c-f093f06a0f7f', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'expense', '15000.00', 'TRY', '2026-01-23T21:00:00.000Z', '', NULL, NULL, NULL, '2026-01-24T11:51:33.045Z', '2026-01-24T11:51:33.045Z', NULL, 'fixed', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('e66bc6a5-e092-4119-801c-9b845b31081f', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '840.00', 'TRY', '2026-01-23T21:00:00.000Z', 'Adisyon: Browni x2, Latte x2', NULL, NULL, NULL, '2026-01-24T11:51:51.401Z', '2026-01-24T11:51:51.401Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('af95536a-4e1c-4422-bd70-e33c9c3488ed', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ec3d3430-4ff3-43b8-9267-77db9b2c03d9', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'expense', '92.90', 'TRY', '2023-01-10T21:00:00.000Z', 'Fiş: F JÜURKİYE TARIMA KAEDİ', NULL, NULL, NULL, '2026-01-24T11:52:45.491Z', '2026-01-24T11:52:45.491Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('878db29d-2966-41a0-a749-da2a251b3976', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ec3d3430-4ff3-43b8-9267-77db9b2c03d9', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'expense', '92.90', 'TRY', '2023-01-10T21:00:00.000Z', 'Fiş: F JÜURKİYE TARIMA KAEDİ', NULL, NULL, NULL, '2026-01-24T12:47:26.708Z', '2026-01-24T12:47:26.708Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('46644577-e431-4370-8f1b-bdf325aeba3e', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ec3d3430-4ff3-43b8-9267-77db9b2c03d9', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'expense', '92.90', 'TRY', '2023-01-10T21:00:00.000Z', 'Fiş: F JÜURKİYE TARIMA KAEDİ', NULL, NULL, NULL, '2026-01-24T12:47:51.026Z', '2026-01-24T12:47:51.026Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('6536eeaf-8494-4068-9e4c-90f5632952e2', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '2100.00', 'TRY', '2026-01-23T21:00:00.000Z', 'Adisyon: Islak Kek x2, Çikolatalı Pasta x2, Meveli Pasta x2, Latte x1', NULL, NULL, NULL, '2026-01-24T14:24:10.822Z', '2026-01-24T14:24:10.822Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('66d99734-87dd-4134-9780-d738f0a5a7ca', 'be8b8541-f427-4287-a00b-a0e9783e5209', '6612bef2-edfa-4f14-acc9-14062d7e0b36', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'expense', '300.00', 'TRY', '2026-01-23T21:00:00.000Z', '', NULL, NULL, NULL, '2026-01-24T14:24:57.583Z', '2026-01-24T14:24:57.583Z', NULL, 'fixed', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('b04bdd12-effe-48bb-a1cd-2903af3cb5e4', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '800.00', 'TRY', '2026-01-23T21:00:00.000Z', 'Adisyon: Meveli Pasta x1, Latte x1, Çikolatalı Pasta x1', NULL, NULL, NULL, '2026-01-24T14:36:46.986Z', '2026-01-24T14:36:46.986Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('6a0da505-26de-4cb4-a829-1c5b76532983', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '750.00', 'TRY', '2026-01-23T21:00:00.000Z', 'Adisyon: Çikolatalı Pasta x1, Latte x1, Islak Kek x1', NULL, NULL, NULL, '2026-01-24T15:49:41.124Z', '2026-01-24T15:49:41.124Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('e239aae0-d231-4d16-9037-27fd4e8c1929', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'd13142d0-ac10-4a28-a3f6-3aba86d8de77', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '840.00', 'TRY', '2026-01-23T21:00:00.000Z', 'Adisyon: Latte x1, Amaricano x1, Browni x2', NULL, NULL, NULL, '2026-01-24T15:49:50.348Z', '2026-01-24T15:49:50.348Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('00f93f6e-a307-4b23-a9dd-8c4ca0fa80f7', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'd13142d0-ac10-4a28-a3f6-3aba86d8de77', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '950.00', 'TRY', '2026-01-23T21:00:00.000Z', 'Adisyon: Çikolatalı Pasta x1, Islak Kek x2', NULL, NULL, NULL, '2026-01-24T15:53:38.028Z', '2026-01-24T15:53:38.028Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('792d9cde-6586-4209-af2d-ff4c7b525d53', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ec3d3430-4ff3-43b8-9267-77db9b2c03d9', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'expense', '92.90', 'TRY', '2023-01-10T21:00:00.000Z', 'Fiş: F JÜURKİYE TARIMA KAEDİ', NULL, NULL, NULL, '2026-01-24T15:55:06.903Z', '2026-01-24T15:55:06.903Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('6b6264eb-2b2a-4eef-9e4b-a5aeb1de5082', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ec3d3430-4ff3-43b8-9267-77db9b2c03d9', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '92.90', 'TRY', '2023-01-10T21:00:00.000Z', 'Fiş: F JÜURKİYE TARIMA KAEDİ', NULL, NULL, NULL, '2026-01-24T16:10:39.968Z', '2026-01-24T16:10:39.968Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('b29504b7-01ce-4358-9aa1-5ba21f112734', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ec3d3430-4ff3-43b8-9267-77db9b2c03d9', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'expense', '92.90', 'TRY', '2023-01-10T21:00:00.000Z', 'Fiş: F JÜURKİYE TARIMA KAEDİ', NULL, NULL, NULL, '2026-01-24T17:01:05.645Z', '2026-01-24T17:01:05.645Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('02570ddb-bb95-4db5-92d3-4ddb7e06c5c0', 'be8b8541-f427-4287-a00b-a0e9783e5209', '872ad2d1-c781-4872-8b19-13a4e5673867', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'expense', '92.90', 'TRY', '2023-01-10T21:00:00.000Z', 'Fiş: F JÜURKİYE TARIMA KAEDİ', NULL, NULL, NULL, '2026-01-24T19:08:42.512Z', '2026-01-24T19:08:42.512Z', NULL, 'personal', FALSE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('ad7ed6d5-7814-4f65-aef3-ce1468f2d250', 'be8b8541-f427-4287-a00b-a0e9783e5209', '872ad2d1-c781-4872-8b19-13a4e5673867', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'expense', '10.00', 'TRY', '2023-01-10T21:00:00.000Z', '', NULL, NULL, NULL, '2026-01-24T19:10:52.279Z', '2026-01-24T19:10:52.279Z', NULL, 'personal', FALSE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('0028f037-5b58-410e-93ad-35a84f1ae0c3', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ec3d3430-4ff3-43b8-9267-77db9b2c03d9', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'expense', '11.00', 'TRY', '2023-01-10T21:00:00.000Z', 'test', NULL, NULL, NULL, '2026-01-24T19:11:21.933Z', '2026-01-24T19:11:21.933Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('044fefb8-8d05-4b8b-8b83-7d3ef56ebaed', 'be8b8541-f427-4287-a00b-a0e9783e5209', '872ad2d1-c781-4872-8b19-13a4e5673867', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '12.00', 'TRY', '2026-01-23T21:00:00.000Z', '', NULL, NULL, NULL, '2026-01-24T19:17:16.676Z', '2026-01-24T19:17:16.676Z', NULL, 'personal', FALSE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('20f16695-789e-4624-81c1-98f3694e042d', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'df7cb357-7f74-4e01-b25c-f093f06a0f7f', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '15.00', 'TRY', '2026-01-23T21:00:00.000Z', '', NULL, NULL, NULL, '2026-01-24T19:17:27.736Z', '2026-01-24T19:17:27.736Z', NULL, 'fixed', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('ca87252c-aaaa-49dc-926e-c562d72b829a', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ec3d3430-4ff3-43b8-9267-77db9b2c03d9', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '92.90', 'TRY', '2023-01-10T21:00:00.000Z', 'Fiş: F JÜURKİYE TARIMA KAEDİ', NULL, NULL, NULL, '2026-01-24T19:17:58.674Z', '2026-01-24T19:17:58.674Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('5397c198-90c1-4a41-99c0-5e5dcedaadb4', 'be8b8541-f427-4287-a00b-a0e9783e5209', '872ad2d1-c781-4872-8b19-13a4e5673867', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '2974.80', 'TRY', '2026-01-23T21:00:00.000Z', 'Fiş: & NE SEL GAEL EM TV | VE MBA TL L'' <a', NULL, NULL, NULL, '2026-01-24T19:20:05.989Z', '2026-01-24T19:20:05.989Z', NULL, 'personal', FALSE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('c63e3459-92c2-4e2d-b783-6a78a97e412f', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ec3d3430-4ff3-43b8-9267-77db9b2c03d9', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '2974.80', 'TRY', '2026-01-23T21:00:00.000Z', 'Fiş: KAÇTI SU ŞA | KİREÇBURNU FIRIN GIDA i Ğİ', NULL, NULL, NULL, '2026-01-24T19:33:56.203Z', '2026-01-24T19:33:56.203Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('00e8e41f-622a-4130-beae-cd5a992e25e9', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '1100.00', 'TRY', '2026-01-25T21:00:00.000Z', 'Adisyon: Islak Kek x1, Meveli Pasta x1, Latte x1, Çikolatalı Pasta x1', NULL, NULL, NULL, '2026-01-26T08:55:51.415Z', '2026-01-26T08:55:51.415Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('10fe20b7-f2e6-4858-b53f-8798272c0de3', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '1700.00', 'TRY', '2026-01-25T21:00:00.000Z', 'Adisyon: Meveli Pasta x3, Latte x2, Çikolatalı Pasta x1, Amaricano x1', NULL, NULL, NULL, '2026-01-26T08:55:59.230Z', '2026-01-26T08:55:59.230Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('2445e942-afc1-4899-af9b-39b3cc0b9967', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'd13142d0-ac10-4a28-a3f6-3aba86d8de77', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '1170.00', 'TRY', '2026-01-25T21:00:00.000Z', 'Adisyon: Browni x1, Amaricano x1, Islak Kek x1, Latte x1, Meveli Pasta x1', NULL, NULL, NULL, '2026-01-26T08:56:06.060Z', '2026-01-26T08:56:06.060Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('4cfee355-8f18-42d1-989b-b266af00c6de', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'c94f97c8-228c-4383-a096-5e1479b930f7', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '1400.00', 'TRY', '2026-01-25T21:00:00.000Z', 'Adisyon: Çikolatalı Pasta x1, Meveli Pasta x1, Latte x1, Islak Kek x1, Amaricano x3', NULL, NULL, NULL, '2026-01-26T15:42:36.836Z', '2026-01-26T15:42:36.836Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('3e2a39be-51a7-499f-8201-c4a8651fa98f', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '1234000.00', 'TRY', '2026-01-25T21:00:00.000Z', '', NULL, NULL, NULL, '2026-01-26T18:25:54.252Z', '2026-01-26T18:25:54.252Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('bbd323b5-5ea8-4e91-9817-f81b78b64acb', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '650.00', 'TRY', '2026-01-25T21:00:00.000Z', 'Adisyon: Meveli Pasta x1, Latte x1, Amaricano x2', NULL, NULL, NULL, '2026-01-26T18:26:10.728Z', '2026-01-26T18:26:10.728Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('192069e1-85e5-4ddb-bb1d-a07102623900', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '1234321.00', 'TRY', '2026-01-25T21:00:00.000Z', '', NULL, NULL, NULL, '2026-01-26T18:29:20.104Z', '2026-01-26T18:29:20.104Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('515516c4-b7cc-4b3a-bd8a-5804d423a0ae', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '1000.00', 'TRY', '2026-01-25T21:00:00.000Z', 'Adisyon: Çikolatalı Pasta x1, Meveli Pasta x1, Islak Kek x1', NULL, NULL, NULL, '2026-01-26T21:24:37.048Z', '2026-01-26T21:24:37.048Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('ece2d07a-7982-4ae1-8226-15cdc7211fa7', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '720.00', 'TRY', '2026-01-25T21:00:00.000Z', 'Adisyon: Browni x1, Amaricano x1, Islak Kek x1', NULL, NULL, NULL, '2026-01-26T21:24:44.592Z', '2026-01-26T21:24:44.592Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('7bf4c500-4892-46d5-941b-06394ee96a59', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '1050.00', 'TRY', '2026-01-25T21:00:00.000Z', 'Adisyon: Çikolatalı Pasta x2, Meveli Pasta x1', NULL, NULL, NULL, '2026-01-26T21:25:52.230Z', '2026-01-26T21:25:52.230Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('2fc11d2e-8637-4cd6-b2ed-4c90fb34f9c4', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '1050.00', 'TRY', '2026-01-25T21:00:00.000Z', 'Adisyon: Çikolatalı Pasta x1, Meveli Pasta x2', NULL, NULL, NULL, '2026-01-26T21:30:03.075Z', '2026-01-26T21:30:03.075Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('1eeca3b1-0114-46d5-aa5c-c995e3bbe3ec', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '1700.00', 'TRY', '2026-01-26T21:00:00.000Z', 'Adisyon: Latte x3, Meveli Pasta x1, Çikolatalı Pasta x3', NULL, NULL, NULL, '2026-01-26T22:03:31.823Z', '2026-01-26T22:03:31.823Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('8d24de16-2c87-4e85-b016-e4a34725ce5f', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'd13142d0-ac10-4a28-a3f6-3aba86d8de77', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '1150.00', 'TRY', '2026-01-26T21:00:00.000Z', 'Adisyon: Çikolatalı Pasta x1, Meveli Pasta x2, Latte x1', NULL, NULL, NULL, '2026-01-27T18:25:18.732Z', '2026-01-27T18:25:18.732Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('93008dea-3075-47d2-ac76-a09ddc4abd58', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '1220.00', 'TRY', '2026-01-26T21:00:00.000Z', 'Adisyon: Islak Kek x3, Browni x1', NULL, NULL, NULL, '2026-01-27T18:25:26.515Z', '2026-01-27T18:25:26.515Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('f0989578-d030-437b-ae82-304dfe4049fc', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '1200.00', 'TRY', '2026-01-26T21:00:00.000Z', 'Adisyon: Islak Kek x4', NULL, NULL, NULL, '2026-01-27T18:25:32.219Z', '2026-01-27T18:25:32.219Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('edb902a0-9b3e-4f60-ae69-bdaffb570b89', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'd13142d0-ac10-4a28-a3f6-3aba86d8de77', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '1320.00', 'TRY', '2026-01-26T21:00:00.000Z', 'Adisyon: Meveli Pasta x1, Çikolatalı Pasta x1, Islak Kek x1, Browni x1', NULL, NULL, NULL, '2026-01-27T18:26:23.546Z', '2026-01-27T18:26:23.546Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('89397713-b273-4499-8004-8c2398c03b44', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'c94f97c8-228c-4383-a096-5e1479b930f7', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '1691.00', 'TRY', '2026-01-26T21:00:00.000Z', 'Adisyon: Çikolatalı Pasta x2, Meveli Pasta x1, test x1, Browni x2', NULL, NULL, NULL, '2026-01-27T18:26:55.993Z', '2026-01-27T18:26:55.993Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('fa500759-a0ec-4f5a-a40e-3296746396f2', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ec3d3430-4ff3-43b8-9267-77db9b2c03d9', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '1500.00', 'TRY', '2026-01-26T21:00:00.000Z', '', NULL, NULL, NULL, '2026-01-27T18:30:50.421Z', '2026-01-27T18:30:50.421Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('59f119e8-e2ec-45b2-b222-61d5f78a9ae4', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'df7cb357-7f74-4e01-b25c-f093f06a0f7f', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'expense', '30000.00', 'TRY', '2026-01-26T21:00:00.000Z', '', NULL, NULL, NULL, '2026-01-27T18:31:16.799Z', '2026-01-27T18:31:16.799Z', NULL, 'fixed', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('cc02ec61-5e77-4d19-bcb1-114348a30cca', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'df7cb357-7f74-4e01-b25c-f093f06a0f7f', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '1.00', 'TRY', '2026-01-26T21:00:00.000Z', '', NULL, NULL, NULL, '2026-01-27T18:34:22.266Z', '2026-01-27T18:34:22.266Z', NULL, 'fixed', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('a73de795-bfd2-42d7-8512-5cda6eec6310', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '1051.00', 'TRY', '2026-01-27T21:00:00.000Z', 'Adisyon: Çikolatalı Pasta x1, Meveli Pasta x2, test x1', NULL, NULL, NULL, '2026-01-28T12:30:30.796Z', '2026-01-28T12:30:30.796Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('8db1de88-dfa7-49a5-8de8-0c1f67889c38', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'df7cb357-7f74-4e01-b25c-f093f06a0f7f', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '1.00', 'TRY', '2026-01-27T21:00:00.000Z', '', NULL, NULL, NULL, '2026-01-28T19:16:15.135Z', '2026-01-28T19:16:15.135Z', NULL, 'fixed', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('babb089f-497f-42fe-8ddd-5d9bc91db9f7', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ec3d3430-4ff3-43b8-9267-77db9b2c03d9', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '2974.80', 'TRY', '2026-01-23T21:00:00.000Z', 'Fiş: KAÇTI SU ŞA | KİREÇBURNU FIRIN GIDA i Ğİ', NULL, NULL, NULL, '2026-01-28T19:18:54.566Z', '2026-01-28T19:18:54.566Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('1a84443d-dca4-4039-86b0-c1dfa9fa4166', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ec3d3430-4ff3-43b8-9267-77db9b2c03d9', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '2974.80', 'TRY', '2026-01-27T21:00:00.000Z', 'Fiş: KAÇTI SU ŞA | KİREÇBURNU FIRIN GIDA i Ğİ', NULL, NULL, NULL, '2026-01-28T19:19:28.136Z', '2026-01-28T19:19:28.136Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('a883d331-2a0e-479b-9bbc-27af80ae8dba', 'be8b8541-f427-4287-a00b-a0e9783e5209', '66c14a88-4f8e-4c3c-94af-c4bafd7d2987', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '600.00', 'TRY', '2026-01-28T21:00:00.000Z', 'Adisyon: Kola x2, Lüfer x1', NULL, NULL, NULL, '2026-01-29T21:54:11.355Z', '2026-01-29T21:54:11.355Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('3c31e3e7-183d-46f7-b895-4db554f2464d', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '760.00', 'TRY', '2026-01-28T21:00:00.000Z', 'Adisyon: Kola x1, Su x1, Meveli Pasta x2', NULL, NULL, NULL, '2026-01-29T21:59:23.877Z', '2026-01-29T21:59:23.877Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('57353c73-59aa-4a92-9124-0c1de55aa6e5', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '100.00', 'TRY', '2026-01-28T21:00:00.000Z', 'Adisyon: Kola x2', NULL, NULL, NULL, '2026-01-29T22:00:13.810Z', '2026-01-29T22:00:13.810Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('721d5a65-d93f-43ee-ab68-3ea9d986cec5', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '100.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Kola x2', NULL, NULL, NULL, '2026-01-30T08:46:22.565Z', '2026-01-30T08:46:22.565Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('f5166574-e5bd-4f6d-b984-e65fb06faa5c', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '80.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Kola x1, Su x1, Soda x1', NULL, NULL, NULL, '2026-01-30T17:56:35.104Z', '2026-01-30T17:56:35.104Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('29b86aa4-0811-41a9-82fe-1f596a4b3b3a', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '230.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x1, Soda x1, Su x1', NULL, NULL, NULL, '2026-01-30T21:03:26.673Z', '2026-01-30T21:03:26.673Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('b448af47-948b-4259-ace1-e81673a8f8eb', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '380.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Meveli Pasta x1, Su x1, Soda x1', NULL, NULL, NULL, '2026-01-30T21:03:36.376Z', '2026-01-30T21:03:36.376Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('0876e5ec-2093-4ee0-9673-8cb643918a5d', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '40.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Soda x2', NULL, NULL, NULL, '2026-01-30T21:03:47.759Z', '2026-01-30T21:03:47.759Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('dfa8ca3a-f732-41b3-8a2f-da85e33c7eaf', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '230.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x1, Soda x1, Su x1', NULL, NULL, NULL, '2026-01-30T21:04:06.297Z', '2026-01-30T21:04:06.297Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('a5f5262b-e8b7-4e56-b482-c173eb0e06b5', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '400.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x2', NULL, NULL, NULL, '2026-01-30T21:07:57.691Z', '2026-01-30T21:07:57.691Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('3c7cfc67-63c9-45db-b0d8-1d7b646907a1', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '420.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x2, Soda x1', NULL, NULL, NULL, '2026-01-30T21:09:10.002Z', '2026-01-30T21:09:10.002Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('fe1d63ef-70f7-4df9-a9e2-74b1a147fc59', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '230.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x1, Soda x1, Su x1', NULL, NULL, NULL, '2026-01-30T21:14:21.981Z', '2026-01-30T21:14:21.981Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('e3d6bc6d-2abe-4855-82c8-1051d7493eb0', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '230.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x1, Soda x1, Su x1', NULL, NULL, NULL, '2026-01-30T21:17:04.217Z', '2026-01-30T21:17:04.217Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('66106d70-d57f-4866-ad37-6b8bd91d11b9', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '230.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x1, Soda x1, Su x1', NULL, NULL, NULL, '2026-01-30T21:17:50.294Z', '2026-01-30T21:17:50.294Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('8bcc6246-ec31-446d-80a0-396220e84044', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '600.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x3', NULL, NULL, NULL, '2026-01-30T21:24:05.373Z', '2026-01-30T21:24:05.373Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('bb291269-7e8d-4fed-931c-88c605e7333b', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '400.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x2', NULL, NULL, NULL, '2026-01-30T21:24:36.827Z', '2026-01-30T21:24:36.827Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('dde62068-04f1-4d36-8af2-967661f935ff', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '750.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Amaricano x1, Latte x1, Kola x1, Lüfer x1', NULL, NULL, NULL, '2026-01-30T21:24:49.856Z', '2026-01-30T21:24:49.856Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('e403046a-6236-4afb-b5f4-c0be4f83c391', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '230.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Soda x1, Su x1, Paçanga x1', NULL, NULL, NULL, '2026-01-30T21:34:06.173Z', '2026-01-30T21:34:06.173Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('f621fc3b-b336-47c8-b994-5cd9e2a3f2c2', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '622.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Islak Kek x1, Browni x1, test x2', NULL, NULL, NULL, '2026-01-30T21:34:26.816Z', '2026-01-30T21:34:26.816Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('3dbe9517-cc80-4848-a19e-05404c86eef5', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '60.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Soda x3', NULL, NULL, NULL, '2026-01-30T21:34:41.724Z', '2026-01-30T21:34:41.724Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('c1d02a20-a93e-450c-9631-22d9c9259463', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '600.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x3', NULL, NULL, NULL, '2026-01-30T21:34:49.794Z', '2026-01-30T21:34:49.794Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('62411531-09a8-4e05-8c1a-bcd4784513dd', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '230.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Soda x1, Su x1, Paçanga x1', NULL, NULL, NULL, '2026-01-30T21:38:05.214Z', '2026-01-30T21:38:05.214Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('d343b09f-54a2-4a8f-8b66-7ca27d8d6c1e', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '230.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x1, Soda x1, Su x1', NULL, NULL, NULL, '2026-01-30T21:39:58.979Z', '2026-01-30T21:39:58.979Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('be14cc71-a3ea-4aa3-9f63-6b926dab5717', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '600.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x3', NULL, NULL, NULL, '2026-01-30T21:41:04.639Z', '2026-01-30T21:41:04.639Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('b0c33188-5555-4584-a424-607be12c96ae', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '600.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x3', NULL, NULL, NULL, '2026-01-30T21:41:38.255Z', '2026-01-30T21:41:38.255Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('e8ef31f2-af00-4af2-992b-3b61f26e8060', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '600.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x3', NULL, NULL, NULL, '2026-01-30T21:43:56.841Z', '2026-01-30T21:43:56.841Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('3e9e6392-205c-474f-ab4f-8179fef02ad8', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '230.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x1, Soda x1, Su x1', NULL, NULL, NULL, '2026-01-30T21:49:12.216Z', '2026-01-30T21:49:12.216Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('0d7eb31b-5503-44d4-abfc-b4d6be70f2f6', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '230.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x1, Soda x1, Su x1', NULL, NULL, NULL, '2026-01-30T21:51:53.176Z', '2026-01-30T21:51:53.176Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('375eb2a7-2679-47b3-bf16-45046b985f66', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '3.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: test x3', NULL, NULL, NULL, '2026-01-30T21:52:03.286Z', '2026-01-30T21:52:03.286Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('d2c98c1e-200d-4cf0-afe1-f584bcec7ca0', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '600.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x3', NULL, NULL, NULL, '2026-01-30T22:01:57.128Z', '2026-01-30T22:01:57.128Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('91b1ec3b-ba96-4c91-b1bb-3ab40d873a05', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '521.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x1, test x1, Browni x1', NULL, NULL, NULL, '2026-01-30T22:02:03.685Z', '2026-01-30T22:02:03.685Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('118cc3a5-66d8-41ec-8d24-93cd0ec4051c', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '60.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Soda x3', NULL, NULL, NULL, '2026-01-30T22:04:11.131Z', '2026-01-30T22:04:11.131Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('7491e033-0e1a-4b2a-b57e-1d66ecdd164c', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '600.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x3', NULL, NULL, NULL, '2026-01-30T22:05:54.010Z', '2026-01-30T22:05:54.010Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('5f858e39-4b44-4a99-8306-9eca0353d60b', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '1110.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Meveli Pasta x3, Soda x3', NULL, NULL, NULL, '2026-01-30T22:06:13.015Z', '2026-01-30T22:06:13.015Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('67c68ff8-b98c-4e18-8862-8ba09385ec39', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'c94f97c8-228c-4383-a096-5e1479b930f7', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '220.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x1, Soda x1', NULL, NULL, NULL, '2026-01-30T22:08:14.783Z', '2026-01-30T22:08:14.783Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('706b1866-464a-44a7-b404-17ce97f46854', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'd13142d0-ac10-4a28-a3f6-3aba86d8de77', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '60.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Soda x3', NULL, NULL, NULL, '2026-01-30T22:08:47.049Z', '2026-01-30T22:08:47.049Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('e6ec13e4-4a49-4de9-b6e9-1ffed1be1cfd', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '600.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x3', NULL, NULL, NULL, '2026-01-30T22:10:08.520Z', '2026-01-30T22:10:08.520Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('c3819322-4e05-440b-acfc-4cb4f37f0a66', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '600.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x3', NULL, NULL, NULL, '2026-01-30T22:13:26.098Z', '2026-01-30T22:13:26.098Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('d7a5ca9c-dcef-4fc0-886e-2e1f7776637b', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '400.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x2', NULL, NULL, NULL, '2026-01-30T22:14:30.995Z', '2026-01-30T22:14:30.995Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('96accbef-d0b6-4c9a-bcc1-1cde81a35dc6', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '600.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x3', NULL, NULL, NULL, '2026-01-30T22:17:01.729Z', '2026-01-30T22:17:01.729Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('885129cb-ccd4-4837-9afd-5c10ae066c1b', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '240.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x1, Soda x2', NULL, NULL, NULL, '2026-01-30T22:19:46.333Z', '2026-01-30T22:19:46.333Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('16523466-0ef0-41d7-822d-17f18b5c35b0', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '600.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x3', NULL, NULL, NULL, '2026-01-30T22:19:58.698Z', '2026-01-30T22:19:58.698Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('1b048420-13bd-4176-aa45-d5d58a47debd', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '600.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Paçanga x3', NULL, NULL, NULL, '2026-01-30T22:23:33.646Z', '2026-01-30T22:23:33.646Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('281c26f2-563f-48c2-b1e7-e3727a3d88ac', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '80.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Su x1, Soda x1, Kola x1', NULL, NULL, NULL, '2026-01-30T22:24:00.215Z', '2026-01-30T22:24:00.215Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('a9d49146-5780-4a61-a9f8-867d4bf62f01', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '10.00', 'TRY', '2026-01-29T21:00:00.000Z', 'Adisyon: Su x1', NULL, NULL, NULL, '2026-01-30T22:25:17.421Z', '2026-01-30T22:25:17.421Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('466cce9d-0ec1-466a-bcf0-3cd1f5a0e943', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '200.00', 'TRY', '2026-01-30T21:00:00.000Z', 'Adisyon: Paçanga x1', NULL, NULL, NULL, '2026-01-30T22:29:10.329Z', '2026-01-30T22:29:10.329Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('78ba1439-424a-459e-b7f3-52902e0d4304', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '30.00', 'TRY', '2026-01-30T21:00:00.000Z', 'Adisyon: Soda x1, Su x1', NULL, NULL, NULL, '2026-01-30T22:29:16.146Z', '2026-01-30T22:29:16.146Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('988b9e1e-a6ef-490c-994b-f122032d95c1', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '400.00', 'TRY', '2026-01-30T21:00:00.000Z', 'Adisyon: Paçanga x2', NULL, NULL, NULL, '2026-01-30T22:37:07.435Z', '2026-01-30T22:37:07.435Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('ad9e212a-9544-4d3b-9cd3-2531b0fd6d28', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '351.00', 'TRY', '2026-01-30T21:00:00.000Z', 'Adisyon: test x1, Çikolatalı Pasta x1', NULL, NULL, NULL, '2026-01-30T22:38:04.543Z', '2026-01-30T22:38:04.543Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('05cf372e-7063-4df1-9cf7-2e76c2a1c4ea', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'd13142d0-ac10-4a28-a3f6-3aba86d8de77', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '123.00', 'TRY', '2026-01-30T21:00:00.000Z', 'Adisyon: test x1', NULL, NULL, NULL, '2026-01-30T22:50:52.115Z', '2026-01-30T22:50:52.115Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('3f8cedc6-a05a-4790-b8a3-796fd85f8181', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '246.00', 'TRY', '2026-01-30T21:00:00.000Z', 'Adisyon: test x2', NULL, NULL, NULL, '2026-01-31T06:48:15.177Z', '2026-01-31T06:48:15.177Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('ff6ab4f9-1a0c-4032-85f3-5e76acd1481e', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '824.00', 'TRY', '2026-01-31T21:00:00.000Z', 'Adisyon: test x1, Lüfer x1, test x1, Paçanga x1', NULL, NULL, NULL, '2026-02-01T11:29:53.409Z', '2026-02-01T11:29:53.409Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('12f48f23-42ea-48ed-932b-3fe5b50ff93d', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'd13142d0-ac10-4a28-a3f6-3aba86d8de77', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '971.00', 'TRY', '2026-01-31T21:00:00.000Z', 'Adisyon: Islak Kek x1, Browni x1, test x1, Çikolatalı Pasta x1', NULL, NULL, NULL, '2026-02-01T11:30:01.454Z', '2026-02-01T11:30:01.454Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('57dd9493-b89e-4140-8469-8f56e582e8c9', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ec3d3430-4ff3-43b8-9267-77db9b2c03d9', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'expense', '2974.80', 'TRY', '2026-02-01T21:00:00.000Z', 'Fiş: KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ', NULL, NULL, '--- FİŞ / FATURA DETAYI ---

KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ

TARİH: 24.01.2026   SAAT: 19:09:20
FİŞ NO: 0123
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPLAM:                        2974.80 TL

ÖDEME: Kredi Kartı
', '2026-02-08T18:40:10.756Z', '2026-02-08T18:40:10.756Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('195bdc73-ed7c-4666-a23c-ec741210d604', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ec3d3430-4ff3-43b8-9267-77db9b2c03d9', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'expense', '2974.80', 'TRY', '2026-01-23T21:00:00.000Z', 'Fiş: Kireçburnu pastanesi', NULL, NULL, '--- FİŞ / FATURA DETAYI ---

KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ

TARİH: 24.01.2026   SAAT: 19:09:20
FİŞ NO: 0123
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPLAM:                        2974.80 TL

ÖDEME: Kredi Kartı
', '2026-02-08T18:45:47.514Z', '2026-02-08T18:45:47.514Z', NULL, 'operational', TRUE, NULL, 'receipt', '20.00', '495.80', NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('8b5f8bec-2b09-4366-a1b8-c69c280a6dae', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ec3d3430-4ff3-43b8-9267-77db9b2c03d9', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'expense', '2974.80', 'TRY', '2026-01-23T21:00:00.000Z', 'Fiş: KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ', NULL, NULL, '--- FİŞ / FATURA DETAYI ---

KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ

TARİH: 24.01.2026   SAAT: 19:09:20
FİŞ NO: 0123
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPKDV:                         270.44 TL
TOPLAM:                        2974.80 TL

ÖDEME: Kredi Kartı
', '2026-02-08T18:54:01.521Z', '2026-02-08T18:54:01.521Z', NULL, 'operational', TRUE, NULL, 'receipt', '10.00', '270.44', NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('bb411f02-fe83-4ab0-a586-e50687b01107', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ec3d3430-4ff3-43b8-9267-77db9b2c03d9', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'expense', '2974.80', 'TRY', '2026-02-01T21:00:00.000Z', 'Fiş: KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ', NULL, NULL, '--- FİŞ / FATURA DETAYI ---

KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ

TARİH: 24.01.2026   SAAT: 19:09:20
FİŞ NO: 0123
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPLAM:                        2974.80 TL

ÖDEME: Kredi Kartı
', '2026-02-08T18:40:46.338Z', '2026-02-08T18:40:46.338Z', '2026-02-08T19:00:41.471Z', 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('7de731f8-90f5-42ff-9967-867d02cff31f', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '1338.00', 'TRY', '2026-02-07T21:00:00.000Z', 'Adisyon: Çikolatalı Pasta x1, test x2, Paçanga x1, Soda x2, Lüfer x1, test x2', NULL, NULL, NULL, '2026-02-08T19:08:02.885Z', '2026-02-08T19:08:02.885Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('a4d7ef48-e986-4991-8cbb-c550d26a9bbf', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '1760.00', 'TRY', '2026-02-07T21:00:00.000Z', 'Adisyon: Pilav x3, KuruFasulye x2, Lüfer x2', NULL, NULL, NULL, '2026-02-08T19:49:57.387Z', '2026-02-08T19:49:57.387Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('47a332d8-496c-4485-83ae-f768e364b3e3', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '980.00', 'TRY', '2026-02-08T21:00:00.000Z', 'Adisyon: KuruFasulye x1, Su x1, Kola x1, Pilav x1, Islak Kek x2', NULL, NULL, NULL, '2026-02-09T05:58:50.131Z', '2026-02-09T05:58:50.131Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('c811b20b-43b4-4a06-afff-f585ce93a613', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '1500.00', 'TRY', '2026-02-08T21:00:00.000Z', 'Sipariş #ORD-795565-59 (Caner Okcuoğlu)', NULL, NULL, 'Items: [{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":2},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":2},{"id":"d21a8c5b-659a-454e-8b39-f2d42566fe42","name":"Kola","price":50,"quantity":2}]', '2026-02-09T06:55:02.716Z', '2026-02-09T06:55:02.716Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('baa6bd65-ed61-4edb-8e88-9ad136924d0b', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '1180.00', 'TRY', '2026-02-08T21:00:00.000Z', 'Sipariş #ORD-759307-3 (Caner Okcuoğlu)', NULL, NULL, 'Items: [{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":1},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":2},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1},{"id":"ffaa46c8-4046-4986-a49b-77fdf4a727c1","name":"Soda","price":20,"quantity":2},{"id":"0a947cc9-9682-45b6-9819-c6aceeac7260","name":"Paçanga","price":200,"quantity":1}]', '2026-02-09T06:55:19.150Z', '2026-02-09T06:55:19.150Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('891951ef-a07d-403e-8b78-690031c435f0', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '1760.00', 'TRY', '2026-02-08T21:00:00.000Z', 'Sipariş #ORD-162600-28 (Masa yok)', NULL, NULL, 'Items: [{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":2},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":2},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":3}]', '2026-02-09T06:56:46.002Z', '2026-02-09T06:56:46.002Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('41149466-9a78-430d-a028-80607eb9fc37', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ec3d3430-4ff3-43b8-9267-77db9b2c03d9', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'expense', '2974.80', 'TRY', '2026-01-23T21:00:00.000Z', 'Fiş: KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ', NULL, NULL, '--- FİŞ / FATURA DETAYI ---

KAÇTI SU ŞA   KİREÇBURNU FIRIN GIDA          i         Ğİ

TARİH: 24.01.2026   SAAT: 19:09:20
FİŞ NO: 0123
-------------------------------------------
KALEM DETAYLARI OKUNAMADI
-------------------------------------------
TOPKDV:                         270.44 TL
TOPLAM:                        2974.80 TL

ÖDEME: Kredi Kartı
', '2026-02-09T07:01:58.905Z', '2026-02-09T07:01:58.905Z', NULL, 'operational', TRUE, NULL, 'receipt', '10.00', '270.44', NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('9fc89ecb-afdb-4263-8db8-797537438557', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '100.00', 'TRY', '2026-02-08T21:00:00.000Z', 'Sipariş #TEST-ORD-1 (T1)', NULL, NULL, 'Items: []', '2026-02-09T07:54:55.433Z', '2026-02-09T07:54:55.433Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('f4c18151-39bd-4ff8-9cbd-08852d25c1a6', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '700.00', 'TRY', '2026-02-08T21:00:00.000Z', 'Sipariş #ORD-679219-82 (Masa yok)', NULL, NULL, 'Items: [{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":1},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1}]', '2026-02-09T07:55:01.780Z', '2026-02-09T07:55:01.780Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('5c5edd88-f9b5-4273-835f-7dc538d9a749', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '2100.00', 'TRY', '2026-02-08T21:00:00.000Z', 'Sipariş #ORD-806278-88 (Masa yok)', NULL, NULL, 'Items: [{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":3},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":3}]', '2026-02-09T08:13:39.950Z', '2026-02-09T08:13:39.950Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('f487d168-f2a9-4c17-bb5e-b62f75fefb29', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '305e0b20-dd98-4bde-942f-a1bc0a22e752', 'income', '1200.00', 'TRY', '2026-02-08T21:00:00.000Z', 'Sipariş #ORD-732812-48 (Masa yok)', NULL, NULL, 'Items: [{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":2},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1}]', '2026-02-09T08:13:44.262Z', '2026-02-09T08:13:44.262Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('292e25a0-970b-4040-9577-b4a8cb67aa64', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '2060.00', 'TRY', '2026-02-08T21:00:00.000Z', 'Sipariş #ORD-891689-9 (Masa yok)', NULL, NULL, 'Items: [{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":3},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":3}]', '2026-02-09T12:25:35.086Z', '2026-02-09T12:25:35.086Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('a83e5d57-e757-4f3b-8df1-bce273b26e69', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '3ce0b5b6-213b-46bb-9d37-feec5c40584c', 'income', '443.00', 'TRY', '2026-02-08T21:00:00.000Z', 'Adisyon: KuruFasulye x1, Pilav x1, test x1', NULL, NULL, NULL, '2026-02-09T20:47:23.510Z', '2026-02-09T20:47:23.510Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('e9620712-a221-4cee-8df8-b9fc93e9dd58', 'be8b8541-f427-4287-a00b-a0e9783e5209', '85a0e973-3b81-46ee-938c-cf1ba996dc1c', '3ce0b5b6-213b-46bb-9d37-feec5c40584c', 'expense', '44.30', 'TRY', '2026-02-08T21:00:00.000Z', 'Otomatik Kesinti: Hizmet Komisyonu (%10)', NULL, NULL, 'Bağlı İşlem ID: a83e5d57-e757-4f3b-8df1-bce273b26e69', '2026-02-09T20:47:23.510Z', '2026-02-09T20:47:23.510Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('660f18f1-024a-45a6-8d16-601b8672daa3', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ec3d3430-4ff3-43b8-9267-77db9b2c03d9', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '556.54', 'TRY', '2026-02-09T21:00:00.000Z', 'Fiş: ASH ARIN    j', NULL, NULL, '--- FİŞ / FATURA DETAYI ---

ASH ARIN    j

TARİH: ---   SAAT: 15:07
-------------------------------------------
. 202  15:07 B:1807   365          9.02
S1.      Kayn                    470.83
20 67.50                          19.50
-------------------------------------------
TOPLAM:                         556.54 TL

', '2026-02-09T21:22:59.686Z', '2026-02-09T21:22:59.686Z', NULL, 'operational', TRUE, NULL, 'receipt', '10.00', '50.59', NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('2f075a74-e0dd-4a27-8ef1-fc1f9d10369f', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'c94f97c8-228c-4383-a096-5e1479b930f7', '3ce0b5b6-213b-46bb-9d37-feec5c40584c', 'income', '1000.00', 'TRY', '2026-02-09T21:00:00.000Z', 'Sipariş #ORD-188016-41 (Masa yok)', NULL, NULL, 'Items: [{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":2}]', '2026-02-10T18:30:13.985Z', '2026-02-10T18:30:13.985Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('4770a448-a0f6-494c-ad06-db30def28e87', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'c94f97c8-228c-4383-a096-5e1479b930f7', '3ce0b5b6-213b-46bb-9d37-feec5c40584c', 'income', '443.00', 'TRY', '2026-02-09T21:00:00.000Z', 'Adisyon: KuruFasulye x1, Pilav x1, test x1', NULL, NULL, NULL, '2026-02-10T18:31:08.096Z', '2026-02-10T18:31:08.096Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('cf0ff8d1-f235-467b-ae31-e4b3ce70a826', 'be8b8541-f427-4287-a00b-a0e9783e5209', '3b61eb52-4b64-40df-ad80-f2bfee978b3b', '3ce0b5b6-213b-46bb-9d37-feec5c40584c', 'expense', '22.15', 'TRY', '2026-02-09T21:00:00.000Z', 'Otomatik Kesinti: Hizmet Komisyonu (%5)', NULL, NULL, 'Bağlı İşlem ID: 4770a448-a0f6-494c-ad06-db30def28e87', '2026-02-10T18:31:08.096Z', '2026-02-10T18:31:08.096Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('2901f411-c604-4a20-9f30-5cff26c1b72c', 'be8b8541-f427-4287-a00b-a0e9783e5209', '3b61eb52-4b64-40df-ad80-f2bfee978b3b', '3ce0b5b6-213b-46bb-9d37-feec5c40584c', 'expense', '22.15', 'TRY', '2026-02-09T21:00:00.000Z', 'Otomatik Kesinti: Kurye Hizmeti (%5)', NULL, NULL, 'Bağlı İşlem ID: 4770a448-a0f6-494c-ad06-db30def28e87', '2026-02-10T18:31:08.096Z', '2026-02-10T18:31:08.096Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('dccbf920-a7b6-40f4-9095-d5318d5fabf6', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'c94f97c8-228c-4383-a096-5e1479b930f7', '3ce0b5b6-213b-46bb-9d37-feec5c40584c', 'income', '1100.00', 'TRY', '2026-02-09T21:00:00.000Z', 'Sipariş #ORD-571384-68 (Masa yok)', NULL, NULL, 'Items: [{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":1},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":3}]', '2026-02-10T18:36:30.859Z', '2026-02-10T18:36:30.859Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('eaa2da87-05d9-4621-832a-6ba7ae9f9dd5', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'c94f97c8-228c-4383-a096-5e1479b930f7', '3ce0b5b6-213b-46bb-9d37-feec5c40584c', 'income', '1000.00', 'TRY', '2026-02-09T21:00:00.000Z', 'Sipariş #ORD-206061-90 (Masa yok)', NULL, NULL, 'Items: [{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":2}]', '2026-02-10T18:46:59.919Z', '2026-02-10T18:46:59.919Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('f4b203d4-9268-453f-a7a8-2bc861fec101', 'be8b8541-f427-4287-a00b-a0e9783e5209', '3b61eb52-4b64-40df-ad80-f2bfee978b3b', '3ce0b5b6-213b-46bb-9d37-feec5c40584c', 'expense', '50.00', 'TRY', '2026-02-09T21:00:00.000Z', 'Otomatik Kesinti: Hizmet Komisyonu (%5)', NULL, NULL, 'Bağlı Sipariş: ORD-206061-90', '2026-02-10T18:46:59.919Z', '2026-02-10T18:46:59.919Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('b1aa0d8b-8a63-4293-ade0-ef40f1528dac', 'be8b8541-f427-4287-a00b-a0e9783e5209', '3b61eb52-4b64-40df-ad80-f2bfee978b3b', '3ce0b5b6-213b-46bb-9d37-feec5c40584c', 'expense', '50.00', 'TRY', '2026-02-09T21:00:00.000Z', 'Otomatik Kesinti: Kurye Hizmeti (%5)', NULL, NULL, 'Bağlı Sipariş: ORD-206061-90', '2026-02-10T18:46:59.919Z', '2026-02-10T18:46:59.919Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('42a38a55-05fb-4728-abe0-8bbb93a32782', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '3ce0b5b6-213b-46bb-9d37-feec5c40584c', 'income', '400.00', 'TRY', '2026-02-09T21:00:00.000Z', 'Sipariş #ORD-869673-63 (Masa yok)', NULL, NULL, 'Items: [{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":2}]', '2026-02-10T18:58:32.063Z', '2026-02-10T18:58:32.063Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('38b005a6-ddfa-4a2b-88fe-1314c4458f89', 'be8b8541-f427-4287-a00b-a0e9783e5209', '85a0e973-3b81-46ee-938c-cf1ba996dc1c', '3ce0b5b6-213b-46bb-9d37-feec5c40584c', 'expense', '40.00', 'TRY', '2026-02-09T21:00:00.000Z', 'Otomatik Kesinti: Hizmet Komisyonu (%10)', NULL, NULL, 'Bağlı Sipariş: ORD-869673-63', '2026-02-10T18:58:32.063Z', '2026-02-10T18:58:32.063Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('4aa91e63-b813-4860-8219-631ec6c94938', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '520.00', 'TRY', '2026-02-09T21:00:00.000Z', 'Adisyon: KuruFasulye x2, Pilav x1', NULL, NULL, NULL, '2026-02-10T18:58:48.639Z', '2026-02-10T18:58:48.639Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('f85b2fdb-9c42-483d-9f67-ffac8900058a', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '450.00', 'TRY', '2026-02-09T21:00:00.000Z', 'Adisyon: KuruFasulye x2, Kola x1', NULL, NULL, NULL, '2026-02-10T19:02:10.742Z', '2026-02-10T19:02:10.742Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('7396432f-a1b3-4853-b587-b78245e92d21', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '320.00', 'TRY', '2026-02-09T21:00:00.000Z', 'Sipariş #ORD-150665-60 (Masa yok)', NULL, NULL, 'Items: [{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1}]', '2026-02-10T19:02:41.388Z', '2026-02-10T19:02:41.388Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('3b27779b-87e5-4945-9b64-497bec1852d6', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '2.00', 'TRY', '2026-02-09T21:00:00.000Z', 'Adisyon: test x2', NULL, NULL, NULL, '2026-02-10T19:05:35.299Z', '2026-02-10T19:05:35.299Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('262aca37-d046-4afb-8f9b-17be72969b60', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '100.00', 'TRY', '2026-02-09T21:00:00.000Z', 'Adisyon: Kola x2', NULL, NULL, NULL, '2026-02-10T19:05:54.728Z', '2026-02-10T19:05:54.728Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('9b13c64c-3904-4fbf-8b65-23848e40a17f', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '20.00', 'TRY', '2026-02-09T21:00:00.000Z', 'Adisyon: Su x2', NULL, NULL, NULL, '2026-02-10T19:16:25.302Z', '2026-02-10T19:16:25.302Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('87eba22c-f354-43f0-90d1-a7656f4e1b6e', 'be8b8541-f427-4287-a00b-a0e9783e5209', '74ebce92-7e81-43ba-8c11-406b76c345a5', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '2.00', 'TRY', '2026-02-09T21:00:00.000Z', 'Otomatik Kesinti: Kredi kartı Komisyonu (%10)', NULL, NULL, 'Bağlı İşlem ID: 9b13c64c-3904-4fbf-8b65-23848e40a17f', '2026-02-10T19:16:25.302Z', '2026-02-10T19:16:25.302Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('ccc5f648-92ad-4a5a-9288-e1af935f7586', 'be8b8541-f427-4287-a00b-a0e9783e5209', '2a35ae13-e12c-4f73-aa0c-eec79d86f811', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '400.00', 'TRY', '2026-02-09T21:00:00.000Z', 'Adisyon: KuruFasulye x2', NULL, NULL, NULL, '2026-02-10T19:16:44.404Z', '2026-02-10T19:16:44.404Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('9d38e639-520f-41d7-b6e7-1a92b1db89c1', 'be8b8541-f427-4287-a00b-a0e9783e5209', '85a0e973-3b81-46ee-938c-cf1ba996dc1c', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '40.00', 'TRY', '2026-02-09T21:00:00.000Z', 'Otomatik Kesinti: Hizmet Komisyonu (%10)', NULL, NULL, 'Bağlı İşlem ID: ccc5f648-92ad-4a5a-9288-e1af935f7586', '2026-02-10T19:16:44.404Z', '2026-02-10T19:16:44.404Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('a9303e28-2b94-4f1b-94de-f5ce62306d2b', 'be8b8541-f427-4287-a00b-a0e9783e5209', '74ebce92-7e81-43ba-8c11-406b76c345a5', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '40.00', 'TRY', '2026-02-09T21:00:00.000Z', 'Otomatik Kesinti: Kredi kartı Komisyonu (%10)', NULL, NULL, 'Bağlı İşlem ID: ccc5f648-92ad-4a5a-9288-e1af935f7586', '2026-02-10T19:16:44.404Z', '2026-02-10T19:16:44.404Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('5537a146-ee01-46cf-a84d-7cf89fe43a3f', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'c94f97c8-228c-4383-a096-5e1479b930f7', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '1000.00', 'TRY', '2026-02-09T21:00:00.000Z', 'Adisyon: Lüfer x2', NULL, NULL, NULL, '2026-02-10T19:17:11.243Z', '2026-02-10T19:17:11.243Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('cc430e64-2faa-4e20-8540-66cc47d08b4d', 'be8b8541-f427-4287-a00b-a0e9783e5209', '3b61eb52-4b64-40df-ad80-f2bfee978b3b', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '50.00', 'TRY', '2026-02-09T21:00:00.000Z', 'Otomatik Kesinti: Hizmet Komisyonu (%5)', NULL, NULL, 'Bağlı İşlem ID: 5537a146-ee01-46cf-a84d-7cf89fe43a3f', '2026-02-10T19:17:11.243Z', '2026-02-10T19:17:11.243Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('3d269834-f28a-4e13-8a6b-b48a0f275242', 'be8b8541-f427-4287-a00b-a0e9783e5209', '3b61eb52-4b64-40df-ad80-f2bfee978b3b', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '50.00', 'TRY', '2026-02-09T21:00:00.000Z', 'Otomatik Kesinti: Kurye Hizmeti (%5)', NULL, NULL, 'Bağlı İşlem ID: 5537a146-ee01-46cf-a84d-7cf89fe43a3f', '2026-02-10T19:17:11.243Z', '2026-02-10T19:17:11.243Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('2fb15620-430a-433d-b025-0ecc09705d6e', 'be8b8541-f427-4287-a00b-a0e9783e5209', '74ebce92-7e81-43ba-8c11-406b76c345a5', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '100.00', 'TRY', '2026-02-09T21:00:00.000Z', 'Otomatik Kesinti: Kredi kartı Komisyonu (%10)', NULL, NULL, 'Bağlı İşlem ID: 5537a146-ee01-46cf-a84d-7cf89fe43a3f', '2026-02-10T19:17:11.243Z', '2026-02-10T19:17:11.243Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('817a11ab-4c59-4cbf-8264-e1a46a3e0ad4', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '1000.00', 'TRY', '2026-02-09T21:00:00.000Z', 'Sipariş #ORD-088787-12 (Masa yok)', NULL, NULL, 'Items: [{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":2}]', '2026-02-10T19:18:27.178Z', '2026-02-10T19:18:27.178Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('761e054c-9ab7-44d6-8156-81926a7a071d', 'be8b8541-f427-4287-a00b-a0e9783e5209', '74ebce92-7e81-43ba-8c11-406b76c345a5', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '100.00', 'TRY', '2026-02-09T21:00:00.000Z', 'Otomatik Kesinti: Kredi kartı Komisyonu (%10)', NULL, NULL, 'Bağlı Sipariş: ORD-088787-12', '2026-02-10T19:18:27.178Z', '2026-02-10T19:18:27.178Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('8d8279c2-c3c6-45ce-b23f-37b00100a3b1', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'df7cb357-7f74-4e01-b25c-f093f06a0f7f', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'expense', '18000.00', 'TRY', '2026-02-09T21:00:00.000Z', '', NULL, NULL, NULL, '2026-02-10T19:39:39.038Z', '2026-02-10T19:39:39.038Z', NULL, 'fixed', TRUE, NULL, 'receipt', '0.00', '0.00', NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('0fe7339f-f214-4904-8f2c-4c5e1356fb35', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '1400.00', 'TRY', '2026-02-10T21:00:00.000Z', 'Adisyon: Çikolatalı Pasta x2, Meveli Pasta x2', NULL, NULL, NULL, '2026-02-11T11:39:45.600Z', '2026-02-11T11:39:45.600Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('bebe6d18-2202-4f22-b6f3-59d9cb142e95', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'c94f97c8-228c-4383-a096-5e1479b930f7', '3ce0b5b6-213b-46bb-9d37-feec5c40584c', 'income', '4644.00', 'TRY', '2026-02-10T21:00:00.000Z', 'Adisyon: test x1, testtttttt x1, KuruFasulye x1', NULL, NULL, NULL, '2026-02-11T19:04:33.569Z', '2026-02-11T19:04:33.569Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('cdf8e6c8-04b9-408b-9d0a-cc387051b259', 'be8b8541-f427-4287-a00b-a0e9783e5209', '3b61eb52-4b64-40df-ad80-f2bfee978b3b', '3ce0b5b6-213b-46bb-9d37-feec5c40584c', 'expense', '232.20', 'TRY', '2026-02-10T21:00:00.000Z', 'Otomatik Kesinti: Hizmet Komisyonu (%5)', NULL, NULL, 'Bağlı İşlem ID: bebe6d18-2202-4f22-b6f3-59d9cb142e95', '2026-02-11T19:04:33.569Z', '2026-02-11T19:04:33.569Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('3e361da9-4fc2-4928-bbcd-92c6c56b986a', 'be8b8541-f427-4287-a00b-a0e9783e5209', '3b61eb52-4b64-40df-ad80-f2bfee978b3b', '3ce0b5b6-213b-46bb-9d37-feec5c40584c', 'expense', '232.20', 'TRY', '2026-02-10T21:00:00.000Z', 'Otomatik Kesinti: Kurye Hizmeti (%5)', NULL, NULL, 'Bağlı İşlem ID: bebe6d18-2202-4f22-b6f3-59d9cb142e95', '2026-02-11T19:04:33.569Z', '2026-02-11T19:04:33.569Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('b48214a6-0664-4c67-9288-d3a688b5fb95', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ec3d3430-4ff3-43b8-9267-77db9b2c03d9', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '1783.66', 'TRY', '2026-02-11T21:00:00.000Z', 'C', NULL, NULL, '[{"name":".202615:06","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"Unknown Product","total_price":206.04,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":206.04,"vat_amount":0},{"name":"3ad X","total_price":46,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":46,"vat_amount":0},{"name":"*","total_price":138,"vat_rate":13,"confidence":0.9,"quantity":1,"unit_price":138,"vat_amount":17.94},{"name":"Unknown Product","total_price":11.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":11.5,"vat_amount":0},{"name":"%20","total_price":49,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":49,"vat_amount":9.8},{"name":"Unknown Product","total_price":120,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":120,"vat_amount":0},{"name":"2adx","total_price":1,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":1,"vat_amount":0},{"name":"Unknown Product","total_price":556.54,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":556.54,"vat_amount":0},{"name":".202615:07","total_price":9.02,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":9.02,"vat_amount":0},{"name":"DV DAHIL","total_price":4.71,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":4.71,"vat_amount":0},{"name":"%1","total_price":470.83,"vat_rate":1,"confidence":0.9,"quantity":1,"unit_price":470.83,"vat_amount":4.7083},{"name":"475.54","total_price":13.5,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":13.5,"vat_amount":0},{"name":"%20","total_price":67.5,"vat_rate":20,"confidence":0.9,"quantity":1,"unit_price":67.5,"vat_amount":13.5},{"name":"Unknown Product","total_price":81,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":81,"vat_amount":0}]', '2026-02-12T19:38:52.731Z', '2026-02-12T19:38:52.731Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('c9645723-1c69-4b81-9028-f22748ed801f', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ec3d3430-4ff3-43b8-9267-77db9b2c03d9', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '974.80', 'TRY', '2026-02-11T21:00:00.000Z', 'KiRECBURNU FIRIN GIDA', NULL, NULL, '[{"name":"YEMEK %10*2.","total_price":974.8,"vat_rate":10,"confidence":0.9,"quantity":1,"unit_price":974.8,"vat_amount":97.48},{"name":"KREDI *2.","total_price":974.8,"vat_rate":2,"confidence":0.9,"quantity":1,"unit_price":974.8,"vat_amount":19.496},{"name":"BU ISLEN TEHASSIZ BIR KART ILE 2.TL","total_price":974.8,"vat_rate":null,"confidence":0.9,"quantity":1,"unit_price":974.8,"vat_amount":0}]', '2026-02-12T19:41:20.750Z', '2026-02-12T19:41:20.750Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('68e9d520-4d16-4ffb-82d4-4b90caec5479', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '1200.00', 'TRY', '2026-02-11T21:00:00.000Z', 'Sipariş #ORD-375993-38 (Masa yok)', NULL, NULL, 'Items: [{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":2},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1}]', '2026-02-12T20:33:09.104Z', '2026-02-12T20:33:09.104Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('b976dcd7-841d-43a8-8d77-d6bc919052b9', 'be8b8541-f427-4287-a00b-a0e9783e5209', '74ebce92-7e81-43ba-8c11-406b76c345a5', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '120.00', 'TRY', '2026-02-11T21:00:00.000Z', 'Otomatik Kesinti: Kredi kartı Komisyonu (%10)', NULL, NULL, 'Bağlı Sipariş: ORD-375993-38', '2026-02-12T20:33:09.104Z', '2026-02-12T20:33:09.104Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('94d68f55-0e89-4cd4-825a-f4091d5250c3', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '1700.00', 'TRY', '2026-02-12T21:00:00.000Z', 'Adisyon: Lüfer x3, KuruFasulye x1', NULL, NULL, NULL, '2026-02-12T21:19:32.994Z', '2026-02-12T21:19:32.994Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('9fddff9c-24a8-470b-803e-df0ee95fa173', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '400.00', 'TRY', '2026-02-12T21:00:00.000Z', 'Adisyon: KuruFasulye x2', NULL, NULL, NULL, '2026-02-12T21:23:18.435Z', '2026-02-12T21:23:18.435Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('c22191bd-7fc8-4e22-9362-ff27649131dd', 'be8b8541-f427-4287-a00b-a0e9783e5209', '74ebce92-7e81-43ba-8c11-406b76c345a5', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '40.00', 'TRY', '2026-02-12T21:00:00.000Z', 'Otomatik Kesinti: Kredi kartı Komisyonu (%10)', NULL, NULL, 'Bağlı İşlem ID: 9fddff9c-24a8-470b-803e-df0ee95fa173', '2026-02-12T21:23:18.435Z', '2026-02-12T21:23:18.435Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('c0994b4c-a344-4012-8601-f75c7df7aec3', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '870.00', 'TRY', '2026-02-12T21:00:00.000Z', 'Adisyon: Lüfer x1, KuruFasulye x1, Pilav x1, Kola x1', NULL, NULL, NULL, '2026-02-12T21:24:48.355Z', '2026-02-12T21:24:48.355Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('f9b2ec88-3768-4ce3-86c8-24434e93f0d9', 'be8b8541-f427-4287-a00b-a0e9783e5209', '74ebce92-7e81-43ba-8c11-406b76c345a5', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '87.00', 'TRY', '2026-02-12T21:00:00.000Z', 'Otomatik Kesinti: Kredi kartı Komisyonu (%10)', NULL, NULL, 'Bağlı İşlem ID: c0994b4c-a344-4012-8601-f75c7df7aec3', '2026-02-12T21:24:48.355Z', '2026-02-12T21:24:48.355Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('0746f32c-f78b-44fe-9b1a-cfc81e3d2859', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '870.00', 'TRY', '2026-02-12T21:00:00.000Z', 'Adisyon: Lüfer x1, KuruFasulye x1, Pilav x1, Kola x1', NULL, NULL, NULL, '2026-02-12T21:25:48.174Z', '2026-02-12T21:25:48.174Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('192defb8-da1e-45ee-b096-ed0561147328', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '1000.00', 'TRY', '2026-02-12T21:00:00.000Z', 'Adisyon: Lüfer x2', NULL, NULL, NULL, '2026-02-12T21:32:20.668Z', '2026-02-12T21:32:20.668Z', '2026-02-12T21:39:49.991Z', 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('e05db54d-ddc2-40e9-8973-c9ca320e29a2', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '370.00', 'TRY', '2026-02-12T21:00:00.000Z', 'Adisyon: KuruFasulye x1, Pilav x1, Kola x1', NULL, NULL, NULL, '2026-02-12T21:40:45.083Z', '2026-02-12T21:40:45.083Z', '2026-02-12T21:40:52.201Z', 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('ee7205cd-c458-46f6-acb2-a94e35c11a62', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '100.00', 'TRY', '2026-02-12T21:00:00.000Z', 'Adisyon: KuruFasulye x1, Pilav x1, Kola x1', NULL, NULL, NULL, '2026-02-12T21:43:53.304Z', '2026-02-12T21:43:53.304Z', '2026-02-12T21:50:55.427Z', 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('820aedd2-e385-49ae-8144-f2fc453cf27f', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '620.00', 'TRY', '2026-02-12T21:50:47.240Z', 'Adisyon: Islak Kek x1, Browni x1', NULL, NULL, NULL, '2026-02-12T21:50:47.306Z', '2026-02-12T21:50:47.306Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('b3080428-58b2-43cd-b2c7-fca9f980f2d8', 'be8b8541-f427-4287-a00b-a0e9783e5209', '74ebce92-7e81-43ba-8c11-406b76c345a5', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '62.00', 'TRY', '2026-02-12T21:50:47.240Z', 'Otomatik Kesinti: Kredi kartı Komisyonu (%10)', NULL, NULL, 'Bağlı İşlem ID: 820aedd2-e385-49ae-8144-f2fc453cf27f', '2026-02-12T21:50:47.306Z', '2026-02-12T21:50:47.306Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('7478b44a-f70d-4314-8232-1b59b617f59c', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '440.00', 'TRY', '2026-02-12T21:00:00.000Z', 'Sipariş #ORD-498099-75 (Masa yok)', NULL, NULL, 'Items: [{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":2}]', '2026-02-12T22:15:37.155Z', '2026-02-12T22:15:37.155Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('2b47f23a-278e-47ab-a637-6978e9a79f8c', 'be8b8541-f427-4287-a00b-a0e9783e5209', '74ebce92-7e81-43ba-8c11-406b76c345a5', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '44.00', 'TRY', '2026-02-12T22:15:37.164Z', 'Otomatik Kesinti: Kredi kartı Komisyonu (%10)', NULL, NULL, 'Bağlı Sipariş: ORD-498099-75', '2026-02-12T22:15:37.155Z', '2026-02-12T22:15:37.155Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('9baa30a1-0ff3-4af6-8966-f34c8c0fec7a', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '220.00', 'TRY', '2026-02-12T22:43:43.849Z', 'Kampanya: test', NULL, NULL, NULL, '2026-02-12T22:43:43.915Z', '2026-02-12T22:43:43.915Z', '2026-02-12T22:43:48.777Z', 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('bed72fa7-2f6e-4487-9457-d25cd9949fc6', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '198.00', 'TRY', '2026-02-12T22:48:30.865Z', 'Kampanya: test', NULL, NULL, NULL, '2026-02-12T22:48:30.881Z', '2026-02-12T22:48:30.881Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('a08cf9e5-f632-4781-acac-529c1873c2e6', 'be8b8541-f427-4287-a00b-a0e9783e5209', '74ebce92-7e81-43ba-8c11-406b76c345a5', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '19.80', 'TRY', '2026-02-12T22:48:30.865Z', 'Otomatik Kesinti: Kredi kartı Komisyonu (%10)', NULL, NULL, 'Bağlı İşlem ID: bed72fa7-2f6e-4487-9457-d25cd9949fc6', '2026-02-12T22:48:30.881Z', '2026-02-12T22:48:30.881Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('cb613b58-009d-43bf-bd2a-6e8d77b53937', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '320.00', 'TRY', '2026-02-12T21:00:00.000Z', 'Sipariş #ORD-676696-96 (Masa yok)', NULL, NULL, 'Items: [{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1}]', '2026-02-12T23:08:14.304Z', '2026-02-12T23:08:14.304Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('55fe0080-5c90-44e0-853d-082adef01340', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '100.00', 'TRY', '2026-02-12T23:09:45.261Z', 'Adisyon: KuruFasulye x1, Pilav x1, Kola x1', NULL, NULL, NULL, '2026-02-12T23:09:45.324Z', '2026-02-12T23:09:45.324Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('77b3baeb-48af-4ddc-bc08-b335cf5f13e2', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '370.00', 'TRY', '2026-02-13T11:10:32.838Z', 'Adisyon: KuruFasulye x1, Pilav x1, Kola x1', NULL, NULL, NULL, '2026-02-13T11:10:33.128Z', '2026-02-13T11:10:33.128Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '370.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('fc6af787-f8a9-4163-9fb3-155be1c61598', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '320.00', 'TRY', '2026-02-13T11:14:22.421Z', 'Adisyon: KuruFasulye x1, Pilav x1, Kola x1', NULL, NULL, NULL, '2026-02-13T11:14:22.479Z', '2026-02-13T11:14:22.479Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '370.00', '50.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('15ab4f26-db64-4c2e-a08d-8c19e8c4518c', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '320.00', 'TRY', '2026-02-12T21:00:00.000Z', 'Sipariş #ORD-401830-48 (Masa yok)', NULL, NULL, 'Items: [{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1}]', '2026-02-13T11:23:06.811Z', '2026-02-13T11:23:06.811Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, '320.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('c5784e34-980d-4703-befd-ff156b91b760', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '320.00', 'TRY', '2026-02-12T21:00:00.000Z', 'Sipariş #ORD-774321-11 (Masa yok)', NULL, NULL, 'Items: [{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1,"discount_percent":0},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1,"discount_percent":0}]', '2026-02-13T11:31:37.659Z', '2026-02-13T11:31:37.659Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, '320.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('e5f394eb-3627-4af7-86be-7007bba6eb4c', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3e3ece09-dc67-4b66-ab6d-2bd4c4cdfaa4', 'income', '258.00', 'TRY', '2026-02-12T21:00:00.000Z', 'Sipariş #ORD-305829-33 (Masa yok)', NULL, NULL, 'Items: [{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1,"discount_percent":25},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1,"discount_percent":10}]', '2026-02-13T11:33:41.413Z', '2026-02-13T11:33:41.413Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, '320.00', '62.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('64157832-1fec-4281-b9b5-d1bf12582d42', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '758.00', 'TRY', '2026-02-12T21:00:00.000Z', 'Sipariş #ORD-577226-94 (Masa yok)', NULL, NULL, 'Items: [{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1,"discount_percent":25},{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":1,"discount_percent":0},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1,"discount_percent":10}]', '2026-02-13T11:36:36.404Z', '2026-02-13T11:36:36.404Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, '820.00', '62.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('50507f92-0f12-44c8-b678-f551860c5aa2', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '700.00', 'TRY', '2026-02-13T11:38:39.585Z', 'Adisyon: Lüfer x1, test x1, Paçanga x1', NULL, NULL, NULL, '2026-02-13T11:38:39.642Z', '2026-02-13T11:38:39.642Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '701.00', '1.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('ccba96d7-fe9f-403d-9aef-1795024caa01', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3e3ece09-dc67-4b66-ab6d-2bd4c4cdfaa4', 'income', '258.00', 'TRY', '2026-02-12T21:00:00.000Z', 'Sipariş #ORD-830617-32 (Masa yok)', NULL, NULL, 'Items: [{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1,"discount_percent":25},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1,"discount_percent":10}]', '2026-02-13T11:40:46.350Z', '2026-02-13T11:40:46.350Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, '320.00', '62.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('10450d15-90ea-44e4-9357-341b482e6d5c', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '820.00', 'TRY', '2026-02-13T11:41:01.283Z', 'Adisyon: Lüfer x1, KuruFasulye x1, Pilav x1', NULL, NULL, NULL, '2026-02-13T11:41:01.296Z', '2026-02-13T11:41:01.296Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '820.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('cad049cc-cb92-4c60-aa09-ea59be06819a', 'be8b8541-f427-4287-a00b-a0e9783e5209', '74ebce92-7e81-43ba-8c11-406b76c345a5', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '82.00', 'TRY', '2026-02-13T11:41:01.283Z', 'Otomatik Kesinti: Kredi kartı Komisyonu (%10)', NULL, NULL, 'Bağlı İşlem ID: 10450d15-90ea-44e4-9357-341b482e6d5c', '2026-02-13T11:41:01.296Z', '2026-02-13T11:41:01.296Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('07297923-5a22-4509-aca1-bbd104c866b4', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '300.00', 'TRY', '2026-02-13T11:41:11.916Z', 'Adisyon: Pilav x1, Kola x1, KuruFasulye x1', NULL, NULL, NULL, '2026-02-13T11:41:12.066Z', '2026-02-13T11:41:12.066Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '370.00', '70.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('b8dfd1bb-7127-4108-9fb9-d50e090ec653', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3e3ece09-dc67-4b66-ab6d-2bd4c4cdfaa4', 'income', '258.00', 'TRY', '2026-02-12T21:00:00.000Z', 'Sipariş #ORD-903378-14 (Masa yok)', NULL, NULL, 'Items: [{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1,"discount_percent":25},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1,"discount_percent":10}]', '2026-02-13T11:41:52.363Z', '2026-02-13T11:41:52.363Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, '320.00', '62.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('947ce62b-1b72-4afa-a082-9468776f28f1', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '198.00', 'TRY', '2026-02-12T21:00:00.000Z', 'Sipariş #ORD-944693-33 (Masa yok)', NULL, NULL, 'Items: [{"id":"b8a18152-d22b-4c36-b62b-0a3b6e1cff87","name":"test","type":"campaign","price":220,"quantity":1,"campaign_price":198}]', '2026-02-13T11:59:28.486Z', '2026-02-13T11:59:28.486Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, '220.00', '22.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('9f822867-ef7b-40ac-9bae-d3029a8ba854', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3e3ece09-dc67-4b66-ab6d-2bd4c4cdfaa4', 'income', '500.00', 'TRY', '2026-02-13T12:01:20.618Z', 'Adisyon: Lüfer x1', NULL, NULL, NULL, '2026-02-13T12:01:20.786Z', '2026-02-13T12:01:20.786Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '500.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('ab6f6cf5-8fb9-4b78-b3cf-9b7f0798f2d7', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'c76d16ac-a3b5-4742-8961-16648dc37180', '3e3ece09-dc67-4b66-ab6d-2bd4c4cdfaa4', 'expense', '15.00', 'TRY', '2026-02-13T12:01:20.618Z', 'Otomatik Kesinti: Sodexo Komisyonu (%3)', NULL, NULL, 'Bağlı İşlem ID: 9f822867-ef7b-40ac-9bae-d3029a8ba854', '2026-02-13T12:01:20.786Z', '2026-02-13T12:01:20.786Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('0ee8172f-6d97-4d48-bcb3-a77c18d74e26', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '370.00', 'TRY', '2026-02-13T20:28:10.459Z', 'Adisyon: KuruFasulye x1, Pilav x1, Kola x1', NULL, NULL, NULL, '2026-02-13T20:28:10.513Z', '2026-02-13T20:28:10.513Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '370.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('ebd9d417-a965-4ea6-998e-d7328e9f6bd5', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '169.60', 'TRY', '2026-02-12T21:00:00.000Z', 'Sipariş #ORD-139292-94 (Masa yok)', NULL, NULL, 'Items: [{"id":"80979d45-4fb5-4a0c-9bd2-4b4cbd4ff513","name":"Öğle Menusu","type":"campaign","price":212,"quantity":1,"campaign_price":169.60000000000002}]', '2026-02-13T20:55:54.126Z', '2026-02-13T20:55:54.126Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, '212.00', '42.40', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('887c80f9-202f-4197-a7c1-860a4abcb9db', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '300.00', 'TRY', '2026-02-14T14:06:59.421Z', 'Adisyon: Bob Public Product x2, Alice Secret Product x1', NULL, NULL, NULL, '2026-02-14T14:06:59.450Z', '2026-02-14T14:06:59.450Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '300.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('57a003ed-eeac-4dd9-a492-ca7c9d6813d3', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '2220.00', 'TRY', '2026-02-14T20:02:53.534Z', 'Adisyon: Pilav x1, Kola x2, Lüfer x4', NULL, NULL, NULL, '2026-02-14T20:02:53.596Z', '2026-02-14T20:02:53.596Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '2220.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('9fa8783e-13fd-4b3a-9b7d-311db9b1f163', 'be8b8541-f427-4287-a00b-a0e9783e5209', '74ebce92-7e81-43ba-8c11-406b76c345a5', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '222.00', 'TRY', '2026-02-14T20:02:53.534Z', 'Otomatik Kesinti: Kredi kartı Komisyonu (%10)', NULL, NULL, 'Bağlı İşlem ID: 57a003ed-eeac-4dd9-a492-ca7c9d6813d3', '2026-02-14T20:02:53.596Z', '2026-02-14T20:02:53.596Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('7878ee04-8248-4acc-b46c-f549a4371bf1', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '1240.00', 'TRY', '2026-02-14T20:04:45.409Z', 'Adisyon: KuruFasulye x2, Pilav x2, Kola x2, Lüfer x1', NULL, NULL, NULL, '2026-02-14T20:04:45.423Z', '2026-02-14T20:04:45.423Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '1240.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('d62bfa01-48f3-443b-9279-58e56ba21cdf', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '198.00', 'TRY', '2026-02-14T20:46:23.993Z', 'Kampanya: test', NULL, NULL, NULL, '2026-02-14T20:46:24.113Z', '2026-02-14T20:46:24.113Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '220.00', '22.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('a0914698-dfc1-4dbb-9670-b74519b2fd23', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '1240.00', 'TRY', '2026-02-13T21:00:00.000Z', 'Sipariş #ORD-245083 (Masa 2)', NULL, NULL, 'Items: [{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":2},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":2},{"id":"d21a8c5b-659a-454e-8b39-f2d42566fe42","name":"Kola","price":50,"quantity":2},{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":1}]', '2026-02-14T20:46:39.052Z', '2026-02-14T20:46:39.052Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, '0.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('6e1eb2a8-24d4-4a34-ba6f-c752dacfefb0', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '4660.00', 'TRY', '2026-02-13T21:00:00.000Z', 'Sipariş #ORD-374862 (Masa 1)', NULL, NULL, 'Items: [{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":3},{"id":"d21a8c5b-659a-454e-8b39-f2d42566fe42","name":"Kola","price":50,"quantity":4},{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":7},{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":3}]', '2026-02-14T20:46:44.657Z', '2026-02-14T20:46:44.657Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, '0.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('ad5d7ded-a92a-45a7-8094-b7e957b60fff', 'be8b8541-f427-4287-a00b-a0e9783e5209', '74ebce92-7e81-43ba-8c11-406b76c345a5', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '466.00', 'TRY', '2026-02-14T20:46:44.660Z', 'Otomatik Kesinti: Kredi kartı Komisyonu (%10)', NULL, NULL, 'Bağlı Sipariş: ORD-374862', '2026-02-14T20:46:44.657Z', '2026-02-14T20:46:44.657Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('3db2172c-5c17-4c1c-bdbe-e52775628ba9', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '198.00', 'TRY', '2026-02-14T20:47:44.484Z', 'Kampanya: test', NULL, NULL, NULL, '2026-02-14T20:47:44.544Z', '2026-02-14T20:47:44.544Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '220.00', '22.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('20dfb1df-4757-4d7b-969a-673a4b1b8e3d', 'be8b8541-f427-4287-a00b-a0e9783e5209', '74ebce92-7e81-43ba-8c11-406b76c345a5', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '19.80', 'TRY', '2026-02-14T20:47:44.484Z', 'Otomatik Kesinti: Kredi kartı Komisyonu (%10)', NULL, NULL, 'Bağlı İşlem ID: 3db2172c-5c17-4c1c-bdbe-e52775628ba9', '2026-02-14T20:47:44.544Z', '2026-02-14T20:47:44.544Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('ee2b078d-c53b-482c-bf30-481e8d6e6b62', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'ec3d3430-4ff3-43b8-9267-77db9b2c03d9', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '500.00', 'TRY', '2026-02-15T14:26:00.000Z', '', NULL, NULL, NULL, '2026-02-15T14:27:27.095Z', '2026-02-15T14:27:27.095Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, '45.45', '500.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('89120436-d2ab-4824-b1e3-86b0809a2c9c', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'df7cb357-7f74-4e01-b25c-f093f06a0f7f', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'expense', '18000.00', 'TRY', '2026-02-15T14:34:00.000Z', '', NULL, NULL, NULL, '2026-02-15T14:35:17.606Z', '2026-02-15T14:35:17.606Z', '2026-02-15T20:30:26.433Z', 'fixed', FALSE, NULL, 'receipt', NULL, '0.00', '18000.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('95c1714b-0b6b-4fe2-9ea6-a2f88115552a', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'df7cb357-7f74-4e01-b25c-f093f06a0f7f', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'expense', '18000.00', 'TRY', '2026-02-15T20:49:00.000Z', 'ocak', NULL, NULL, NULL, '2026-02-15T20:51:11.112Z', '2026-02-15T20:51:11.112Z', NULL, 'fixed', TRUE, NULL, 'receipt', NULL, NULL, '18000.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('3aa6085e-c34b-4be1-883c-7a2fe9d6c76b', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'df7cb357-7f74-4e01-b25c-f093f06a0f7f', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'expense', '18000.00', 'TRY', '2026-02-15T14:26:00.000Z', '', NULL, NULL, NULL, '2026-02-15T14:28:03.510Z', '2026-02-15T14:28:03.510Z', '2026-02-15T20:51:31.737Z', 'fixed', FALSE, NULL, 'receipt', NULL, '0.00', '18000.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('5f57d8cf-a0d7-4475-af0e-a60216ca7086', 'be8b8541-f427-4287-a00b-a0e9783e5209', '872ad2d1-c781-4872-8b19-13a4e5673867', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'expense', '1000.00', 'TRY', '2026-02-15T20:49:00.000Z', 'araç kiralama', NULL, NULL, NULL, '2026-02-15T20:52:01.211Z', '2026-02-15T20:52:01.211Z', NULL, 'personal', TRUE, NULL, 'receipt', NULL, NULL, '1000.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('9d47daf4-772c-4df0-a368-c502f856738a', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '370.00', 'TRY', '2026-02-14T21:00:00.000Z', 'Sipariş #ORD-645896 (Masa 1)', NULL, NULL, 'Items: [{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1},{"id":"d21a8c5b-659a-454e-8b39-f2d42566fe42","name":"Kola","price":50,"quantity":1}]', '2026-02-15T20:54:15.816Z', '2026-02-15T20:54:15.816Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, '0.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('aacfe3c5-d520-4656-8846-92685214528b', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '550.00', 'TRY', '2026-02-14T21:00:00.000Z', 'Sipariş #ORD-332337 (Masa 2)', NULL, NULL, 'Items: [{"id":"e34e35a8-7e77-4e92-a90e-98c37058324c","name":"Lüfer","price":500,"quantity":1},{"id":"d21a8c5b-659a-454e-8b39-f2d42566fe42","name":"Kola","price":50,"quantity":1}]', '2026-02-15T20:54:22.553Z', '2026-02-15T20:54:22.553Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, '0.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('d0d7f1ee-8fc1-4fec-b045-86e1d60326f7', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '198.00', 'TRY', '2026-02-14T21:00:00.000Z', 'Sipariş #ORD-842580-27 (Masa yok)', NULL, NULL, 'Items: [{"id":"b8a18152-d22b-4c36-b62b-0a3b6e1cff87","name":"test","type":"campaign","price":220,"quantity":1,"campaign_price":198}]', '2026-02-15T20:54:24.892Z', '2026-02-15T20:54:24.892Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, '220.00', '22.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('3472dfb9-d715-4d44-8656-702e90938259', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '0ed57563-9b15-4216-af6d-43070cd95b5e', '7f725b8e-2377-4d8f-be48-78eb232948d6', 'income', '995.00', 'TRY', '2026-01-27T21:00:00.000Z', 'Adisyon: Nevra x2, Begonya x1', NULL, NULL, NULL, '2026-01-28T18:46:54.483Z', '2026-01-28T18:46:54.483Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('260d1d0a-0715-4be2-ba87-9489df151d53', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'f5f96f5f-b39d-4e1a-a51f-ef6a4d400fb4', '7f725b8e-2377-4d8f-be48-78eb232948d6', 'expense', '18000.00', 'TRY', '2026-01-27T21:00:00.000Z', '', NULL, NULL, NULL, '2026-01-28T18:47:56.404Z', '2026-01-28T18:47:56.404Z', NULL, 'fixed', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('0ab8b6f1-0de1-40df-90cd-e16e25a39857', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'f5f96f5f-b39d-4e1a-a51f-ef6a4d400fb4', '7f725b8e-2377-4d8f-be48-78eb232948d6', 'expense', '18000.00', 'TRY', '2026-01-27T21:00:00.000Z', '', NULL, NULL, NULL, '2026-01-28T18:48:07.213Z', '2026-01-28T18:48:07.213Z', NULL, 'fixed', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('620bcbaf-6e36-4496-994c-5c2a6c3d4fac', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '040e84b9-af5d-4493-a32d-7159504c729d', '7f725b8e-2377-4d8f-be48-78eb232948d6', 'expense', '467.00', 'TRY', '2026-02-10T21:00:00.000Z', 'Fiş: ll Arsiv Fatura', NULL, NULL, '--- FİŞ / FATURA DETAYI ---

ll Arsiv Fatura

TARİH: ---   SAAT: 14:32
-------------------------------------------
4           NE a Kr TT FE         12.00
4    SEEESİ ELE                   59.50
-------------------------------------------
TOPLAM:                         467.00 TL

ÖDEME: Kredi Kartı
', '2026-02-11T15:33:32.106Z', '2026-02-11T15:33:32.106Z', NULL, 'operational', TRUE, NULL, 'receipt', '0.00', '0.00', NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('ce28db5e-e4c1-4550-8c9a-914052a31e4d', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'd93fb8c6-7823-4078-8fba-d4cd2ae94292', '0cf763c5-9bd7-42a7-abb2-e91e64320665', 'income', '335.00', 'TRY', '2026-02-10T21:00:00.000Z', 'Adisyon: Nevra x1', NULL, NULL, NULL, '2026-02-11T19:04:04.015Z', '2026-02-11T19:04:04.015Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('b70040c7-4afb-4bd7-a4e5-514f42d36c0d', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '150dea11-d552-48c4-bc25-41ca640e11ae', '0cf763c5-9bd7-42a7-abb2-e91e64320665', 'expense', '129.65', 'TRY', '2026-02-10T21:00:00.000Z', 'Otomatik Kesinti: Hizmet Komisyonu (%38.7)', NULL, NULL, 'Bağlı İşlem ID: ce28db5e-e4c1-4550-8c9a-914052a31e4d', '2026-02-11T19:04:04.015Z', '2026-02-11T19:04:04.015Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('ee91e737-1ac6-405f-8262-4c586446e390', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '79c62556-4555-483b-97fe-96eb4129f531', 'c3c610ce-5905-4252-bb77-6279a6abc50b', 'income', '970.00', 'TRY', '2026-02-11T21:00:00.000Z', 'Sipariş #ORD-288081-53 (Masa yok)', NULL, NULL, 'Items: [{"id":"0a55c683-512e-44a8-a60d-cfb3b68b0607","name":"Kamelya","price":300,"quantity":1},{"id":"044bf12a-bf84-49d0-b166-f60791cc3e71","name":"Nevra","price":335,"quantity":2}]', '2026-02-12T19:08:41.584Z', '2026-02-12T19:08:41.584Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('b1b84eab-1787-4da8-9088-ce8f7bd80428', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '0ed57563-9b15-4216-af6d-43070cd95b5e', '0cf763c5-9bd7-42a7-abb2-e91e64320665', 'income', '1170.00', 'TRY', '2026-02-13T18:12:34.234Z', 'Adisyon: Çilek & Muz Kruvasan x1, Muz Kruvasan x1, Çilek Kruvasan x1, MOCHA x1, DOUBLE TÜRK KAHESİ x1', NULL, NULL, NULL, '2026-02-13T18:12:34.634Z', '2026-02-13T18:12:34.634Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '1170.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('f348d6cb-e498-4b1d-8526-41f474275cb6', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '37975206-a3b8-4879-b3dd-9ecca653fa49', '0cf763c5-9bd7-42a7-abb2-e91e64320665', 'expense', '452.79', 'TRY', '2026-02-13T18:12:34.234Z', 'Otomatik Kesinti: Hizmet Komisyonu (%38.7)', NULL, NULL, 'Bağlı İşlem ID: b1b84eab-1787-4da8-9088-ce8f7bd80428', '2026-02-13T18:12:34.634Z', '2026-02-13T18:12:34.634Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('70ea6750-dd73-4eff-b0cf-ca9313a1d18c', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'd93fb8c6-7823-4078-8fba-d4cd2ae94292', '0cf763c5-9bd7-42a7-abb2-e91e64320665', 'income', '555.00', 'TRY', '2026-02-14T15:52:46.110Z', 'Adisyon: ICE CHOCOLATE x1, DOUBLE TÜRK KAHESİ x4', NULL, NULL, NULL, '2026-02-14T15:52:46.391Z', '2026-02-14T15:52:46.391Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '555.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('5f708f05-c258-48a6-adaf-8c7bf30238ed', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '150dea11-d552-48c4-bc25-41ca640e11ae', '0cf763c5-9bd7-42a7-abb2-e91e64320665', 'expense', '214.79', 'TRY', '2026-02-14T15:52:46.110Z', 'Otomatik Kesinti: Hizmet Komisyonu (%38.7)', NULL, NULL, 'Bağlı İşlem ID: 70ea6750-dd73-4eff-b0cf-ca9313a1d18c', '2026-02-14T15:52:46.391Z', '2026-02-14T15:52:46.391Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('0ff6a0a0-89ba-4215-a27f-c2260814f0c4', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'd93fb8c6-7823-4078-8fba-d4cd2ae94292', '0cf763c5-9bd7-42a7-abb2-e91e64320665', 'income', '280.00', 'TRY', '2026-02-14T17:13:02.810Z', 'Adisyon: NUT LATTE x2', NULL, NULL, NULL, '2026-02-14T17:13:03.207Z', '2026-02-14T17:13:03.207Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '280.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('8fad9d7f-75f2-40a1-9e73-a793af58624d', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '150dea11-d552-48c4-bc25-41ca640e11ae', '0cf763c5-9bd7-42a7-abb2-e91e64320665', 'expense', '108.36', 'TRY', '2026-02-14T17:13:02.810Z', 'Otomatik Kesinti: Hizmet Komisyonu (%38.7)', NULL, NULL, 'Bağlı İşlem ID: 0ff6a0a0-89ba-4215-a27f-c2260814f0c4', '2026-02-14T17:13:03.207Z', '2026-02-14T17:13:03.207Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('6aee75f9-2da4-455f-98d7-cf96923ca478', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'd93fb8c6-7823-4078-8fba-d4cd2ae94292', 'dd5eb7d8-e0b5-4cfe-bee5-67b7e3c242e0', 'income', '360.00', 'TRY', '2026-02-14T17:53:07.151Z', 'Adisyon: LİMONATA x2, FİNCAN ÇAY x1, ICE ESPRESSO x1', NULL, NULL, NULL, '2026-02-14T17:53:07.346Z', '2026-02-14T17:53:07.346Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '360.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('78f5bc8f-7eb2-494b-bf80-14eb09da6092', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '150dea11-d552-48c4-bc25-41ca640e11ae', 'dd5eb7d8-e0b5-4cfe-bee5-67b7e3c242e0', 'expense', '139.32', 'TRY', '2026-02-14T17:53:07.151Z', 'Otomatik Kesinti: Hizmet Komisyonu (%38.7)', NULL, NULL, 'Bağlı İşlem ID: 6aee75f9-2da4-455f-98d7-cf96923ca478', '2026-02-14T17:53:07.346Z', '2026-02-14T17:53:07.346Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('5ad7d94a-0474-4dd9-9caf-412ff06afbf1', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'd93fb8c6-7823-4078-8fba-d4cd2ae94292', '0cf763c5-9bd7-42a7-abb2-e91e64320665', 'income', '280.00', 'TRY', '2026-02-14T20:03:54.128Z', 'Adisyon: NUT LATTE x2', NULL, NULL, NULL, '2026-02-14T20:03:54.173Z', '2026-02-14T20:03:54.173Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '280.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('69555546-37be-4e1a-8137-f68e7f16926f', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '150dea11-d552-48c4-bc25-41ca640e11ae', '0cf763c5-9bd7-42a7-abb2-e91e64320665', 'expense', '108.36', 'TRY', '2026-02-14T20:03:54.128Z', 'Otomatik Kesinti: Hizmet Komisyonu (%38.7)', NULL, NULL, 'Bağlı İşlem ID: 5ad7d94a-0474-4dd9-9caf-412ff06afbf1', '2026-02-14T20:03:54.173Z', '2026-02-14T20:03:54.173Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('2162328d-58fd-42b1-a8ab-b4c033a2b4b5', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'd93fb8c6-7823-4078-8fba-d4cd2ae94292', '0cf763c5-9bd7-42a7-abb2-e91e64320665', 'income', '1070.00', 'TRY', '2026-02-14T20:04:24.440Z', 'Adisyon: Manolya x3, CARAMEL LATTE x1', NULL, NULL, NULL, '2026-02-14T20:04:24.493Z', '2026-02-14T20:04:24.493Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '1070.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('7011dc49-3c34-4453-81e3-dd132836b054', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '150dea11-d552-48c4-bc25-41ca640e11ae', '0cf763c5-9bd7-42a7-abb2-e91e64320665', 'expense', '414.09', 'TRY', '2026-02-14T20:04:24.440Z', 'Otomatik Kesinti: Hizmet Komisyonu (%38.7)', NULL, NULL, 'Bağlı İşlem ID: 2162328d-58fd-42b1-a8ab-b4c033a2b4b5', '2026-02-14T20:04:24.493Z', '2026-02-14T20:04:24.493Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('27a9d499-b608-4a64-b893-ee880b2e1f9b', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '0cc87ecc-ec35-4a07-b656-57f2a5defec5', '0cf763c5-9bd7-42a7-abb2-e91e64320665', 'income', '375.00', 'TRY', '2026-02-14T20:05:37.712Z', 'Adisyon: SICAK ÇİKOLATA x1, ICE LATTE x1, CHURCHILL x1', NULL, NULL, NULL, '2026-02-14T20:05:37.816Z', '2026-02-14T20:05:37.816Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '375.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('ee04dbbe-a421-4b9d-8370-b465c9e49cfd', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '885903b0-ef68-49dc-b2a8-033dd59eb95b', '0cf763c5-9bd7-42a7-abb2-e91e64320665', 'expense', '144.00', 'TRY', '2026-02-14T20:05:37.712Z', 'Otomatik Kesinti: Hizmet Komisyonu (%38.4)', NULL, NULL, 'Bağlı İşlem ID: 27a9d499-b608-4a64-b893-ee880b2e1f9b', '2026-02-14T20:05:37.816Z', '2026-02-14T20:05:37.816Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('485bcf99-1116-43ed-a347-5a60572daf09', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '0cc87ecc-ec35-4a07-b656-57f2a5defec5', '0cf763c5-9bd7-42a7-abb2-e91e64320665', 'income', '420.00', 'TRY', '2026-02-14T20:27:30.383Z', 'Adisyon: Kamelya x1, FİLTRE KAHVE x1', NULL, NULL, NULL, '2026-02-14T20:27:30.568Z', '2026-02-14T20:27:30.568Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '420.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('679384fe-c7b0-4350-af8d-da4ecf911ead', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '885903b0-ef68-49dc-b2a8-033dd59eb95b', '0cf763c5-9bd7-42a7-abb2-e91e64320665', 'expense', '161.28', 'TRY', '2026-02-14T20:27:30.383Z', 'Otomatik Kesinti: Hizmet Komisyonu (%38.4)', NULL, NULL, 'Bağlı İşlem ID: 485bcf99-1116-43ed-a347-5a60572daf09', '2026-02-14T20:27:30.568Z', '2026-02-14T20:27:30.568Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('bc8b0053-4584-4f90-b039-8967a0551197', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'd93fb8c6-7823-4078-8fba-d4cd2ae94292', '0cf763c5-9bd7-42a7-abb2-e91e64320665', 'income', '730.00', 'TRY', '2026-02-14T20:28:25.759Z', 'Adisyon: Kamelya x1, MEYVELİ SODA x2, DOUBLE TÜRK KAHESİ x2, ÇİLEKLİ LİMONATA x1', NULL, NULL, NULL, '2026-02-14T20:28:25.826Z', '2026-02-14T20:28:25.826Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '730.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('0c231d23-54be-4582-9490-e363e333024d', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '150dea11-d552-48c4-bc25-41ca640e11ae', '0cf763c5-9bd7-42a7-abb2-e91e64320665', 'expense', '286.89', 'TRY', '2026-02-14T20:28:25.759Z', 'Otomatik Kesinti: Hizmet Komisyonu (%39.3)', NULL, NULL, 'Bağlı İşlem ID: bc8b0053-4584-4f90-b039-8967a0551197', '2026-02-14T20:28:25.826Z', '2026-02-14T20:28:25.826Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('71349072-4435-4485-9849-068dcbe89d94', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '0cc87ecc-ec35-4a07-b656-57f2a5defec5', '0cf763c5-9bd7-42a7-abb2-e91e64320665', 'income', '350.00', 'TRY', '2026-02-14T21:14:25.805Z', 'Adisyon: ICE LATTE x2, ÇAY x2', NULL, NULL, NULL, '2026-02-14T21:14:25.932Z', '2026-02-14T21:14:25.932Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '350.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('c2773871-d5f8-438d-a06e-510a6c705967', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '885903b0-ef68-49dc-b2a8-033dd59eb95b', '0cf763c5-9bd7-42a7-abb2-e91e64320665', 'expense', '134.40', 'TRY', '2026-02-14T21:14:25.805Z', 'Otomatik Kesinti: Hizmet Komisyonu (%38.4)', NULL, NULL, 'Bağlı İşlem ID: 71349072-4435-4485-9849-068dcbe89d94', '2026-02-14T21:14:25.932Z', '2026-02-14T21:14:25.932Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('284be2d6-e557-499f-b717-831bf0a0e4bc', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'd93fb8c6-7823-4078-8fba-d4cd2ae94292', '0cf763c5-9bd7-42a7-abb2-e91e64320665', 'income', '360.00', 'TRY', '2026-02-14T21:26:03.396Z', 'Adisyon: ICE LATTE x2, FİNCAN ÇAY x2', NULL, NULL, NULL, '2026-02-14T21:26:03.416Z', '2026-02-14T21:26:03.416Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '360.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('de214f26-60a3-4e5b-85c9-f306d01f906e', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '150dea11-d552-48c4-bc25-41ca640e11ae', '0cf763c5-9bd7-42a7-abb2-e91e64320665', 'expense', '141.48', 'TRY', '2026-02-14T21:26:03.396Z', 'Otomatik Kesinti: Hizmet Komisyonu (%39.3)', NULL, NULL, 'Bağlı İşlem ID: 284be2d6-e557-499f-b717-831bf0a0e4bc', '2026-02-14T21:26:03.416Z', '2026-02-14T21:26:03.416Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('c220cf11-14a1-4016-9b25-5bbc83f6542c', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '0cc87ecc-ec35-4a07-b656-57f2a5defec5', 'ae26e0ec-6caf-4a38-994d-f1df1611b587', 'income', '400.00', 'TRY', '2026-02-16T12:22:47.594Z', 'Adisyon: CARAMEL LATTE x2, FİNCAN ÇAY x4', NULL, NULL, NULL, '2026-02-16T12:22:47.891Z', '2026-02-16T12:22:47.891Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('8c87e8b1-5c8e-4234-86b5-8b56a3a333fd', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '885903b0-ef68-49dc-b2a8-033dd59eb95b', 'ae26e0ec-6caf-4a38-994d-f1df1611b587', 'expense', '153.60', 'TRY', '2026-02-16T12:22:47.594Z', 'Otomatik Kesinti: Hizmet Komisyonu (%38.4)', NULL, NULL, 'Bağlı İşlem ID: c220cf11-14a1-4016-9b25-5bbc83f6542c', '2026-02-16T12:22:47.891Z', '2026-02-16T12:22:47.891Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('3b4a130e-3637-4930-931f-92bbbb9bf75a', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'f5f96f5f-b39d-4e1a-a51f-ef6a4d400fb4', '7f725b8e-2377-4d8f-be48-78eb232948d6', 'expense', '18000.00', 'TRY', '2026-02-16T13:14:00.000Z', 'kira', NULL, NULL, NULL, '2026-02-16T13:14:26.727Z', '2026-02-16T13:14:26.727Z', NULL, 'fixed', TRUE, NULL, 'receipt', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('4fd5eee3-fd13-4b29-bd6c-125c5dc51a7c', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '0ed57563-9b15-4216-af6d-43070cd95b5e', '0cf763c5-9bd7-42a7-abb2-e91e64320665', 'income', '350.00', 'TRY', '2026-02-16T13:45:04.204Z', 'Adisyon: ICE ESPRESSO x2, ÇİLEKLİ LİMONATA x1', NULL, NULL, NULL, '2026-02-16T13:45:04.487Z', '2026-02-16T13:45:04.487Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('e1e7770b-dafa-4c2f-aec5-cc92263e85bd', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '37975206-a3b8-4879-b3dd-9ecca653fa49', '0cf763c5-9bd7-42a7-abb2-e91e64320665', 'expense', '148.40', 'TRY', '2026-02-16T13:45:04.204Z', 'Otomatik Kesinti: Hizmet Komisyonu (%42.4)', NULL, NULL, 'Bağlı İşlem ID: 4fd5eee3-fd13-4b29-bd6c-125c5dc51a7c', '2026-02-16T13:45:04.487Z', '2026-02-16T13:45:04.487Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('020e98fd-0313-4d1b-aa2d-8dcd57bf4252', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '885903b0-ef68-49dc-b2a8-033dd59eb95b', 'dd5eb7d8-e0b5-4cfe-bee5-67b7e3c242e0', 'expense', '284.16', 'TRY', '2026-02-16T13:45:28.380Z', 'Otomatik Kesinti: Hizmet Komisyonu (%38.4)', NULL, NULL, 'Bağlı İşlem ID: 398ac07f-4f3b-45db-a44b-42d421a7b616', '2026-02-16T13:45:28.628Z', '2026-02-16T13:45:28.628Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('398ac07f-4f3b-45db-a44b-42d421a7b616', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '0cc87ecc-ec35-4a07-b656-57f2a5defec5', 'dd5eb7d8-e0b5-4cfe-bee5-67b7e3c242e0', 'income', '740.00', 'TRY', '2026-02-16T13:45:28.380Z', 'Adisyon: Kamelya x2, ICE AMERICANO x1', NULL, NULL, NULL, '2026-02-16T13:45:28.628Z', '2026-02-16T13:45:28.628Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('c0aa966b-2aa4-45a3-b850-a655e73a3d9e', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '885903b0-ef68-49dc-b2a8-033dd59eb95b', 'ae26e0ec-6caf-4a38-994d-f1df1611b587', 'expense', '268.80', 'TRY', '2026-02-16T15:15:34.134Z', 'Otomatik Kesinti: Hizmet Komisyonu (%38.4)', NULL, NULL, 'Bağlı İşlem ID: c16f5e7e-ba07-42e8-a29c-7cebbbc5e6aa', '2026-02-16T15:15:34.324Z', '2026-02-16T15:15:34.324Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('c16f5e7e-ba07-42e8-a29c-7cebbbc5e6aa', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '0cc87ecc-ec35-4a07-b656-57f2a5defec5', 'ae26e0ec-6caf-4a38-994d-f1df1611b587', 'income', '700.00', 'TRY', '2026-02-16T15:15:34.134Z', 'Adisyon: ICE LATTE x4, ÇAY x4', NULL, NULL, NULL, '2026-02-16T15:15:34.324Z', '2026-02-16T15:15:34.324Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('efccbf43-d32c-48de-948f-b85bb0e5a62a', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '0cc87ecc-ec35-4a07-b656-57f2a5defec5', 'dd5eb7d8-e0b5-4cfe-bee5-67b7e3c242e0', 'income', '370.00', 'TRY', '2026-02-16T16:09:52.610Z', 'Adisyon: LİMONATA x2, MEYVELİ SODA x1, ÇAY x4', NULL, NULL, NULL, '2026-02-16T16:09:52.760Z', '2026-02-16T16:09:52.760Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('c3e5e156-f51f-4887-96b6-adecabe7909b', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '79c62556-4555-483b-97fe-96eb4129f531', 'fb5098e5-6e26-4b7c-8fdd-cc80caa889cf', 'income', '300.00', 'TRY', '2026-02-16T16:27:36.225Z', 'Adisyon: Kamelya x1', NULL, NULL, NULL, '2026-02-16T16:27:36.357Z', '2026-02-16T16:27:36.357Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('2bbdd8c5-940b-40a7-b874-15ffd2ac54eb', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '198.00', 'TRY', '2026-02-16T20:08:21.056Z', 'Kampanya: test', NULL, NULL, NULL, '2026-02-16T20:08:21.126Z', '2026-02-16T20:08:21.126Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '220.00', '22.00', NULL, 'b8a18152-d22b-4c36-b62b-0a3b6e1cff87', '1234');
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('a864da2a-da5e-4e9c-b8ee-2029100c13b2', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'income', '370.00', 'TRY', '2026-02-16T20:08:33.366Z', 'Adisyon: KuruFasulye x1, Kola x1, Pilav x1', NULL, NULL, NULL, '2026-02-16T20:08:33.380Z', '2026-02-16T20:08:33.380Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '370.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('1ae03756-8ed8-4ac3-b4b4-e6f41403ef98', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '670.00', 'TRY', '2026-02-16T20:08:42.919Z', 'Adisyon: Pilav x1, Lüfer x1, Kola x1', NULL, NULL, NULL, '2026-02-16T20:08:42.941Z', '2026-02-16T20:08:42.941Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '670.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('416eaabe-275b-44ed-98c1-cd2a2543109c', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '0cc87ecc-ec35-4a07-b656-57f2a5defec5', 'dd5eb7d8-e0b5-4cfe-bee5-67b7e3c242e0', 'income', '370.00', 'TRY', '2026-02-16T20:14:33.521Z', 'Adisyon: LİMONATA x2, ICE LATTE x1', NULL, NULL, NULL, '2026-02-16T20:14:33.535Z', '2026-02-16T20:14:33.535Z', NULL, 'none', TRUE, NULL, 'receipt', NULL, NULL, '370.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('8ba265b8-ace4-4ec2-82ed-faaeb2ec18d1', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', '885903b0-ef68-49dc-b2a8-033dd59eb95b', 'dd5eb7d8-e0b5-4cfe-bee5-67b7e3c242e0', 'expense', '142.08', 'TRY', '2026-02-16T20:14:33.521Z', 'Otomatik Kesinti: Hizmet Komisyonu (%38.4)', NULL, NULL, 'Bağlı İşlem ID: 416eaabe-275b-44ed-98c1-cd2a2543109c', '2026-02-16T20:14:33.535Z', '2026-02-16T20:14:33.535Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('88dddac5-864d-40f9-9eea-73534aa6f479', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'dc37da5e-02ba-4650-a71c-7fe896541a80', '3cc5d7b9-2790-4ad1-9cd5-36b2a55b3fd2', 'income', '370.00', 'TRY', '2026-02-16T20:16:33.672Z', 'Sipariş #ORD-144278 (Masa 1)', NULL, NULL, 'Items: [{"id":"bbb8ac2e-6f3a-4fb7-b4de-af2130222fbb","name":"KuruFasulye","price":200,"quantity":1},{"id":"5af0b94d-d49c-472d-a068-6640afbbd6f7","name":"Pilav","price":120,"quantity":1},{"id":"d21a8c5b-659a-454e-8b39-f2d42566fe42","name":"Kola","price":50,"quantity":1}]', '2026-02-16T20:16:33.672Z', '2026-02-16T20:16:33.672Z', NULL, 'none', TRUE, NULL, 'order', NULL, NULL, '0.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('0a8fd45f-b6e3-4ffe-a816-63e8ce9e2081', 'be8b8541-f427-4287-a00b-a0e9783e5209', 'df7cb357-7f74-4e01-b25c-f093f06a0f7f', '2f0a49ee-34c1-4407-940c-c6d051b3b8c5', 'expense', '10.00', 'TRY', '2026-02-16T20:29:00.000Z', 'test', NULL, NULL, NULL, '2026-02-16T20:30:13.922Z', '2026-02-16T20:30:13.922Z', NULL, 'fixed', TRUE, NULL, 'receipt', NULL, NULL, '10.00', '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('15bb4b86-6445-4a98-9abf-a6e9f5933eac', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'f5f96f5f-b39d-4e1a-a51f-ef6a4d400fb4', 'ae26e0ec-6caf-4a38-994d-f1df1611b587', 'expense', '66.50', 'TRY', '2026-02-16T15:15:34.134Z', 'Otomatik Kesinti: Ederned Komisyonu (%9.5)', NULL, NULL, 'Bağlı İşlem ID: c16f5e7e-ba07-42e8-a29c-7cebbbc5e6aa', '2026-02-16T15:15:34.324Z', '2026-02-16T15:15:34.324Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);
INSERT INTO transactions (id, user_id, category_id, channel_id, type, amount, currency, transaction_date, description, invoice_number, payment_method, notes, created_at, updated_at, deleted_at, expense_type, is_tax_deductible, deduction_reason, document_type, vat_rate, vat_amount, base_amount, discount_amount, ocr_record_id, campaign_id, campaign_code) VALUES ('7a6990e8-5931-4632-ab76-aefa3b994e4e', 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'f5f96f5f-b39d-4e1a-a51f-ef6a4d400fb4', 'dd5eb7d8-e0b5-4cfe-bee5-67b7e3c242e0', 'expense', '35.15', 'TRY', '2026-02-16T16:09:52.610Z', 'Otomatik Kesinti: pluxee Komisyonu (%9.5)', NULL, NULL, 'Bağlı İşlem ID: efccbf43-d32c-48de-948f-b85bb0e5a62a', '2026-02-16T16:09:52.760Z', '2026-02-16T16:09:52.760Z', NULL, 'operational', TRUE, NULL, 'receipt', NULL, NULL, NULL, '0.00', NULL, NULL, NULL);

-- Table: users (5 rows)
TRUNCATE TABLE users CASCADE;
INSERT INTO users (id, email, password_hash, full_name, business_name, business_type, tax_number, currency, locale, role, created_at, updated_at, deleted_at, business_logo_url, is_active, permissions, business_logo) VALUES ('ec606148-bad2-45ed-8e51-83c2422e8832', 'ahmet@yilmazmarket.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGJad68LJZdL17lhWy', 'Ahmet Yılmaz', 'Yılmaz Market', 'Market', NULL, 'TRY', 'tr-TR', 'OWNER', '2026-02-16T17:31:28.283Z', '2026-02-16T17:31:28.283Z', NULL, NULL, TRUE, NULL, NULL);
INSERT INTO users (id, email, password_hash, full_name, business_name, business_type, tax_number, currency, locale, role, created_at, updated_at, deleted_at, business_logo_url, is_active, permissions, business_logo) VALUES ('11111111-1111-1111-1111-111111111111', 'usera@test.com', 'hash_placeholder', 'User A', 'User A Business', NULL, NULL, 'TRY', 'tr-TR', 'OWNER', '2026-02-16T17:31:28.358Z', '2026-02-16T17:31:28.358Z', NULL, NULL, TRUE, NULL, NULL);
INSERT INTO users (id, email, password_hash, full_name, business_name, business_type, tax_number, currency, locale, role, created_at, updated_at, deleted_at, business_logo_url, is_active, permissions, business_logo) VALUES ('22222222-2222-2222-2222-222222222222', 'userb@test.com', 'hash_placeholder', 'User B', 'User B Business', NULL, NULL, 'TRY', 'tr-TR', 'OWNER', '2026-02-16T17:31:28.358Z', '2026-02-16T17:31:28.358Z', NULL, NULL, TRUE, NULL, NULL);
INSERT INTO users (id, email, password_hash, full_name, business_name, business_type, tax_number, currency, locale, role, created_at, updated_at, deleted_at, business_logo_url, is_active, permissions, business_logo) VALUES ('be8b8541-f427-4287-a00b-a0e9783e5209', 'test3@test.com', '$2b$10$X0cZCg2gACIFFhLuADLoHeHljpsDtG4GW23jW2mopYyvmbmpkOTey', 'cnr2', 'Chocolate Lab', 'Perakende', NULL, 'TRY', 'tr-TR', 'OWNER', '2026-01-23T20:40:47.626Z', '2026-01-23T20:40:47.626Z', NULL, '/uploads/1771272981288-549283504.png', TRUE, NULL, NULL);
INSERT INTO users (id, email, password_hash, full_name, business_name, business_type, tax_number, currency, locale, role, created_at, updated_at, deleted_at, business_logo_url, is_active, permissions, business_logo) VALUES ('e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'ozan.demirci28@gmail.com', '$2b$10$cu7uogue7f026IeKIfNHWe5DZ5jpvbU16gF4oY8EmBCVszc/gvYuW', 'Kullanıcı', 'Chocolate Lab', 'Perakende', NULL, 'TRY', 'tr-TR', 'OWNER', '2026-01-28T18:19:45.349Z', '2026-01-28T18:19:45.349Z', NULL, '', TRUE, '[]', NULL);
