import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkExpenses() {
    try {
        console.log('--- Last 5 Expenses ---');
        const res = await pool.query(`
            SELECT id, type, expense_type, amount, transaction_date, description, created_at 
            FROM transactions 
            WHERE type='expense' 
            ORDER BY created_at DESC 
            LIMIT 5
        `);
        console.table(res.rows);
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

checkExpenses();
