require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL
});

async function run() {
    try {
        await client.connect();
        console.log('Connected to database');

        await client.query('ALTER TABLE categories ADD COLUMN IF NOT EXISTS default_channel_id UUID REFERENCES channels(id)');
        console.log('Successfully added default_channel_id column to categories table');

    } catch (e) {
        console.error('Error adding column:', e.message);
    } finally {
        await client.end();
    }
}

run();
