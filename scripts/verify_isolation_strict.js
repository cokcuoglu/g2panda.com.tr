
const axios = require('axios');
const { Pool } = require('pg');
require('dotenv').config();

const BASE_URL = 'http://localhost:3000/api';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function registerUser(name) {
    const rand = Math.floor(Math.random() * 1000000);
    const email = `architect_${name}_${rand}@test.com`;
    const password = 'Password123!';
    try {
        const res = await axios.post(`${BASE_URL}/auth/register`, {
            email, password, full_name: name, business_name: `${name} Inc`
        });
        return { token: res.data.data.token, user: res.data.data.user };
    } catch (err) {
        console.error(`Failed to register ${name}:`, err.response?.data || err.message);
        throw err;
    }
}

async function createProduct(token, name) {
    const res = await axios.post(`${BASE_URL}/products`, {
        name, price: 500, color: 'bg-blue-50'
    }, { headers: { Authorization: `Bearer ${token}` } });
    return res.data.data;
}

async function run() {
    console.log('\n=== STRICT ISOLATION VERIFICATION (ARCHITECT LEVEL) ===\n');

    try {
        // 1. Setup Principals
        const userA = await registerUser('UserA');
        const userB = await registerUser('UserB');
        console.log(`[OK] Created UserA (${userA.user.id}) and UserB (${userB.user.id})`);

        // 2. UserA creates data
        const productA = await createProduct(userA.token, 'UserA_Proprietary_Tech');
        console.log(`[OK] UserA created product: ${productA.name}`);

        // --- TEST CASE 1: READ ISOLATION ---
        console.log('\n--- TEST 1: UserB tries to READ UserA data ---');
        const resB = await axios.get(`${BASE_URL}/products`, {
            headers: { Authorization: `Bearer ${userB.token}` }
        });
        const productsB = resB.data.data;
        const leak = productsB.find(p => p.id === productA.id);

        if (leak) {
            console.error('[CRITICAL FAIL] UserB SEES UserA data!');
            process.exit(1);
        } else {
            console.log('[PASS] UserB sees 0 rows of UserA data.');
        }

        // --- TEST CASE 2: WRITE ISOLATION (INSERT SPOOFING) ---
        console.log('\n--- TEST 2: WRITE ISOLATION (Insert Spoofing) ---');
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            // Authenticate as User B at DB level
            await client.query("SET LOCAL ROLE app_user");
            await client.query(`SELECT set_config('app.current_user_id', $1, true)`, [userB.user.id]);

            // Try to INSERT for UserA
            try {
                await client.query(`
                    INSERT INTO products (user_id, name, price, color) 
                    VALUES ($1, $2, $3, $4)
                `, [userA.user.id, 'Stolen Product', 0, 'bg-black']);

                console.error('[CRITICAL FAIL] UserB was able to INSERT data owned by UserA!');
                process.exit(1);
            } catch (err) {
                if (err.message.includes('new row violates row-level security policy')) {
                    console.log('[PASS] Insert blocked by RLS Policy (Spoofing prevented).');
                } else {
                    console.error('[WARN] Failed with unexpected error:', err.message);
                }
            }
            await client.query('ROLLBACK');
        } finally {
            client.release();
        }

        // --- TEST CASE 3: NO CONTEXT ISOLATION ---
        console.log('\n--- TEST 3: NO CONTEXT ISOLATION (Missing Session) ---');
        const client2 = await pool.connect();
        try {
            await client2.query('BEGIN'); // Start transaction for SET LOCAL ROLE to persist

            // Degrade to app_user (non-privileged)
            await client2.query("SET LOCAL ROLE app_user");

            // NO set_config calling! context is empty.
            const sensitiveConfig = await client2.query(`SELECT * FROM products`);

            if (sensitiveConfig.rows.length > 0) {
                console.error(`[CRITICAL FAIL] app_user without Context saw ${sensitiveConfig.rows.length} rows!`);
                process.exit(1);
            } else {
                console.log('[PASS] app_user without Context saw 0 rows.');
            }
            await client2.query('ROLLBACK');
        } finally {
            client2.release();
        }

        console.log('\n=== ALL SECURITY VERIFICATIONS PASSED ===');

    } catch (err) {
        console.error('Test Execution Failed:', err);
    } finally {
        await pool.end();
    }
}

run();
