require('dotenv').config();
const fs = require('fs');
const { Pool } = require('pg');

const backupPath = 'd:/Personal_Project/g2panda_release/backups/g2panda_backup_2026-02-24T22-33-40.sql';
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function restoreTables() {
    const client = await pool.connect();
    try {
        const userRes = await client.query("SELECT id FROM users WHERE email='test3@test.com' LIMIT 1");
        if (userRes.rows.length === 0) {
            console.log('User not found!');
            return;
        }
        const userId = userRes.rows[0].id;

        const content = fs.readFileSync(backupPath, 'utf8');

        // Find COPY public.tables
        const tablesMatch = content.match(/COPY public\.tables[^\n]*\n([\s\S]*?)\\\./);
        if (!tablesMatch) {
            console.log('No tables found in backup');
            return;
        }

        const lines = tablesMatch[1].split('\n').filter(l => l.includes(userId));
        console.log(`Found ${lines.length} tables for test3 in the backup!`);

        if (lines.length > 0) {
            // First columns are usually: id, user_id, unique_code, name, type, rotation, capacity, area, status, pos_x, pos_y, deleted_at, created_at, updated_at, service_request
            const existingRes = await client.query("SELECT id FROM tables WHERE user_id = $1", [userId]);
            const existingIds = existingRes.rows.map(r => r.id);

            let restoredCount = 0;
            for (const line of lines) {
                const cols = line.split('\t');
                if (cols.length < 10) continue;

                const id = cols[0];
                if (existingIds.includes(id)) continue; // Already in DB

                console.log(`Restoring table: ${cols[3]}`);
                // Since columns might misalign, we insert using standard structure
                // Assume standard PG dump order: id, user_id, unique_code, name, type, rotation, capacity, area, status, pos_x, pos_y, deleted_at, created_at, updated_at, service_request
                await client.query(`
                    INSERT INTO tables (id, user_id, unique_code, name, type, rotation, capacity, area, status, pos_x, pos_y, created_at)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                    ON CONFLICT (id) DO NOTHING
                `, [id, userId, cols[2], cols[3], cols[4], parseInt(cols[5]) || 0, parseInt(cols[6]) || 2, cols[7], cols[8], parseFloat(cols[9]) || 0, parseFloat(cols[10]) || 0, cols[12] === '\\N' ? new Date() : cols[12]]);
                restoredCount++;
            }
            console.log(`Successfully restored ${restoredCount} missing tables!`);
        }
    } catch (e) {
        console.error(e);
    } finally {
        client.release();
        pool.end();
    }
}

restoreTables();
