const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

async function checkLastTransaction() {
    try {
        await client.connect();

        // Get the most recent transaction
        const txRes = await client.query(`
            SELECT id, type, amount, description, created_at 
            FROM transactions 
            ORDER BY created_at DESC 
            LIMIT 1
        `);

        if (txRes.rows.length === 0) {
            console.log('No transactions found.');
            return;
        }

        const tx = txRes.rows[0];
        console.log('\n=== Last Transaction ===');
        console.log(`ID: ${tx.id}`);
        console.log(`Type: ${tx.type}`);
        console.log(`Amount: ${tx.amount}`);
        console.log(`Description: ${tx.description}`);
        console.log(`Created: ${tx.created_at}`);

        // Get items for this transaction
        const itemsRes = await client.query(`
            SELECT id, name, quantity, unit, total_price, is_stock
            FROM transaction_items 
            WHERE transaction_id = $1
            ORDER BY created_at
        `, [tx.id]);

        console.log(`\n=== Items (${itemsRes.rows.length}) ===`);
        itemsRes.rows.forEach((item, idx) => {
            console.log(`${idx + 1}. ${item.name}`);
            console.log(`   Quantity: ${item.quantity} ${item.unit}`);
            console.log(`   Price: ${item.total_price}`);
            console.log(`   Stock: ${item.is_stock}`);
        });

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await client.end();
    }
}

checkLastTransaction();
