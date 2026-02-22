const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function getPluxeeId() {
    const ozanId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';

    const res = await pool.query(
        'SELECT id, name, type FROM categories WHERE user_id = $1 AND name ILIKE $2',
        [ozanId, '%pluxee%']
    );

    if (res.rows.length > 0) {
        console.log('Pluxee Category ID:', res.rows[0].id);
        console.log('Name:', res.rows[0].name);
        console.log('Type:', res.rows[0].type);
    } else {
        console.log('Pluxee category not found');
    }

    await pool.end();
}

getPluxeeId().catch(console.error);
