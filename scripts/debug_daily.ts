import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkDaily() {
    try {
        console.log('Checking transactions schema...');
        const schema = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'transactions' AND column_name = 'transaction_date'
        `);
        console.log('transaction_date type:', schema.rows[0]);

        console.log('Running Daily Total Query...');
        const res = await pool.query(`
            SELECT SUM(amount) as total 
            FROM transactions 
            WHERE type = 'income' 
            AND deleted_at IS NULL 
            AND transaction_date = CURRENT_DATE 
        `);
        console.log('Query Result:', res.rows[0]);

        console.log('Checking recent transactions:');
        const recent = await pool.query(`
            SELECT id, amount, transaction_date, created_at 
            FROM transactions 
            WHERE type = 'income' 
            ORDER BY created_at DESC LIMIT 5
        `);
        console.log(recent.rows);

    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

checkDaily();
