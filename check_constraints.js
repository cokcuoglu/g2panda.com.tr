const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkConstraints() {
    try {
        console.log('🔍 Listing Constraints for "transactions"...');
        const res = await pool.query(`
            SELECT conname, pg_get_constraintdef(oid) as def
            FROM pg_constraint
            WHERE conrelid = 'transactions'::regclass
        `);

        res.rows.forEach(r => console.log(`- ${r.conname}: ${r.def}`));
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

checkConstraints();
