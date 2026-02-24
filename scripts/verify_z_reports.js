const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function verifyZReport() {
    try {
        console.log('Checking for recent Z-Reports...');
        const result = await pool.query('SELECT * FROM z_reports ORDER BY created_at DESC LIMIT 1');

        if (result.rows.length > 0) {
            const report = result.rows[0];
            console.log('✅ Z-Report found!');
            console.log('ID:', report.id);
            console.log('Opened At:', report.opened_at);
            console.log('Closed At:', report.closed_at);
            console.log('Total Income:', report.total_income);
            console.log('Total Expense:', report.total_expense);
            console.log('Order Count:', report.order_count);
            console.log('Transaction Count:', report.transaction_count);
            console.log('Payment Breakdown:', JSON.stringify(report.payment_breakdown, null, 2));
        } else {
            console.log('❌ No Z-Reports found.');
        }
    } catch (err) {
        console.error('Check failed:', err.message);
    } finally {
        await pool.end();
    }
}

verifyZReport();
