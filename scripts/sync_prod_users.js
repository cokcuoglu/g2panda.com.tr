const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Current env is TEST (gg_esnaf_test)
const testDbUrl = process.env.DATABASE_URL;
// Derive PROD (gg_esnaf)
const prodDbUrl = testDbUrl.replace('gg_esnaf_test', 'gg_esnaf');

const poolTest = new Pool({ connectionString: testDbUrl });
const poolProd = new Pool({ connectionString: prodDbUrl });

async function syncUsers() {
    try {
        console.log('Fetching users from PROD...');
        const prodRes = await poolProd.query('SELECT * FROM users');
        const users = prodRes.rows;
        console.log(`Found ${users.length} users in PROD.`);

        console.log('Clearing users in TEST...');
        // Cascade to remove related data (products, menu_categories etc) which belong to old user IDs (if any)
        await poolTest.query('TRUNCATE users CASCADE');

        console.log('Inserting users into TEST...');
        for (const user of users) {
            const cols = Object.keys(user);
            const vals = Object.values(user);
            const quotedCols = cols.map(c => '"' + c + '"').join(', ');
            const placeholders = cols.map((_, i) => `$${i + 1}`).join(', ');

            const query = "INSERT INTO users (" + quotedCols + ") VALUES (" + placeholders + ")";
            await poolTest.query(query, vals);
        }

        console.log('Sync complete.');

    } catch (err) {
        console.error('Sync failed:', err);
    } finally {
        poolTest.end();
        poolProd.end();
    }
}

syncUsers();
