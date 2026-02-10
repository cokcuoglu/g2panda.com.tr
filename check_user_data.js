const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const targetUserId = 'be8b8541-f427-4287-a00b-a0e9783e5209';

async function checkData() {
    try {
        console.log(`Checking data for User ID: ${targetUserId}`);

        // 1. Check User
        const userRes = await pool.query('SELECT id, name FROM users WHERE id = $1', [targetUserId]);
        if (userRes.rows.length === 0) {
            console.error('❌ User NOT FOUND in database!');
        } else {
            console.log('✅ User FOUND:', userRes.rows[0]);
        }

        // 2. Check Products
        const productRes = await pool.query('SELECT count(*) FROM products WHERE user_id = $1', [targetUserId]);
        console.log(`📦 Product Count: ${productRes.rows[0].count}`);

        // 3. Check Categories
        const catRes = await pool.query('SELECT count(*) FROM categories WHERE user_id = $1', [targetUserId]);
        console.log(`📂 Category Count: ${catRes.rows[0].count}`);

    } catch (err) {
        console.error('Error during check:', err);
    } finally {
        await pool.end();
    }
}

checkData();
