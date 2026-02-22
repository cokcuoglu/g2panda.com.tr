const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkTest3() {
    try {
        console.log('Looking for test3 user...\n');

        const res = await pool.query(`
            SELECT id, email, full_name, business_name, business_logo
            FROM users 
            WHERE email LIKE '%test3%' OR full_name LIKE '%test3%'
        `);

        if (res.rows.length === 0) {
            console.log('No user found with test3 in email or name');
            console.log('\nAll users:');
            const all = await pool.query('SELECT id, email, full_name, business_name FROM users');
            console.table(all.rows);
        } else {
            console.log('test3 user found:');
            console.table(res.rows);

            const user = res.rows[0];
            if (user.business_logo) {
                console.log(`\nCurrent logo: ${user.business_logo}`);
            } else {
                console.log('\n⚠️  business_logo is NULL');
            }
        }

    } catch (err) {
        console.error('ERROR:', err.message);
    } finally {
        await pool.end();
    }
}

checkTest3();
