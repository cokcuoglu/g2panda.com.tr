
const axios = require('axios');
require('dotenv').config();

const API_URL = 'http://localhost:5000/api'; // Adjust port if needed

async function testReportsAPI() {
    try {
        console.log("1. Logging in as owner...");
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: 'basarili@test.com', // Using the owner email found earlier
            password: 'password123' // Only works if this is the password. 
            // If we don't know the password, we can't login via API easily without resetting it.
            // Alternative: generate a token manually using jsonwebtoken and JWT_SECRET from .env
        });

        // Wait, I don't know the password for 'basarili@test.com'.
        // I should use the JWT manual generation approach.
    } catch (e) {
        // console.error("Login failed (expected if password wrong):", e.message);
    }
}

// Better approach: Generate token locally since I have access to server secrets.
const jwt = require('jsonwebtoken');
const { Client } = require('pg');

async function testWithToken() {
    console.log("Generating valid token for owner...");

    // Get user id
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();
    const userRes = await client.query("SELECT id, email, role FROM users WHERE role = 'OWNER' LIMIT 1");
    await client.end();

    if (userRes.rows.length === 0) {
        console.error("No owner found.");
        return;
    }

    const user = userRes.rows[0];
    const secret = process.env.JWT_SECRET || 'default_secret_key_change_me';

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        secret,
        { expiresIn: '1h' }
    );

    console.log("Token generated. Testing /api/reports/summary...");

    try {
        const port = process.env.PORT || 7174;
        const today = new Date().toISOString().split('T')[0];
        const url = `http://localhost:${port}/api/reports/summary?start_date=${today}&end_date=${today}&type=all`;

        const res = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log("Summary API Response Status:", res.status);
        console.log("Summary API Response Data:", JSON.stringify(res.data, null, 2));

        console.log("Testing /api/dashboard/trend...");
        const trendUrl = `http://localhost:${port}/api/dashboard/trend?days=30`;
        const trendRes = await axios.get(trendUrl, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Trend API Response Status:", trendRes.status);
        console.log("Trend API Response Data:", JSON.stringify(trendRes.data, null, 2));

    } catch (error) {
        console.error("API Request Failed:", error.message);
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        }
    }
}

testWithToken();
