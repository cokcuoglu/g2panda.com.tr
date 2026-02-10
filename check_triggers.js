const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkTriggersAndDefault() {
    try {
        console.log('🔍 Checking "is_tax_deductible" default...');
        const colRes = await pool.query(`
            SELECT column_name, column_default, is_nullable
            FROM information_schema.columns 
            WHERE table_name = 'transactions' AND column_name = 'is_tax_deductible'
        `);
        console.table(colRes.rows);

        console.log('\n🔍 Checking Triggers on "transactions"...');
        const trigRes = await pool.query(`
            SELECT trigger_name, event_manipulation, action_statement, action_timing
            FROM information_schema.triggers
            WHERE event_object_table = 'transactions'
        `);
        console.table(trigRes.rows);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

checkTriggersAndDefault();
