const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function testFiltering() {
    const client = await pool.connect();
    try {
        console.log('Inserting test transactions...');
        // 1. Get a user
        const userRes = await client.query('SELECT id FROM users LIMIT 1');
        const userId = userRes.rows[0].id;

        // 2. Get a category
        const catRes = await client.query("SELECT id FROM categories WHERE type='expense' LIMIT 1");
        const catId = catRes.rows[0].id; // Assumption: at least one expense category exists

        // 3. Get a channel
        const chanRes = await client.query("SELECT id FROM channels WHERE type='payment' LIMIT 1");
        const chanId = chanRes.rows[0].id;

        // 4. Insert 3 transactions
        const types = ['operational', 'fixed', 'personal'];
        for (const type of types) {
            await client.query(`
                INSERT INTO transactions (
                    user_id, category_id, channel_id, type, amount, transaction_date, description, expense_type
                ) VALUES ($1, $2, $3, 'expense', 100, NOW(), $4, $5)
            `, [userId, catId, chanId, `Test ${type} Expense`, type]);
        }
        console.log('Inserted 3 transactions (Operational, Fixed, Personal).');

        // 5. Test Filtering Logic (Simulating Backend Query)
        console.log('\n--- Verifying Filters ---');

        for (const filter of types) {
            const res = await client.query(`
                SELECT description, expense_type FROM transactions 
                WHERE type = 'expense' AND expense_type = $1
            `, [filter]);

            console.log(`Querying for '${filter}': Found ${res.rowCount} row(s).`);
            res.rows.forEach(r => console.log(` - ${r.description} [${r.expense_type}]`));

            if (res.rowCount !== 1) {
                console.error(`FAIL: Expected 1 result for ${filter}, got ${res.rowCount}`);
            }
        }

    } catch (err) {
        console.error('Test failed:', err);
    } finally {
        await client.query("DELETE FROM transactions WHERE description LIKE 'Test % Expense'"); // Cleanup
        client.release();
        pool.end();
    }
}

testFiltering();
