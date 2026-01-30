
const { Pool } = require('pg');
require('dotenv').config();
const bcrypt = require('bcryptjs');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function seed() {
    try {
        const hashedPassword = await bcrypt.hash('dev', 10);

        // Check if user exists
        const checkRes = await pool.query('SELECT id FROM users WHERE email = $1', ['dev@dev.com']);

        let res;
        if (checkRes.rows.length > 0) {
            // Update
            console.log('User exists, updating...');
            res = await pool.query(`
                UPDATE users 
                SET password_hash = $2, role = 'superadmin', full_name = 'Developer'
                WHERE email = $1
                RETURNING id, email, role
            `, ['dev@dev.com', hashedPassword]);
        } else {
            // Insert
            console.log('User does not exist, inserting...');
            res = await pool.query(`
                INSERT INTO users (email, password_hash, full_name, role)
                VALUES ($1, $2, 'Developer', 'superadmin')
                RETURNING id, email, role
            `, ['dev@dev.com', hashedPassword]);
        }

        console.log('Super Admin User Created/Updated:', res.rows[0]);

    } catch (e) {
        console.error('Error seeding superadmin:', e.message);
        console.error(e.stack);
        if (e.code) console.error('Error Code:', e.code);
    } finally {
        pool.end();
    }
}

seed();
