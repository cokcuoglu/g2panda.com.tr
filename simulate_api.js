const { Client } = require('pg');
const fs = require('fs');

async function run() {
    const client = new Client({ connectionString: 'postgres://postgres:postgres@localhost:5432/gg_esnaf' });
    await client.connect();
    const userId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';

    try {
        const categories = await client.query(
            `SELECT * FROM menu_categories 
          WHERE user_id = $1 AND is_active = true 
          ORDER BY sort_order ASC, name ASC`,
            [userId]
        );

        const products = await client.query(
            `SELECT id, name, price, description, image_url, menu_category_id, sort_order, CAST(COALESCE(takeaway_discount_percent, 0) AS FLOAT) as takeaway_discount_percent
          FROM products 
          WHERE user_id = $1 AND is_active = true
          ORDER BY sort_order ASC, name ASC`,
            [userId]
        );

        const cats = categories.rows;
        const prods = products.rows;

        const categoryMap = new Map();
        cats.forEach((c) => {
            categoryMap.set(c.id, { ...c, children: [], products: [] });
        });

        const rootCategories = [];
        const uncategorizedProducts = [];

        prods.forEach((p) => {
            if (p.menu_category_id && categoryMap.has(p.menu_category_id)) {
                categoryMap.get(p.menu_category_id).products.push(p);
            } else {
                uncategorizedProducts.push(p);
            }
        });

        cats.forEach((c) => {
            if (c.parent_id && categoryMap.has(c.parent_id)) {
                categoryMap.get(c.parent_id).children.push(categoryMap.get(c.id));
            } else {
                rootCategories.push(categoryMap.get(c.id));
            }
        });

        fs.writeFileSync('test_api_res.json', JSON.stringify({ rootCategories, uncategorizedProducts }, null, 2));
    } finally {
        await client.end();
    }
}
run().catch(console.error);
