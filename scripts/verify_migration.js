const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'gg_esnaf'
});

async function verifySchema() {
    try {
        await client.connect();

        // Check categories table columns
        const categoriesColumns = await client.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'categories' 
            ORDER BY ordinal_position
        `);

        console.log('✓ Categories table columns:');
        categoriesColumns.rows.forEach(r => {
            console.log(`  - ${r.column_name}: ${r.data_type}`);
        });

        // Check category_channels table
        const categoryChannelsColumns = await client.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'category_channels' 
            ORDER BY ordinal_position
        `);

        console.log('\n✓ category_channels table columns:');
        categoryChannelsColumns.rows.forEach(r => {
            console.log(`  - ${r.column_name}: ${r.data_type}`);
        });

        console.log('\n✓ Migration verified successfully!');

    } catch (err) {
        console.error('❌ Verification failed:', err.message);
        process.exit(1);
    } finally {
        await client.end();
    }
}

verifySchema();
