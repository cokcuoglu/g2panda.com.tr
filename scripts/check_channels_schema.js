const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function checkChannelsSchema() {
    try {
        console.log('═══════════════════════════════════════════════════');
        console.log('CHANNELS TABLE SCHEMA CHECK');
        console.log('═══════════════════════════════════════════════════\n');

        const schema = await pool.query(`
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns 
            WHERE table_name = 'channels' 
            ORDER BY ordinal_position
        `);

        console.log('Current schema:');
        console.table(schema.rows);

        // Expected columns based on the UI screenshot
        const expectedColumns = [
            'id', 'user_id', 'name', 'type', 'commission_rate',
            'description', 'created_at', 'updated_at', 'deleted_at'
        ];

        const existingColumns = schema.rows.map(r => r.column_name);
        const missing = expectedColumns.filter(col => !existingColumns.includes(col));

        if (missing.length > 0) {
            console.log('\n⚠️  Missing columns:', missing.join(', '));
        } else {
            console.log('\n✅ All expected columns present');
        }

        console.log('\n═══════════════════════════════════════════════════');

    } catch (err) {
        console.error('❌ ERROR:', err.message);
    } finally {
        await pool.end();
    }
}

checkChannelsSchema();
