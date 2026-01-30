import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// Load env from root
dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkUser() {
    try {
        const res = await pool.query("SELECT * FROM users WHERE email = 'caner@test.com'");
        console.log('User found:', res.rows.length > 0);
        if (res.rows.length > 0) {
            console.log('User details:', res.rows[0]);
        }
    } catch (err) {
        console.error('Error querying database:', err);
    } finally {
        await pool.end();
    }
}

checkUser();
