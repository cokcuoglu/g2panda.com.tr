const { pool } = require('./dist/db.js');
async function run() {
    try {
        const res = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'orders'");
        console.log("COLUMNS:");
        console.log(res.rows.map(r => r.column_name).join(', '));
    } catch (e) {
        console.error("DB ERROR:", e.message);
    }
    process.exit(0);
}
run();
