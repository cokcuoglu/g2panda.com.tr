require('dotenv').config();
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { Pool } = require('pg');
const fs = require('fs');

async function test() {
    const p = new Pool({ connectionString: process.env.DATABASE_URL });
    const client = await p.connect();
    let email = 'test3@test.com'; // Adjust if test3's email is different
    const userRes = await client.query("SELECT id, role, email FROM users WHERE email LIKE '%test3%' LIMIT 1");
    const user = userRes.rows[0];
    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    client.release();
    p.end();

    try {
        const res = await axios.get('http://localhost:7173/api/tables', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        fs.writeFileSync('tables_response.json', JSON.stringify(res.data, null, 2));
        console.log('Saved to tables_response.json');
    } catch (e) {
        console.error(e.message);
    }
}
test();
