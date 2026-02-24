const { Pool } = require('pg');
const pool = new Pool();
async function run() {
    try {
        const res = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'orders'");
        console.log("COLUMNS:");
        res.rows.forEach(r => console.log(`${r.column_name} (${r.data_type})`));
    } catch (e) {
        console.error(e);
    }
    process.exit(0);
}
run();
