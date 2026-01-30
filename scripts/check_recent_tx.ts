import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkRecent() {
    try {
        console.log('--- Recent Transactions (Last 5) ---');
        const res = await pool.query(`
            SELECT id, type, amount, description, transaction_date, ocr_record_id, created_at 
            FROM transactions 
            ORDER BY created_at DESC 
            LIMIT 5
        `);
        console.table(res.rows);

        console.log('\n--- Recent OCR Records (Last 5) ---');
        const ocr = await pool.query(`
            SELECT id, status, detected_amount, detected_date, created_at, image_path 
            FROM ocr_records 
            ORDER BY created_at DESC 
            LIMIT 5
        `);
        console.table(ocr.rows);

    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

checkRecent();
