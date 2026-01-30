// Debug script to simulate frontend request against running server
const axios = require('axios');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const BASE_URL = 'http://localhost:5001/api';

// We need a way to get a valid token. 
// Since we can't easily login via script without knowing a password,
// we will assume the issue might happen even without auth OR 
// we can temporarily modify the server to log the error more visibly.
// But wait, the server IS running and I already added detailed logging in previous step.
// The issue is I cannot see the terminal output of the 'npm run dev' running in the background for the user.
// So I must rely on the response.

// Strategy:
// 1. Try to hit the endpoint. If it returns 401, at least we know server is up.
// 2. If we can't authenticate, we can't reproduce the 'Kaydedilemedi' completely if it's an Auth error.
// However, 'Kaydedilemedi' implies the catch block caught something. 

// Let's Inspect what could cause response.data.error to be undefined?
// 1. Network Error (Server down) -> response is undefined.
// 2. 500 Error with HTML body (if not JSON).
// 3. 404 Not Found (if URL wrong).

async function testConnection() {
    try {
        console.log('Testing connection to ' + BASE_URL + '/menu-categories');
        const res = await axios.get(BASE_URL + '/menu-categories');
        console.log('GET Response:', res.status, res.data);
    } catch (err) {
        if (err.response) {
            console.log('GET Error Response:', err.response.status, err.response.data);
        } else {
            console.error('GET Network/Auth Error:', err.message);
        }
    }

    // Attempt POST without token to see format
    try {
        await axios.post(BASE_URL + '/menu-categories', { name: 'Debug Cat' });
    } catch (err) {
        if (err.response) {
            console.log('POST Error Response (No Auth):', err.response.status, err.response.data);
            // Expected: 401 Unauthorized
        }
    }
}

testConnection();
