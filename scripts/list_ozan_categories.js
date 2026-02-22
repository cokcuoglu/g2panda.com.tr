const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function listAllCategories() {
    const ozanId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';

    const res = await pool.query(
        'SELECT id, name, type FROM categories WHERE user_id = $1 ORDER BY name',
        [ozanId]
    );

    console.log(`Total categories: ${res.rows.length}\n`);
    res.rows.forEach(cat => {
        console.log(`ID: ${cat.id}`);
        console.log(`Name: "${cat.name}"`);
        console.log(`Type: ${cat.type}`);
        console.log('---');
    });

    await pool.end();
}

listAllCategories().catch(console.error);
