const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkTable() {
    const client = await pool.connect();
    try {
        console.log('Checking database tables...');

        const res = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'menu_categories'
        `);

        if (res.rows.length > 0) {
            console.log('Table menu_categories EXISTS.');

            // Check columns
            const cols = await client.query(`
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = 'menu_categories'
            `);
            console.log('Columns:', cols.rows.map(r => r.column_name).join(', '));

        } else {
            console.log('Table menu_categories DOES NOT EXIST.');
        }

    } catch (err) {
        console.error('Check failed:', err);
    } finally {
        client.release();
        pool.end();
    }
}

checkTable();
