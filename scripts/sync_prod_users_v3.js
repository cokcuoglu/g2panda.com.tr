const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const testDbUrl = process.env.DATABASE_URL;
// Check if URL is correct (gg_esnaf_test)
if (!testDbUrl.includes('gg_esnaf_test')) {
    console.warn('WARNING: DATABASE_URL does not look like Test DB:', testDbUrl);
}

const prodDbUrl = testDbUrl.replace('gg_esnaf_test', 'gg_esnaf');

const poolTest = new Pool({ connectionString: testDbUrl });
const poolProd = new Pool({ connectionString: prodDbUrl });

async function syncUsersSmart() {
    try {
        console.log('Fetching Test DB Schema...');
        const schemaRes = await poolTest.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'users'
        `);
        const validColumns = new Set(schemaRes.rows.map(r => r.column_name));
        console.log(`Valid columns in Test users table: ${[...validColumns].join(', ')}`);

        console.log('Fetching users from PROD...');
        const prodRes = await poolProd.query('SELECT * FROM users');
        const users = prodRes.rows;
        console.log(`Found ${users.length} users in PROD.`);

        if (users.length === 0) return;

        console.log('Clearing users in TEST...');
        await poolTest.query('TRUNCATE users CASCADE');

        console.log('Inserting users into TEST (Filtering columns)...');
        let successCount = 0;

        for (const user of users) {
            const userCols = Object.keys(user);
            const filteredCols = userCols.filter(col => validColumns.has(col));
            const filteredVals = filteredCols.map(col => user[col]);

            if (filteredCols.length === 0) {
                console.warn('Skipping user with no matching columns:', user.id);
                continue;
            }

            const quotedCols = filteredCols.map(c => '"' + c + '"').join(', ');
            const placeholders = filteredCols.map((_, i) => `$${i + 1}`).join(', ');
            const query = `INSERT INTO users (${quotedCols}) VALUES (${placeholders})`;

            try {
                await poolTest.query(query, filteredVals);
                successCount++;
            } catch (insertErr) {
                console.error(`Failed to insert user ${user.email || 'unknown'}:`, insertErr.message);
            }
        }

        console.log(`Sync V3 complete. Successfully synced ${successCount}/${users.length} users.`);

    } catch (err) {
        console.error('Fatal Sync Error:', err);
    } finally {
        poolTest.end();
        poolProd.end();
    }
}

syncUsersSmart();
