const { pool } = require('./src/db');

async function checkRLSStatus() {
    try {
        console.log('=== CHECKING RLS STATUS ===\n');

        const res = await pool.query(`
            SELECT 
                schemaname,
                tablename,
                rowsecurity as rls_enabled
            FROM pg_tables 
            WHERE tablename IN ('transactions', 'products', 'categories', 'channels')
            ORDER BY tablename
        `);

        console.log('RLS Status for tables:');
        res.rows.forEach(row => {
            console.log(`  ${row.tablename}: ${row.rls_enabled ? 'ENABLED' : 'DISABLED'}`);
        });

    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

checkRLSStatus();
