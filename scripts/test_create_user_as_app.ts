import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcryptjs';

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function testCreateUserAsAppUser() {
    const client = await pool.connect();
    try {
        const full_name = "Real Test AppUser";
        const rnd = Math.floor(Math.random() * 10000);
        const email = `appuser_${rnd}@test.com`;
        const password = "password123";
        const permissions = ["transactions.income.write", "dashboard.read"];

        const hashedPassword = await bcrypt.hash(password, 10);

        console.log('--- Simulating Middleware ---');
        await client.query('BEGIN');
        await client.query('SET LOCAL ROLE app_user');
        // Simulate an existing admin user making the request (uuid-like for safety)
        const fakeAdminId = '00000000-0000-0000-0000-000000000000';
        await client.query(`SELECT set_config('app.current_user_id', $1, true)`, [fakeAdminId]);
        console.log('Role set to app_user, RLS config set.');

        console.log('Attempting INSERT...');
        const result = await client.query(
            `INSERT INTO users (full_name, email, password_hash, role, is_active, permissions)
             VALUES ($1, $2, $3, 'STAFF', true, $4)
             RETURNING id, full_name, email, role, is_active, permissions, created_at`,
            [full_name, email, hashedPassword, JSON.stringify(permissions)]
        );

        console.log('User created successfully:', result.rows[0]);
        await client.query('COMMIT');

    } catch (err: any) {
        await client.query('ROLLBACK');
        console.error('Error creating user as app_user:');
        console.log(JSON.stringify(err, null, 2));
    } finally {
        client.release();
        await pool.end();
    }
}

testCreateUserAsAppUser();
