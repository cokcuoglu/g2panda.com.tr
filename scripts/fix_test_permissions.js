const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL // Should be .../gg_esnaf_test now
});

async function fixPermissions() {
    const client = await pool.connect();
    try {
        console.log('Fixing permissions for app_user on gg_esnaf_test...');

        // 1. Grant Connect
        await client.query('GRANT CONNECT ON DATABASE gg_esnaf_test TO app_user');

        // 2. Grant Schema Usage
        await client.query('GRANT USAGE ON SCHEMA public TO app_user');

        // 3. Grant Table Privileges
        await client.query('GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO app_user');

        // 4. Grant Sequence Privileges (for ID generation/serial)
        await client.query('GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO app_user');

        console.log('Permissions granted successfully.');

    } catch (err) {
        console.error('Permission Fix Failed:', err);
    } finally {
        client.release();
        pool.end();
    }
}

fixPermissions();
