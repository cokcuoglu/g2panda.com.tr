
const { Client } = require('pg');
require('dotenv').config();

async function checkUserRoles() {

    console.log("Connecting to:", process.env.DATABASE_URL);

    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });

    try {
        await client.connect();

        const result = await client.query('SELECT id, email, role, is_active FROM users ORDER BY created_at DESC');

        console.log('User Roles in Database:');
        if (result.rows.length === 0) {
            console.log("No users found.");
        } else {
            result.rows.forEach(r => {
                console.log(`- ${r.email} | Role: ${r.role} | Active: ${r.is_active}`);
            });
        }

    } catch (err) {
        console.error('Error querying users:', err);
    } finally {
        await client.end();
    }
}

checkUserRoles();
