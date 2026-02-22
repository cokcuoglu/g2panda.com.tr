const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const targetUserId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';

async function performDiagnosis() {
    try {
        console.log('--- Ozan Transaction Date Distribution ---');
        const dateRes = await pool.query(`
            SELECT transaction_date::DATE as t_date, count(*) 
            FROM transactions 
            WHERE user_id = $1 
            GROUP BY transaction_date::DATE 
            ORDER BY transaction_date::DATE DESC
        `, [targetUserId]);
        console.log(JSON.stringify(dateRes.rows, null, 2));

        console.log('\n--- Recent Audit Records (Last 15) ---');
        const auditRes = await pool.query(`
            SELECT performed_by, action, entity_type, created_at
            FROM audit_logs
            ORDER BY created_at DESC
            LIMIT 15
        `);
        console.log(JSON.stringify(auditRes.rows, null, 2));

    } catch (err) {
        console.error('ERROR:', err.message);
    } finally {
        await pool.end();
    }
}

performDiagnosis();
