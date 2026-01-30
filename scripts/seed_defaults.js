
const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

// Load env from project root
dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const DEFAULT_CATEGORIES = [
    { name: 'Satış Geliri', type: 'income', color: '#10b981', expense_type: null },
    { name: 'Hizmet Geliri', type: 'income', color: '#3b82f6', expense_type: null },
    { name: 'Kira Giderleri', type: 'expense', color: '#ef4444', expense_type: 'fixed' },
    { name: 'Fatura & Abonelik', type: 'expense', color: '#f59e0b', expense_type: 'fixed' },
    { name: 'Personel Maaş', type: 'expense', color: '#6366f1', expense_type: 'operational' },
    { name: 'Stok / Malzeme', type: 'expense', color: '#8b5cf6', expense_type: 'operational' },
    { name: 'Diğer Giderler', type: 'expense', color: '#64748b', expense_type: null }
];

async function main() {
    const client = await pool.connect();
    try {
        // Get all users
        const usersRes = await client.query('SELECT id, email FROM users');
        const users = usersRes.rows;

        console.log(`Found ${users.length} users.`);

        for (const user of users) {
            // Check if user has categories
            const catCheck = await client.query('SELECT COUNT(*) FROM categories WHERE user_id = $1 AND deleted_at IS NULL', [user.id]);
            const count = parseInt(catCheck.rows[0].count);

            if (count === 0) {
                console.log(`User ${user.email} has 0 categories. Seeding defaults...`);

                for (const cat of DEFAULT_CATEGORIES) {
                    await client.query(
                        `INSERT INTO categories (name, type, color, expense_type, user_id, is_active, is_default) 
                         VALUES ($1, $2, $3, $4, $5, true, true)`,
                        [cat.name, cat.type, cat.color, cat.expense_type, user.id]
                    );
                }
                console.log(`  Added ${DEFAULT_CATEGORIES.length} categories.`);
            } else {
                console.log(`User ${user.email} has ${count} categories. Skipping.`);
            }
        }

        console.log('Seeding complete.');

    } catch (err) {
        console.error(err);
    } finally {
        client.release();
        await pool.end();
    }
}

main();
