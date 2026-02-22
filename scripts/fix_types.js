const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function fixTable(tableName) {
    const res = await pool.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = $1 AND data_type = 'character varying'
    `, [tableName]);

    if (res.rows.length === 0) {
        console.log(`✅ No VARCHAR columns found in ${tableName}`);
        return;
    }

    for (const row of res.rows) {
        console.log(`🛠 Altering ${tableName}.${row.column_name} to TEXT...`);
        await pool.query(`ALTER TABLE ${tableName} ALTER COLUMN ${row.column_name} TYPE TEXT`);
    }
    console.log(`✅ Done fixing ${tableName}`);
}

async function fixAll() {
    await fixTable('orders');
    await fixTable('transactions');
    await fixTable('users');
    await pool.end();
}

fixAll();
