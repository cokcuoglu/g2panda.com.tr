
const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

// Load env from project root
dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});


const fs = require('fs');
async function main() {
    const client = await pool.connect();
    const result = {};
    try {
        console.log('Fetching data...');
        const usersRes = await client.query('SELECT id, email, role, business_name FROM users');
        result.users = usersRes.rows;

        const catRes = await client.query(`
            SELECT user_id, type, COUNT(*) as count 
            FROM categories 
            WHERE deleted_at IS NULL 
            GROUP BY user_id, type
            ORDER BY user_id
        `);
        result.summary = catRes.rows;

        const allCats = await client.query('SELECT id, name, type, user_id, is_active FROM categories WHERE deleted_at IS NULL');
        result.categories = allCats.rows;

        fs.writeFileSync('diagnostic_result.json', JSON.stringify(result, null, 2));
        console.log('Done. Wrote to diagnostic_result.json');

    } catch (err) {
        console.error(err);
    } finally {
        client.release();
        await pool.end();
    }
}


main();
