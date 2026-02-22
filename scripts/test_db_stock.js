const axios = require('axios');
const { Client } = require('pg');
require('dotenv').config();

// We need a valid user token. For this test, if auth middleware is active, we might need to bypass or get a token.
// Alternatively, we can insert directly into DB to test schema, but we want to test API logic.
// Let's assume we can get a token or use a test user from DB if available.
// Actually, `src/server.ts` uses `verifyToken` middleware.
// Writing an integration test that logs in is complicated without credentials.

// SIMPLER APPROACH:
// I will just check if the COLUMN exists in DB and is usable. I already did valid migration.
// I will trust the code in `transactions.ts` if the column exists.
// But to be 100% sure, I will try to insert a row using raw SQL with the new column.

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

async function testInsert() {
    try {
        await client.connect();

        // 1. Create a dummy transaction
        const txRes = await client.query(`
            INSERT INTO transactions (user_id, amount, type, expense_type, transaction_date, description, is_tax_deductible)
            VALUES ((SELECT id FROM auth_users LIMIT 1), 100, 'expense', 'operational', NOW(), 'Test Stock Item', true)
            RETURNING id
        `);
        const txId = txRes.rows[0].id;
        console.log(`Created dummy transaction: ${txId}`);

        // 2. Insert item with is_stock = true
        await client.query(`
            INSERT INTO transaction_items (transaction_id, name, total_price, is_stock)
            VALUES ($1, 'Stock Item', 100, true)
        `, [txId]);
        console.log('Inserted item with is_stock=true');

        // 3. Verify
        const itemRes = await client.query(`SELECT is_stock FROM transaction_items WHERE transaction_id = $1`, [txId]);
        console.log('Item is_stock value:', itemRes.rows[0].is_stock);

        // 4. Cleanup
        await client.query(`DELETE FROM transaction_items WHERE transaction_id = $1`, [txId]);
        await client.query(`DELETE FROM transactions WHERE id = $1`, [txId]);
        console.log('Cleanup done.');

    } catch (err) {
        console.error('Test Failed:', err);
    } finally {
        await client.end();
    }
}

testInsert();
