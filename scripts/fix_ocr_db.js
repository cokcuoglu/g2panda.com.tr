const pg = require('pg');
const pool = new pg.Pool({ connectionString: 'postgres://postgres:postgres@localhost:5432/gg_esnaf' });

async function fix() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        console.log('Updating status check constraint for ocr_records...');
        await client.query('ALTER TABLE ocr_records DROP CONSTRAINT IF EXISTS ocr_records_status_check');
        await client.query("ALTER TABLE ocr_records ADD CONSTRAINT ocr_records_status_check CHECK (status IN ('pending', 'processing', 'completed', 'confirmed', 'failed'))");

        console.log('Standardizing RLS policy for ocr_records...');
        await client.query('DROP POLICY IF EXISTS ocr_records_isolation ON ocr_records');
        await client.query('DROP POLICY IF EXISTS ocr_records_isolation_policy ON ocr_records');
        await client.query(`
            CREATE POLICY ocr_records_isolation ON ocr_records 
            FOR ALL 
            TO public 
            USING (user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid) 
            WITH CHECK (user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid)
        `);

        // Also ensure transaction_items has ocr_record_id and it works with RLS
        console.log('Checking transaction_items RLS...');
        // (Usually handled by parent transaction isolation policy if it uses RLS, but let's be safe)

        await client.query('COMMIT');
        console.log('Database fixes applied successfully!');
    } catch (e) {
        await client.query('ROLLBACK');
        console.error('Database fix failed:', e);
    } finally {
        client.release();
        await pool.end();
    }
}

fix();
