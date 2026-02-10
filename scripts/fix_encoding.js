const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/server.ts');
const tempPath = path.join(__dirname, '../src/server_fixed.ts');

try {
    // Read file as buffer to detect BOM
    const buffer = fs.readFileSync(filePath);
    let content = buffer.toString('utf8');

    // Remove BOM if present
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
        console.log('BOM removed.');
    } else {
        console.log('No BOM found.');
    }

    // Also remove any other weird characters at start if encoding was totally messed up (like UTF-16 interpreted as UTF-8)
    // If double null bytes implies UTF-16
    if (buffer[1] === 0 && buffer[3] === 0) {
        console.log('Detected UTF-16LE likely. Decoding as utf-16le.');
        content = buffer.toString('utf16le');
    }

    fs.writeFileSync(tempPath, content, { encoding: 'utf8' });
    console.log('File written to server_fixed.ts with UTF-8 encoding.');

    // Replace original
    fs.copyFileSync(tempPath, filePath);
    fs.unlinkSync(tempPath);
    console.log('Replaced server.ts successfully.');

} catch (err) {
    console.error('Error fixing encoding:', err);
}
