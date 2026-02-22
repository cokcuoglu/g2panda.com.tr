const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function insertTransactionWithValidCategory() {
    const ozanId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';

    try {
        // Get an expense category for Ozan
        const catRes = await pool.query(
            'SELECT id, name FROM categories WHERE user_id = $1 AND type = $2 LIMIT 1',
            [ozanId, 'expense']
        );

        if (catRes.rows.length === 0) {
            console.log('❌ No expense category found for Ozan');
            return;
        }

        const categoryId = catRes.rows[0].id;
        console.log(`Using category: ${catRes.rows[0].name} (${categoryId})\n`);

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
            '15bb4b86-6445-4a98-9abf-a6e9f5933eac',
            ozanId,
            categoryId, // Using valid category
            'ae26e0ec-6caf-4a38-994d-f1df1611b587', // Edernet channel
            'expense',
            66.50,
            'TRY',
            '2026-02-16 18:15:34.134+03',
            'Otomatik Kesinti: Ederned Komisyonu (%9.5)',
            null,
            null,
            'Bağlı İşlem ID: c16f5e7e-ba07-42e8-a29c-7cebbbc5e6aa',
            '2026-02-16 18:15:34.324+03',
            '2026-02-16 18:15:34.324+03',
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

        console.log('✅ Transaction inserted successfully!');
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

insertTransactionWithValidCategory();
