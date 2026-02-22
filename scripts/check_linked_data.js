const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const targetUserId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';

async function checkLinkedData() {
    try {
        console.log('--- Categories for Ozan ---');
        const catRes = await pool.query('SELECT id, name, type FROM categories WHERE user_id = $1', [targetUserId]);
        console.log(`Found ${catRes.rows.length} categories.`);
        if (catRes.rows.length > 0) console.log('Sample category:', catRes.rows[0]);

        console.log('\n--- Channels for Ozan ---');
        const chanRes = await pool.query('SELECT id, name FROM channels WHERE user_id = $1', [targetUserId]);
        console.log(`Found ${chanRes.rows.length} channels.`);

        console.log('\n--- Transactions linkage check ---');
        const linkRes = await pool.query(`
            SELECT 
                COUNT(*) as total,
                COUNT(category_id) as with_category,
                COUNT(channel_id) as with_channel
            FROM transactions 
            WHERE user_id = $1
        `, [targetUserId]);
        console.log('Linkage summary:', JSON.stringify(linkRes.rows[0], null, 2));

        // Check if IDs in transactions actually exist in categories/channels tables
        const orphanCatRes = await pool.query(`
            SELECT count(*) FROM transactions t 
            WHERE t.user_id = $1 
            AND t.category_id IS NOT NULL 
            AND NOT EXISTS (SELECT 1 FROM categories c WHERE c.id = t.category_id)
        `, [targetUserId]);
        console.log(`Transactions with non-existent category_id: ${orphanCatRes.rows[0].count}`);

    } catch (err) {
        console.error('ERROR:', err.message);
    } finally {
        await pool.end();
    }
}

checkLinkedData();
