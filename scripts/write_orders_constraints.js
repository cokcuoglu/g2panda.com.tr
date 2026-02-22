const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function checkConstraints() {
    try {
        const res = await pool.query(`
            SELECT column_name, is_nullable, column_default 
            FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND lower(table_name) = 'orders'
            ORDER BY column_name
        `);
        const output = res.rows.map(row => `${row.column_name} | nullable: ${row.is_nullable} | default: ${row.column_default}`).join('\n');
        fs.writeFileSync('orders_constraints_final.txt', output);
        console.log('Constraints written to orders_constraints_final.txt');
    } catch (err) {
        console.error('Error checking constraints:', err);
    } finally {
        await pool.end();
    }
}

checkConstraints();
