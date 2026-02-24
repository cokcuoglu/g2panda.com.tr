const { pool } = require('./dist/db.js');

async function migrate() {
    try {
        console.log('Starting migration for Intermediate Products...');

        // 1. Add is_intermediate to raw_materials
        console.log('Adding is_intermediate column to raw_materials...');
        await pool.query(`
            ALTER TABLE raw_materials 
            ADD COLUMN IF NOT EXISTS is_intermediate BOOLEAN DEFAULT false;
        `);

        // 2. Create intermediate_recipes table
        console.log('Creating intermediate_recipes table...');
        await pool.query(`
            CREATE TABLE IF NOT EXISTS intermediate_recipes (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                intermediate_id UUID REFERENCES raw_materials(id) ON DELETE CASCADE, -- The Ara Ürün
                raw_material_id UUID REFERENCES raw_materials(id) ON DELETE CASCADE, -- The component used
                quantity NUMERIC NOT NULL CHECK (quantity > 0),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                UNIQUE(intermediate_id, raw_material_id)
            );
        `);

        console.log('Migration completed successfully.');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        process.exit();
    }
}

migrate();
