
import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function runMigration() {
    const client = await pool.connect();
    try {
        console.log('Checking users table for business_logo_url column...');

        // Check if column exists
        const checkRes = await client.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='users' AND column_name='business_logo_url';
        `);

        if (checkRes.rows.length === 0) {
            console.log('Column business_logo_url does not exist. Adding it...');
            await client.query(`ALTER TABLE users ADD COLUMN business_logo_url TEXT;`);
            console.log('Successfully added business_logo_url column.');
        } else {
            console.log('Column business_logo_url already exists. Skipping.');
        }

    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

runMigration();
