
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function addPermissionsColumn() {
    try {
        console.log('Adding permissions column to users table...');

        // Check if column exists
        const checkRes = await pool.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='users' AND column_name='permissions';
        `);

        if (checkRes.rows.length === 0) {
            await pool.query(`
                ALTER TABLE users 
                ADD COLUMN permissions TEXT[];
            `);
            console.log('Column permissions added successfully.');
        } else {
            console.log('Column permissions already exists.');
        }

    } catch (err) {
        console.error('Error adding column:', err);
    } finally {
        await pool.end();
    }
}

addPermissionsColumn();
