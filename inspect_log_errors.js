const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function inspectErrors() {
    try {
        const userId = 'be8b8541-f427-4287-a00b-a0e9783e5209'; // Found in logs

        // 1. Confirm User
        console.log(`🔍 Checking User ID: ${userId}`);
        const userRes = await pool.query(`SELECT id, email FROM users WHERE id = $1`, [userId]);
        if (userRes.rows.length > 0) {
            console.log('✅ User Confirmed:', userRes.rows[0]);
        } else {
            console.log('❌ User not found by ID (maybe old logs?)');
        }

        // 2. Check Transactions Constraint
        console.log('\n🔍 Checking "transactions_document_type_check"...');
        const constraintRes = await pool.query(`
            SELECT pg_get_constraintdef(oid) as def
            FROM pg_constraint
            WHERE conname = 'transactions_document_type_check';
        `);
        if (constraintRes.rows.length > 0) {
            console.log('Constraint Definition:', constraintRes.rows[0].def);
        } else {
            console.log('❌ Constraint not found.');
        }

        // 3. Check Orders RLS Policy
        console.log('\n🔍 Checking "orders" Policies...');
        const policyRes = await pool.query(`
            SELECT policyname, cmd, roles, qual, with_check 
            FROM pg_policies 
            WHERE tablename = 'orders';
        `);
        if (policyRes.rows.length > 0) {
            policyRes.rows.forEach(p => {
                console.log(`- Policy: ${p.policyname} (${p.cmd})`);
                console.log(`  Qual: ${p.qual}`);
            });
        } else {
            console.log('❌ No policies found on orders.');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

inspectErrors();
