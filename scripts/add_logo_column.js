
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function addColumn() {
    try {
        console.log('Adding business_logo_url column to users table...');

        // Check if column exists
        const checkRes = await pool.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='users' AND column_name='business_logo_url';
        `);

        if (checkRes.rows.length === 0) {
            await pool.query(`
                ALTER TABLE users 
                ADD COLUMN business_logo_url TEXT;
            `);
            console.log('Column business_logo_url added successfully.');
        } else {
            console.log('Column business_logo_url already exists.');
        }

    } catch (err) {
        console.error('Error adding column:', err);
    } finally {
        await pool.end();
    }
}

addColumn();
