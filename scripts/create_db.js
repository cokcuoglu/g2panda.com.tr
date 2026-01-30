const { Client } = require('pg');
require('dotenv').config();

// Connect to default 'postgres' db to create the new db
const client = new Client({
    connectionString: process.env.DATABASE_URL.replace('/gg_esnaf', '/postgres')
});

async function createDatabase() {
    try {
        await client.connect();
        console.log('Connected to default postgres database...');

        // Check if DB exists
        const checkRes = await client.query("SELECT 1 FROM pg_database WHERE datname = 'gg_esnaf'");
        if (checkRes.rowCount === 0) {
            console.log("Database 'gg_esnaf' does not exist. Creating...");
            await client.query('CREATE DATABASE gg_esnaf');
            console.log("Database 'gg_esnaf' created successfully!");
        } else {
            console.log("Database 'gg_esnaf' already exists.");
        }
    } catch (err) {
        console.error('Error creating database:', err.message);
    } finally {
        await client.end();
        process.exit(0);
    }
}

createDatabase();
