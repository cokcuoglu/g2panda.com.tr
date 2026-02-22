const fs = require('fs');
const logFile = 'C:\\Users\\caner\\.pm2\\logs\\g2panda-error.log';

function findError() {
    try {
        const content = fs.readFileSync(logFile, 'utf8');
        const lines = content.split('\n');
        const matches = lines.filter(line => line.includes('Update Table Order error'));
        console.log(`Found ${matches.length} matches.`);
        matches.slice(-5).forEach(m => console.log(m));
    } catch (err) {
        console.error('Error reading log:', err);
    }
}

findError();
