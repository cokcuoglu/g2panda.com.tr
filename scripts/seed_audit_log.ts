import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function seedLog() {
    try {
        console.log('Seeding one audit log...');
        // Get a user ID first to link it
        const userRes = await pool.query('SELECT id FROM users LIMIT 1');
        if (userRes.rows.length === 0) {
            console.log('No users found, cannot link log.');
            return;
        }
        const userId = userRes.rows[0].id;

        await pool.query(`
            INSERT INTO audit_logs (action, entity_type, entity_id, performed_by, details)
            VALUES ($1, $2, $3, $4, $5)
        `, ['system.init', 'system', '1', userId, JSON.stringify({ message: 'Audit system initialized' })]);

        console.log('Seeded successfully.');
    } catch (err) {
        console.error('Seed failed:', err);
    } finally {
        await pool.end();
    }
}

seedLog();
