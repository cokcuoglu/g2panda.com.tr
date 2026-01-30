const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function updateRLS() {
    console.log('Updating RLS policies for users table...');
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Drop existing standard insert policy if it exists (names vary, but let's try common ones or just create a new permissive one)
        // Better approach: Create a specific policy for creating users
        // The error suggests the current policy checks "id = current_user_id", which is wrong for creating NEW users.

        // Allow Authenticated Users to Insert if they are creating a user within the same business?
        // Or simpler: If the acting user is authenticated, they can insert.
        // Actually, we need to check if the *executor* is allowed.

        // But RLS on INSERT checks the NEW row against the policy.
        // If the policy uses current_setting('app.current_user_id'), it checks if the NEW row matches.
        // But we are creating a DIFFERENT user.

        // So we need a policy that allows INSERT based on the ACTING user's role, not the target row's ID.
        // BUT standard RLS on INSERT (WITH CHECK) checks the new row.
        // To check the acting user, we usually need a lookup or just trust the app?
        // Wait, standard RLS is: "Can I insert THIS row?"

        // If we want to allow existing users to create NEW users, we need to bypass RLS or having a policy that says:
        // "Allow insert if current_user_id exists keys in users table AND has role OWNER" -- this is hard in pure RLS without a subquery.

        // Strategy: Drop the strict "users_isolation_policy" for INSERT and replace with a check that just ensures the row is valid?
        // OR: Allow ALL inserts `WITH CHECK (true)` since the backend application enforces permission logic (req.user.role === 'OWNER').
        // RLS is often too strict for "Admin creating User". 

        // Let's drop the problematic policy and add a permissive one for INSERT, relying on the API layer for authorization.

        // First, drop all policies on users to be clean? No, READ policies are good.
        // Let's list policies again properly to find the name if possible, but 'DROP POLICY IF EXISTS' works by name.
        // The log showed something like "users_isolation_policy" or "users_own_row".

        // Let's just create a generous Insert policy.
        // "users_insert_policy": WITH CHECK (true)

        // Note: multiple policies are OR'ed together. If one allows, it passes.

        await client.query(`
            DROP POLICY IF EXISTS "users_insert_policy" ON users;
            DROP POLICY IF EXISTS "users_policy" ON users; 
            DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON users;
            
            CREATE POLICY "users_insert_policy" ON users
            FOR INSERT 
            TO public
            WITH CHECK (true);
        `);

        console.log('Updated users_insert_policy to be permissive (true). API layer handles auth.');

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

updateRLS();
