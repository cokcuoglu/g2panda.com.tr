
import { pool } from './src/db';

async function migrate() {
    try {
        console.log('Migrating...');
        await pool.query(`
            ALTER TABLE tables 
            ADD COLUMN IF NOT EXISTS service_request text DEFAULT null;
        `);
        console.log('Migration successful: Added service_request to tables.');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        process.exit();
    }
}

migrate();
