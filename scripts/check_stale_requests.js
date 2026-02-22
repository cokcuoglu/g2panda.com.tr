
const { Client } = require('pg');
require('dotenv').config();

async function checkServiceRequests() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });

    try {
        await client.connect();
        const res = await client.query('SELECT id, name, status, service_request, user_id FROM tables WHERE service_request IS NOT NULL');
        console.log('--- Active Service Requests ---');
        if (res.rows.length === 0) {
            console.log('None found.');
        } else {
            res.rows.forEach(row => {
                console.log(`Table: ${row.name} (ID: ${row.id}), Status: ${row.status}, Request: ${row.service_request}, UserID: ${row.user_id}`);
            });
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
    }
}

checkServiceRequests();
