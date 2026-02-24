require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');

const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/g2panda'
});

async function run() {
    try {
        await client.connect();

        const users = await client.query("SELECT id, full_name, email FROM users WHERE full_name ILIKE '%ozan%' OR email ILIKE '%ozan%'");
        const ozan = users.rows[0];

        const cats = await client.query("SELECT * FROM categories WHERE user_id = $1 AND type = 'income' ORDER BY id ASC", [ozan.id]);
        const channels = await client.query("SELECT * FROM channels WHERE user_id = $1", [ozan.id]);

        fs.writeFileSync('ozan_data.json', JSON.stringify({
            user: ozan,
            categories: cats.rows,
            channels: channels.rows
        }, null, 2));

        console.log("Data written to ozan_data.json");

    } catch (e) {
        console.error("DB Error:", e);
    } finally {
        await client.end();
    }
}
run();
