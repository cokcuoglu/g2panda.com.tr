
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
        console.log('Searching for user "test3"...');
        const userRes = await client.query(`SELECT id, email, full_name, role FROM users WHERE full_name ILIKE '%test3%' OR email ILIKE '%test3%'`);

        if (userRes.rows.length === 0) {
            console.log('User test3 not found. Listing all users:');
            const allUsers = await client.query('SELECT id, full_name FROM users');
            console.table(allUsers.rows);
            return;
        }

        const user = userRes.rows[0];
        console.log('Found User:', user);

        console.log(`Checking categories for user_id: ${user.id}`);
        const catCount = await client.query('SELECT COUNT(*) FROM categories WHERE user_id = $1 AND deleted_at IS NULL', [user.id]);
        console.log('Category Count for this user:', catCount.rows[0].count);

        if (parseInt(catCount.rows[0].count) === 0) {
            console.log('User has NO categories. This explains why list is empty.');
            // Check if there are categories with NULL user_id (global?)
            const nullUserCats = await client.query('SELECT COUNT(*) FROM categories WHERE user_id IS NULL');
            console.log('Categories with NULL user_id:', nullUserCats.rows[0].count);
        }

    } catch (err) {
        console.error('Query Failed:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

main();
