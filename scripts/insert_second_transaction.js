const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function insertSecondTransaction() {
    const ozanId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';
    const categoryId = '43e1fd7d-1894-4177-84c7-be3a0fa1b4ae';
    const channelId = 'dd5eb7d8-e0b5-4cfe-bee5-67b7e3c242e0';

    try {
        // Check if category and channel exist
        const catCheck = await pool.query('SELECT id, name FROM categories WHERE id = $1', [categoryId]);
        const chanCheck = await pool.query('SELECT id, name FROM channels WHERE id = $1', [channelId]);

        let finalCategoryId = categoryId;
        let finalChannelId = channelId;

        if (catCheck.rows.length === 0) {
            console.log('⚠️  Category not found, using default expense category');
            const defaultCat = await pool.query(
                'SELECT id FROM categories WHERE user_id = $1 AND type = $2 LIMIT 1',
                [ozanId, 'expense']
            );
            finalCategoryId = defaultCat.rows[0].id;
        } else {
            console.log('✅ Category exists:', catCheck.rows[0].name);
        }

        if (chanCheck.rows.length === 0) {
            console.log('⚠️  Channel not found, using default channel');
            const defaultChan = await pool.query(
                'SELECT id FROM channels WHERE user_id = $1 LIMIT 1',
                [ozanId]
            );
            finalChannelId = defaultChan.rows[0].id;
        } else {
            console.log('✅ Channel exists:', chanCheck.rows[0].name);
        }

        const query = `
            INSERT INTO transactions (
                id, user_id, category_id, channel_id, type, amount, currency,
                transaction_date, description, ocr_record_id, invoice_number,
                notes, created_at, updated_at, deleted_at, expense_type,
                is_tax_deductible, deduction_reason, document_type,
                vat_rate, vat_amount, campaign_id, campaign_code
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,
                $15, $16, $17, $18, $19, $20, $21, $22, $23
            )
            RETURNING id, description, amount, transaction_date
        `;

        const values = [
            '7a6990e8-5931-4632-ab76-aefa3b994e4e',
            ozanId,
            finalCategoryId,
            finalChannelId,
            'expense',
            35.15,
            'TRY',
            '2026-02-16 19:09:52.610+03',
            'Otomatik Kesinti: pluxee Komisyonu (%9.5)',
            null,
            null,
            'Bağlı İşlem ID: efccbf43-d32c-48de-948f-b85bb0e5a62a',
            '2026-02-16 19:09:52.760+03',
            '2026-02-16 19:09:52.760+03',
            null,
            'operational',
            true,
            null,
            'receipt',
            null,
            null,
            null,
            null
        ];

        const result = await pool.query(query, values);

        console.log('\n✅ Transaction inserted successfully!');
        console.log(result.rows[0]);

    } catch (err) {
        console.error('❌ ERROR:', err.message);
        if (err.code === '23505') {
            console.log('ℹ️  This transaction ID already exists in the database');
        }
    } finally {
        await pool.end();
    }
}

insertSecondTransaction();
