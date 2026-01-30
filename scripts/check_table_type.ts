import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkTableType() {
    try {
        const res = await pool.query(`
            SELECT table_name, table_type 
            FROM information_schema.tables 
            WHERE table_name = 'users';
        `);
        console.log('TABLE TYPE:', JSON.stringify(res.rows));

        const triggers = await pool.query(`
            SELECT trigger_name, action_statement 
            FROM information_schema.triggers 
            WHERE event_object_table = 'users';
        `);
        console.log('TRIGGERS:', JSON.stringify(triggers.rows));
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

checkTableType();
