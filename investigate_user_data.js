const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function listTodayUserIds() {
    try {
        console.log('Listing User IDs with activity on 2026-02-16...');

        const activeIds = await pool.query(`
            SELECT user_id, count(*) as count 
            FROM transactions 
            WHERE created_at >= '2026-02-16 00:00:00' 
            GROUP BY user_id
        `);

        console.log('🆔 Active User IDs:');
        activeIds.rows.forEach(r => {
            console.log(`   - ID: ${r.user_id}, Transactions: ${r.count}`);
        });

    } catch (err) {
        console.error('ERROR:', err.message);
    } finally {
        await pool.end();
    }
}

listTodayUserIds();
