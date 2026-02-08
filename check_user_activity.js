const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkActivity() {
    const userId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';
    try {
        console.log('--- User Schema ---');
        const schemaRes = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users'
    `);
        console.log(schemaRes.rows.map(r => r.column_name).join(', '));

        console.log('\n--- Transactions Today ---');
        const txRes = await pool.query(`
      SELECT id, transaction_date, amount, type, created_at 
      FROM transactions 
      WHERE user_id = $1 
      ORDER BY created_at DESC 
      LIMIT 5
    `, [userId]);
        console.log(JSON.stringify(txRes.rows, null, 2));

        console.log('\n--- Audit Logs (if table exists) ---');
        try {
            const auditRes = await pool.query(`
            SELECT * FROM audit_logs 
            WHERE user_id = $1 
            ORDER BY created_at DESC 
            LIMIT 5
        `, [userId]);
            console.log(JSON.stringify(auditRes.rows, null, 2));
        } catch (e) {
            console.log('Audit logs table likely does not exist or error:', e.message);
        }

    } catch (e) {
        console.error(e);
    } finally {
        pool.end();
    }
}

checkActivity();
