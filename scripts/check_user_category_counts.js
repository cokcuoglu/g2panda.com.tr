
const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function main() {
    const client = await pool.connect();
    try {
        console.log('User Category Counts:');
        const res = await client.query(`
            SELECT u.email, u.id, COUNT(c.id) as category_count
            FROM users u
            LEFT JOIN categories c ON u.id = c.user_id AND c.deleted_at IS NULL
            GROUP BY u.id, u.email
        `);
        console.table(res.rows);

    } catch (err) {
        console.error('Query Failed:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

main();
