const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function findKamelya() {
    try {
        const res = await pool.query("SELECT * FROM products WHERE name ILIKE '%Kamelya%'");
        console.log('Results:', JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

findKamelya();
