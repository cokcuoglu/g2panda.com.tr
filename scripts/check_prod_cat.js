const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkProductAndCategory() {
    const userId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';
    try {
        console.log('--- Product: Kamelya ---');
        const prodRes = await pool.query("SELECT id, name, menu_category_id, user_id FROM products WHERE name ILIKE '%Kamelya%'");
        const p = prodRes.rows[0];
        console.log(JSON.stringify(p, null, 2));

        if (p && p.menu_category_id) {
            console.log('\n--- Category of Product ---');
            const catRes = await pool.query('SELECT id, name, user_id FROM menu_categories WHERE id = $1', [p.menu_category_id]);
            console.log(JSON.stringify(catRes.rows[0], null, 2));
        }

        console.log('\n--- All Menu Categories for Ozan ---');
        const allCats = await pool.query('SELECT id, name FROM menu_categories WHERE user_id = $1', [userId]);
        console.log(JSON.stringify(allCats.rows, null, 2));

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

checkProductAndCategory();
