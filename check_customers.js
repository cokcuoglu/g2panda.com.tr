const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkCustomers() {
    try {
        console.log('🔍 Checking Customers Table...');
        const res = await pool.query('SELECT * FROM customers');
        console.log(`Found ${res.rows.length} customers.`);

        const invalidPhones = res.rows.filter(c => {
            const phone = c.phone || '';
            return !phone.match(/^[5][0-9]{9}$/);
        });

        if (invalidPhones.length > 0) {
            console.log('⚠️ Invalid Phone Numbers Found:');
            invalidPhones.forEach(c => {
                console.log(`- ID: ${c.id}, Name: ${c.name}, Phone: ${c.phone}`);
            });
        } else {
            console.log('✅ All phone numbers match the format ^[5][0-9]{9}$');
        }

        // Check for duplicates per user
        const duplicates = await pool.query(`
            SELECT user_id, phone, COUNT(*) 
            FROM customers 
            GROUP BY user_id, phone 
            HAVING COUNT(*) > 1
        `);

        if (duplicates.rows.length > 0) {
            console.log('⚠️ Duplicate Phone Numbers Found (Per User):');
            duplicates.rows.forEach(d => {
                console.log(`- User: ${d.user_id}, Phone: ${d.phone}, Count: ${d.count}`);
            });
        } else {
            console.log('✅ No duplicate phone numbers found per user.');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

checkCustomers();
