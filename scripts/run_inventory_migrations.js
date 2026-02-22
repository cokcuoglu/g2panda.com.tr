const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function runInventoryMigrations() {
    const migrations = [
        '70_inventory_raw_materials.sql',
        '71_inventory_stock_entries.sql',
        '72_inventory_product_ingredients.sql',
        '73_inventory_stock_movements.sql'
    ];

    try {
        console.log('═══════════════════════════════════════════════════');
        console.log('RUNNING INVENTORY MANAGEMENT MIGRATIONS');
        console.log('═══════════════════════════════════════════════════\n');

        for (const migration of migrations) {
            const filePath = path.join(__dirname, '..', 'database', migration);

            if (!fs.existsSync(filePath)) {
                console.log(`⚠️  Skipping ${migration} - file not found`);
                continue;
            }

            console.log(`📝 Executing: ${migration}`);
            const sql = fs.readFileSync(filePath, 'utf8');

            await pool.query(sql);
            console.log(`✅ ${migration} completed\n`);
        }

        // Verify tables were created
        console.log('📊 Verifying created tables...\n');
        const result = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name LIKE '%inventory%' OR table_name IN ('raw_materials', 'raw_material_stock_entries', 'product_ingredients', 'stock_movements')
            ORDER BY table_name
        `);

        console.log('Created tables:');
        result.rows.forEach(row => console.log(`  ✓ ${row.table_name}`));

        console.log('\n═══════════════════════════════════════════════════');
        console.log('MIGRATIONS COMPLETED SUCCESSFULLY');
        console.log('═══════════════════════════════════════════════════');

    } catch (err) {
        console.error('❌ MIGRATION FAILED:', err.message);
        console.error('Detail:', err.detail);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

runInventoryMigrations();
