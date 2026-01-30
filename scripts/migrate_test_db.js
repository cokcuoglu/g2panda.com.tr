const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Target the NEW test database
const testDbUrl = process.env.DATABASE_URL.replace('gg_esnaf', 'gg_esnaf_test');
const pool = new Pool({
    connectionString: testDbUrl
});

async function runCompleteMigration() {
    const client = await pool.connect();
    try {
        console.log(`Connected to ${testDbUrl}... Applying ALL migrations.`);

        // Read all SQL files appropriately sorted
        const dbDir = path.resolve(__dirname, '../database');
        const files = fs.readdirSync(dbDir)
            .filter(f => f.endsWith('.sql') && !f.startsWith('create_rls_functions') && !f.startsWith('test')) // exclude specific files if needed
            .sort((a, b) => {
                // Ensure numbered files sort correctly (01, 02, 10)
                const numA = parseInt(a.split('_')[0]) || 999;
                const numB = parseInt(b.split('_')[0]) || 999;
                return numA - numB;
            });

        // Specific order fix if needed, but numbering should handle it.
        // Files found (from previous list_dir):
        // 01_schema.sql, 02..., ... 14_..., 15..., 16_fix_menu_rls.sql (Wait, 16 exists?)
        // I created 16_fix_menu_rls.sql in previous turn, but I should check if it's in the folder.
        // Yes, I wrote it.

        for (const file of files) {
            console.log(`Migrating: ${file}`);
            const sqlPath = path.join(dbDir, file);
            const sql = fs.readFileSync(sqlPath, 'utf8');
            try {
                await client.query(sql);
            } catch (queryErr) {
                console.warn(`Warning in ${file}: ${queryErr.message}`);
                // Proceed? Some might duplicate "CREATE TABLE IF NOT EXISTS" which is fine.
                // But "INSERT" might fail if unique.
                // Since it's a fresh DB, failures shouldn't happen unless dependencies are wrong.
            }
        }

        console.log('Complete migration finished.');

    } catch (err) {
        console.error('Migration Fatal Error:', err);
    } finally {
        client.release();
        pool.end();
    }
}

runCompleteMigration();
