import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkCols() {
    try {
        const targetCols = ['full_name', 'email', 'password_hash', 'role', 'is_active', 'permissions'];

        const res = await pool.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'users' 
            AND column_name = ANY($1)
        `, [targetCols]);

        const found = res.rows.map(r => r.column_name);
        console.log('Found columns:', found);

        const missing = targetCols.filter(c => !found.includes(c));
        console.log('MISSING columns:', missing);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

checkCols();
