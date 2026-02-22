const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function insertMissingTransaction() {
    try {
        console.log('Inserting missing transaction...\n');

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
            RETURNING *
        `;

        const values = [
            '15bb4b86-6445-4a98-9abf-a6e9f5933eac',
            'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57',
            '1ff1b088-0a1c-400e-a365-ffe7824b9e61',
            'ae26e0ec-6caf-4a38-994d-f1df1611b587',
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
        console.log('\nInserted record:');
        console.table(result.rows[0]);

    } catch (err) {
        console.error('❌ ERROR:', err.message);
        console.error('Detail:', err.detail);
    } finally {
        await pool.end();
    }
}

insertMissingTransaction();
