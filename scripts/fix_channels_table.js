const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function fixChannelsTable() {
    try {
        console.log('═══════════════════════════════════════════════════');
        console.log('FIXING CHANNELS TABLE');
        console.log('═══════════════════════════════════════════════════\n');

        // Add type column if missing
        console.log('📝 Adding type column...');
        await pool.query(`
            ALTER TABLE channels 
            ADD COLUMN IF NOT EXISTS type VARCHAR(50)
        `);
        console.log('✅ type column added/verified');

        // Add commission_rate column if missing
        console.log('📝 Adding commission_rate column...');
        await pool.query(`
            ALTER TABLE channels 
            ADD COLUMN IF NOT EXISTS commission_rate NUMERIC(5,2) DEFAULT 0
        `);
        console.log('✅ commission_rate column added/verified');

        // Add description column if missing
        console.log('📝 Adding description column...');
        await pool.query(`
            ALTER TABLE channels 
            ADD COLUMN IF NOT EXISTS description TEXT
        `);
        console.log('✅ description column added/verified');

        // Verify final schema
        console.log('\n📊 Final schema:');
        const schema = await pool.query(`
            SELECT column_name, data_type
            FROM information_schema.columns 
            WHERE table_name = 'channels' 
            ORDER BY ordinal_position
        `);
        console.table(schema.rows);

        console.log('\n═══════════════════════════════════════════════════');
        console.log('CHANNELS TABLE FIXED');
        console.log('═══════════════════════════════════════════════════');

    } catch (err) {
        console.error('❌ ERROR:', err.message);
    } finally {
        await pool.end();
    }
}

fixChannelsTable();
