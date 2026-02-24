import cron from 'node-cron';
import { pool } from '../db';
import { BusinessService } from './businessService';

export const startCronJobs = () => {
    console.log('Starting Job Scheduler...');

    // Check auto open/close times every minute
    cron.schedule('* * * * *', async () => {
        try {
            const now = new Date();
            const currentHours = String(now.getHours()).padStart(2, '0');
            const currentMinutes = String(now.getMinutes()).padStart(2, '0');
            const currentTimeStr = `${currentHours}:${currentMinutes}`;
            const currentSeconds = now.getSeconds();

            // We want to avoid running this logic instantly if cron triggers at :00 vs :59
            // But node-cron '*' runs exactly at the 0th second of every minute anyway.

            // Get all businesses with schedule configurations
            const result = await pool.query(`
                SELECT id, is_open, auto_open_time, auto_close_time 
                FROM users 
                WHERE auto_open_time IS NOT NULL OR auto_close_time IS NOT NULL
            `);

            for (const user of result.rows) {
                const { id: userId, is_open, auto_open_time, auto_close_time } = user;

                // Format DB times "HH:mm:ss" down to "HH:mm" for comparison
                const openTime = auto_open_time ? auto_open_time.substring(0, 5) : null;
                const closeTime = auto_close_time ? auto_close_time.substring(0, 5) : null;

                // Case 1: Same open/close time -> Flush Z-report instantly (Close then Open immediately)
                if (openTime === currentTimeStr && closeTime === currentTimeStr) {
                    console.log(`[Job] User ${userId} has matching open/close time (${currentTimeStr}). Generating Z-Report flush.`);
                    if (is_open) {
                        await BusinessService.closeBusiness(userId); // Closes & generates Z-Report
                        await BusinessService.openBusiness(userId);  // Re-opens immediately
                    } else {
                        // Shop is already closed when this triggered. Just open it.
                        await BusinessService.openBusiness(userId);
                    }
                    continue; // Done for this user
                }

                // Case 2: Auto Closing Time matched
                if (closeTime === currentTimeStr && is_open) {
                    console.log(`[Job] User ${userId} auto closing triggered at ${currentTimeStr}.`);
                    await BusinessService.closeBusiness(userId);
                    continue;
                }

                // Case 3: Auto Opening Time matched
                if (openTime === currentTimeStr && !is_open) {
                    console.log(`[Job] User ${userId} auto opening triggered at ${currentTimeStr}.`);
                    await BusinessService.openBusiness(userId);
                    continue;
                }
            }

        } catch (error) {
            console.error('[Job] Scheduled task error:', error);
        }
    });

    console.log('Scheduler Active.');
};
