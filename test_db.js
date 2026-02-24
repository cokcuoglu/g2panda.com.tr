const { pool } = require('./dist/db.js');
async function run() {
    try {
        const res = await pool.query("SELECT email, is_open, auto_open_time, auto_close_time FROM users WHERE email = 'test3@test.com'");
        console.log(res.rows[0]);
    } catch (e) {
        console.error('DB ERROR:', e.message);
    }
    process.exit(0);
}
run();
