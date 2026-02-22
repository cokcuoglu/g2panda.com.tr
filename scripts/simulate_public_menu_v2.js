const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const getMenuData = async (client, userId) => {
    // Verify user exists
    const userCheck = await client.query('SELECT id, business_name FROM users WHERE id = $1', [userId]);
    if (userCheck.rows.length === 0) {
        throw new Error('User not found');
    }
    const businessName = userCheck.rows[0].business_name;

    // Fetch Categories (Active only)
    const categories = await client.query(
        `SELECT * FROM menu_categories 
         WHERE user_id = $1 AND is_active = true 
         ORDER BY sort_order ASC, name ASC`,
        [userId]
    );

    // Fetch Products (Active only)
    const products = await client.query(
        `SELECT id, name, price, description, image_url, menu_category_id, sort_order, takeaway_discount_percent
         FROM products 
         WHERE user_id = $1 AND is_active = true
         ORDER BY sort_order ASC, name ASC`,
        [userId]
    );

    // Enhance categories with children
    const cats = categories.rows;
    const prods = products.rows;

    // Build Tree
    const categoryMap = new Map();
    cats.forEach((c) => {
        categoryMap.set(c.id, { ...c, children: [], products: [] });
    });

    const rootCategories = [];

    // Attach products to categories
    const uncategorizedProducts = [];
    prods.forEach((p) => {
        if (p.menu_category_id && categoryMap.has(p.menu_category_id)) {
            categoryMap.get(p.menu_category_id).products.push(p);
        } else {
            uncategorizedProducts.push(p);
        }
    });

    // Build hierarchy
    cats.forEach((c) => {
        if (c.parent_id && categoryMap.has(c.parent_id)) {
            categoryMap.get(c.parent_id).children.push(categoryMap.get(c.id));
        } else {
            rootCategories.push(categoryMap.get(c.id));
        }
    });

    // If there are products without a category, add a virtual "Diğer" category at the end
    if (uncategorizedProducts.length > 0) {
        rootCategories.push({
            id: 'uncategorized',
            name: 'Diğer',
            is_active: true,
            parent_id: null,
            sort_order: 999,
            children: [],
            products: uncategorizedProducts
        });
    }

    return {
        business_name: businessName,
        categories: rootCategories,
        // campaigns omitted for brevity
    };
};

async function run() {
    const users = [
        { id: 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', name: 'Ozan Bey' },
        { id: 'be8b8541-f427-4287-a00b-a0e9783e5209', name: 'test3' }
    ];

    const client = await pool.connect();
    try {
        for (const user of users) {
            console.log(`\n--- Simulating Public Menu for ${user.name} ---`);
            const data = await getMenuData(client, user.id);
            console.log(`Business: ${data.business_name}`);
            console.log(`Categories: ${data.categories.length}`);
            data.categories.forEach(c => {
                console.log(` - ${c.name} (${c.products?.length || 0} products, ${c.children?.length || 0} subcats)`);
            });
        }
    } catch (e) {
        console.error('Simulation error:', e);
    } finally {
        client.release();
        await pool.end();
    }
}
run();
