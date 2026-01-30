import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function testPermissions() {
    try {
        const rnd = Math.floor(Math.random() * 100000);

        console.log('--- TEST: Permissions as Object ---');
        try {
            await pool.query(
                'INSERT INTO users (email, password, permissions) VALUES ($1, $2, $3) RETURNING id',
                [`p1_${rnd}@test.com`, 'pw', []]
            );
            console.log('PASS (Object)');
        } catch (e: any) {
            console.log('FAIL (Object):', e.message || e.code);
        }

        console.log('--- TEST: Permissions as String ---');
        try {
            await pool.query(
                'INSERT INTO users (email, password, permissions) VALUES ($1, $2, $3) RETURNING id',
                [`p2_${rnd}@test.com`, 'pw', '[]']
            );
            console.log('PASS (String)');
        } catch (e: any) {
            console.log('FAIL (String):', e.message || e.code);
        }

    } finally {
        await pool.end();
    }
}

testPermissions();
