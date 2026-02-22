const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function checkGrants() {
    try {
        const res = await pool.query(`
            SELECT table_name, privilege_type 
            FROM information_schema.role_table_grants 
            WHERE grantee = 'app_user' 
            AND table_schema = 'public'
            ORDER BY table_name, privilege_type
        `);
        console.log(`Found ${res.rows.length} grants for 'app_user'.`);
        const tables = {};
        res.rows.forEach(row => {
            if (!tables[row.table_name]) tables[row.table_name] = [];
            tables[row.table_name].push(row.privilege_type);
        });
        console.log(JSON.stringify(tables, null, 2));
    } catch (err) {
        console.error('Error checking grants:', err);
    } finally {
        await pool.end();
    }
}

checkGrants();
