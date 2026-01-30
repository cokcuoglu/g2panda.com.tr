const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'gg_esnaf'
});

async function checkRole() {
    try {
        await client.connect();

        // Check if app_user role exists
        const roleCheck = await client.query(`
            SELECT rolname FROM pg_roles WHERE rolname = 'app_user'
        `);

        if (roleCheck.rows.length === 0) {
            console.log('❌ app_user role does NOT exist!');
            console.log('Creating app_user role...');

            await client.query(`CREATE ROLE app_user`);
            console.log('✓ Created app_user role');
        } else {
            console.log('✓ app_user role exists');
        }

        // Grant permissions
        console.log('\nGranting permissions to app_user...');
        await client.query(`
            GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
            GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;
        `);
        console.log('✓ Permissions granted');

        // Check table permissions
        const perms = await client.query(`
            SELECT grantee, table_name, privilege_type
            FROM information_schema.role_table_grants
            WHERE grantee = 'app_user'
            AND table_schema = 'public'
            ORDER BY table_name, privilege_type
        `);

        console.log('\napp_user permissions:');
        const grouped = {};
        perms.rows.forEach(r => {
            if (!grouped[r.table_name]) grouped[r.table_name] = [];
            grouped[r.table_name].push(r.privilege_type);
        });

        Object.keys(grouped).forEach(table => {
            console.log(`  ${table}: ${grouped[table].join(', ')}`);
        });

    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    } finally {
        await client.end();
    }
}

checkRole();
