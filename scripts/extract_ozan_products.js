const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function run() {
    const ozanIds = [
        '87320101-baf5-4fa7-9833-2dcdcf4ce5d7', // ozangungorkaya@gmail.com
        'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57'  // ozan.demirci28@gmail.com
    ];
    try {
        const allProductNames = new Set();
        for (const ozanId of ozanIds) {
            const res = await pool.query('SELECT items FROM orders WHERE user_id = $1 AND items IS NOT NULL', [ozanId]);
            console.log(`Checking Ozan ID: ${ozanId}, found ${res.rows.length} orders.`);
            res.rows.forEach(row => {
                const items = typeof row.items === 'string' ? JSON.parse(row.items) : row.items;
                if (Array.isArray(items)) {
                    items.forEach(item => {
                        if (item.name) allProductNames.add(item.name);
                    });
                }
            });
        }
        const names = Array.from(allProductNames);
        console.log('--- OZAN PRODUCT NAMES ---');
        console.log(JSON.stringify(names, null, 2));

        if (names.length > 0) {
            // Find products with these names that are now assigned to Caner
            const canerId = 'be8b8541-f427-4287-a00b-a0e9783e5209';
            const findRes = await pool.query('SELECT id, name, category_id FROM products WHERE name = ANY($1) AND user_id = $2', [names, canerId]);
            console.log('--- MATCHING PRODUCTS TO RESTORE ---');
            console.log(JSON.stringify(findRes.rows, null, 2));

            // Also find the categories of these products
            const categoryIds = Array.from(new Set(findRes.rows.map(r => r.category_id).filter(id => id)));
            if (categoryIds.length > 0) {
                const catRes = await pool.query('SELECT id, name FROM categories WHERE id = ANY($1)', [categoryIds]);
                console.log('--- MATCHING CATEGORIES TO RESTORE ---');
                console.log(JSON.stringify(catRes.rows, null, 2));
            }
        }

    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}
run();
