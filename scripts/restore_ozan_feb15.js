const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const BACKUP_DIR = 'd:\\Personal_Project\\g2panda_release\\backups\\2026-02-15T21-00-00';
const TARGET_USERS = [
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
        console.log('🚀 Starting Restoration for Ozan Demirci (Feb 15 Backup)...');
        // Bypass FK checks
        await client.query("SET session_replication_role = 'replica'");
        await client.query('BEGIN');

        for (const tableName of TABLES_ORDER) {
            const filePath = path.join(BACKUP_DIR, `${tableName}.json`);
            if (!fs.existsSync(filePath)) {
                // console.warn(`⚠️ Backup file not found for ${tableName}`);
                continue;
            }

            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            console.log(`🔍 [${tableName}] Found ${data.length} total records in backup file.`);

            if (tableName === 'transactions' && data.length > 0) {
                const uniqueIds = [...new Set(data.slice(0, 100).map(item => item.user_id))];
                console.log(`   Sample user_ids from first 100 transactions: ${uniqueIds.join(', ')}`);
                console.log(`   Target ID to match: [${TARGET_USERS[0].id}]`);
            }

            // Get valid columns for current DB schema
            const colRes = await client.query(`
                SELECT column_name, data_type
                FROM information_schema.columns 
                WHERE table_name = $1
            `, [tableName]);

            const validCols = new Set(colRes.rows.map(r => r.column_name));
            const jsonCols = new Set(colRes.rows.filter(r => r.data_type.includes('json')).map(r => r.column_name));

            if (validCols.size === 0) {
                console.warn(`⚠️ Table ${tableName} not found in live DB, skipping.`);
                continue;
            }

            // Filtering logic
            let filtered;
            if (tableName === 'users') {
                filtered = data.filter(u => TARGET_USERS.some(tu => tu.id === u.id));
            } else if (validCols.has('user_id')) {
                filtered = data.filter(item => {
                    const match = TARGET_USERS.some(tu => tu.id === item.user_id);
                    return match;
                });
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
                console.log(`ℹ️ [${tableName}] No filtering logic defined, skipping.`);
                filtered = [];
            }

            if (filtered.length === 0) {
                console.log(`ℹ️ [${tableName}] No records to restore after filtering.`);
                continue;
            }

            console.log(`⏳ [${tableName}] Restoring ${filtered.length} records...`);

            for (const item of filtered) {
                const itemCols = Object.keys(item).filter(k => validCols.has(k));
                const values = itemCols.map(k => {
                    const val = item[k];
                    if (val !== null && typeof val === 'object') {
                        // If it's a JSON column, stringify it
                        if (jsonCols.has(k)) {
                            return JSON.stringify(val);
                        }
                        // Otherwise (like Postgres Arrays), let 'pg' handle it
                        return val;
                    }
                    return val;
                });
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
                    e.tableName = tableName;
                    console.error(`❌ Error in ${tableName} (ID: ${item.id}):`, e.message);
                    throw e;
                }
            }
        }

        await client.query('COMMIT');
        await client.query("SET session_replication_role = 'origin'");
        console.log('✅ RESTORATION COMPLETED SUCCESSFULLY!');

    } catch (err) {
        if (client) await client.query('ROLLBACK');
        await client.query("SET session_replication_role = 'origin'");
        console.error('❌ RESTORATION ERROR DETAILS:');
        console.error(`   Table: ${err.tableName || 'Unknown'}`);
        console.error(`   Message: ${err.message}`);
        if (err.detail) console.error(`   Detail: ${err.detail}`);
        if (err.hint) console.error(`   Hint: ${err.hint}`);
    } finally {
        if (client) client.release();
        await pool.end();
    }
}

restore();
