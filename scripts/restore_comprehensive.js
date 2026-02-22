const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const BACKUP_DIR = 'd:\\Personal_Project\\g2panda_release\\backups\\2026-02-15T21-00-00';
const TARGET_USERS = [
    { id: 'be8b8541-f427-4287-a00b-a0e9783e5209', email: 'test3@test.com' },
    { id: 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', email: 'ozan.demirci28@gmail.com' }
];

const TABLES_ORDER = [
    'users',
    'categories',
    'channels',
    'customers',
    'products',
    'tables',
    'campaigns',
    'campaign_products',
    'fixed_expenses',
    'transactions',
    'transaction_items',
    'transaction_vat_breakdown',
    'ocr_records',
    'orders',
    'category_channels',
    'menu_categories',
    'audit_logs'
];

async function restore() {
    const client = await pool.connect();
    try {
        console.log('🚀 Starting Comprehensive Restoration (FK Bypass Mode)...');
        await client.query("SET session_replication_role = 'replica'");
        await client.query('BEGIN');

        for (const tableName of TABLES_ORDER) {
            const filePath = path.join(BACKUP_DIR, `${tableName}.json`);
            if (!fs.existsSync(filePath)) {
                // console.warn(`⚠️ Backup file not found for ${tableName}`);
                continue;
            }

            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            // Get valid columns
            const colRes = await client.query(`
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = $1
            `, [tableName]);
            const validCols = new Set(colRes.rows.map(r => r.column_name));

            // Filtering logic
            let filtered;
            if (tableName === 'users') {
                filtered = data.filter(u => TARGET_USERS.some(tu => tu.id === u.id));
            } else if (validCols.has('user_id')) {
                filtered = data.filter(item => TARGET_USERS.some(tu => tu.id === item.user_id));
            } else if (tableName === 'transaction_items' || tableName === 'transaction_vat_breakdown') {
                const txPath = path.join(BACKUP_DIR, 'transactions.json');
                const transactions = JSON.parse(fs.readFileSync(txPath, 'utf8'));
                const targetTxIds = new Set(transactions.filter(t => TARGET_USERS.some(tu => tu.id === t.user_id)).map(t => t.id));
                filtered = data.filter(item => targetTxIds.has(item.transaction_id));
            } else if (tableName === 'campaign_products') {
                const campPath = path.join(BACKUP_DIR, 'campaigns.json');
                const campaigns = JSON.parse(fs.readFileSync(campPath, 'utf8'));
                const targetCampIds = new Set(campaigns.filter(c => TARGET_USERS.some(tu => tu.id === c.user_id)).map(c => c.id));
                filtered = data.filter(item => targetCampIds.has(item.campaign_id));
            } else {
                filtered = [];
            }

            if (filtered.length === 0) continue;

            console.log(`⏳ [${tableName}] Restoring ${filtered.length} records...`);

            for (const item of filtered) {
                const itemCols = Object.keys(item).filter(k => validCols.has(k));
                const values = itemCols.map(k => item[k]);
                const placeholders = itemCols.map((_, i) => `$${i + 1}`).join(', ');

                const query = `
                    INSERT INTO ${tableName} (${itemCols.join(', ')})
                    VALUES (${placeholders})
                    ON CONFLICT (id) DO UPDATE SET
                        ${itemCols.filter(k => k !== 'id').map(k => `${k} = EXCLUDED.${k}`).join(', ')}
                `;

                try {
                    await client.query(query, values);
                } catch (e) {
                    console.error(`❌ Error in ${tableName} (ID: ${item.id}):`, e.message);
                    console.error(`Query sample: ${query.substring(0, 100)}...`);
                    throw e;
                }
            }
        }

        await client.query('COMMIT');
        await client.query("SET session_replication_role = 'origin'");
        console.log('✅ UNIVERSAL RESTORATION COMPLETED!');

    } catch (err) {
        await client.query('ROLLBACK');
        await client.query("SET session_replication_role = 'origin'");
        console.error('❌ RESTORATION FAILED:', err.stack || err.message);
    } finally {
        client.release();
        await pool.end();
    }
}

restore();
