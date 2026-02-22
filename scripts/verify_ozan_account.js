const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function testLogin() {
    const email = 'ozan.demirci28@gmail.com';
    const password = '...'; // I don't know his password, but I can check if he exists and hash matches something? 
    // Actually I can't test password without knowing it.

    try {
        console.log('--- User Info for Ozan ---');
        const res = await pool.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
        if (res.rows.length === 0) {
            console.log('User not found!');
            return;
        }
        const user = res.rows[0];
        console.log('ID:', user.id);
        console.log('Email:', user.email);
        console.log('Role:', user.role);
        console.log('Has Password Hash:', !!user.password_hash);

        // Let's check if there are multiple users with same email (unlikely but possible if LOWER was not enforced)
        const dupRes = await pool.query('SELECT id, email FROM users WHERE LOWER(email) = LOWER($1)', [email]);
        console.log('Total matches for lower(email):', dupRes.rows.length);
        console.log('Matches:', JSON.stringify(dupRes.rows, null, 2));

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

testLogin();
