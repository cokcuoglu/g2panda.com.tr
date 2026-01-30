import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkBusinessCol() {
    try {
        const res = await pool.query(`
            SELECT column_name, is_nullable, column_default
            FROM information_schema.columns 
            WHERE table_name = 'users' AND column_name IN ('business_name', 'currency', 'locale');
        `);
        res.rows.forEach(r => {
            console.log(`${r.column_name}: NULLABLE=${r.is_nullable}, DEFAULT=${r.column_default}`);
        });
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

checkBusinessCol();
