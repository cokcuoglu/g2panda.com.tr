const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function addMissingColumns() {
    try {
        console.log('═══════════════════════════════════════════════════');
        console.log('ADDING MISSING COLUMNS TO TRANSACTIONS TABLE');
        console.log('═══════════════════════════════════════════════════\n');

        // Add campaign_id and campaign_code columns
        console.log('📝 Adding campaign_id column...');
        await pool.query(`
            ALTER TABLE transactions 
            ADD COLUMN IF NOT EXISTS campaign_id UUID REFERENCES campaigns(id)
        `);
        console.log('✅ campaign_id column added');

        console.log('📝 Adding campaign_code column...');
        await pool.query(`
            ALTER TABLE transactions 
            ADD COLUMN IF NOT EXISTS campaign_code VARCHAR(50)
        `);
        console.log('✅ campaign_code column added');

        // Create indexes
        console.log('📝 Creating indexes...');
        await pool.query(`
            CREATE INDEX IF NOT EXISTS transactions_campaign_id_idx ON transactions(campaign_id)
        `);
        console.log('✅ Index created for campaign_id');

        // Verify all expected columns now exist
        console.log('\n📊 Verifying all columns...');
        const schema = await pool.query(`
            SELECT column_name, data_type
            FROM information_schema.columns 
            WHERE table_name = 'transactions' 
            ORDER BY ordinal_position
        `);

        const expectedColumns = [
            'id', 'user_id', 'category_id', 'channel_id', 'type', 'amount',
            'transaction_date', 'description', 'ocr_record_id', 'expense_type',
            'is_tax_deductible', 'deduction_reason', 'document_type', 'notes',
            'vat_rate', 'vat_amount', 'invoice_number', 'base_amount',
            'discount_amount', 'campaign_id', 'campaign_code', 'created_at',
            'updated_at', 'deleted_at'
        ];

        const existingColumns = schema.rows.map(r => r.column_name);
        const stillMissing = expectedColumns.filter(col => !existingColumns.includes(col));

        if (stillMissing.length > 0) {
            console.log('\n⚠️  Still missing columns:');
            console.log(stillMissing.join(', '));
        } else {
            console.log('\n✅ All expected columns are now present!');
        }

        console.log('\n📋 Current schema:');
        console.table(schema.rows);

        console.log('\n═══════════════════════════════════════════════════');
        console.log('COLUMN ADDITION COMPLETE');
        console.log('═══════════════════════════════════════════════════');

    } catch (err) {
        console.error('❌ FAILED:', err.message);
        console.error(err.stack);
    } finally {
        await pool.end();
    }
}

addMissingColumns();
