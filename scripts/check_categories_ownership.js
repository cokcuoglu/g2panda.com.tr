
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
        console.log('Checking Users...');
        const usersRes = await client.query('SELECT id, email, role, full_name FROM users');
        console.table(usersRes.rows);

        console.log('\nChecking Categories Ownership...');
        const catRes = await client.query('SELECT id, name, type, user_id FROM categories WHERE deleted_at IS NULL');
        console.table(catRes.rows);

        if (catRes.rows.length === 0) {
            console.log('NO CATEGORIES FOUND!');
        } else {
            // Check if categories have valid user_ids relating to existing users
            const validOwnership = catRes.rows.every(c => usersRes.rows.some(u => u.id === c.user_id));
            console.log('All categories belong to existing users?', validOwnership);
        }

    } catch (err) {
        console.error('Query Failed:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

main();
