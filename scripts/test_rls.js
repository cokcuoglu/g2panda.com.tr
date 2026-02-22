const pg = require('pg');
const pool = new pg.Pool({ connectionString: 'postgres://postgres:postgres@localhost:5432/gg_esnaf' });

async function check() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const userId = '4ab60021-ffa6-46e6-9039-26a9e165b1'; // Real user ID

        console.log('Setting app.current_user_id to:', userId);
        await client.query(`SELECT set_config('app.current_user_id', $1, true)`, [userId]);

        const currentSetting = await client.query(`SELECT current_setting('app.current_user_id', true)`);
        console.log('Current Session Setting:', currentSetting.rows[0].current_setting);

        console.log('Switching to app_user role...');
        await client.query('SET LOCAL ROLE app_user');

        console.log('Attempting INSERT into ocr_records...');
        const res = await client.query(
            `INSERT INTO ocr_records (user_id, image_path, status) VALUES ($1, $2, 'processing') RETURNING id`,
            [userId, 'test/path.png']
        );
        console.log('INSERT SUCCESS:', res.rows[0].id);

        await client.query('ROLLBACK');
    } catch (err) {
        console.error('ERROR:', err.message);
        console.error('DETAIL:', err.detail);
        console.error('HINT:', err.hint);
        console.error('WHERE:', err.where);
    } finally {
        client.release();
        await pool.end();
    }
}

check();
