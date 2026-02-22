import cron from 'node-cron';
import { pool } from '../db';
import logger from '../config/logger';

/**
 * Archive Service
 * Automatically archives completed orders from previous days
 * Runs daily at 04:00 AM
 */

async function archiveOrders() {
    try {
        logger.info('[ARCHIVE-SERVICE] Starting daily order archiving...');

        // Get all users
        const usersResult = await pool.query('SELECT id FROM users WHERE deleted_at IS NULL');
        const users = usersResult.rows;

        let totalArchived = 0;

        // Archive orders for each user
        for (const user of users) {
            try {
                const result = await pool.query(`
                    UPDATE orders 
                    SET archived_at = NOW()
                    WHERE user_id = $1 
                    AND archived_at IS NULL
                    AND DATE(created_at) < CURRENT_DATE
                    AND status IN ('completed', 'rejected', 'cancelled')
                    RETURNING id
                `, [user.id]);

                const archivedCount = result.rows.length;
                totalArchived += archivedCount;

                if (archivedCount > 0) {
                    logger.info(`[ARCHIVE-SERVICE] User ${user.id}: Archived ${archivedCount} orders`);
                }
            } catch (userErr) {
                logger.error(`[ARCHIVE-SERVICE] Error archiving for user ${user.id}:`, userErr);
                // Continue with next user
            }
        }

        logger.info(`[ARCHIVE-SERVICE] Completed. Total archived: ${totalArchived} orders`);

    } catch (err) {
        logger.error('[ARCHIVE-SERVICE] Archive task failed:', err);
    }
}

export function initArchiveScheduler() {
    // Run daily at 04:00 AM (Turkey time: UTC+3)
    // Cron format: minute hour day month weekday
    cron.schedule('0 4 * * *', async () => {
        logger.info('[ARCHIVE-SERVICE] Scheduled archive task triggered');
        await archiveOrders();
    }, {
        timezone: "Europe/Istanbul"
    });

    logger.info('[ARCHIVE-SERVICE] Scheduler initialized - will run daily at 04:00 AM');
}
