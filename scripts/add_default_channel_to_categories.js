
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
        console.log('Adding default_channel_id to categories table...');
        await client.query(`
            ALTER TABLE categories 
            ADD COLUMN IF NOT EXISTS default_channel_id UUID REFERENCES channels(id) ON DELETE SET NULL;
        `);
        console.log('Column added successfully or already exists.');
    } catch (err) {
        console.error(err);
    } finally {
        client.release();
        await pool.end();
    }
}

main();
