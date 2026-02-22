const fs = require('fs');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const BACKUP_DIR = 'd:\\Personal_Project\\g2panda_release\\backups\\2026-02-15T21-00-00';
const TEST3_ID = 'be8b8541-f427-4287-a00b-a0e9783e5209';

async function restoreTable(client, tableName, data, filterFn) {
    const filteredData = data.filter(filterFn);
    if (filteredData.length === 0) {
        console.log(`ℹ️ No data to restore for table: ${tableName}`);
        return;
    }

    console.log(`⏳ Restoring ${filteredData.length} records to ${tableName}...`);

    // Get table columns from DB to ensure we only insert existing ones
    const colRes = await client.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = $1
    `, [tableName]);
    const validCols = new Set(colRes.rows.map(r => r.column_name));

    for (const item of filteredData) {
        const itemCols = Object.keys(item).filter(k => validCols.has(k));
        const values = itemCols.map(k => item[k]);
        const placeholders = itemCols.map((_, i) => `$${i + 1}`).join(', ');

        const query = `
            INSERT INTO ${tableName} (${itemCols.join(', ')})
            VALUES (${placeholders})
            ON CONFLICT (id) DO UPDATE SET
                ${itemCols.map((k, i) => `${k} = EXCLUDED.${k}`).join(', ')}
        `;

        try {
            await client.query(query, values);
        } catch (e) {
            console.error(`❌ Error inserting into ${tableName} (ID: ${item.id}):`, e.message);
            throw e;
        }
    }
}

async function restoreTest3() {
    const client = await pool.connect();
    try {
        console.log('🚀 Starting Universal Restoration for user "test3"...');

        const users = JSON.parse(fs.readFileSync(`${BACKUP_DIR}\\users.json`, 'utf8'));
        const categories = JSON.parse(fs.readFileSync(`${BACKUP_DIR}\\categories.json`, 'utf8'));
        const channels = JSON.parse(fs.readFileSync(`${BACKUP_DIR}\\channels.json`, 'utf8'));
        const products = JSON.parse(fs.readFileSync(`${BACKUP_DIR}\\products.json`, 'utf8'));
        const transactions = JSON.parse(fs.readFileSync(`${BACKUP_DIR}\\transactions.json`, 'utf8'));

        await client.query('BEGIN');

        // Restore in order
        await restoreTable(client, 'users', users, u => u.id === TEST3_ID);
        await restoreTable(client, 'categories', categories, c => c.user_id === TEST3_ID);
        await restoreTable(client, 'channels', channels, c => c.user_id === TEST3_ID);
        await restoreTable(client, 'products', products, p => p.user_id === TEST3_ID);
        await restoreTable(client, 'transactions', transactions, t => t.user_id === TEST3_ID);

        await client.query('COMMIT');
        console.log('✅ Restoration Completed successfully!');

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('❌ Restoration Failed Main Block:', err.stack || err.message);
    } finally {
        client.release();
        await pool.end();
    }
}

restoreTest3();
