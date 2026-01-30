import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkGenerated() {
    try {
        const res = await pool.query(`
            SELECT column_name, is_generated, generation_expression
            FROM information_schema.columns 
            WHERE table_name = 'users';
        `);
        console.log(JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

checkGenerated();
