const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function grantPermissions() {
    console.log('Granting INSERT permissions to app_user...');
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Check if role 'app_user' exists
        // Just try granting, if it fails, it means role doesn't exist (which would be another issue)

        await client.query(`
            GRANT INSERT ON users TO app_user;
        `);
        console.log('Granted INSERT on users to app_user.');

        await client.query('COMMIT');
        console.log('Done.');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Grant failed:', error);
    } finally {
        client.release();
        pool.end();
    }
}

grantPermissions();
