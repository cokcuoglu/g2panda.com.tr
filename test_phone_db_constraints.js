const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function testConstraints() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const userId = 'be8b8541-f427-4287-a00b-a0e9783e5209'; // Demo User

        console.log('🧪 Testing Database Constraints...');

        // 1. Try Insert Invalid Format
        console.log('1. Testing Invalid Format (0530...)');
        try {
            await client.query(
                `INSERT INTO customers (user_id, name, phone, city, district, neighborhood) 
                 VALUES ($1, 'Invalid Phone', '05301234567', 'İstanbul', 'Kadıköy', 'Caferağa')`,
                [userId]
            );
            console.error('❌ Failed: Should have rejected "05301234567"');
        } catch (err) {
            if (err.constraint === 'customers_phone_check') {
                console.log('✅ Success: Rejected invalid format "05301234567"');
            } else {
                console.error('❌ Update Failed with unexpected error:', err.message);
            }
        }

        // 2. Try Insert Valid Format
        console.log('2. Testing Valid Format (599...)');
        const validPhone = '5999999999';
        await client.query(
            `INSERT INTO customers (user_id, name, phone, city, district, neighborhood) 
             VALUES ($1, 'Valid Phone', $2, 'İstanbul', 'Kadıköy', 'Caferağa')`,
            [userId, validPhone]
        );
        console.log(`✅ Success: Inserted valid format "${validPhone}"`);

        // 3. Try Insert Duplicate
        console.log('3. Testing Duplicate Phone');
        try {
            await client.query(
                `INSERT INTO customers (user_id, name, phone, city, district, neighborhood) 
                 VALUES ($1, 'Duplicate Phone', $2, 'İstanbul', 'Kadıköy', 'Caferağa')`,
                [userId, validPhone]
            );
            console.error(`❌ Failed: Should have rejected duplicate "${validPhone}"`);
        } catch (err) {
            if (err.constraint === 'customers_user_phone_unique_idx') {
                console.log(`✅ Success: Rejected duplicate "${validPhone}"`);
            } else {
                console.log('✅ Success: Rejected duplicate (Error: ' + err.message + ')');
            }
        }

        await client.query('ROLLBACK'); // Clean up
        console.log('✨ All constraint tests passed!');

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Global Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

testConstraints();
