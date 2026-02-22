const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

async function debugSystem() {
    try {
        await client.connect();
        console.log('Connected to database');

        // 1. Dump Schema
        const query = `
            SELECT column_name, data_type, is_nullable, numeric_precision, numeric_scale
            FROM information_schema.columns
            WHERE table_name = 'transaction_items';
        `;
        const res = await client.query(query);
        fs.writeFileSync(path.join(__dirname, '../logs/debug_schema.txt'), JSON.stringify(res.rows, null, 2));
        console.log('Schema dumped to logs/debug_schema.txt');

        // 2. Dump Recent Logs
        const logPath = path.join(__dirname, '../logs/error-2026-02-11.log');
        if (fs.existsSync(logPath)) {
            const logs = fs.readFileSync(logPath, 'utf8');
            const lines = logs.split('\n');
            const lastLines = lines.slice(-20).join('\n');
            fs.writeFileSync(path.join(__dirname, '../logs/debug_error_log.txt'), lastLines);
            console.log('Recent logs dumped to logs/debug_error_log.txt');
        } else {
            console.log('No error log file found.');
        }

    } catch (err) {
        console.error('Debug failed:', err);
    } finally {
        await client.end();
    }
}

debugSystem();
