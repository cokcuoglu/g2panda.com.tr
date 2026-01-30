import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkRules() {
    try {
        const res = await pool.query(`
            SELECT * FROM pg_rules WHERE tablename = 'users';
        `);
        console.log('RULES:', JSON.stringify(res.rows));
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

checkRules();
