import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcryptjs';

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function testCreateUser() {
    try {
        const full_name = "Real Test User";
        // Unique email
        const rnd = Math.floor(Math.random() * 10000);
        const email = `realtest_${rnd}@test.com`;
        const password = "password123";
        const permissions = ["transactions.income.write", "dashboard.read"];

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password hashed successfully');

        console.log('Attempting INSERT with password_hash...');
        const result = await pool.query(
            `INSERT INTO users (full_name, email, password_hash, role, is_active, permissions)
             VALUES ($1, $2, $3, 'STAFF', true, $4)
             RETURNING id, full_name, email, role, is_active, permissions, created_at`,
            [full_name, email, hashedPassword, JSON.stringify(permissions)]
        );

        console.log('User created successfully:', result.rows[0]);

    } catch (err: any) {
        console.error('Error creating user:');
        console.log(JSON.stringify(err, null, 2));
    } finally {
        await pool.end();
    }
}

testCreateUser();
