const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkTest3Logo() {
    try {
        console.log('═══════════════════════════════════════════════════');
        console.log('CHECKING test3 USER LOGO CONFIGURATION');
        console.log('═══════════════════════════════════════════════════\n');

        // Find test3 user
        console.log('🔍 Looking for test3 user...');
        const userRes = await pool.query(`
            SELECT id, email, full_name, business_name, business_logo
            FROM users 
            WHERE email LIKE '%test3%'
        `);

        if (userRes.rows.length === 0) {
            console.log('❌ test3 user not found');
            return;
        }

        console.log('✅ Found test3 user:');
        console.table(userRes.rows);

        const test3User = userRes.rows[0];

        // Check if business_logo field exists
        console.log('\n📋 Checking users table schema for logo field...');
        const schemaRes = await pool.query(`
            SELECT column_name, data_type
            FROM information_schema.columns 
            WHERE table_name = 'users' 
            AND column_name LIKE '%logo%'
        `);

        if (schemaRes.rows.length === 0) {
            console.log('⚠️  No logo-related columns found in users table');
            console.log('Available columns in users table:');
            const allCols = await pool.query(`
                SELECT column_name
                FROM information_schema.columns 
                WHERE table_name = 'users'
                ORDER BY ordinal_position
            `);
            console.log(allCols.rows.map(r => r.column_name).join(', '));
        } else {
            console.log('✅ Logo columns found:');
            console.table(schemaRes.rows);
        }

        // Check current logo value
        if (test3User.business_logo) {
            console.log(`\n📸 Current logo value: ${test3User.business_logo}`);
        } else {
            console.log('\n⚠️  business_logo is NULL or empty');
        }

        console.log('\n═══════════════════════════════════════════════════');

    } catch (err) {
        console.error('❌ ERROR:', err.message);
        console.error(err.stack);
    } finally {
        await pool.end();
    }
}

checkTest3Logo();
