const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkColumns() {
    try {
        const res = await pool.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'campaigns'
        `);
        console.log('Columns:');
        res.rows.forEach(r => console.log(r.column_name));
    } catch (err) {
        console.error('Query failed:', err.message);
    } finally {
        await pool.end();
    }
}

checkColumns();
