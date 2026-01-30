import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function deleteUser(email: string) {
    console.log(`Attempting to delete user: ${email}`);
    const client = await pool.connect();

    try {
        const res = await client.query('SELECT id FROM users WHERE email = $1', [email]);
        if (res.rows.length === 0) {
            console.log('User not found.');
            return;
        }
        const userId = res.rows[0].id;
        console.log(`Found User ID: ${userId}`);

        await client.query('BEGIN');

        // 2. Delete Transactions (Dependencies)
        // Delete by user ownership AND by references to user's categories/channels (orphaned/inconsistent data)
        const txRes = await client.query(`
            DELETE FROM transactions 
            WHERE user_id = $1 
               OR category_id IN (SELECT id FROM categories WHERE user_id = $1)
               OR channel_id IN (SELECT id FROM channels WHERE user_id = $1)
        `, [userId]);
        console.log(`Deleted ${txRes.rowCount} transactions (including cross-referenced).`);

        const prodRes = await client.query('DELETE FROM products WHERE user_id = $1', [userId]);
        console.log(`Deleted ${prodRes.rowCount} products.`);

        const fixedRes = await client.query('DELETE FROM fixed_expenses WHERE user_id = $1', [userId]);
        console.log(`Deleted ${fixedRes.rowCount} fixed expenses.`);

        const ocrRes = await client.query('DELETE FROM ocr_records WHERE user_id = $1', [userId]);
        console.log(`Deleted ${ocrRes.rowCount} ocr records.`);

        // New: Delete Audit Logs
        const auditRes = await client.query('DELETE FROM audit_logs WHERE performed_by = $1', [userId]);
        console.log(`Deleted ${auditRes.rowCount} audit logs.`);

        // New: Explicitly delete Channels and Categories to see if they block
        const chanRes = await client.query('DELETE FROM channels WHERE user_id = $1', [userId]);
        console.log(`Deleted ${chanRes.rowCount} channels.`);

        const catRes = await client.query('DELETE FROM categories WHERE user_id = $1', [userId]);
        console.log(`Deleted ${catRes.rowCount} categories.`);

        // Finally Delete User
        const userRes = await client.query('DELETE FROM users WHERE id = $1', [userId]);
        console.log(`Deleted user record.`);

        await client.query('COMMIT');
        console.log('Successfully deleted user and all related data.');

    } catch (error: any) {
        await client.query('ROLLBACK');
        console.error('Error details:', error);
        if (error.table) console.error('Table causing error:', error.table);
        if (error.constraint) console.error('Constraint violation:', error.constraint);
    } finally {
        client.release();
        pool.end();
    }
}

deleteUser('ahmet@yilmazmarket.com');
