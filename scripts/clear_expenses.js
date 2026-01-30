const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function clearExpenses() {
    const client = await pool.connect();
    try {
        console.log('Clearing all expense transactions...');
        const res = await client.query(`
            DELETE FROM transactions 
            WHERE type = 'expense'
            RETURNING id, description, type, expense_type
        `);
        console.log(`Deleted ${res.rowCount} expense transactions.`);

        // Verify schema while we are here
        console.log('Verifying table schema...');
        const schemaRes = await client.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'transactions' 
            AND column_name IN ('expense_type', 'is_tax_deductible')
        `);
        console.table(schemaRes.rows);

    } catch (err) {
        console.error('Error clearing expenses:', err);
    } finally {
        client.release();
        pool.end();
    }
}

clearExpenses();
