
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
            ORDER BY ordinal_position
        `);
        console.log(`Found ${res.rows.length} columns:`);
        const columnDetails = res.rows.map(r => `- ${r.column_name} (${r.data_type})`).join(' ');
        console.log(columnDetails);
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

listColumns();
