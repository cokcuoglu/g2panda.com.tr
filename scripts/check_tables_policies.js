const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function checkPolicies() {
    try {
        const res = await pool.query(`SELECT * FROM pg_policies WHERE tablename = 'tables'`);
        console.log(`Found ${res.rows.length} policies for 'tables'.`);
        console.log(JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error('Error checking policies:', err);
    } finally {
        await pool.end();
    }
}

checkPolicies();
