-- Add address breakdown columns to customers
ALTER TABLE customers 
ADD COLUMN city VARCHAR(50),
ADD COLUMN district VARCHAR(50),
ADD COLUMN neighborhood VARCHAR(100);

-- Add address breakdown snapshot columns to orders
ALTER TABLE orders
ADD COLUMN customer_city VARCHAR(50),
ADD COLUMN customer_district VARCHAR(50),
ADD COLUMN customer_neighborhood VARCHAR(100);
