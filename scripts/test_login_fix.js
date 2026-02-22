const axios = require('axios');

async function testLogin() {
    // Assuming the server is running on localhost for testing
    // Or we hit the domain if we want to test CORS too (but testing CORS from node is different)
    const baseUrl = 'http://localhost:7001'; // Based on ecosystem.config.js

    const testCases = [
        { email: 'ozan.demirci28@gmail.com', password: 'unknown' }, // Generic check
        { email: 'Ozan.Demirci28@gmail.com', password: 'unknown' }  // Case-insensitive check
    ];

    for (const testCase of testCases) {
        try {
            console.log(`Testing login for: ${testCase.email}`);
            const response = await axios.post(`${baseUrl}/api/auth/login`, testCase);
            console.log(`Response for ${testCase.email}:`, response.data);
        } catch (error) {
            console.log(`Failed for ${testCase.email}:`, error.response?.data || error.message);
        }
    }
}

testLogin();
