
import axios from 'axios';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const API_URL = 'http://localhost:5001';
const TEMP_EMAIL = `verify_report_${Date.now()}@test.com`;
const TEMP_PASS = 'tempPass123';

async function verify() {
    console.log('--- Verifying Category Reports API ---');
    console.log(`Creating temp user: ${TEMP_EMAIL}`);

    let userId = null;

    try {
        // 1. Create Temp User
        const hashedIds = await bcrypt.hash(TEMP_PASS, 10);
        const userRes = await pool.query(
            `INSERT INTO users (full_name, email, password_hash, role, is_active, permissions)
             VALUES ('Report Test Bot', $1, $2, 'OWNER', true, '["dashboard.read"]')
             RETURNING id`,
            [TEMP_EMAIL, hashedIds]
        );
        userId = userRes.rows[0].id;
        console.log(`Temp user created (ID: ${userId})`);

        // 2. Login
        console.log('Logging in...');
        const loginRes = await axios.post(`${API_URL}/api/auth/login`, {
            email: TEMP_EMAIL,
            password: TEMP_PASS
        });

        // Grab cookie
        let cookie = '';
        const setCookie = loginRes.headers['set-cookie'];
        if (setCookie) {
            cookie = Array.isArray(setCookie) ? setCookie[0] : setCookie;
        }

        const headers = {
            Cookie: cookie,
            'Content-Type': 'application/json'
        };

        // 3. Test Invalid Date Range
        console.log('\n[TEST 1] Invalid Date Range (>31 days)');
        try {
            await axios.get(`${API_URL}/api/reports/categories`, {
                params: {
                    start_date: '2024-01-01',
                    end_date: '2024-02-05',
                    type: 'income'
                },
                headers
            });
            console.error('FAIL: Expected 400 error but got 200 OK');
        } catch (err: any) {
            if (err.response?.status === 400) {
                console.log('PASS: Got 400 Bad Request as expected');
                console.log('Error Message:', err.response.data.error);
            } else {
                console.error('FAIL: Expected 400, got', err.response?.status);
            }
        }

        // 4. Test Valid Date Range
        console.log('\n[TEST 2] Valid Date Range (2024-01-01 to 2024-01-31)');
        const res = await axios.get(`${API_URL}/api/reports/categories`, {
            params: {
                start_date: '2024-01-01',
                end_date: '2024-01-31',
                type: 'income'
            },
            headers
        });
        console.log('PASS: Got 200 OK');
        if (res.data.success && Array.isArray(res.data.data)) {
            console.log('PASS: Response structure valid');
            console.log(`Data count: ${res.data.data.length} categories`);
            console.log('Data sample:', JSON.stringify(res.data.data[0] || {}, null, 2));
        } else {
            console.error('FAIL: Response structure invalid');
        }

    } catch (err: any) {
        console.error('CRITICAL FAIL:', err.message);
        if (err.response) {
            console.log('Response Status:', err.response.status);
            console.log('Response Data:', err.response.data);
        }
    } finally {
        // Cleanup
        if (userId) {
            await pool.query('DELETE FROM users WHERE id = $1', [userId]);
            console.log('\nTemp user deleted.');
        }
        await pool.end();
    }
}

verify();
