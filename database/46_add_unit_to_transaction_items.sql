-- Add unit column to transaction_items for quantity unit (adet, kilo, litre, metre)
ALTER TABLE transaction_items
ADD COLUMN IF NOT EXISTS unit VARCHAR(10) DEFAULT 'adet';
