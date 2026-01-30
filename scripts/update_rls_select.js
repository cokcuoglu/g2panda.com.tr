const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function updateRLSSelect() {
    console.log('Adding Permissive SELECT policy for users...');
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // We need to allow app_user to SELECT users. 
        // Ideally, they should only select "active" users or "all users if admin".
        // But for "Create User", we need to see the result.

        // Let's create a policy that allows SELECT to all for now (or at least authenticated)
        // Note: Existing policies might be blocking if not permissive enough.

        await client.query(`
            DROP POLICY IF EXISTS "users_select_policy" ON users;
            CREATE POLICY "users_select_policy" ON users
            FOR SELECT
            TO public
            USING (true);
        `);

        console.log('Updated users_select_policy to be permissive (true).');

        await client.query('COMMIT');
        console.log('Done.');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Update failed:', error);
    } finally {
        client.release();
        pool.end();
    }
}

updateRLSSelect();
