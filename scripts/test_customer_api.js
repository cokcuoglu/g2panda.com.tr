const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkApiLogic() {
    let output = '';
    const log = (msg) => { console.log(msg); output += msg + '\n'; };

    try {
        log('--- Simulating API Request for test3@test.com ---');

        // 1. Get User ID
        const userRes = await pool.query(`SELECT id FROM users WHERE email = 'test3@test.com'`);
        if (userRes.rows.length === 0) {
            log('User test3@test.com not found!');
        } else {
            const userId = userRes.rows[0].id;
            log(`User ID: ${userId}`);

            // 2. Simulate Query
            const query = `
                SELECT * FROM customers 
                WHERE user_id = $1 AND deleted_at IS NULL
                ORDER BY created_at DESC
            `;
            const res = await pool.query(query, [userId]);

            log(`API would return ${res.rows.length} customers.`);
            res.rows.forEach(c => log(` - ${c.name} (DeletedAt: ${c.deleted_at})`));

            // 3. Check for deleted ones
            const deletedRes = await pool.query(`SELECT * FROM customers WHERE user_id = $1 AND deleted_at IS NOT NULL`, [userId]);
            log(`\nDeleted customers (Hidden): ${deletedRes.rows.length}`);
            deletedRes.rows.forEach(c => log(` - ${c.name} (DeletedAt: ${c.deleted_at})`));
        }

        fs.writeFileSync(path.join(__dirname, '../logs/api_test_final.txt'), output, 'utf8');
        log('Log saved to logs/api_test_final.txt');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

checkApiLogic();
