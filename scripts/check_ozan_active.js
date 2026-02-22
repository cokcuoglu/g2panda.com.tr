const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function run() {
    const ozanId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';
    try {
        console.log(`Checking active status for Ozan (${ozanId}):`);

        const prodRes = await pool.query('SELECT is_active, COUNT(*) FROM products WHERE user_id = $1 GROUP BY is_active', [ozanId]);
        console.log('Products Active Status:');
        prodRes.rows.forEach(r => console.log(`  ${r.is_active}: ${r.count}`));

        const catRes = await pool.query('SELECT is_active, COUNT(*) FROM menu_categories WHERE user_id = $1 GROUP BY is_active', [ozanId]);
        console.log('Menu Categories Active Status:');
        catRes.rows.forEach(r => console.log(`  ${r.is_active}: ${r.count}`));

        // Sample product to see details
        const sampleProd = await pool.query('SELECT name, price, menu_category_id, is_active FROM products WHERE user_id = $1 LIMIT 5', [ozanId]);
        console.log('Sample Products:');
        sampleProd.rows.forEach(r => console.log(`  ${r.name} | ${r.price} | Cat: ${r.menu_category_id} | Active: ${r.is_active}`));

    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}
run();
