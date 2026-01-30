const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgres://postgres:postgres@localhost:5432/gg_esnaf'
});

async function checkUserPerformance() {
    const userId = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';

    try {
        console.log('=== USER PERFORMANCE CHECK ===\n');
        console.log(`User ID: ${userId}\n`);

        // 1. Check if user exists
        const userRes = await pool.query('SELECT id, email, full_name, status FROM users WHERE id = $1', [userId]);
        if (userRes.rows.length === 0) {
            console.log('❌ User not found!');
            return;
        }

        const user = userRes.rows[0];
        console.log(`✅ User found: ${user.email} (${user.full_name})`);
        console.log(`   Status: ${user.status}\n`);

        // 2. Check transaction count
        const txCount = await pool.query('SELECT COUNT(*) FROM transactions WHERE user_id = $1 AND deleted_at IS NULL', [userId]);
        console.log(`📊 Transactions: ${txCount.rows[0].count}`);

        // 3. Check categories count
        const catCount = await pool.query('SELECT COUNT(*) FROM categories WHERE user_id = $1 AND deleted_at IS NULL', [userId]);
        console.log(`📁 Categories: ${catCount.rows[0].count}`);

        // 4. Check products count
        const prodCount = await pool.query('SELECT COUNT(*) FROM products WHERE user_id = $1 AND deleted_at IS NULL', [userId]);
        console.log(`🛍️  Products: ${prodCount.rows[0].count}`);

        // 5. Check channels count
        const chanCount = await pool.query('SELECT COUNT(*) FROM channels WHERE user_id = $1 AND deleted_at IS NULL', [userId]);
        console.log(`💳 Channels: ${chanCount.rows[0].count}\n`);

        // 6. Test RLS for this user
        console.log('🔒 Testing RLS...');
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            await client.query(`SELECT set_config('app.current_user_id', $1, true)`, [userId]);
            await client.query('SET LOCAL ROLE app_user');

            const rlsTest = await client.query('SELECT COUNT(*) FROM transactions');
            console.log(`   As app_user: ${rlsTest.rows[0].count} transactions visible`);

            if (rlsTest.rows[0].count === '0') {
                console.log('   ⚠️  WARNING: RLS blocking all transactions!');
            }

            await client.query('ROLLBACK');
        } finally {
            client.release();
        }

        // 7. Check for slow queries (transactions with many joins)
        console.log('\n⏱️  Testing query performance...');
        const start = Date.now();
        const perfTest = await pool.query(`
            SELECT t.id, t.amount, t.type, t.transaction_date,
                   c.name as category_name, c.color as category_color,
                   ch.name as channel_name
            FROM transactions t
            LEFT JOIN categories c ON t.category_id = c.id
            LEFT JOIN channels ch ON t.channel_id = ch.id
            WHERE t.user_id = $1 AND t.deleted_at IS NULL
            ORDER BY t.transaction_date DESC
            LIMIT 50
        `, [userId]);
        const duration = Date.now() - start;
        console.log(`   Query took ${duration}ms for ${perfTest.rows.length} rows`);

        if (duration > 1000) {
            console.log('   ⚠️  SLOW QUERY DETECTED (>1s)');
        } else if (duration > 500) {
            console.log('   ⚠️  Query is slow (>500ms)');
        } else {
            console.log('   ✅ Query performance OK');
        }

        // 8. Check recent errors in logs
        console.log('\n📋 Checking recent activity...');
        const recentTx = await pool.query(`
            SELECT transaction_date, type, amount
            FROM transactions
            WHERE user_id = $1 AND deleted_at IS NULL
            ORDER BY created_at DESC
            LIMIT 5
        `, [userId]);

        console.log(`   Last ${recentTx.rows.length} transactions:`);
        recentTx.rows.forEach(tx => {
            console.log(`     - ${tx.transaction_date.toISOString().split('T')[0]}: ${tx.type} ₺${tx.amount}`);
        });

    } catch (err) {
        console.error('\n❌ Error:', err.message);
        console.error(err.stack);
    } finally {
        await pool.end();
    }
}

checkUserPerformance();
