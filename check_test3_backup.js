const fs = require('fs');

const BACKUP_DIR = 'd:\\Personal_Project\\g2panda_release\\backups\\2026-02-15T21-00-00';
const USERS_FILE = `${BACKUP_DIR}\\users.json`;
const CATS_FILE = `${BACKUP_DIR}\\categories.json`;
const CHANS_FILE = `${BACKUP_DIR}\\channels.json`;
const OUT_FILE = 'check_test3_backup.txt';

const TEST3_ID = 'be8b8541-f427-4287-a00b-a0e9783e5209';

console.log('📦 Analyzing Backup for Test3 Config...');
fs.writeFileSync(OUT_FILE, '📦 Analyzing Backup for Test3 Config...\n');

function log(msg) {
    console.log(msg);
    fs.appendFileSync(OUT_FILE, msg + '\n');
}

try {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    const categories = JSON.parse(fs.readFileSync(CATS_FILE, 'utf8'));
    const channels = JSON.parse(fs.readFileSync(CHANS_FILE, 'utf8'));

    // Verify User Existence in Backup
    const test3 = users.find(u => u.id === TEST3_ID);
    if (!test3) {
        log('❌ Test3 User NOT found in backup!');
    } else {
        log(`✅ Test3 User FOUND in backup: ${test3.email}`);

        // Check Categories
        const userCats = categories.filter(c => c.user_id === TEST3_ID);
        log(`\n📂 Categories found: ${userCats.length}`);
        if (userCats.length > 0) {
            log('   Types: ' + [...new Set(userCats.map(c => c.type))].join(', '));
            userCats.slice(0, 5).forEach(c => log(`   - ${c.name} (${c.type})`));
        }

        // Check Channels
        const userChans = channels.filter(c => c.user_id === TEST3_ID);
        log(`\n💳 Channels found: ${userChans.length}`);
        if (userChans.length > 0) {
            userChans.forEach(c => log(`   - ${c.name} (${c.type || 'payment'})`));
        }
    }

} catch (e) {
    log('❌ Error: ' + e.message);
}
