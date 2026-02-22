const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function checkReferencedIds() {
    const ozanId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';
    const categoryId = '1ff1b088-0a1c-400e-a365-ffe7824b9e61';
    const channelId = 'ae26e0ec-6caf-4a38-994d-f1df1611b587';

    try {
        // Check category
        const cat = await pool.query('SELECT id, name FROM categories WHERE id = $1', [categoryId]);
        if (cat.rows.length > 0) {
            console.log('✅ Category exists:', cat.rows[0]);
        } else {
            console.log('❌ Category NOT found:', categoryId);
            console.log('\nOzan\'s categories:');
            const ozanCats = await pool.query('SELECT id, name FROM categories WHERE user_id = $1 LIMIT 5', [ozanId]);
            console.table(ozanCats.rows);
        }

        // Check channel
        const chan = await pool.query('SELECT id, name FROM channels WHERE id = $1', [channelId]);
        if (chan.rows.length > 0) {
            console.log('\n✅ Channel exists:', chan.rows[0]);
        } else {
            console.log('\n❌ Channel NOT found:', channelId);
            console.log('\nOzan\'s channels:');
            const ozanChans = await pool.query('SELECT id, name FROM channels WHERE user_id = $1 LIMIT 5', [ozanId]);
            console.table(ozanChans.rows);
        }

    } catch (err) {
        console.error('ERROR:', err.message);
    } finally {
        await pool.end();
    }
}

checkReferencedIds();
