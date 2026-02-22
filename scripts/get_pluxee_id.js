const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const ozanId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';

async function getPluxeeCategoryId() {
    try {
        console.log('Getting Pluxee category ID for Ozan...\n');

        const res = await pool.query(`
            SELECT id, name, type, color
            FROM categories 
            WHERE user_id = $1 
            AND LOWER(name) LIKE '%pluxee%'
        `, [ozanId]);

        if (res.rows.length > 0) {
            console.log('✅ Pluxee category found:');
            console.table(res.rows);
            console.log(`\nCategory ID: ${res.rows[0].id}`);
        } else {
            console.log('❌ Pluxee category not found');
        }

    } catch (err) {
        console.error('ERROR:', err.message);
    } finally {
        await pool.end();
    }
}

getPluxeeCategoryId();
