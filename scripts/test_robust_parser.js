const fs = require('fs');
const path = require('path');

const rawTextPath = path.join(__dirname, '../logs/raw_ocr_dump.txt');
const rawText = fs.readFileSync(rawTextPath, 'utf8');

function parseTurkishFloat(str) {
    let clean = str.replace(/\s/g, '').replace(/[*%]/g, ''); // Remove * and %
    // Heuristic: If comma is near end (2 digits), assume decimal
    if (clean.match(/,\d{2}$/)) {
        clean = clean.replace(/\./g, '').replace(',', '.');
    } else if (clean.match(/\.\d{2}$/)) {
        // Already dot decimal
    } else {
        // Fallback: replace all commas with dots, then keep last dot
        clean = clean.replace(/,/g, '.');
    }
    // Remove all non-numeric/dot
    clean = clean.replace(/[^0-9.]/g, '');
    return parseFloat(clean);
}

function parseReceiptRobust(text) {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const result = {
        merchant_name: null,
        date: null,
        total_amount: 0,
        items: []
    };

    const moneyRegex = /[0-9]{1,3}(?:[.,][0-9]{3})*(?:[.,][0-9]{2})(?![0-9])/g;
    const dateRegex = /(\d{2})[./-](\d{2})[./-](\d{2,4})/;
    const timeRegex = /(\d{2}):(\d{2})/;

    let potentialTotals = [];

    lines.forEach((line, index) => {
        // 1. Extract Date/Time anywhere
        const dateMatch = line.match(dateRegex);
        if (dateMatch) {
            let year = dateMatch[3];
            if (year.length === 2) year = '20' + year;
            result.date = `${year}-${dateMatch[2]}-${dateMatch[1]}`; // ISO format
        }

        // 2. Extract Merchant (heuristic: first non-garbage line)
        if (!result.merchant_name && line.length > 3 && !line.match(/\d/)) {
            result.merchant_name = line;
        }

        // 3. Extract Amounts
        const amounts = line.match(moneyRegex);
        if (amounts) {
            amounts.forEach(amtStr => {
                const val = parseTurkishFloat(amtStr);
                if (!isNaN(val)) {
                    potentialTotals.push({ val, line, index });

                    // Possible Item?
                    // If line starts with text and ends with this amount, or amount is * starred
                    if (line.includes('*') || (line.length > amtStr.length + 3)) {
                        // Clean up item name
                        let name = line.replace(amtStr, '').replace(/[*%]\d+/g, '').replace(/[*]/g, '').trim();
                        // Remove leading digits if they are quantity-like "2 ad"
                        name = name.replace(/^\d+\s*(ad|x|adet)/i, '').trim();

                        if (name.length > 2 && !name.match(/(TOPLAM|KDV|TARIH|SAAT|BANKA|KREDI)/i)) {
                            result.items.push({ description: name, amount: val });
                        }
                    }
                }
            });
        }
    });

    // 4. Find Total Logic
    // Sort potential totals descending
    potentialTotals.sort((a, b) => b.val - a.val);

    // Filter out huge numbers (dates parsed as numbers, e.g. 20260210?? No, moneyRegex expects decimal)
    // Heuristic: Total is usually the MAX number in the bottom half? 
    // Or just MAX number that is likely a sum?

    // Check for "TOPLAM" keyword fuzzy
    const toplamLine = lines.find(l => l.match(/(TOPLAM|T0PLAM|TOPLA|GENEL|TUTAR)/i));
    if (toplamLine) {
        const match = toplamLine.match(moneyRegex);
        if (match) {
            result.total_amount = parseTurkishFloat(match[0]);
        }
    }

    if (!result.total_amount && potentialTotals.length > 0) {
        // Fallback: Max value
        result.total_amount = potentialTotals[0].val;
    }

    return result;
}

console.log('--- RAW TEXT ---');
console.log(rawText);
console.log('--- PARSED RESULT ---');
const parsed = parseReceiptRobust(rawText);
console.log(JSON.stringify(parsed, null, 2));
