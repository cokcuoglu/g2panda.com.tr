const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'gg_esnaf'
});

async function checkProductsTable() {
    try {
        await client.connect();

        // Check products table structure
        const columns = await client.query(`
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns 
            WHERE table_name = 'products' 
            ORDER BY ordinal_position
        `);

        console.log('Products table columns:');
        columns.rows.forEach(r => {
            console.log(`  ${r.column_name}: ${r.data_type} ${r.is_nullable === 'NO' ? 'NOT NULL' : 'NULL'}`);
        });

        // Check if description column exists
        const hasDescription = columns.rows.some(r => r.column_name === 'description');
        console.log(`\n✓ Description column exists: ${hasDescription}`);

        // Check constraints
        const constraints = await client.query(`
            SELECT constraint_name, constraint_type
            FROM information_schema.table_constraints
            WHERE table_name = 'products'
        `);

        console.log('\nConstraints:');
        constraints.rows.forEach(r => {
            console.log(`  ${r.constraint_name}: ${r.constraint_type}`);
        });

    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    } finally {
        await client.end();
    }
}

checkProductsTable();
