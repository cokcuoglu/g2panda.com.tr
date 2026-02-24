const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://g2panda:g2panda123@localhost:5432/g2panda' // adjust if needed based on typical local env var
});

async function run() {
    try {
        await client.connect();
        console.log("Connected to DB.");

        // First, let's see what the constraint is
        const checkRes = await client.query(`
            SELECT pg_get_constraintdef(oid) 
            FROM pg_constraint 
            WHERE conname = 'transactions_amount_check';
        `);
        console.log("Current constraint:", checkRes.rows);

        // Drop the old constraint
        await client.query(`
            ALTER TABLE transactions 
            DROP CONSTRAINT IF EXISTS transactions_amount_check;
        `);
        console.log("Dropped old constraint.");

        // Add the new one allowing 0
        await client.query(`
            ALTER TABLE transactions 
            ADD CONSTRAINT transactions_amount_check CHECK (amount >= 0);
        `);
        console.log("Added new constraint (amount >= 0).");

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.end();
    }
}

run();
