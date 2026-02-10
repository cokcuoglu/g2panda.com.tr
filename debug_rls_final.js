const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('sslmode=require') ? { rejectUnauthorized: false } : false
});

async function debugFinal() {
    let client;
    try {
        const userId = 'be8b8541-f427-4287-a00b-a0e9783e5209'; // test3

        // 1. Dump Policies
        const pols = await pool.query(`
            SELECT tablename, policyname, permissive, roles, cmd, qual, with_check 
            FROM pg_policies 
            WHERE tablename IN ('categories', 'channels', 'products')
        `);
        console.log('--- ALL POLICIES ---');
        console.log(JSON.stringify(pols.rows, null, 2));

        // 2. Dump Categories Metadata (Superuser)
        const cats = await pool.query(`
            SELECT id, user_id, deleted_at 
            FROM categories 
            WHERE user_id = $1
        `, [userId]);
        console.log(`--- CATEGORIES METADATA (${cats.rows.length}) ---`);
        console.log(JSON.stringify(cats.rows, null, 2));

        // 3. Check App User Role
        const role = await pool.query(`
            SELECT rolname, rolbypassrls, rolsuper 
            FROM pg_roles 
            WHERE rolname = 'app_user'
        `);
        console.log('--- ROLE ---');
        console.log(JSON.stringify(role.rows, null, 2));

    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

debugFinal();
