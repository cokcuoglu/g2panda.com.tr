const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.query(
    'SELECT id, name FROM channels WHERE user_id = $1 ORDER BY name',
    ['e0bce7e4-a9a2-4c0e-9841-e11cea1cff57']
).then(res => {
    console.log(`Total channels: ${res.rows.length}\n`);
    res.rows.forEach(c => {
        console.log(`${c.name} | ${c.id}`);
    });
    pool.end();
}).catch(err => {
    console.error(err.message);
    pool.end();
});
