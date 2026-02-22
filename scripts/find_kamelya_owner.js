const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function findKamelyaOwner() {
    try {
        const res = await pool.query("SELECT id, name, user_id FROM products WHERE name ILIKE '%Kamelya%'");
        console.log('Results:', JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

findKamelyaOwner();
