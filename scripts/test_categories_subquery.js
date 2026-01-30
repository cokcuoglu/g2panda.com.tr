
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
        console.log('Testing Categories Subquery...');
        const query = `
            SELECT c.*, 
                   COALESCE((SELECT array_agg(channel_id) FROM category_channels WHERE category_id = c.id), '{}') as form_channel_ids
            FROM categories c
            WHERE c.deleted_at IS NULL 
            ORDER BY c.type, c.name
        `;
        const res = await client.query(query);
        console.log(`Found ${res.rowCount} categories.`);
        if (res.rowCount > 0) {
            console.log('Sample category:', res.rows[0]);
        } else {
            console.log('No categories found.');
        }

    } catch (err) {
        console.error('Query Failed:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

main();
