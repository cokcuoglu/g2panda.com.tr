const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkPermissions() {
    try {
        const tables = ['products', 'menu_categories', 'categories', 'channels', 'users'];
        for (const table of tables) {
            console.log(`--- Permissions for table: ${table} ---`);
            const res = await pool.query(`
                SELECT grantee, privilege_type 
                FROM information_schema.role_table_grants 
                WHERE table_name = $1 AND grantee = 'app_user'
            `, [table]);
            console.log(JSON.stringify(res.rows, null, 2));
        }

        console.log('\n--- Current User / Role ---');
        const roleRes = await pool.query('SELECT current_user, session_user');
        console.log(JSON.stringify(roleRes.rows, null, 2));

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

checkPermissions();
