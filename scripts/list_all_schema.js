const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function listAll() {
    try {
        const res = await pool.query(`
        `);

        let currentTable = '';
        res.rows.forEach(row => {
            if (row.table_name !== currentTable) {
                console.log(`\nTable: ${row.table_name}`);
                currentTable = row.table_name;
            }
            console.log(`  - ${row.column_name} (${row.data_type})`);
        });
    } catch (err) {
        console.error('Error listing tables:', err);
    } finally {
        await pool.end();
    }
}

listAll();
