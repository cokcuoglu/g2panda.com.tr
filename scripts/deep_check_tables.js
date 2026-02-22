
const { Client } = require('pg');
require('dotenv').config();

async function deepCheck() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });

    try {
        await client.connect();

        console.log('--- Checking for ANY table with service_request ---');
        const res = await client.query(`
            SELECT id, name, status, service_request, user_id, 
                   (deleted_at IS NOT NULL) as is_deleted,
                   service_request IS NULL as is_request_null,
                   quote_literal(service_request) as request_quoted
            FROM tables 
            WHERE service_request IS NOT NULL
        `);

        if (res.rows.length === 0) {
            console.log('No rows with non-null service_request found.');
        } else {
            res.rows.forEach(row => {
                console.log(`Table: ${row.name} | ID: ${row.id} | User: ${row.user_id} | Status: ${row.status} | Deleted: ${row.is_deleted} | Request: ${row.request_quoted}`);
            });
        }

        console.log('\n--- Checking for empty string service_request ---');
        const res2 = await client.query("SELECT count(*) FROM tables WHERE service_request = ''");
        console.log(`Tables with empty string request: ${res2.rows[0].count}`);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
    }
}

deepCheck();
