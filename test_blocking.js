const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function runTest() {
    try {
        const baseURL = 'http://127.0.0.1:7173';

        console.log('1. Generating token directly from DB...');
        const userRes = await pool.query("SELECT * FROM users LIMIT 1");
        const user = userRes.rows[0];

        if (!user) throw new Error("No user found.");

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role, business_id: user.business_id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

        console.log('2. Checking business status...');
        const statusRes = await axios.get(`${baseURL}/api/business-status`, axiosConfig);
        let isOpen = statusRes.data.data.is_open;
        console.log(`Current status: ${isOpen ? 'OPEN' : 'CLOSED'}`);

        if (isOpen) {
            console.log('3. Closing shop...');
            const toggleRes = await axios.post(`${baseURL}/api/business-status/toggle`, {}, axiosConfig);
            isOpen = toggleRes.data.data.is_open;
            console.log(`New status: ${isOpen ? 'OPEN' : 'CLOSED'}`);
        } else {
            console.log('3. Shop is already closed.');
        }

        console.log('4. Attempting to create transaction while closed...');
        try {
            const txRes = await axios.post(`${baseURL}/api/transactions`, {
                order_items: [],
                total_amount: 10,
                payment_method: 'Nakit'
            }, axiosConfig);

            console.error('❌ Transaction succeeded but should have failed!');
            console.error(txRes.data);
        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.log('✅ Transaction was correctly blocked with 403 Forbidden!');
                console.log(error.response.data);
            } else {
                console.error('❌ Transaction failed with unexpected error:', error.message);
                if (error.response) console.error(error.response.data);
            }
        }

        console.log('5. Re-opening shop for normal operation...');
        if (!isOpen) {
            await axios.post(`${baseURL}/api/business-status/toggle`, {}, axiosConfig);
            console.log('Shop re-opened.');
        }

    } catch (err) {
        console.error('Test failed:', err.message);
        if (err.response) console.error(err.response.data);
    } finally {
        await pool.end();
    }
}

runTest();
