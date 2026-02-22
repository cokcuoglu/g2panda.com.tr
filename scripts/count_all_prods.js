const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function run() {
    try {
        const res = await pool.query(`
            SELECT u.id, u.business_name, p.is_active, COUNT(p.id) 
            FROM users u
            LEFT JOIN products p ON u.id = p.user_id
            WHERE u.id IN ('e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', 'be8b8541-f427-4287-a00b-a0e9783e5209')
            GROUP BY u.id, u.business_name, p.is_active
        `);
        const out = {};
        res.rows.forEach(r => {
            const key = `${r.id}_${r.business_name}`;
            if (!out[key]) out[key] = {};
            out[key][r.is_active] = r.count;
        });
        console.log(out);
    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}
run();
