const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

async function checkSchema() {
    try {
        await client.connect();

        const res = await client.query(`
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns 
            WHERE table_name = 'transaction_items'
            ORDER BY ordinal_position;
        `);

        console.log('transaction_items columns:');
        res.rows.forEach(col => {
            console.log(`  ${col.column_name}: ${col.data_type} ${col.is_nullable === 'NO' ? 'NOT NULL' : 'NULL'} ${col.column_default || ''}`);
        });

        // Check if 'unit' column exists
        const hasUnit = res.rows.some(col => col.column_name === 'unit');
        console.log(`\n'unit' column exists: ${hasUnit}`);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
    }
}

checkSchema();
