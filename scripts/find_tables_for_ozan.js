const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function run() {
    const ozanJoinDate = '2026-01-28T18:00:00';
    try {
        console.log(`Checking tables created on or after ${ozanJoinDate} owned by Caner:`);
        const canerId = 'be8b8541-f427-4287-a00b-a0e9783e5209';

        const res = await pool.query(`
            SELECT id, name, user_id, created_at 
            FROM tables 
            WHERE user_id = $1 AND created_at >= $2
            ORDER BY created_at ASC
        `, [canerId, ozanJoinDate]);

        console.log(`Found ${res.rows.length} potentially orphaned tables.`);
        res.rows.forEach(r => {
            console.log(`${r.id} | ${r.name.padEnd(15)} | ${r.created_at}`);
        });

        // Also check for category counts to see if they match the 13 I saw earlier
        const catCount = await pool.query('SELECT COUNT(*) FROM categories WHERE user_id = $1', ['e0bce7e4-a9a2-4c0e-9841-e11cea1cff57']);
        console.log('\nOzan current categories count:', catCount.rows[0].count);

    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}
run();
