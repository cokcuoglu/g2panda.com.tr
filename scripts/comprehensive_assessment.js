const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function comprehensiveAssessment() {
    try {
        console.log('═══════════════════════════════════════════════════');
        console.log('DATABASE INTEGRITY ASSESSMENT');
        console.log('═══════════════════════════════════════════════════\n');

        // 1. List all tables
        console.log('📋 TABLES IN DATABASE:');
        const tables = await pool.query(`
            SELECT tablename 
            FROM pg_tables 
            WHERE schemaname = 'public' 
            ORDER BY tablename
        `);
        console.table(tables.rows);

        // 2. Transactions table schema
        console.log('\n📊 TRANSACTIONS TABLE SCHEMA:');
        const txSchema = await pool.query(`
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns 
            WHERE table_name = 'transactions' 
            ORDER BY ordinal_position
        `);
        console.table(txSchema.rows);

        // 3. Check for expected columns from application code
        const expectedColumns = [
            'id', 'user_id', 'category_id', 'channel_id', 'type', 'amount',
            'transaction_date', 'description', 'ocr_record_id', 'expense_type',
            'is_tax_deductible', 'deduction_reason', 'document_type', 'notes',
            'vat_rate', 'vat_amount', 'invoice_number', 'base_amount',
            'discount_amount', 'campaign_id', 'campaign_code', 'created_at',
            'updated_at', 'deleted_at'
        ];

        const existingColumns = txSchema.rows.map(r => r.column_name);
        const missingColumns = expectedColumns.filter(col => !existingColumns.includes(col));

        console.log('\n⚠️  MISSING COLUMNS IN TRANSACTIONS TABLE:');
        if (missingColumns.length > 0) {
            console.log(missingColumns.join(', '));
        } else {
            console.log('✅ All expected columns present');
        }

        // 4. Data counts
        console.log('\n📈 DATA COUNTS:');
        const counts = await pool.query(`
            SELECT 
                (SELECT COUNT(*) FROM users) as users,
                (SELECT COUNT(*) FROM categories) as categories,
                (SELECT COUNT(*) FROM channels) as channels,
                (SELECT COUNT(*) FROM products) as products,
                (SELECT COUNT(*) FROM transactions) as transactions,
                (SELECT COUNT(*) FROM orders) as orders
        `);
        console.table(counts.rows[0]);

        // 5. Check for orphaned records
        console.log('\n🔍 ORPHANED RECORDS CHECK:');

        const orphanedTx = await pool.query(`
            SELECT COUNT(*) as count
            FROM transactions t
            WHERE NOT EXISTS (SELECT 1 FROM users u WHERE u.id = t.user_id)
        `);
        console.log(`Transactions without valid user: ${orphanedTx.rows[0].count}`);

        const orphanedCat = await pool.query(`
            SELECT COUNT(*) as count
            FROM transactions t
            WHERE t.category_id IS NOT NULL 
            AND NOT EXISTS (SELECT 1 FROM categories c WHERE c.id = t.category_id)
        `);
        console.log(`Transactions without valid category: ${orphanedCat.rows[0].count}`);

        // 6. Recent changes
        console.log('\n🕐 RECENT ACTIVITY (Last 50 transactions):');
        const recent = await pool.query(`
            SELECT user_id, type, amount, transaction_date, created_at
            FROM transactions
            ORDER BY created_at DESC
            LIMIT 50
        `);
        console.table(recent.rows);

        console.log('\n═══════════════════════════════════════════════════');
        console.log('ASSESSMENT COMPLETE');
        console.log('═══════════════════════════════════════════════════');

    } catch (err) {
        console.error('❌ ASSESSMENT FAILED:', err.message);
        console.error(err.stack);
    } finally {
        await pool.end();
    }
}

comprehensiveAssessment();
