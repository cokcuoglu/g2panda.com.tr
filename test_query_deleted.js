require('dotenv').config();
const { Pool } = require('pg');
const p = new Pool({ connectionString: process.env.DATABASE_URL });
p.query("SELECT id, name, deleted_at FROM tables WHERE user_id = (SELECT id FROM users WHERE email='test3@test.com' LIMIT 1) AND deleted_at IS NOT NULL").then(r => {
    console.log('Soft deleted count:', r.rows.length);
    if (r.rows.length > 0) console.log(r.rows);
    p.end();
}).catch(e => {
    console.error(e);
    p.end();
});
