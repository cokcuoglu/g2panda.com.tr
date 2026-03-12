const { Client } = require('pg');
const fs = require('fs');
const client = new Client({ connectionString: 'postgres://postgres:postgres@localhost:5432/gg_esnaf' });

async function run() {
    await client.connect();
    try {
        const cols = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'products'");
        const pcols = cols.rows.map(r => r.column_name);

        const mcols = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'menu_categories'");
        const mcatcols = mcols.rows.map(r => r.column_name);

        const userId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';

        const cats = await client.query('SELECT * FROM menu_categories WHERE user_id = $1', [userId]);

        let queryStr = 'SELECT p.id, p.name as product_name, p.is_active';
        if (pcols.includes('category_id')) queryStr += ', p.category_id';
        if (pcols.includes('menu_category_id')) queryStr += ', p.menu_category_id';
        queryStr += ' FROM products p WHERE p.user_id = $1';

        const items = await client.query(queryStr, [userId]);

        const out = {
            products_columns: pcols,
            menu_category_columns: mcatcols,
            categories: cats.rows,
            products: items.rows
        };
        fs.writeFileSync('debug_ozan_out.json', JSON.stringify(out, null, 2));

    } catch (e) {
        fs.writeFileSync('debug_ozan_out.json', JSON.stringify({ error: e.message }));
    }
    await client.end();
}
run();
