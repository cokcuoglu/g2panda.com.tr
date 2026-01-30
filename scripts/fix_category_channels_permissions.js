
const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function main() {
    const client = await pool.connect();
    try {
        console.log('Fixing permissions for category_channels...');

        // Grant permissions to roles if they exist
        await client.query(`GRANT ALL ON category_channels TO authenticated;`).catch(e => console.log('Role authenticated ignored'));
        await client.query(`GRANT ALL ON category_channels TO app_admin;`).catch(e => console.log('Role app_admin may not exist or error'));
        await client.query(`GRANT ALL ON category_channels TO app_user;`).catch(e => console.log('Role app_user may not exist or error'));

        // Also enable RLS on the table if needed, but for now just permissions
        // If RLS is enabled on other tables, maybe we need it here too?
        // category_channels is a link table. It relies on category ownership.
        // We generally should ENABLE RLS and add a policy.

        console.log('Enabling RLS on category_channels...');
        await client.query(`ALTER TABLE category_channels ENABLE ROW LEVEL SECURITY;`);

        console.log('Adding RLS Policy...');
        // Policy: Users can see links if they can see the category
        await client.query(`
            DROP POLICY IF EXISTS category_channels_policy ON category_channels;
            CREATE POLICY category_channels_policy ON category_channels
                USING (
                    EXISTS (
                        SELECT 1 FROM categories c 
                        WHERE c.id = category_channels.category_id 
                        AND (
                            c.user_id = current_setting('app.current_user_id', true)::uuid
                            OR
                            c.user_id IS NULL
                        )
                    )
                )
                WITH CHECK (
                     EXISTS (
                        SELECT 1 FROM categories c 
                        WHERE c.id = category_channels.category_id 
                        AND c.user_id = current_setting('app.current_user_id', true)::uuid
                    )
                );
        `);

        console.log('Permissions and RLS fixed.');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

main();
