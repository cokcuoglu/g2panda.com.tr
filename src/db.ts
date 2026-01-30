import { Pool, PoolClient, QueryResult } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Initialize PostgreSQL Pool
// Connection string should be in .env as DATABASE_URL
// Example: postgres://postgres:password@localhost:5432/gg_esnaf
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

/**
 * Execute a callback function within a database transaction and RLS context.
 * This is the CORE helper for all RLS-protected operations.
 * 
 * @param userId - Authenticated User UUID (from JWT)
 * @param callback - Async function that receives the db client
 * @returns Returns whatever the callback returns
 */
export const withTransaction = async <T>(userId: string, callback: (client: PoolClient) => Promise<T>): Promise<T> => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // CRITICAL: Set the Row Level Security Context for this transaction
        // 'true' as second arg handles cases where variable is not defined securely
        await client.query(`SELECT set_config('app.current_user_id', $1, true)`, [userId]);

        // Execute the business logic with the RLS-configured client
        const result = await callback(client);

        await client.query('COMMIT');
        return result;

    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

/**
 * Generic query executor for non-transactional / public queries.
 * WARNING: Does NOT enforce RLS. Use ONLY for public endpoints (login, register).
 */
export const query = (text: string, params?: any[]): Promise<QueryResult> => {
    return pool.query(text, params);
};
