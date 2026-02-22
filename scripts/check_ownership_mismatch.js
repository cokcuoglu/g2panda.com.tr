const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function run() {
    try {
        console.log('--- MISMATCHED OWNERSHIP CHECK ---');

        // 1. Products vs Menu Categories
        const prodMismatch = await pool.query(`
            SELECT p.id, p.name as product_name, p.user_id as product_owner, 
                   mc.name as category_name, mc.user_id as category_owner
            FROM products p
            JOIN menu_categories mc ON p.menu_category_id = mc.id
            WHERE p.user_id <> mc.user_id
        `);
        console.log(`\nProducts with mismatched category owners: ${prodMismatch.rows.length}`);
        prodMismatch.rows.forEach(r => {
            console.log(`P: ${r.product_name} (${r.product_owner}) | C: ${r.category_name} (${r.category_owner})`);
        });

        // 2. Menu Categories Parent vs Child Mismatch
        const catMismatch = await pool.query(`
            SELECT c.id, c.name as child_name, c.user_id as child_owner,
                   p.name as parent_name, p.user_id as parent_owner
            FROM menu_categories c
            JOIN menu_categories p ON c.parent_id = p.id
            WHERE c.user_id <> p.user_id
        `);
        console.log(`\nCategories with mismatched parent owners: ${catMismatch.rows.length}`);
        catMismatch.rows.forEach(r => {
            console.log(`C: ${r.child_name} (${r.child_owner}) | P: ${r.parent_name} (${r.parent_owner})`);
        });

    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}
run();
