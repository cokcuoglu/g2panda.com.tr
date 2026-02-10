const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function dumpRawOCR() {
    try {
        const res = await pool.query(`
            SELECT raw_text 
            FROM ocr_records 
            ORDER BY created_at DESC 
            LIMIT 1
        `);

        if (res.rows.length > 0) {
            const fullText = res.rows[0].raw_text;
            // Extract the raw part
            const split = fullText.split('--- RAW TESSERACT OUTPUT ---');
            const rawPart = split.length > 1 ? split[1] : fullText;

            fs.writeFileSync(path.join(__dirname, '../logs/raw_ocr_dump.txt'), rawPart.trim());
            console.log('Raw OCR text dumped to logs/raw_ocr_dump.txt');
        } else {
            console.log('No records found.');
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

dumpRawOCR();
