const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function migrate() {
    console.log('Starting migration: Add is_active column...');
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Check if column exists
        const checkRes = await client.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='users' AND column_name='is_active'
        `);

        if (checkRes.rows.length === 0) {
            console.log('Column is_active does not exist. Adding...');
            await client.query(`
                ALTER TABLE users 
                ADD COLUMN is_active BOOLEAN DEFAULT true
            `);
            console.log('Column added successfully.');
        } else {
            console.log('Column already exists.');
        }

        await client.query('COMMIT');
        console.log('Done.');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Migration failed:', error);
    } finally {
        client.release();
        pool.end();
    }
}

migrate();
