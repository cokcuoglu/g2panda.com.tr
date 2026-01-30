import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function checkEndpointLogic() {
    try {
        console.log('Simulating endpoint query...');
        const query = `
          SELECT SUM(amount) as total 
          FROM transactions 
          WHERE type = 'income' 
          AND deleted_at IS NULL 
          AND transaction_date = CURRENT_DATE 
        `;
        const result = await pool.query(query);
        const total = result.rows[0].total || 0;
        console.log('Raw DB Result:', result.rows[0]);
        console.log('Processed Total:', Number(total));
        console.log('Type of Total:', typeof Number(total));

    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

checkEndpointLogic();
