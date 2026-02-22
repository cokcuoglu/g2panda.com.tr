
const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

async function fixTables() {
    await client.connect();

    try {
        console.log("Cleaning up stuck service requests for AVAILABLE tables...");

        const result = await client.query(
            "UPDATE tables SET service_request = NULL WHERE status = 'available' AND service_request IS NOT NULL RETURNING id, name"
        );

        console.log(`Fixed ${result.rowCount} tables:`);
        console.table(result.rows);

    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

fixTables();
