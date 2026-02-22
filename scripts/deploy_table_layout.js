const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function runMigration() {
    const client = await pool.connect();
    try {
        console.log('Applying Table Layout Migration...');

        const file = '61_table_layout.sql';
        const sqlPath = path.resolve(__dirname, `../database/${file}`);

        if (fs.existsSync(sqlPath)) {
            console.log(`Running ${file}...`);
            const sql = fs.readFileSync(sqlPath, 'utf8');
            await client.query(sql);
            console.log(`Passed ${file}.`);
        } else {
            console.error(`File ${file} not found!`);
        }

        console.log('Migration applied successfully.');

    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        client.release();
        pool.end();
    }
}

runMigration();
