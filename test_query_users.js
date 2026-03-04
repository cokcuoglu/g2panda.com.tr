require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const p = new Pool({ connectionString: process.env.DATABASE_URL });
p.query("SELECT id, email FROM users WHERE email LIKE '%test%'").then(r => {
    fs.writeFileSync('test_users.json', JSON.stringify(r.rows, null, 2));
    console.log('Saved to test_users.json');
    p.end();
}).catch(e => {
    console.error(e);
    p.end();
});
