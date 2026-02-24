require('dotenv').config();
const axios = require('axios');
const { Client } = require('pg');

async function run() {
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();

    try {
        // Find Ozan's ID and his category "Getir"
        const userRes = await client.query("SELECT id FROM users WHERE full_name ILIKE '%ozan%'");
        const userId = userRes.rows[0].id;

        const catRes = await client.query("SELECT * FROM categories WHERE user_id = $1 AND name = 'Getir'", [userId]);
        const cat = catRes.rows[0];

        // We need an auth token or bypass.
        // Wait, the API requires req.user. We cannot easily call it via axios without JWT.
        // Instead, let's look at PM2 logs using standard fs.readFileSync and just grep for 'ERROR'
    } catch (e) {
        console.error(e);
    } finally {
        await client.end();
    }
}
run();
