const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const backupDir = path.join(__dirname, '..', 'backups');
    const backupFile = path.join(backupDir, `g2panda_backup_${timestamp}.sql`);

    try {
        console.log('═══════════════════════════════════════════════════');
        console.log('CREATING DATABASE BACKUP');
        console.log('═══════════════════════════════════════════════════\n');

        let sqlDump = `-- Database Backup: g2panda_release\n`;
        sqlDump += `-- Created: ${new Date().toISOString()}\n`;
        sqlDump += `-- After schema fixes and data restoration\n\n`;

        // Get all table names
        const tables = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_type = 'BASE TABLE'
            ORDER BY table_name
        `);

        console.log(`Found ${tables.rows.length} tables to backup\n`);

        for (const { table_name } of tables.rows) {
            console.log(`Backing up table: ${table_name}...`);

            // Get table data
            const data = await pool.query(`SELECT * FROM ${table_name}`);

            if (data.rows.length > 0) {
                sqlDump += `\n-- Table: ${table_name} (${data.rows.length} rows)\n`;
                sqlDump += `TRUNCATE TABLE ${table_name} CASCADE;\n`;

                // Get column names
                const columns = Object.keys(data.rows[0]);

                for (const row of data.rows) {
                    const values = columns.map(col => {
                        const val = row[col];
                        if (val === null) return 'NULL';
                        if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'`;
                        if (val instanceof Date) return `'${val.toISOString()}'`;
                        if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
                        if (Array.isArray(val)) return `'${JSON.stringify(val)}'`;
                        return val;
                    });

                    sqlDump += `INSERT INTO ${table_name} (${columns.join(', ')}) VALUES (${values.join(', ')});\n`;
                }
            }
        }

        // Write to file
        fs.writeFileSync(backupFile, sqlDump);

        const stats = fs.statSync(backupFile);
        const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

        console.log('\n✅ Backup created successfully!');
        console.log(`📁 Location: ${backupFile}`);
        console.log(`📊 Size: ${fileSizeMB} MB`);
        console.log(`⏰ Timestamp: ${timestamp}`);

        console.log('\n═══════════════════════════════════════════════════');
        console.log('BACKUP COMPLETE');
        console.log('═══════════════════════════════════════════════════');

    } catch (err) {
        console.error('❌ BACKUP FAILED:', err.message);
    } finally {
        await pool.end();
    }
}

createBackup();
