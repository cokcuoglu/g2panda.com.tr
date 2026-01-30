const axios = require('axios');
require('dotenv').config();

// Helper to get a token (simulate login or just manually set if we had one, 
// but since we are running locally we can maybe bypass or use the backend directly)
// Actually, backend routes are protected. We need to login first.
// Let's rely on the previous verification which showed DB persistence. 
// I will just query the DB directly to check if the VIEW/Select I wrote is valid SQL.
// Actually, verifying the route via code is better.

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function verifyQuery() {
    const client = await pool.connect();
    try {
        console.log('Verifying Transactions Query...');

        // Test the query string directly
        const query = `
            SELECT t.*, c.name as category_name, c.color as category_color, ch.name as channel_name 
            FROM transactions t
            LEFT JOIN categories c ON t.category_id = c.id
            LEFT JOIN channels ch ON t.channel_id = ch.id
            WHERE t.deleted_at IS NULL
            LIMIT 1
        `;

        const result = await client.query(query);
        console.log('Query Successful.');
        if (result.rows.length > 0) {
            console.log('Sample Row keys:', Object.keys(result.rows[0]));
            if (result.rows[0].hasOwnProperty('category_color')) {
                console.log('SUCCESS: category_color is present in the result set.');
            } else {
                console.error('FAILURE: category_color is MISSING.');
            }
        } else {
            console.log('No transactions found to verify column presence, but query syntax is valid.');
        }

    } catch (err) {
        console.error('Query Failed:', err);
    } finally {
        client.release();
        pool.end();
    }
}

verifyQuery();
