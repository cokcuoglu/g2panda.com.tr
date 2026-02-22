const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function migrate() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        console.log('Creating transaction_items table...');
        await client.query(`
            CREATE TABLE IF NOT EXISTS transaction_items (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                transaction_id UUID REFERENCES transactions(id) ON DELETE CASCADE,
                ocr_record_id UUID REFERENCES ocr_records(id) ON DELETE CASCADE,
                name TEXT NOT NULL,
                quantity NUMERIC(10,2) DEFAULT 1,
                unit_price NUMERIC(15,2),
                total_price NUMERIC(15,2) NOT NULL,
                vat_rate NUMERIC(5,2),
                vat_amount NUMERIC(15,2),
                confidence FLOAT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
            CREATE INDEX IF NOT EXISTS idx_transaction_items_transaction_id ON transaction_items(transaction_id);
        `);

        console.log('Creating transaction_vat_breakdown table...');
        await client.query(`
            CREATE TABLE IF NOT EXISTS transaction_vat_breakdown (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
                rate NUMERIC(5,2) NOT NULL,
                taxable_amount NUMERIC(15,2) NOT NULL,
                vat_amount NUMERIC(15,2) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
            CREATE INDEX IF NOT EXISTS idx_vat_breakdown_transaction_id ON transaction_vat_breakdown(transaction_id);
        `);

        // Add index to ocr_records and enhance it if needed
        console.log('Enhancing ocr_records table...');
        await client.query(`
            ALTER TABLE ocr_records ADD COLUMN IF NOT EXISTS processed_at TIMESTAMP WITH TIME ZONE;
            ALTER TABLE ocr_records ADD COLUMN IF NOT EXISTS validation_summary JSONB;
        `);

        await client.query('COMMIT');
        console.log('Migration successful!');
    } catch (e) {
        await client.query('ROLLBACK');
        console.error('Migration failed:', e);
    } finally {
        client.release();
        await pool.end();
    }
}

migrate();
