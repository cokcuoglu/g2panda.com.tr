const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const ozanId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';

async function searchOzanPluxee() {
    try {
        console.log('═══════════════════════════════════════════════════');
        console.log('SEARCHING FOR "pluxee" IN OZAN\'S DATA');
        console.log('═══════════════════════════════════════════════════\n');

        // Search in Ozan's categories
        console.log('🔍 Searching in Ozan\'s categories...');
        const categories = await pool.query(`
            SELECT id, name, type
            FROM categories 
            WHERE user_id = $1 
            AND LOWER(name) LIKE '%pluxee%'
        `, [ozanId]);
        if (categories.rows.length > 0) {
            console.log('✅ Found in categories:');
            console.table(categories.rows);
        } else {
            console.log('❌ Not found in categories');
        }

        // Search in Ozan's channels
        console.log('\n🔍 Searching in Ozan\'s channels...');
        const channels = await pool.query(`
            SELECT id, name
            FROM channels 
            WHERE user_id = $1 
            AND LOWER(name) LIKE '%pluxee%'
        `, [ozanId]);
        if (channels.rows.length > 0) {
            console.log('✅ Found in channels:');
            console.table(channels.rows);
        } else {
            console.log('❌ Not found in channels');
        }

        // Search in Ozan's products
        console.log('\n🔍 Searching in Ozan\'s products...');
        const products = await pool.query(`
            SELECT id, name, price
            FROM products 
            WHERE user_id = $1 
            AND LOWER(name) LIKE '%pluxee%'
        `, [ozanId]);
        if (products.rows.length > 0) {
            console.log('✅ Found in products:');
            console.table(products.rows);
        } else {
            console.log('❌ Not found in products');
        }

        // Search in Ozan's transactions
        console.log('\n🔍 Searching in Ozan\'s transactions...');
        const transactions = await pool.query(`
            SELECT id, description, amount, transaction_date, type
            FROM transactions 
            WHERE user_id = $1 
            AND LOWER(description) LIKE '%pluxee%'
            ORDER BY transaction_date DESC
        `, [ozanId]);
        if (transactions.rows.length > 0) {
            console.log(`✅ Found ${transactions.rows.length} transactions:`);
            console.table(transactions.rows);
        } else {
            console.log('❌ Not found in transactions');
        }

        // Show sample of Ozan's categories to see what's there
        console.log('\n📋 Sample of Ozan\'s categories (first 10):');
        const sampleCats = await pool.query(`
            SELECT id, name, type
            FROM categories 
            WHERE user_id = $1
            ORDER BY name
            LIMIT 10
        `, [ozanId]);
        console.table(sampleCats.rows);

        // Show sample of Ozan's channels
        console.log('\n📋 Sample of Ozan\'s channels (first 10):');
        const sampleChannels = await pool.query(`
            SELECT id, name
            FROM channels 
            WHERE user_id = $1
            ORDER BY name
            LIMIT 10
        `, [ozanId]);
        console.table(sampleChannels.rows);

        console.log('\n═══════════════════════════════════════════════════');
        console.log('SEARCH COMPLETE');
        console.log('═══════════════════════════════════════════════════');

    } catch (err) {
        console.error('❌ ERROR:', err.message);
    } finally {
        await pool.end();
    }
}

searchOzanPluxee();
