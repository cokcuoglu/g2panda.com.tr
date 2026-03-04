const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({ connectionString: 'postgres://postgres:postgres@localhost:5432/gg_esnaf' });

async function dumpDB() {
    console.log('Starting DB Backup...');
    try {
        const tablesRes = await pool.query("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'");
        let dumpObj = {
            timestamp: new Date().toISOString(),
            tables: {}
        };

        for (let row of tablesRes.rows) {
            let table = row.tablename;
            console.log('Dumping table: ' + table);
            const dataRes = await pool.query(`SELECT * FROM "${table}"`);
            dumpObj.tables[table] = dataRes.rows;
        }

        fs.writeFileSync('d:/Personal_Project/g2panda_release/db_backup_after_receipt_ai_fix.json', JSON.stringify(dumpObj, null, 2));
        console.log('Backup Successfully Saved to db_backup_after_receipt_ai_fix.json (' + (JSON.stringify(dumpObj).length / 1024).toFixed(2) + ' KB)');
    } catch (e) {
        console.error('Backup Error:', e);
    } finally {
        await pool.end();
    }
}

dumpDB();
