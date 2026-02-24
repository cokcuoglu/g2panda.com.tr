require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');
const client = new Client({ connectionString: process.env.DATABASE_URL });
async function run() {
    await client.connect();
    try {
        const res = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'categories'");
        fs.writeFileSync('cols.json', JSON.stringify(res.rows.map(r => r.column_name), null, 2));
    } catch (e) {
        console.error('ERROR:', e.message);
    }
    await client.end();
}
run();
