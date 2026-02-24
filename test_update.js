require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL
});

async function run() {
    try {
        await client.connect();
        const res = await client.query('UPDATE categories SET is_default = false WHERE type = $1 RETURNING id', ['income']);
        console.log('UPDATE SUCCESS:', res.rowCount);
    } catch (e) {
        console.error('UPDATE ERROR:', e);
    } finally {
        await client.end();
    }
}
run();
