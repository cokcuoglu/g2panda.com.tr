
const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});


async function checkTable() {
    await client.connect();

    try {
        console.log("Checking tables with service_request...");
        const res = await client.query("SELECT id, name, status, service_request FROM tables WHERE service_request IS NOT NULL AND deleted_at IS NULL");
        console.table(res.rows);

        // Also check if any 'available' tables have requests
        const badState = await client.query("SELECT id, name, status, service_request FROM tables WHERE status = 'available' AND service_request IS NOT NULL AND deleted_at IS NULL");
        console.log("\nTables that are AVAILABLE but have REQUESTS (Bug):");
        console.table(badState.rows);

    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

checkTable();
