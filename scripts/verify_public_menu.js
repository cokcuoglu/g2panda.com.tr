const { Client } = require('pg');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const client = new Client({
    connectionString: process.env.DATABASE_URL
});

async function testPublicMenu() {
    try {
        await client.connect();

        // 1. Get a valid User ID
        const userRes = await client.query('SELECT id FROM users WHERE deleted_at IS NULL LIMIT 1');
        if (userRes.rows.length === 0) {
            console.log('No users found to test with.');
            return;
        }
        const userId = userRes.rows[0].id;
        console.log(`Testing Public Menu for User ID: ${userId}`);

        // 2. Make HTTP Request to the API
        // User confirmed production port is 7001
        const PORT = process.env.PORT || 7001;
        const url = `http://localhost:${PORT}/api/public/menu/${userId}`;

        console.log(`Requesting: ${url}`);

        try {
            const res = await axios.get(url);
            console.log('Response Status:', res.status);
            console.log('Success:', res.data.success);

            const cats = res.data.data.categories;
            console.log(`Received ${cats.length} categories.`);

            if (cats.length > 0) {
                console.log('✓ Public Menu Data received successfully!');
                console.log('Sample Category:', cats[0].name);
            } else {
                console.log('⚠ Warning: No categories returned. Verify if user actually has active categories.');
            }

        } catch (httpErr) {
            console.error('❌ HTTP Request Failed:', httpErr.response ? httpErr.response.data : httpErr.message);
        }

    } catch (err) {
        console.error('Test Script Error:', err);
    } finally {
        await client.end();
    }
}

testPublicMenu();
