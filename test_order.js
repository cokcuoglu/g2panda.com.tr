const { pool } = require('./src/db');

async function testOrderMatters() {
    const userId = 'a3dbd896-7640-4228-86d4-83e9783e5209';

    console.log('=== TEST 1: Set context AFTER role switch (OLD WAY) ===');
    const client1 = await pool.connect();
    try {
        await client1.query('BEGIN');
        await client1.query('SET LOCAL ROLE app_user');
        await client1.query(`SELECT set_config('app.current_user_id', $1, true)`, [userId]);

        const ctx1 = await client1.query(`SELECT current_setting('app.current_user_id', true) as val`);
        console.log(`Context: "${ctx1.rows[0].val}"`);

        const res1 = await client1.query('SELECT COUNT(*) FROM transactions');
        console.log(`Transactions visible: ${res1.rows[0].count}`);

        await client1.query('ROLLBACK');
    } finally {
        client1.release();
    }

    console.log('\n=== TEST 2: Set context BEFORE role switch (NEW WAY) ===');
    const client2 = await pool.connect();
    try {
        await client2.query('BEGIN');
        await client2.query(`SELECT set_config('app.current_user_id', $1, true)`, [userId]);
        await client2.query('SET LOCAL ROLE app_user');

        const ctx2 = await client2.query(`SELECT current_setting('app.current_user_id', true) as val`);
        console.log(`Context: "${ctx2.rows[0].val}"`);

        const res2 = await client2.query('SELECT COUNT(*) FROM transactions');
        console.log(`Transactions visible: ${res2.rows[0].count}`);

        await client2.query('ROLLBACK');
    } finally {
        client2.release();
    }

    pool.end();
}

testOrderMatters();
