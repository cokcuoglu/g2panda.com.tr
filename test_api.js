const axios = require('axios');

async function testDailyTotal() {
    try {
        console.log('=== TESTING DAILY-TOTAL API ===\n');

        // First, login to get a token
        console.log('1. Logging in...');
        const loginRes = await axios.post('http://localhost:5002/api/auth/login', {
            email: 'caner@example.com',  // Update with actual email
            password: 'password123'       // Update with actual password
        });

        const token = loginRes.data.token;
        console.log(`   Token received: ${token.substring(0, 20)}...`);

        // Get user info
        const userId = loginRes.data.user.id;
        console.log(`   User ID: ${userId}`);

        // Test daily-total endpoint
        console.log('\n2. Testing daily-total endpoint...');
        const dailyRes = await axios.get('http://localhost:5002/api/transactions/daily-total', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log(`   Success: ${dailyRes.data.success}`);
        console.log(`   Total: ${dailyRes.data.total}`);
        if (dailyRes.data.debug) {
            console.log(`   Debug info: ${JSON.stringify(dailyRes.data.debug)}`);
        }

    } catch (err) {
        console.error('Error:', err.response?.data || err.message);
    }
}

testDailyTotal();
