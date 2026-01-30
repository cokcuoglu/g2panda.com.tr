
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
        console.log('Testing Categories Query...');
        const query = `
            SELECT c.*, array_remove(array_agg(cc.channel_id), NULL) as form_channel_ids
            FROM categories c
            LEFT JOIN category_channels cc ON c.id = cc.category_id
            WHERE c.deleted_at IS NULL 
            GROUP BY c.id ORDER BY c.type, c.name
        `;
        const res = await client.query(query);
        console.log(`Found ${res.rowCount} categories.`);
        if (res.rowCount > 0) {
            console.log('Sample category:', res.rows[0]);
        } else {
            console.log('No categories found!');
        }

    } catch (err) {
        console.error('Query Failed:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

main();
