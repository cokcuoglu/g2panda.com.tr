const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'gg_esnaf'
});

async function testProductInsert() {
    try {
        await client.connect();

        // Get a test user
        const userRes = await client.query('SELECT id FROM users WHERE deleted_at IS NULL LIMIT 1');
        if (userRes.rows.length === 0) {
            console.log('No users found');
            return;
        }
        const userId = userRes.rows[0].id;
        console.log('Test user ID:', userId);

        // Try to insert a product with the exact query from the backend
        console.log('\nAttempting to insert product...');

        try {
            const result = await client.query(
                `INSERT INTO products (user_id, name, price, color, menu_category_id, image_url, is_active, sort_order, description)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                 RETURNING *`,
                [userId, 'Test Product', 100, 'bg-white', null, null, true, 0, null]
            );
            console.log('✓ Product inserted successfully!');
            console.log('Product:', result.rows[0]);

            // Clean up
            await client.query('DELETE FROM products WHERE id = $1', [result.rows[0].id]);
            console.log('✓ Test product deleted');

        } catch (insertErr) {
            console.error('❌ Insert failed:', insertErr.message);
            console.error('Detail:', insertErr.detail || 'No detail');
        }

    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    } finally {
        await client.end();
    }
}

testProductInsert();
