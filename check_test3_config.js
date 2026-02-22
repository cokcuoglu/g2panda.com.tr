const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkTest3() {
    const client = await pool.connect();
    try {
        console.log('🔍 Checking for user "test3"...');

        // precise check
        const userRes = await client.query(`
            SELECT * FROM users 
            WHERE email = 'test3@test.com' OR full_name = 'cnr2'
        `);

        if (userRes.rows.length === 0) {
            console.log('❌ User "test3" NOT found in "users" table.');
            // Check auth.users just in case
            try {
                const authRes = await client.query(`SELECT * FROM auth.users WHERE email = 'test3@test.com'`);
                if (authRes.rows.length > 0) {
                    console.log('⚠️ Found in auth.users, but missing in public.users!');
                } else {
                    console.log('❌ Not found in auth.users either.');
                }
            } catch (e) { console.log('   (auth.users not accessible)'); }
            return;
        }

        const user = userRes.rows[0];
        console.log(`✅ Found User: ${user.email} (ID: ${user.id})`);

        console.log('\n🔍 Checking Categories...');
        const catRes = await client.query('SELECT * FROM categories WHERE user_id = $1', [user.id]);
        console.log(`   - Count: ${catRes.rows.length}`);
        if (catRes.rows.length > 0) {
            console.log('   - Sample Categories:', catRes.rows.slice(0, 3).map(c => c.name).join(', '));
        }

        console.log('\n🔍 Checking Channels (Payment Methods)...');
        const chanRes = await client.query('SELECT * FROM channels WHERE user_id = $1', [user.id]);
        console.log(`   - Count: ${chanRes.rows.length}`);
        if (chanRes.rows.length > 0) {
            console.log('   - Sample Channels:', chanRes.rows.slice(0, 3).map(c => c.name).join(', '));
        }

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        client.release();
        await pool.end();
    }
}

checkTest3();
