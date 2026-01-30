
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
    try {
        const res = await pool.query("SELECT conname, pg_get_constraintdef(oid) as def FROM pg_constraint WHERE conrelid = 'users'::regclass");
        console.log('Constraints:', res.rows.map(r => `${r.conname}: ${r.def}`).join('\n'));
    } catch (e) {
        console.error(e);
    } finally {
        pool.end();
    }
}
check();
