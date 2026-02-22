
import { pool } from './src/db';

async function testOrderFlow() {
    try {
        console.log("Starting Order Flow Test...");

        // 1. Setup Data
        // Find a table and a product
        const tableRes = await pool.query("SELECT id FROM tables LIMIT 1");
        const productRes = await pool.query("SELECT id, price FROM products WHERE is_active = true LIMIT 1");
        const userRes = await pool.query("SELECT id FROM users LIMIT 1");

        if (!tableRes.rows[0] || !productRes.rows[0] || !userRes.rows[0]) {
            console.error("Missing seed data (table/product/user)");
            return;
        }

        const tableId = tableRes.rows[0].id;
        const productId = productRes.rows[0].id;
        const userId = userRes.rows[0].id;

        console.log(`Using Table: ${tableId}, Product: ${productId}, User: ${userId}`);

        // 2. Ensure Table is Active (Simulation)
        await pool.query("UPDATE tables SET status = 'active' WHERE id = $1", [tableId]);
        console.log("Table set to ACTIVE");

        // 3. Create/Reset Order
        // Delete any existing active orders for this table to start fresh
        await pool.query("DELETE FROM orders WHERE table_id = $1", [tableId]);

        const insertQuery = `
            INSERT INTO orders (
                user_id, order_number, table_id, items, total_amount, base_amount, discount_amount, order_type, status, created_at
            ) VALUES ($1, $2, $3, $4, $5, $5, 0, 'dine-in', 'pending', NOW())
            RETURNING id
        `;

        const items = JSON.stringify([{
            id: productId,
            name: 'Test Product',
            detail: '',
            price: 100,
            quantity: 1,
            type: 'product'
        }]);

        const orderRes = await pool.query(insertQuery, [userId, 'TEST-001', tableId, items, 100]);
        const orderId = orderRes.rows[0].id;
        console.log(`Created Pending Order: ${orderId}`);

        // 4. Query Public Endpoint Logic
        const publicQuery = `
            SELECT o.* 
             FROM orders o
             JOIN tables t ON o.table_id = t.id
             WHERE o.table_id = $1 
             AND o.status IN ('pending', 'confirmed') 
             AND t.status = 'active'
             ORDER BY o.created_at DESC LIMIT 1
        `;

        const res1 = await pool.query(publicQuery, [tableId]);
        console.log(`Query Result (Pending): ${res1.rows.length > 0 ? 'FOUND' : 'NOT FOUND'}`);
        if (res1.rows.length > 0) console.log(`Order ID matched: ${res1.rows[0].id}`);

        // 5. Update Status to Confirmed
        await pool.query("UPDATE orders SET status = 'confirmed' WHERE id = $1", [orderId]);
        console.log("Updated Order to CONFIRMED");

        const res2 = await pool.query(publicQuery, [tableId]);
        console.log(`Query Result (Confirmed): ${res2.rows.length > 0 ? 'FOUND' : 'NOT FOUND'}`);

        // 6. Test Failure Case: Table Not Active
        await pool.query("UPDATE tables SET status = 'available' WHERE id = $1", [tableId]);
        console.log("Table set to AVAILABLE");
        const res3 = await pool.query(publicQuery, [tableId]);
        console.log(`Query Result (Table Available): ${res3.rows.length > 0 ? 'FOUND' : 'NOT FOUND'} (Expected: NOT FOUND)`);

        // 7. Cleanup
        await pool.query("DELETE FROM orders WHERE id = $1", [orderId]);
        // await pool.query("UPDATE tables SET status = 'available' WHERE id = $1", [tableId]);

    } catch (err) {
        console.error("Test Failed:", err);
    } finally {
        process.exit();
    }
}

testOrderFlow();
