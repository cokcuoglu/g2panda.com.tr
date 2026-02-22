const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function addBusinessLogoColumn() {
    try {
        console.log('═══════════════════════════════════════════════════');
        console.log('ADDING business_logo COLUMN TO users TABLE');
        console.log('═══════════════════════════════════════════════════\n');

        console.log('📝 Adding business_logo column...');
        await pool.query(`
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS business_logo TEXT
        `);
        console.log('✅ business_logo column added');

        // Verify
        console.log('\n📊 Verifying column exists...');
        const res = await pool.query(`
            SELECT column_name, data_type
            FROM information_schema.columns 
            WHERE table_name = 'users' AND column_name = 'business_logo'
        `);

        if (res.rows.length > 0) {
            console.log('✅ Verification successful:', res.rows[0]);
        } else {
            console.log('❌ Column not found after migration');
        }

        // Show all users
        console.log('\n👥 All users:');
        const users = await pool.query('SELECT id, email, full_name, business_name, business_logo FROM users');
        console.table(users.rows);

        console.log('\n═══════════════════════════════════════════════════');
        console.log('COLUMN ADDITION COMPLETE');
        console.log('═══════════════════════════════════════════════════');

    } catch (err) {
        console.error('❌ ERROR:', err.message);
    } finally {
        await pool.end();
    }
}

addBusinessLogoColumn();
