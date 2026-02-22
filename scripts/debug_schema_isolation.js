const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function debugSchema() {
    try {
        console.log('--- TABLES WITH user_id ---');
        const userIdRes = await pool.query(`
            SELECT table_name 
            FROM information_schema.columns 
            WHERE table_schema = 'public' 
              AND column_name = 'user_id'
            ORDER BY table_name;
        `);
        console.table(userIdRes.rows);

        console.log('\n--- TABLES WITHOUT user_id (Suspected Child Tables) ---');
        const noUserIdRes = await pool.query(`
            SELECT DISTINCT t.table_name
            FROM information_schema.tables t
            LEFT JOIN information_schema.columns c 
              ON t.table_name = c.table_name 
              AND c.column_name = 'user_id'
            WHERE t.table_schema = 'public'
              AND t.table_type = 'BASE TABLE'
              AND c.column_name IS NULL
            ORDER BY t.table_name;
        `);
        console.table(noUserIdRes.rows);

        console.log('\n--- FOREIGN KEYS FOR CHILD TABLES ---');
        const fkRes = await pool.query(`
            SELECT
                tc.table_name, 
                kcu.column_name, 
                ccu.table_name AS foreign_table_name,
                ccu.column_name AS foreign_column_name 
            FROM 
                information_schema.table_constraints AS tc 
                JOIN information_schema.key_column_usage AS kcu
                  ON tc.constraint_name = kcu.constraint_name
                  AND tc.table_schema = kcu.table_schema
                JOIN information_schema.constraint_column_usage AS ccu
                  ON ccu.constraint_name = tc.constraint_name
                  AND ccu.table_schema = tc.table_schema
            WHERE tc.constraint_type = 'FOREIGN KEY' 
              AND tc.table_schema = 'public'
              AND tc.table_name IN (
                SELECT DISTINCT t.table_name
                FROM information_schema.tables t
                LEFT JOIN information_schema.columns c 
                  ON t.table_name = c.table_name 
                  AND c.column_name = 'user_id'
                WHERE t.table_schema = 'public'
                  AND t.table_type = 'BASE TABLE'
                  AND c.column_name IS NULL
              )
            ORDER BY tc.table_name;
        `);
        console.table(fkRes.rows);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

debugSchema();
