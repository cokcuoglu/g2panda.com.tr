const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function runFullDiagnosis() {
    try {
        console.log('--- USER TABLE SNAPSHOT ---');
        const users = await pool.query('SELECT id, full_name, email, role FROM users');
        console.table(users.rows);

        const ozanId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';

        console.log('\n--- OZAN DATA CHECK ---');
        const txCount = await pool.query('SELECT count(*) FROM transactions WHERE user_id = $1', [ozanId]);
        const catCount = await pool.query('SELECT count(*) FROM categories WHERE user_id = $1', [ozanId]);
        console.log(`Transactions: ${txCount.rows[0].count}, Categories: ${catCount.rows[0].count}`);

        const dateDist = await pool.query(`
            SELECT transaction_date::DATE as date, count(*) 
            FROM transactions 
            WHERE user_id = $1 
            GROUP BY 1 
            ORDER BY 1 DESC
        `, [ozanId]);
        console.log('Date Distribution for Ozan:');
        console.table(dateDist.rows);

        console.log('\n--- RECENT ACTIVITY & ACTIVE ROLE ---');
        const audit = await pool.query(`
            SELECT a.performed_by, a.action, a.entity_type, a.created_at
            FROM audit_logs a
            ORDER BY a.created_at DESC
            LIMIT 10
        `);
        console.table(audit.rows);

        // Find the name of the user who performed the latest actions
        if (audit.rows.length > 0) {
            const activeId = audit.rows[0].performed_by;
            const activeUser = await pool.query('SELECT full_name, email FROM users WHERE id::text = $1', [activeId]);
            if (activeUser.rows.length > 0) {
                console.log(`\n🚨 CURRENT ACTIVE USER IN LOGS: ${activeUser.rows[0].full_name} (${activeUser.rows[0].email})`);
                console.log(`   Ozan's ID: ${ozanId}`);
                console.log(`   Active ID: ${activeId}`);
                if (activeId !== ozanId) {
                    console.log('   ⚠️ IDENTITY MISMATCH: The active user doesn\'t match the restored data owner.');
                    console.log('   This is why the report is empty due to RLS.');
                }
            }
        }

    } catch (err) {
        console.error('ERROR:', err.message);
    } finally {
        await pool.end();
    }
}

runFullDiagnosis();
