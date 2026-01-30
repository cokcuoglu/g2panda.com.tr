const { Pool } = require('pg');
require('dotenv').config();

// Explicitly forcing loading from current directory .env if needed, 
// but require('dotenv').config() should work if cwd is correct.
// We will also log what we found to be sure.

console.log('Testing Database Connection...');
console.log('PWD:', process.cwd());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function testConnection() {
    try {
        const client = await pool.connect();
        const res = await client.query('SELECT NOW() as now, current_user');
        console.log('Connection Successful!');
        console.log('Server Time:', res.rows[0].now);
        console.log('Database User:', res.rows[0].current_user);
        client.release();
        process.exit(0);
    } catch (err) {
        console.error('Connection Failed:', err.message);
        process.exit(1);
    }
}

testConnection();
