-- Add commission rate columns to categories table
ALTER TABLE categories
ADD COLUMN service_commission_rate NUMERIC(5,2) DEFAULT 0,
ADD COLUMN courier_service_rate NUMERIC(5,2) DEFAULT 0;
