
const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function main() {
    const client = await pool.connect();
    try {
        console.log('Connecting to:', process.env.DATABASE_URL);

        const userCount = await client.query('SELECT COUNT(*) FROM users');
        console.log('Total Users:', userCount.rows[0].count);

        const catCount = await client.query('SELECT COUNT(*) FROM categories');
        console.log('Total Categories:', catCount.rows[0].count);

        const users = await client.query('SELECT id, email, full_name FROM users');
        console.log('Users List:', JSON.stringify(users.rows, null, 2));

    } catch (err) {
        console.error('Query Failed:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

main();
