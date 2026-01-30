
const { pool } = require('../src/db');

async function migrate() {
    console.log('Starting migration: Add permissions column to users table...');
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Check if column exists
        const checkRes = await client.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='users' AND column_name='permissions'
        `);

        if (checkRes.rows.length === 0) {
            console.log('Column does not exist. Adding...');
            // Add column, default to empty JSON array
            await client.query(`
                ALTER TABLE users 
                ADD COLUMN permissions JSONB DEFAULT '[]'
            `);
            console.log('Column added successfully.');
        } else {
            console.log('Column already exists. Skipping.');
        }

        await client.query('COMMIT');
        console.log('Migration completed successfully.');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Migration failed:', error);
    } finally {
        client.release();
        pool.end(); // Close functionality
    }
}

migrate();
