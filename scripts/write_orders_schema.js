const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function checkSchema() {
    try {
        const res = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND lower(table_name) = 'orders'
            ORDER BY column_name
        `);
        const output = res.rows.map(row => `${row.column_name}: ${row.data_type}`).join('\n');
        fs.writeFileSync('orders_columns_final.txt', output);
        console.log('Schema written to orders_columns_final.txt');
    } catch (err) {
        console.error('Error checking schema:', err);
    } finally {
        await pool.end();
    }
}

checkSchema();
