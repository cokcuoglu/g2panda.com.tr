const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkProducts() {
    try {
        const res = await pool.query(`
            SELECT id, name, price, takeaway_discount_percent 
            FROM products 
            WHERE name ILIKE '%Kuru%' OR name ILIKE '%Pilav%'
        `);
        console.log('Product Discounts:');
        console.log(JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error('Query failed:', err.message);
    } finally {
        await pool.end();
    }
}

checkProducts();
