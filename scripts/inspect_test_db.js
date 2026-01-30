const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function inspect() {
    try {
        console.log('Connected to:', process.env.DATABASE_URL);

        // Check User Count
        const countRes = await pool.query('SELECT count(*) FROM users');
        console.log('User Count in Test DB:', countRes.rows[0].count);

        // Check Columns
        const colRes = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'users'
        `);
        console.log('Columns in Users table:', colRes.rows.map(r => r.column_name).join(', '));

    } catch (err) {
        console.error('Inspect failed:', err);
    } finally {
        pool.end();
    }
}

inspect();
