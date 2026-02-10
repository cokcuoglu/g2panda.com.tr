const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkUserLogs() {
    try {
        console.log('🔍 Searching for user "ozan"...');

        // 1. Search User
        const userRes = await pool.query(`SELECT id, name, email FROM users WHERE name ILIKE '%ozan%' OR email ILIKE '%ozan%' LIMIT 5`);

        if (userRes.rows.length === 0) {
            console.log('❌ No users found matching "ozan".');
        } else {
            console.log('✅ Users Found:', userRes.rows);

            // 2. Check for Log Tables
            console.log('\n🔍 Checking for Log Tables...');
            const tablesRes = await pool.query(`
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND (table_name ILIKE '%log%' OR table_name ILIKE '%history%' OR table_name ILIKE '%audit%')
            `);

            console.log('Potential Log Tables:', tablesRes.rows.map(r => r.table_name));

            // 3. Query Log Tables for these users
            for (const user of userRes.rows) {
                console.log(`\n--- Checking logs for ${user.name} (${user.id}) ---`);
                for (const table of tablesRes.rows) {
                    try {
                        const tableName = table.table_name;
                        // Check if user_id column exists
                        // We'll just try to query and catch error if column doesn't exist
                        const logRes = await pool.query(`SELECT * FROM ${tableName} WHERE user_id = $1 ORDER BY created_at DESC LIMIT 3`, [user.id]);
                        if (logRes.rows.length > 0) {
                            console.log(`  Found in ${tableName}:`, logRes.rows);
                        } else {
                            console.log(`  No entries in ${tableName}`);
                        }
                    } catch (e) {
                        // console.log(`  (Skipping ${table.table_name}: ${e.message.split('\n')[0]})`);
                    }
                }
            }
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

checkUserLogs();
