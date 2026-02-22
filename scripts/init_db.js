const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function runSqlFile(filename) {
    const filePath = path.join(__dirname, '..', 'database', filename);
    console.log(`Executing ${filename}...`);
    try {
        const sql = fs.readFileSync(filePath, 'utf8');
        await pool.query(sql);
        console.log(`Successfully executed ${filename}`);
    } catch (err) {
        console.error(`Error executing ${filename}:`, err);
        process.exit(1);
    }
}

async function initDb() {
    try {
        const client = await pool.connect();
        try {
            // Safety check: Don't run if there are existing users, unless --force is used
            const usersCountRes = await client.query("SELECT count(*) FROM users").catch(() => ({ rows: [{ count: 0 }] }));
            const count = parseInt(usersCountRes.rows[0].count);
            const isForce = process.argv.includes('--force');

            if (count > 0 && !isForce) {
                console.error(`\n🛑 SAFETY ALERT: Database contains ${count} users.`);
                console.error(`RUNNING THIS SCRIPT WILL WIPE ALL DATA.`);
                console.error(`If you really want to do this, use: node scripts/init_db.js --force\n`);
                process.exit(1);
            }
        } finally {
            client.release();
        }

        await runSqlFile('01_schema.sql');
        await runSqlFile('03_test_data.sql');
        console.log('Database initialization complete!');
    } catch (err) {
        console.error('Initialization failed:', err);
    } finally {
        await pool.end();
    }
}

initDb();
