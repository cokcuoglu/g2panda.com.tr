require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const p = new Pool({ connectionString: process.env.DATABASE_URL });
p.query("SELECT user_id, count(*) FROM tables GROUP BY user_id").then(r => {
    fs.writeFileSync('tables_count.json', JSON.stringify(r.rows, null, 2));
    console.log('Saved');
    p.end();
}).catch(e => {
    console.error(e);
    p.end();
});
