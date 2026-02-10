function parseTurkishFloat(str) {
    let clean = str.replace(/\s/g, '').replace(/[*%]/g, ''); // Remove * and %
    if (clean.match(/,\d{2}$/)) { clean = clean.replace(/\./g, '').replace(',', '.'); }
    else { clean = clean.replace(/,/g, '.'); }
    return parseFloat(clean);
}

function isGarbage(line) {
    const alnum = line.replace(/[^a-zA-Z0-9ÇĞİÖŞÜçğıöşü]/g, '').length;
    if (alnum < 3) return true;
    return false;
}

const moneyRegex = /[0-9]{1,3}(?:[.,][0-9]{3})*(?:[.,][0-9]{2})(?![0-9])/;

function parseReceipt(text) {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const result = { items: [], total_amount: 0 };

    for (const line of lines) {
        if (line.match(/(TOPLAM|TUTAR|KDV|NAKİT|KREDİ|BANKA|TARİH|SAAT|MALIYE)/i)) continue;
        if (isGarbage(line)) continue;
        // Ignore quantity lines (e.g. "2 ad X 1.00")
        if (line.match(/\d+\s*(ad|kg|gr|adet)\s*[xX]\s*/i)) {
            console.log(`Ignored quantity line: ${line}`);
            continue;
        }

        const priceMatch = line.match(moneyRegex);
        if (priceMatch) {
            const price = parseTurkishFloat(priceMatch[0]);
            let name = line.substring(0, line.length - priceMatch[0].length).trim();
            name = name.replace(/[*%]\d{1,2}/g, '').trim();
            name = name.replace(/^[\d*]+/g, '').trim();

            if (name.length > 2) {
                console.log(`Parsed Item: ${name} -> ${price}`);
                result.items.push({ description: name, amount: price });
            }
        }
    }
    return result;
}

const sampleText = `
ITHAL MUZ %1 *206.04
3 ad X 46.00
SUT 1L DOST %1 *138.00
LED AMPUL POWERKY 9W %20 *49.00
TOPLAM *556.54
`;

console.log('--- Testing Parsing ---');
const res = parseReceipt(sampleText);
console.log('Result:', JSON.stringify(res, null, 2));

// Test parseTurkishFloat specifics
console.log('Testing Float:', parseTurkishFloat('*206.04')); // Should be 206.04
console.log('Testing Float:', parseTurkishFloat('1.234,56')); // Should be 1234.56
