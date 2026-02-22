
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: 'postgres://postgres:postgres@localhost:5432/gg_esnaf'
});

async function checkMovements() {
    try {
        const res = await pool.query(`
            SELECT sm.*, rm.name as raw_material_name 
            FROM stock_movements sm
            JOIN raw_materials rm ON sm.raw_material_id = rm.id
            ORDER BY sm.created_at DESC 
            LIMIT 5
        `);
        console.log("Recent Stock Movements:");
        console.table(res.rows);
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

checkMovements();
