require('dotenv').config();
const { Pool } = require('pg');
const p = new Pool({ connectionString: process.env.DATABASE_URL });
p.query("SELECT id, name, area, deleted_at, created_at FROM tables WHERE user_id = (SELECT id FROM users WHERE email='test3@test.com' LIMIT 1)").then(r => {
    console.dir(r.rows, { depth: null });
    p.end();
}).catch(e => {
    console.error(e);
    p.end();
});
