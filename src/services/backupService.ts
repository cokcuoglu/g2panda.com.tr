import fs from 'fs';
import path from 'path';
import cron from 'node-cron';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const BACKUP_DIR = path.join(__dirname, '../../backups');
const RETENTION_DAYS = 7;

// Create a separate pool for backups to avoid blocking main app pool (optional but safer)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export const performBackup = async () => {
    try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        const backupPath = path.join(BACKUP_DIR, timestamp);

        if (!fs.existsSync(backupPath)) {
            fs.mkdirSync(backupPath, { recursive: true });
        }

        console.log(`[Backup] Starting backup to: ${backupPath}`);

        const tables = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);

        for (const row of tables.rows) {
            const table = row.table_name;
            const data = await pool.query(`SELECT * FROM "${table}"`);
            fs.writeFileSync(
                path.join(backupPath, `${table}.json`),
                JSON.stringify(data.rows, null, 2)
            );
        }

        console.log(`[Backup] Completed successfully.`);

        // Clean old backups
        await cleanOldBackups();

    } catch (err) {
        console.error('[Backup] Error:', err);
    }
};

const cleanOldBackups = async () => {
    try {
        if (!fs.existsSync(BACKUP_DIR)) return;

        const files = fs.readdirSync(BACKUP_DIR);
        const now = new Date();

        files.forEach(file => {
            const filePath = path.join(BACKUP_DIR, file);
            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                // Check age
                const diffTime = Math.abs(now.getTime() - stats.birthtime.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays > RETENTION_DAYS) {
                    console.log(`[Backup] Deleting old backup: ${file} (${diffDays} days old)`);
                    fs.rmSync(filePath, { recursive: true, force: true });
                }
            }
        });
    } catch (err) {
        console.error('[Backup] Cleanup Error:', err);
    }
};

export const initBackupScheduler = () => {
    // Schedule daily at 00:00 (Midnight)
    console.log('[Backup] Scheduler initialized for 00:00 daily.');
    cron.schedule('0 0 * * *', () => {
        console.log('[Backup] Executing scheduled backup...');
        performBackup();
    });
};
