const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function backup() {
    try {
        // Create backups directory
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        const backupDir = path.join(__dirname, '../backups', timestamp);

        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
        }

        console.log(`Starting backup to: ${backupDir}`);

        // Get all tables
        const tables = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);

        for (const row of tables.rows) {
            const table = row.table_name;
            console.log(`Backing up table: ${table}...`);
            const data = await pool.query(`SELECT * FROM "${table}"`);

            fs.writeFileSync(
                path.join(backupDir, `${table}.json`),
                JSON.stringify(data.rows, null, 2)
            );
        }

        console.log('✅ Backup completed successfully!');

    } catch (err) {
        console.error('❌ Backup failed:', err);
    } finally {
        await pool.end();
    }
}

backup();
