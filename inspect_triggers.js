const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function inspectTriggers() {
    try {
        const client = await pool.connect();

        console.log('--- Triggers ---');
        const triggers = await client.query(`
            SELECT event_object_table, trigger_name, action_statement, action_timing
            FROM information_schema.triggers
            WHERE event_object_schema = 'public'
        `);
        console.table(triggers.rows);

        console.log('\n--- Functions ---');
        // List user-def functions to see if any update 'tables'
        const funcs = await client.query(`
            SELECT routine_name, routine_definition
            FROM information_schema.routines
            WHERE routine_schema = 'public'
            AND routine_definition ILIKE '%service_request%'
        `);
        console.table(funcs.rows);

        client.release();
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

inspectTriggers();
