require('dotenv').config();
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { Pool } = require('pg');

async function testPost() {
    const p = new Pool({ connectionString: process.env.DATABASE_URL });
    const client = await p.connect();
    // Using test3 or any user
    const userRes = await client.query("SELECT id, role, email FROM users LIMIT 1");
    const user = userRes.rows[0];
    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    client.release();
    p.end();

    try {
        const payload = {
            name: "Yeni Masa",
            type: "square",
            capacity: 4,
            area: "Bahçe",
            posX: 20,
            posY: 20,
            rotation: 0
        };
        const res = await axios.post('http://localhost:7173/api/tables', payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Status:', res.status);
        console.log('Data:', res.data);
    } catch (e) {
        if (e.response) {
            console.error('Response Error:', e.response.status, JSON.stringify(e.response.data, null, 2));
        } else {
            console.error('Axios Error:', e.message);
        }
    }
}
testPost();
