const { Client } = require('pg');
const fs = require('fs');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

async function runMigration() {
    const migrationFile = process.argv[2];
    if (!migrationFile) {
        console.error("Please provide migration file path");
        process.exit(1);
    }

    try {
        await client.connect();
        const sql = fs.readFileSync(migrationFile, 'utf8');
        console.log(`Running migration: ${migrationFile}`);
        await client.query(sql);
        console.log("Migration successful.");
    } catch (err) {
        console.error("Migration failed:", err);
    } finally {
        await client.end();
    }
}

runMigration();
