import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkAll() {
    try {
        console.log('--- Last 5 Transactions (ANY Type) ---');
        const res = await pool.query(`
            SELECT id, type, expense_type, amount, transaction_date, description, created_at 
            FROM transactions 
            ORDER BY created_at DESC 
            LIMIT 5
        `);
        console.log(JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

checkAll();
