const fs = require('fs');

const BACKUP_DIR = 'd:\\Personal_Project\\g2panda_release\\backups\\2026-02-15T21-00-00';
const USERS_FILE = `${BACKUP_DIR}\\users.json`;
const TRANSACTIONS_FILE = `${BACKUP_DIR}\\transactions.json`;
const PRODUCTS_FILE = `${BACKUP_DIR}\\products.json`;
const OUT_FILE = 'analyze_backup_results.txt';

const targetIds = [
    'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57', // ozan
    'be8b8541-f427-4287-a00b-a0e9783e5209'  // test3
];

console.log('📦 Analyzing Backup Data...');
fs.writeFileSync(OUT_FILE, '📦 Analyzing Backup Data...\n');

function log(msg) {
    console.log(msg);
    fs.appendFileSync(OUT_FILE, msg + '\n');
}

try {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    const transactions = JSON.parse(fs.readFileSync(TRANSACTIONS_FILE, 'utf8'));
    const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));

    const foundUsers = users.filter(u => targetIds.includes(u.id));

    foundUsers.forEach(u => {
        log(`\n👤 User: ${u.email} (${u.full_name})`);
        const userTx = transactions.filter(t => t.user_id === u.id);
        const userProd = products.filter(p => p.user_id === u.id);
        log(`   - Transactions in backup: ${userTx.length}`);
        log(`   - Products in backup: ${userProd.length}`);
    });

} catch (e) {
    log('❌ Error reading backup files: ' + e.message);
}
