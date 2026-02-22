const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function searchPluxee() {
    try {
        console.log('═══════════════════════════════════════════════════');
        console.log('SEARCHING FOR "pluxee" IN DATABASE');
        console.log('═══════════════════════════════════════════════════\n');

        // Search in users
        console.log('🔍 Searching in users table...');
        const users = await pool.query(`
            SELECT id, email, full_name, business_name
            FROM users 
            WHERE LOWER(email) LIKE '%pluxee%' 
               OR LOWER(full_name) LIKE '%pluxee%'
               OR LOWER(business_name) LIKE '%pluxee%'
        `);
        if (users.rows.length > 0) {
            console.log('✅ Found in users:');
            console.table(users.rows);
        } else {
            console.log('❌ Not found in users');
        }

        // Search in categories
        console.log('\n🔍 Searching in categories table...');
        const categories = await pool.query(`
            SELECT id, name, type, user_id
            FROM categories 
            WHERE LOWER(name) LIKE '%pluxee%'
        `);
        if (categories.rows.length > 0) {
            console.log('✅ Found in categories:');
            console.table(categories.rows);
        } else {
            console.log('❌ Not found in categories');
        }

        // Search in channels
        console.log('\n🔍 Searching in channels table...');
        const channels = await pool.query(`
            SELECT id, name, user_id
            FROM channels 
            WHERE LOWER(name) LIKE '%pluxee%'
        `);
        if (channels.rows.length > 0) {
            console.log('✅ Found in channels:');
            console.table(channels.rows);
        } else {
            console.log('❌ Not found in channels');
        }

        // Search in products
        console.log('\n🔍 Searching in products table...');
        const products = await pool.query(`
            SELECT id, name, user_id
            FROM products 
            WHERE LOWER(name) LIKE '%pluxee%'
        `);
        if (products.rows.length > 0) {
            console.log('✅ Found in products:');
            console.table(products.rows);
        } else {
            console.log('❌ Not found in products');
        }

        // Search in transactions
        console.log('\n🔍 Searching in transactions table...');
        const transactions = await pool.query(`
            SELECT id, description, amount, transaction_date, user_id
            FROM transactions 
            WHERE LOWER(description) LIKE '%pluxee%'
            LIMIT 10
        `);
        if (transactions.rows.length > 0) {
            console.log('✅ Found in transactions:');
            console.table(transactions.rows);
        } else {
            console.log('❌ Not found in transactions');
        }

        console.log('\n═══════════════════════════════════════════════════');
        console.log('SEARCH COMPLETE');
        console.log('═══════════════════════════════════════════════════');

    } catch (err) {
        console.error('❌ ERROR:', err.message);
    } finally {
        await pool.end();
    }
}

searchPluxee();
