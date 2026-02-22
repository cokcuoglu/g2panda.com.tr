const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function inspect() {
    const res = await pool.query(`
        SELECT column_name, data_type, character_maximum_length 
        FROM information_schema.columns 
        WHERE table_name = 'orders'
    `);
    res.rows.forEach(r => {
        console.log(`${r.column_name}: ${r.data_type}${r.character_maximum_length ? '(' + r.character_maximum_length + ')' : ''}`);
    });
    await pool.end();
}

inspect();
