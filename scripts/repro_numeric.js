const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function testNumeric() {
    try {
        console.log('Testing with dot: 300.00');
        await pool.query('SELECT $1::numeric as val', ['300.00']);
        console.log('Dot success');

        console.log('Testing with comma: 300,00');
        await pool.query('SELECT $1::numeric as val', ['300,00']);
        console.log('Comma success');
    } catch (err) {
        console.error('Comma failed:', err.message);
    } finally {
        await pool.end();
    }
}

testNumeric();
