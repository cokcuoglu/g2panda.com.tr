
import { Pool } from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function seed() {
    try {
        const hashedPassword = await bcrypt.hash('dev', 10);

        // Upsert user dev
        const res = await pool.query(`
            INSERT INTO users (email, password_hash, full_name, role)
            VALUES ($1, $2, $3, 'superadmin')
            ON CONFLICT (email) 
            DO UPDATE SET password_hash = $2, role = 'superadmin'
            RETURNING id, email, role
        `, ['dev', hashedPassword, 'Developer']);

        console.log('Super Admin User Created/Updated:', res.rows[0]);

    } catch (e) {
        console.error('Error seeding superadmin:', e);
    } finally {
        pool.end();
    }
}

seed();
