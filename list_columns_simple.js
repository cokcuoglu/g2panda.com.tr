const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function listColumns() {
    try {
        console.log('🔍 Listing all columns for "transactions"...');
        const res = await pool.query(`
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns 
            WHERE table_name = 'transactions'
            ORDER BY ordinal_position;
        `);
        res.rows.forEach(r => {
            console.log(`${r.column_name} | ${r.data_type} | Nullable: ${r.is_nullable} | Default: ${r.column_default}`);
        });
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

listColumns();
