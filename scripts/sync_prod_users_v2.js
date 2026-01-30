const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const testDbUrl = process.env.DATABASE_URL;
const prodDbUrl = testDbUrl.replace('gg_esnaf_test', 'gg_esnaf');

const poolTest = new Pool({ connectionString: testDbUrl });
const poolProd = new Pool({ connectionString: prodDbUrl });

async function syncUsers() {
    try {
        console.log('Fetching users from PROD...');
        const prodRes = await poolProd.query('SELECT * FROM users');
        const users = prodRes.rows;
        console.log(`Found ${users.length} users in PROD.`);

        if (users.length === 0) {
            console.log('No users to sync.');
            return;
        }

        console.log('Clearing users in TEST...');
        await poolTest.query('TRUNCATE users CASCADE');

        console.log('Inserting users into TEST...');
        for (const user of users) {
            try {
                const cols = Object.keys(user);
                const vals = Object.values(user);

                // Debug log for first user
                if (user === users[0]) {
                    console.log('Sample User Keys:', cols);
                }

                // Quote columns to be safe
                const quotedCols = cols.map(c => '"' + c + '"').join(', ');
                const placeholders = cols.map((_, i) => `$${i + 1}`).join(', ');

                const query = `INSERT INTO users (${quotedCols}) VALUES (${placeholders})`;

                await poolTest.query(query, vals);
                console.log(`Synced user: ${user.email}`);
            } catch (insertErr) {
                console.error('Failed to insert user:', user.email, insertErr.message);
                console.error('Detail:', insertErr.detail);
            }
        }

        console.log('Sync V2 complete.');

    } catch (err) {
        console.error('Sync failed:', err);
    } finally {
        poolTest.end();
        poolProd.end();
    }
}

syncUsers();
