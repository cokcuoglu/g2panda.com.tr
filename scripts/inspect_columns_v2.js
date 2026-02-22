const fs = require('fs');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function inspectTables() {
    const client = await pool.connect();
    const OUT_FILE = 'scripts/inspect_columns_results.txt';
    fs.writeFileSync(OUT_FILE, '📋 Table Column Inspection\n');
    try {
        const tables = ['users', 'categories', 'channels', 'products', 'transactions'];
        for (const table of tables) {
            const res = await client.query(`
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = '${table}'
                ORDER BY ordinal_position;
            `);
            const cols = res.rows.map(r => `${r.column_name} (${r.data_type})`).join(', ');
            fs.appendFileSync(OUT_FILE, `\n📋 Table: ${table}\n${cols}\n`);
        }
        console.log('✅ Inspection results written to ' + OUT_FILE);
    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        client.release();
        await pool.end();
    }
}

inspectTables();
