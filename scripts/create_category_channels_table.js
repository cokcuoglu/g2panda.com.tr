
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
        console.log('Creating category_channels table...');
        await client.query(`
            CREATE TABLE IF NOT EXISTS category_channels (
                category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
                channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                PRIMARY KEY (category_id, channel_id)
            );
        `);
        console.log('Table created successfully.');

        // Optional: Migrate existing default_channel_id data
        console.log('Migrating existing default_channel_id data...');
        await client.query(`
            INSERT INTO category_channels (category_id, channel_id)
            SELECT id, default_channel_id FROM categories 
            WHERE default_channel_id IS NOT NULL
            ON CONFLICT DO NOTHING;
        `);
        console.log('Data migration complete.');

    } catch (err) {
        console.error(err);
    } finally {
        client.release();
        await pool.end();
    }
}

main();
