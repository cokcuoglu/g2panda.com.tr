const fs = require('fs');
const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgres://postgres:postgres@localhost:5432/gg_esnaf' });

async function run() {
    try {
        const query = `
            SELECT *
            FROM ocr_records 
            WHERE raw_text ILIKE '%damla%' OR raw_text ILIKE '%Damla%' 
            ORDER BY created_at DESC 
            LIMIT 1
        `;
        const res = await pool.query(query);
        fs.writeFileSync('scripts/damla_ocr.json', JSON.stringify(res.rows[0], null, 2));
        console.log('Saved to scripts/damla_ocr.json');
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await pool.end();
    }
}

run();
