const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function run() {
    try {
        console.log('--- RLS ISOLATION AUDIT ---');

        // 1. Get all tables in public schema
        const tablesRes = await pool.query(`
            SELECT tablename, rowsecurity 
            FROM pg_tables 
            WHERE schemaname = 'public'
        `);

        for (const r of tablesRes.rows) {
            const table = r.tablename;

            // Check if it has user_id
            const colRes = await pool.query(`
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = $1 
                AND column_name = 'user_id'
            `, [table]);

            if (colRes.rows.length > 0) {
                if (!r.rowsecurity) {
                    console.log(`[ALARM] ${table.padEnd(25)}: RLS IS DISABLED but user_id is present!`);
                } else {
                    // Check if policy exists
                    const polRes = await pool.query(`
                        SELECT policyname FROM pg_policies WHERE tablename = $1
                    `, [table]);
                    if (polRes.rows.length === 0) {
                        console.log(`[ALARM] ${table.padEnd(25)}: RLS IS ENABLED but NO POLICIES found! (Deny all by default)`);
                    } else {
                        // Check if it's the standard isolation policy
                        const isoPol = polRes.rows.find(p => p.policyname.includes('isolation'));
                        if (!isoPol) {
                            console.log(`[WARN]  ${table.padEnd(25)}: RLS enabled, but no 'isolation' policy found. Custom policies: ${polRes.rows.map(p => p.policyname).join(', ')}`);
                        }
                    }
                }
            }
        }
    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}
run();
