const { pool } = require('./src/db');

async function checkUserIds() {
    try {
        console.log('--- DISTINCT USER IDS IN TRANSACTIONS ---');
        const res = await pool.query('SELECT DISTINCT user_id FROM transactions LIMIT 5');
        console.log('Distinct user_ids:');
        res.rows.forEach(r => console.log(`  ${r.user_id}`));

        console.log('\n--- CHECKING IF TEST UUID EXISTS ---');
        const testId = 'a3dbd896-7640-4228-86d4-83e9783e5209';
        const check = await pool.query('SELECT COUNT(*) FROM transactions WHERE user_id = $1', [testId]);
        console.log(`Transactions for ${testId}: ${check.rows[0].count}`);

    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

checkUserIds();
