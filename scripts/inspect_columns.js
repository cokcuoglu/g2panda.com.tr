const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function inspectTables() {
    const client = await pool.connect();
    try {
        const tables = ['categories', 'channels', 'products', 'transactions'];
        for (const table of tables) {
            console.log(`\n📋 Columns for: ${table}`);
            const res = await client.query(`
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = '${table}';
            `);
            console.log(res.rows.map(r => r.column_name).join(', '));
        }
    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        client.release();
        await pool.end();
    }
}

inspectTables();
