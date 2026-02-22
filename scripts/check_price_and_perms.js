const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkPriceType() {
    try {
        const res = await pool.query(`
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_name = 'products' AND column_name = 'price'
        `);
        console.log('Price column:', JSON.stringify(res.rows, null, 2));

        const permRes = await pool.query(`
            SELECT privilege_type 
            FROM information_schema.role_table_grants 
            WHERE table_name = 'products' AND grantee = 'app_user'
        `);
        console.log('App user perms:', JSON.stringify(permRes.rows, null, 2));

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

checkPriceType();
