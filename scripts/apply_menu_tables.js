const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function runMigrations() {
    const client = await pool.connect();
    try {
        console.log('Applying Migrations...');

        const files = [
            '14_menu_categories.sql',
            '15_update_products_menu.sql',
            '16_fix_menu_rls.sql' // This replaces the policy in 14 with the correct one
        ];

        for (const file of files) {
            const sqlPath = path.resolve(__dirname, `../database/${file}`);
            if (fs.existsSync(sqlPath)) {
                console.log(`Running ${file}...`);
                const sql = fs.readFileSync(sqlPath, 'utf8');
                await client.query(sql);
                console.log(`Passed ${file}.`);
            } else {
                console.warn(`File ${file} not found!`);
            }
        }

        console.log('All migrations applied successfully.');

    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        client.release();
        pool.end();
    }
}

runMigrations();
