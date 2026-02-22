const { Pool } = require('pg');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const secret = process.env.JWT_SECRET || 'caner_super_secret_key';
const API_URL = 'http://localhost:7173/api';

async function run() {
    try {
        console.log('Starting simulation...');
        // 1. Get User
        // Note: 'test3@test.com' might not exist if I'm on a fresh DB or different seed.
        // I'll query for ANY user.
        const userRes = await pool.query("SELECT * FROM users LIMIT 1");
        const user = userRes.rows[0];
        if (!user) throw new Error('No users found in DB');

        console.log('Using user:', user.email);

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role || 'OWNER' }, secret);
        console.log('Token generated.');

        // 2. Create a Table Order (if none exists)
        // Find a table first
        const tableRes = await pool.query("SELECT id FROM tables WHERE user_id = $1 LIMIT 1", [user.id]);
        if (tableRes.rows.length === 0) throw new Error('No tables found for user');
        const tableId = tableRes.rows[0].id;

        console.log('Creating order for table:', tableId);
        const orderRes = await axios.post(`${API_URL}/table-orders`, { tableId }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        // Check if data.data exists or just data
        const orderId = orderRes.data.data ? orderRes.data.data.id : orderRes.data.id;
        console.log('Order created:', orderId);

        // 3. Add Item
        await axios.put(`${API_URL}/table-orders/${orderId}`, {
            items: [{ name: 'Test Product', price: 100, quantity: 1, id: 'temp-1' }],
            total_amount: 100
        }, { headers: { Authorization: `Bearer ${token}` } });
        console.log('Item added.');

        // 4. Finalize
        // Get generic category and channel
        const catRes = await pool.query("SELECT id FROM categories WHERE type='income' AND user_id=$1 LIMIT 1", [user.id]);
        const chanRes = await pool.query("SELECT id FROM channels WHERE user_id=$1 LIMIT 1", [user.id]);

        if (catRes.rows.length === 0) throw new Error('No income categories found');
        if (chanRes.rows.length === 0) throw new Error('No channels found');

        console.log('Finalizing...');
        const finalizeRes = await axios.post(`${API_URL}/orders/${orderId}/finalize`, {
            category_id: catRes.rows[0].id,
            channel_id: chanRes.rows[0].id,
            final_amount: 120 // Overriding amount
        }, { headers: { Authorization: `Bearer ${token}` } });

        console.log('Finalize Response:', finalizeRes.data);

    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
        if (err.response && err.response.data) {
            console.error('Full Error:', JSON.stringify(err.response.data, null, 2));
        }
    } finally {
        await pool.end();
    }
}

run();
