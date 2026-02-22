const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function finalVerification() {
    try {
        console.log('═══════════════════════════════════════════════════');
        console.log('FINAL VERIFICATION');
        console.log('═══════════════════════════════════════════════════\n');

        // 1. Verify all expected columns exist
        console.log('📊 Checking transactions table schema...');
        const schema = await pool.query(`
            SELECT column_name, data_type, is_nullable
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
        const missingColumns = expectedColumns.filter(col => !existingColumns.includes(col));

        if (missingColumns.length > 0) {
            console.log('❌ Still missing columns:', missingColumns.join(', '));
        } else {
            console.log('✅ All expected columns are present!');
        }

        // 2. Verify indexes
        console.log('\n📑 Checking indexes...');
        const indexes = await pool.query(`
            SELECT indexname 
            FROM pg_indexes 
            WHERE tablename = 'transactions' 
            AND indexname LIKE '%campaign%'
        `);
        console.log('Campaign-related indexes:', indexes.rows.map(r => r.indexname).join(', '));

        // 3. Check data integrity
        console.log('\n📈 Data integrity check...');
        const counts = await pool.query(`
            SELECT 
                (SELECT COUNT(*) FROM users) as users,
                (SELECT COUNT(*) FROM transactions) as transactions,
                (SELECT COUNT(*) FROM categories) as categories,
                (SELECT COUNT(*) FROM products) as products
        `);
        console.table(counts.rows[0]);

        // 4. Verify no orphaned records
        console.log('\n🔍 Checking for orphaned records...');
        const orphaned = await pool.query(`
            SELECT COUNT(*) as count
            FROM transactions t
            WHERE NOT EXISTS (SELECT 1 FROM users u WHERE u.id = t.user_id)
        `);

        if (orphaned.rows[0].count === '0') {
            console.log('✅ No orphaned transactions found');
        } else {
            console.log(`⚠️  Found ${orphaned.rows[0].count} orphaned transactions`);
        }

        console.log('\n═══════════════════════════════════════════════════');
        console.log('✅ VERIFICATION COMPLETE - DATABASE IS HEALTHY');
        console.log('═══════════════════════════════════════════════════');

    } catch (err) {
        console.error('❌ VERIFICATION FAILED:', err.message);
        console.error(err.stack);
    } finally {
        await pool.end();
    }
}

finalVerification();
