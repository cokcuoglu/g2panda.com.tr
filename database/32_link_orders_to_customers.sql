-- Link Orders to Customers

ALTER TABLE orders 
ADD COLUMN customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
ADD COLUMN customer_name VARCHAR(255), -- Snapshot of name at time of order
ADD COLUMN customer_phone VARCHAR(50), -- Snapshot of phone
ADD COLUMN customer_address TEXT;      -- Snapshot of address
