const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkCol() {
    try {
        console.log('🔍 Checking "is_tax_deductible" specifically...');
        const res = await pool.query(`
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns 
            WHERE table_name = 'transactions' AND column_name = 'is_tax_deductible'
        `);
        if (res.rows.length === 0) {
            console.log('❌ Column "is_tax_deductible" not found!');
        } else {
            console.log('✅ Column Found:', res.rows[0]);
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

checkCol();
