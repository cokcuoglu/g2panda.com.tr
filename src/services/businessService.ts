import { pool } from '../db';

export const BusinessService = {
    async toggleStatus(userId: string): Promise<any> {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const currentRes = await client.query('SELECT is_open, last_opened_at FROM users WHERE id = $1', [userId]);
            if (currentRes.rows.length === 0) {
                await client.query('ROLLBACK');
                throw new Error('Business not found');
            }

            const currentStatus = currentRes.rows[0].is_open;
            if (currentStatus) {
                // Currently Open -> Close it
                const result = await this.closeBusiness(userId, currentRes.rows[0].last_opened_at, client);
                await client.query('COMMIT');
                return result;
            } else {
                // Currently Closed -> Open it
                const result = await this.openBusiness(userId, client);
                await client.query('COMMIT');
                return result;
            }
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    },

    async openBusiness(userId: string, clientInstance: any = null): Promise<any> {
        const client = clientInstance || await pool.connect();
        const shouldRelease = !clientInstance;

        try {
            if (shouldRelease) await client.query('BEGIN');

            const now = new Date();
            const updateResult = await client.query(
                `UPDATE users SET is_open = true, last_opened_at = $1 WHERE id = $2 RETURNING is_open, last_opened_at, last_closed_at`,
                [now, userId]
            );

            if (shouldRelease) await client.query('COMMIT');
            return updateResult.rows[0];
        } catch (error) {
            if (shouldRelease) await client.query('ROLLBACK');
            throw error;
        } finally {
            if (shouldRelease) client.release();
        }
    },

    async closeBusiness(userId: string, targetOpenedAt: string | null = null, clientInstance: any = null): Promise<any> {
        const client = clientInstance || await pool.connect();
        const shouldRelease = !clientInstance;

        try {
            if (shouldRelease) await client.query('BEGIN');

            const now = new Date();
            let lastOpenedAt = targetOpenedAt;

            if (!lastOpenedAt) {
                const currentRes = await client.query('SELECT last_opened_at FROM users WHERE id = $1', [userId]);
                if (currentRes.rows.length > 0) lastOpenedAt = currentRes.rows[0].last_opened_at;
            }

            if (lastOpenedAt) {
                // 1. Generate Z-Report
                const transSummary = await client.query(`
                    SELECT 
                        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as total_income,
                        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as total_expense,
                        COUNT(*) as transaction_count
                    FROM transactions 
                    WHERE user_id = $1 
                    AND transaction_date >= $2 
                    AND transaction_date <= $3
                    AND deleted_at IS NULL
                `, [userId, lastOpenedAt, now]);

                const orderSummary = await client.query(`
                    SELECT COUNT(*) as order_count 
                    FROM orders 
                    WHERE user_id = $1 
                    AND created_at >= $2 
                    AND created_at <= $3
                    AND deleted_at IS NULL
                `, [userId, lastOpenedAt, now]);

                const paymentBreakdown = await client.query(`
                    SELECT c.name as channel_name, SUM(t.amount) as amount
                    FROM transactions t
                    JOIN channels c ON t.channel_id = c.id
                    WHERE t.user_id = $1 
                    AND t.transaction_date >= $2 
                    AND t.transaction_date <= $3
                    AND t.type = 'income'
                    AND t.deleted_at IS NULL
                    GROUP BY c.name
                `, [userId, lastOpenedAt, now]);

                const breakdownObj: Record<string, number> = {};
                paymentBreakdown.rows.forEach((row: any) => {
                    breakdownObj[row.channel_name] = parseFloat(row.amount);
                });

                await client.query(`
                    INSERT INTO z_reports (
                        user_id, opened_at, closed_at, total_income, total_expense, 
                        order_count, transaction_count, payment_breakdown
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                `, [
                    userId,
                    lastOpenedAt,
                    now,
                    parseFloat(transSummary.rows[0].total_income || 0),
                    parseFloat(transSummary.rows[0].total_expense || 0),
                    parseInt(orderSummary.rows[0].order_count || 0),
                    parseInt(transSummary.rows[0].transaction_count || 0),
                    JSON.stringify(breakdownObj)
                ]);
            }

            // 2. Set is_open to false
            const updateResult = await client.query(
                `UPDATE users SET is_open = false, last_closed_at = $1 WHERE id = $2 RETURNING is_open, last_opened_at, last_closed_at`,
                [now, userId]
            );

            if (shouldRelease) await client.query('COMMIT');
            return updateResult.rows[0];

        } catch (error) {
            if (shouldRelease) await client.query('ROLLBACK');
            throw error;
        } finally {
            if (shouldRelease) client.release();
        }
    }
};
