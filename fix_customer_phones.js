const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function fixPhones() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        console.log('🔄 Starting phone number normalization and cleanup...');

        // 1. Fetch all active customers
        const res = await client.query('SELECT id, user_id, phone, created_at FROM customers WHERE deleted_at IS NULL');
        const customers = res.rows;

        const seenToken = new Set(); // user_id + normalized_phone
        const toDeleteIds = [];
        const toUpdateIds = []; // { id, newPhone }

        for (const c of customers) {
            let phone = c.phone || '';
            // Normalize: remove leading 0 if 11 chars starting with 05
            if (phone.length === 11 && phone.startsWith('05')) {
                phone = phone.substring(1);
            }

            // Check if matches strict format now
            if (!phone.match(/^[5][0-9]{9}$/)) {
                console.log(`❌ Mark for delete (Invalid Format): ${c.phone} (ID: ${c.id})`);
                toDeleteIds.push(c.id);
                continue;
            }

            const token = `${c.user_id}_${phone}`;
            if (seenToken.has(token)) {
                console.log(`⚠️ Mark for delete (Duplicate): ${phone} (ID: ${c.id})`);
                toDeleteIds.push(c.id); // Simple strategy: keep the first one encountered (usually older), or could sort by date
            } else {
                seenToken.add(token);
                // If the phone changed during normalization, mark for update
                if (phone !== c.phone) {
                    toUpdateIds.push({ id: c.id, phone: phone });
                }
            }
        }

        // 2. Execute Deletions
        if (toDeleteIds.length > 0) {
            console.log(`🗑️ Deleting ${toDeleteIds.length} invalid/duplicate records...`);
            await client.query('DELETE FROM customers WHERE id = ANY($1)', [toDeleteIds]);
        }

        // 3. Execute Updates
        if (toUpdateIds.length > 0) {
            console.log(`✏️ Updating ${toUpdateIds.length} records to normalized format...`);
            for (const item of toUpdateIds) {
                await client.query('UPDATE customers SET phone = $1 WHERE id = $2', [item.phone, item.id]);
            }
        }

        await client.query('COMMIT');
        console.log('✅ Cleanup complete. Ready for migration.');

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

fixPhones();
