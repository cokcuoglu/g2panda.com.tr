require('dotenv').config();
const { Pool } = require('pg');
const p = new Pool({ connectionString: process.env.DATABASE_URL });
p.query("SELECT tablename, policyname, roles, cmd, qual, with_check FROM pg_policies WHERE tablename = 'tables'").then(r => {
    console.dir(r.rows, { depth: null });
    p.end();
}).catch(e => {
    console.error(e);
    p.end();
});
