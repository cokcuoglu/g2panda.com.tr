
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function listColumns() {
    try {
        const res = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'tables'
            AND table_schema = 'public'
            ORDER BY ordinal_position
        `);
        console.log('--- TABLES COLUMNS ---');
        res.rows.forEach(r => {
            console.log(`${r.column_name} | ${r.data_type}`);
        });

        const res2 = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'orders'
            AND column_name IN ('table_id', 'table_code')
        `);
        console.log('\n--- ORDERS COLUMNS ---');
        res2.rows.forEach(r => {
            console.log(`${r.column_name} | ${r.data_type}`);
        });

    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

listColumns();
