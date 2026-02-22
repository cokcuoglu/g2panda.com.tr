const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function run() {
    try {
        console.log('--- RLS ISOLATION AUDIT ---');

        const tablesRes = await pool.query(`
            SELECT tablename, rowsecurity 
            FROM pg_tables 
            WHERE schemaname = 'public'
        `);

        console.log(`Auditing ${tablesRes.rows.length} tables...`);
        let alarms = 0;
        let warns = 0;

        for (const r of tablesRes.rows) {
            const table = r.tablename;
            const colRes = await pool.query(`
                SELECT column_name FROM information_schema.columns 
                WHERE table_name = $1 AND column_name = 'user_id'
            `, [table]);

            if (colRes.rows.length > 0) {
                if (!r.rowsecurity) {
                    console.log(`[ALARM] ${table.padEnd(25)}: RLS IS DISABLED but user_id is present!`);
                    alarms++;
                } else {
                    const polRes = await pool.query(`
                        SELECT policyname FROM pg_policies WHERE tablename = $1
                    `, [table]);
                    if (polRes.rows.length === 0) {
                        console.log(`[ALARM] ${table.padEnd(25)}: RLS IS ENABLED but NO POLICIES found!`);
                        alarms++;
                    }
                }
            }
        }
        console.log(`\nAudit Complete. Alarms: ${alarms}, Warns: ${warns}`);
    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}
run();
