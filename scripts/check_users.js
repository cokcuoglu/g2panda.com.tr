const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'gg_esnaf'
});

async function checkUsers() {
    try {
        await client.connect();

        const result = await client.query('SELECT email, full_name FROM users WHERE deleted_at IS NULL LIMIT 5');

        console.log('Available users in database:');
        result.rows.forEach(r => {
            console.log(`  - ${r.email} (${r.full_name})`);
        });

    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    } finally {
        await client.end();
    }
}

checkUsers();
