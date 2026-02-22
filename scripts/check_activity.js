const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkRecentActivity() {
    try {
        console.log('--- Recent Audit Logs (Last 20) ---');
        // Joining with users to see who is acting. 
        // Note: audit_logs doesn't have user_id? Let's check schema.
        const res = await pool.query(`
            SELECT a.*, u.full_name as user_name
            FROM audit_logs a
            LEFT JOIN users u ON a.user_id = u.id
            ORDER BY a.created_at DESC
            LIMIT 20
        `);
        console.log(JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error('ERROR:', err.message);
        // Fallback: check if audit_logs exists or what columns it has
        const cols = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'audit_logs'");
        console.log('Audit logs columns:', cols.rows.map(r => r.column_name));
    } finally {
        await pool.end();
    }
}

checkRecentActivity();
