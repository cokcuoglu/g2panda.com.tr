const { Client } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Construct connection string to 'postgres' DB to perform administrative tasks
// Assumes existing DATABASE_URL is "postgres://postgres:password@localhost:5432/gg_esnaf"
// We need to replace /gg_esnaf with /postgres
let adminUrl = process.env.DATABASE_URL;
// Simple replacement of the DB name part
const dbName = 'gg_esnaf';
if (adminUrl.includes(dbName)) {
    adminUrl = adminUrl.replace(dbName, 'postgres');
} else {
    // If exact name match fails, assume standard structure and replace last segment
    // But for now, let's rely on replacement or manual fallback
    console.log('Admin URL adjusted to:', adminUrl);
}

const client = new Client({
    connectionString: adminUrl
});

async function createTestDB() {
    try {
        await client.connect();
        console.log('Connected to admin DB.');

        // Check availability
        const res = await client.query("SELECT 1 FROM pg_database WHERE datname = 'gg_esnaf_test'");
        if (res.rowCount === 0) {
            console.log('Creating database gg_esnaf_test...');
            await client.query('CREATE DATABASE gg_esnaf_test');
            console.log('Database gg_esnaf_test created successfully.');
        } else {
            console.log('Database gg_esnaf_test already exists.');
        }
    } catch (err) {
        console.error('Error creating database:', err);
    } finally {
        await client.end();
    }
}

createTestDB();
