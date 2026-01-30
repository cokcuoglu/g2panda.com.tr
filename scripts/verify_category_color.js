const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function runTest() {
    const client = await pool.connect();
    try {
        console.log('Testing Category Color persistence...');

        // 1. Setup User and Context
        await client.query('BEGIN');

        // Use a fixed UUID for testing 
        const userId = '00000000-0000-0000-0000-000000000001';
        // Create user if not exists 
        await client.query(`INSERT INTO users (id, email, password_hash, full_name, role) 
            VALUES ($1, 'test_color@example.com', 'hash', 'Color Tester', 'subscription_user')
            ON CONFLICT (id) DO NOTHING`, [userId]);

        // Set RLS Context
        await client.query('SET LOCAL ROLE app_user');
        await client.query(`SELECT set_config('app.current_user_id', $1, true)`, [userId]);

        // 2. Insert Category with Color
        const color = '#ff0000';
        console.log(`Inserting Category with color ${color}...`);
        const catRes = await client.query(`
            INSERT INTO categories (name, type, color, user_id)
            VALUES ('Color Cat', 'expense', $1, $2)
            RETURNING id, color
        `, [color, userId]);

        const cat = catRes.rows[0];
        console.log('Category Created:', cat);

        if (cat.color === color) {
            console.log('SUCCESS: Color persisted correctly.');
        } else {
            console.error(`FAILURE: Expected ${color}, got ${cat.color}`);
        }

        // 3. Update Category with new Color
        const newColor = '#00ff00';
        console.log(`Updating Category to color ${newColor}...`);
        const upRes = await client.query(`
            UPDATE categories SET color = $1 WHERE id = $2 RETURNING id, color
        `, [newColor, cat.id]);

        const upCat = upRes.rows[0];
        console.log('Category Updated:', upCat);

        if (upCat.color === newColor) {
            console.log('SUCCESS: Color updated correctly.');
        } else {
            console.error(`FAILURE: Expected ${newColor}, got ${upCat.color}`);
        }

        await client.query('ROLLBACK');
        console.log('Test Finished (Rolled back).');

    } catch (err) {
        console.error('Test Failed:', err);
        await client.query('ROLLBACK');
    } finally {
        client.release();
        pool.end();
    }
}

runTest();
