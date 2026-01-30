const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const dotenv = require('dotenv');

// Config check
const envPath = path.resolve(__dirname, '../.env');
if (!fs.existsSync(envPath)) {
    console.error('Error: .env file not found at', envPath);
    process.exit(1);
}
dotenv.config({ path: envPath });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function runMigration() {
    const client = await pool.connect();
    try {
        console.log('Starting migration for Menu & Product Management...');

        // 1. Create menu_categories table
        const menuSqlPath = path.resolve(__dirname, '../database/14_menu_categories.sql');
        const menuSql = fs.readFileSync(menuSqlPath, 'utf8');
        console.log('Applying 14_menu_categories.sql...');
        await client.query(menuSql);
        console.log('Check: menu_categories table created/verified.');

        // 2. Update products table
        const productSqlPath = path.resolve(__dirname, '../database/15_update_products_menu.sql');
        const productSql = fs.readFileSync(productSqlPath, 'utf8');
        console.log('Applying 15_update_products_menu.sql...');
        await client.query(productSql);
        console.log('Check: products table updated.');

        console.log('Migration completed successfully.');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        client.release();
        pool.end();
    }
}

runMigration();
