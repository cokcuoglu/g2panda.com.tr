
import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { createWorker } from 'tesseract.js';

const router = Router();

// Configure Multer for local storage (uploads/)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    }
});

// Helper: Parse OCR Text

interface OCRResult {
    merchant_name: string | null;
    address: string | null;
    phone: string | null;
    tax_office: string | null;
    tax_number: string | null;
    date: string | null;
    time: string | null;
    receipt_no: string | null;
    items: { description: string; amount: number; vat_rate: number | null }[];
    vat_total: number | null;
    vat_rate: number | null;
    total_amount: number;
    payment_method: string | null;
    bank: string | null;
    card_last_digits: string | null;
    authorization_code: string | null;
    reference_number: string | null;
}

function parseReceipt(text: string): OCRResult {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    const result: OCRResult = {
        merchant_name: null, address: null, phone: null,
        tax_office: null, tax_number: null,
        date: null, time: null, receipt_no: null,
        items: [], vat_total: null, vat_rate: null, total_amount: 0,
        payment_method: null, bank: null, card_last_digits: null,
        authorization_code: null, reference_number: null
    };

    // --- Helpers ---
    const parseTurkishFloat = (str: string) => {
        let clean = str.replace(/\s/g, '');
        if (clean.match(/,\d{2}$/)) { clean = clean.replace(/\./g, '').replace(',', '.'); }
        else { clean = clean.replace(/,/g, '.'); }
        return parseFloat(clean);
    };

    const isGarbage = (line: string) => {
        const alnum = line.replace(/[^a-zA-Z0-9ÇĞİÖŞÜçğıöşü]/g, '').length;
        // Strict: Delete if < 3 chars or mostly symbols
        if (alnum < 3) return true;
        if (alnum < line.length * 0.5) return true;
        // Delete uppercase gibberish (e.g. "S K L M")
        if (line === line.toUpperCase() && !line.match(/[AEIİOÖUÜ]/)) return true;
        return false;
    };

    // --- Extraction Logic ---

    // 1. Merchant & Address (Header Section)
    for (let i = 0; i < Math.min(lines.length, 8); i++) {
        const line = lines[i];
        if (isGarbage(line)) continue;
        if (line.match(/(TARİH|SAAT|FİŞ|NO|KDV)/i)) break;

        // Merchant Name Indicators
        if (!result.merchant_name && line.match(/(LTD|ŞTİ|A\.Ş|GIDA|MARKET|FIRIN|RESTORAN|TİC|SAN|BAKKAL|BÜFE)/i)) {
            result.merchant_name = line;
            continue;
        }
        // Address Indicators
        if (line.match(/(CAD|SOK|MAH|NO:|İST|ANK|İZM|ANT|BURSA|ADANA)/i) || line.match(/\//)) {
            result.address = result.address ? `${result.address} ${line}` : line;
        }
        // Phone
        if (line.match(/(TEL|TLF|0\d{3})/i)) {
            const m = line.match(/(0\s*\d{3}\s*\d{3}\s*\d{2}\s*\d{2})/);
            if (m) result.phone = m[0];
        }
        // Tax Info
        if (line.match(/(V\.D|VERGİ|DAİRE|TCKN|VKN|MERSİS)/i)) {
            const office = line.match(/([A-ZÇĞİÖŞÜ\s]+)\s+V\.D/i);
            if (office) result.tax_office = office[1].trim();
            const num = line.match(/(\d{10,11})/);
            if (num) result.tax_number = num[0];
        }
    }

    // 2. Transaction Details (Date, Time, Receipt No)
    for (const line of lines) {
        // Date (DD.MM.YYYY)
        if (!result.date) {
            const d = line.match(/(\d{2})[./-](\d{2})[./-](\d{4})/);
            if (d) result.date = `${d[1]}.${d[2]}.${d[3]}`;
        }
        // Time (HH:MM:SS)
        if (!result.time) {
            const t = line.match(/(\d{2}:\d{2}(?::\d{2})?)/);
            if (t) result.time = t[1];
        }
        // Receipt No
        if (!result.receipt_no) {
            const f = line.match(/(FİŞ|FIS|NO)\s*[:.]?\s*(\d{4,})/i);
            if (f) result.receipt_no = f[2];
        }
    }

    // 3. Line Items (Strict)
    // Must end with a valid price
    // Must end with a valid price (allow trailing non-digit noise)
    const moneyRegex = /[0-9]{1,3}(?:[.,][0-9]{3})*(?:[.,][0-9]{2})(?![0-9])/;

    for (const line of lines) {
        if (line.match(/(TOPLAM|TUTAR|KDV|NAKİT|KREDİ|BANKA|TARİH|SAAT|MALIYE)/i)) continue;
        if (isGarbage(line)) continue;

        const priceMatch = line.match(moneyRegex);
        if (priceMatch) {
            const price = parseTurkishFloat(priceMatch[0]);
            let name = line.substring(0, line.length - priceMatch[0].length).trim();
            // Clean up extraction
            name = name.replace(/[*%]\d{1,2}/g, '').trim(); // Remove VAT markers like *10
            name = name.replace(/^[\d*]+/g, '').trim();    // Remove leading numbers/stars

            if (name.length > 2) {
                // Heuristic: Infer VAT if present
                let vat = null;
                const vatMatch = line.match(/[*%](\d{1,2})/);
                if (vatMatch) vat = parseInt(vatMatch[1]);

                result.items.push({ description: name, amount: price, vat_rate: vat });
            }
        }
    }

    // 4. Totals (TOPLAM / TUTAR)
    for (const line of lines) {
        if (line.match(/(TOPLAM|TUTAR|GENEL)/i) && !line.match(/(KDV|MATRAH)/i)) {
            const m = line.match(/[0-9]{1,3}(?:[.,][0-9]{3})*(?:[.,][0-9]{2})/);
            if (m) result.total_amount = parseTurkishFloat(m[0]);
        }
        if (line.match(/(KDV|TOPKDV)/i)) {
            const m = line.match(/[0-9]{1,3}(?:[.,][0-9]{3})*(?:[.,][0-9]{2})/);
            if (m) result.vat_total = parseTurkishFloat(m[0]);
        }
    }
    // Fallback Total: Sum of items if TOPLAM missing (Safety check)
    if (result.total_amount === 0 && result.items.length > 0) {
        const sum = result.items.reduce((a, b) => a + b.amount, 0);
        result.total_amount = sum;
    }

    // 5. Payment Info & Auth
    for (const line of lines) {
        // Payment Method
        if (line.match(/(KREDİ|VISA|MASTER|DEBIT|AMEX)/i)) result.payment_method = 'Kredi Kartı';
        else if (line.match(/(NAKİT)/i)) result.payment_method = 'Nakit';

        // Bank
        if (line.match(/(GARANTİ|ZİRAAT|İŞ BANK|YAPI KREDİ|AKBANK|FİNANS)/i)) {
            result.bank = line.replace(/[^a-zA-ZÇĞİÖŞÜçğıöşü\s]/g, '').trim();
        }

        // Card Last Digits
        const cardMatch = line.match(/\*{4}\s*(\d{4})/);
        if (cardMatch) result.card_last_digits = cardMatch[1];

        // Auth/Ref
        const refMatch = line.match(/(REF|NO):?\s*(\d{5,})/i);
        if (refMatch) result.reference_number = refMatch[2];
    }

    // 6. Infer VAT Rate
    // Priority 1: Explicit most frequent rate from items
    if (!result.vat_rate && result.items.length > 0) {
        const rates: { [key: number]: number } = {};
        result.items.forEach(item => {
            if (item.vat_rate !== null) {
                rates[item.vat_rate] = (rates[item.vat_rate] || 0) + 1;
            }
        });

        let bestRate = null;
        let maxCount = 0;
        for (const [rate, count] of Object.entries(rates)) {
            if (count > maxCount) {
                maxCount = count;
                bestRate = Number(rate);
            }
        }

        if (bestRate !== null) {
            result.vat_rate = bestRate;
        }
    }

    // 6. Infer VAT Rate from Totals (if not explicit)
    if (!result.vat_rate) {
        // Fallback: Global search for VAT Rate indicators (e.g. %10, %20)
        // This catches cases where the item line wasn't parsed as a full item but contains the rate
        const globalRateMatch = text.match(/[%*](1|8|10|18|20)(?!\d)/);
        if (globalRateMatch) {
            result.vat_rate = parseInt(globalRateMatch[1]);
        }
    }

    if (!result.vat_total) {
        // Fallback: Global search for VAT Total (e.g. TOPKDV *270,44)
        // Look for KDV followed by a number
        const kdvMatch = text.match(/(?:TOPKDV|KDV)[^0-9]*([\d.,]+)/i);
        if (kdvMatch) {
            result.vat_total = parseTurkishFloat(kdvMatch[1]);
        }
    }

    // Priority 2: Infer from Totals (if not explicit and items/global failed)
    if (!result.vat_rate && result.vat_total && result.total_amount) {
        // Calculate effective rate: VAT / (Total - VAT)
        const net = result.total_amount - result.vat_total;
        if (net > 0) {
            const rawRate = (result.vat_total / net) * 100;
            // Snap to nearest standard rate (1, 8, 10, 18, 20)
            const standardRates = [1, 8, 10, 18, 20];
            const closest = standardRates.reduce((prev, curr) =>
                Math.abs(curr - rawRate) < Math.abs(prev - rawRate) ? curr : prev
            );

            // Only accept if reasonably close (within 1.5%)
            if (Math.abs(closest - rawRate) < 1.5) {
                result.vat_rate = closest;
            }
        }
    }

    // 7. Final Fallback: Calculate VAT Total from Rate & Grand Total (Mathematical Guarantee)
    // If we missed the explicit VAT amount but found the rate (or inferred it), calculate it.
    if (!result.vat_total && result.vat_rate && result.total_amount) {
        const rate = result.vat_rate;
        const total = result.total_amount;
        // VAT = Total - (Total / (1 + rate/100))
        result.vat_total = Number((total - (total / (1 + rate / 100))).toFixed(2));
    }

    return result;
}

// Helper: Clean OCR Text (Post-processing)
function cleanOCRText(text: string): string {
    return text
        .split('\n')
        .map(line => {
            // Remove common OCR noise characters at start/end
            let cleaned = line.trim().replace(/^[^a-zA-Z0-9ÇĞİÖŞÜçğıöşü]+/, '').replace(/[^a-zA-Z0-9ÇĞİÖŞÜçğıöşü]+$/, '');

            // Filter out lines that are likely just noise (e.g., "v", "b .", "~")
            if (cleaned.length < 2) return null;

            // Filter out lines with high symbol density (keep if contains digits like price)
            const alnum = cleaned.replace(/[^a-zA-Z0-9ÇĞİÖŞÜçğıöşü]/g, '').length;
            if (alnum < cleaned.length * 0.4 && !cleaned.match(/\d/)) return null;

            return cleaned;
        })
        .filter(Boolean) // Remove nulls
        .join('\n');
}

// POST /api/ocr/scan
router.post('/scan', upload.single('image'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'No image uploaded' });
        }

        const imagePath = req.file.path;

        // 1. Perform OCR
        console.log(`Starting OCR for ${imagePath}...`);

        // Use local training data
        const langPath = path.join(__dirname, '../../');
        console.log(`Language Path: ${langPath}`);

        const worker = await createWorker('tur', 1, {
            langPath: langPath,
            gzip: false,
            logger: m => console.log(m)
        });

        // Configure parameters for better accuracy
        await worker.setParameters({
            tessedit_char_whitelist: 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZabcçdefgğhiıjklmnoöprsştuüvyz0123456789.,:/-&%*+ ',
            preserve_interword_spaces: '1',
            tessedit_pageseg_mode: 4 as any // PSM 4: Assume a single column of text of variable sizes
        });

        const ret = await worker.recognize(imagePath);
        const rawOutput = ret.data.text;
        const confidence = ret.data.confidence;
        await worker.terminate();

        console.log('OCR Complete. Confidence:', confidence);

        // 2. Post-Process Text
        const cleanText = cleanOCRText(rawOutput);

        // 3. Parse Logic
        const extracted = parseReceipt(cleanText);

        // 4. Reconstruct Human-Readable Receipt (Accountant-Grade)
        let reconstructedText = `--- FİŞ / FATURA DETAYI ---\n\n`;

        // Merchant Info
        reconstructedText += `${extracted.merchant_name || 'BİLİNMEYEN İŞLETME'}\n`;
        if (extracted.address) reconstructedText += `${extracted.address}\n`;
        if (extracted.phone) reconstructedText += `TEL: ${extracted.phone}\n`;
        if (extracted.tax_office && extracted.tax_number) reconstructedText += `${extracted.tax_office} V.D. - VKN: ${extracted.tax_number}\n`;
        reconstructedText += '\n';

        // Transaction Details
        reconstructedText += `TARİH: ${extracted.date || '---'}   SAAT: ${extracted.time || '--:--'}\n`;
        if (extracted.receipt_no) reconstructedText += `FİŞ NO: ${extracted.receipt_no}\n`;
        reconstructedText += `-------------------------------------------\n`;

        // Items
        if (extracted.items.length > 0) {
            extracted.items.forEach(item => {
                reconstructedText += `${item.description.padEnd(25).substring(0, 25)} ${(item.vat_rate ? '%' + item.vat_rate : '').padEnd(4)} ${item.amount.toFixed(2).padStart(8)}\n`;
            });
        } else {
            // Clean fallback
            reconstructedText += "KALEM DETAYLARI OKUNAMADI\n";
        }

        reconstructedText += `-------------------------------------------\n`;

        // Totals
        if (extracted.vat_total) reconstructedText += `TOPKDV: ${extracted.vat_total.toFixed(2).padStart(30)} TL\n`;
        reconstructedText += `TOPLAM: ${extracted.total_amount.toFixed(2).padStart(30)} TL\n`;
        reconstructedText += `\n`;

        // Payment Info
        if (extracted.payment_method) reconstructedText += `ÖDEME: ${extracted.payment_method}\n`;
        if (extracted.bank) reconstructedText += `BANKA: ${extracted.bank}\n`;
        if (extracted.card_last_digits) reconstructedText += `KART: **** **** **** ${extracted.card_last_digits}\n`;
        // Ensure user is authenticated (RLS context already set by middleware)
        const result = await req.db.query(
            `INSERT INTO ocr_records (user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status)
             VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending')
             RETURNING id`,
            [
                req.user?.id,
                imagePath,
                reconstructedText, // Save the clean version
                extracted.total_amount,
                extracted.date,
                extracted.merchant_name?.substring(0, 255),
                Math.round(confidence)
            ]
        );

        res.json({
            success: true,
            data: {
                ocr_id: result.rows[0].id,
                amount: extracted.total_amount,
                vat_total: extracted.vat_total,
                vat_rate: extracted.vat_rate,
                date: extracted.date,
                description: extracted.merchant_name ? `Fiş: ${extracted.merchant_name}` : 'Fiş Okuma',
                raw_text: reconstructedText, // Send structured text to frontend
                details: extracted,
                // Strict JSON Output matches user request exactly
                strict_json: {
                    merchant_name: extracted.merchant_name,
                    address: extracted.address,
                    phone: extracted.phone,
                    tax_office: extracted.tax_office,
                    tax_number: extracted.tax_number,
                    date: extracted.date,
                    time: extracted.time,
                    document_number: extracted.receipt_no,
                    items: extracted.items,
                    vat_total: extracted.vat_total,
                    grand_total: extracted.total_amount,
                    payment_method: extracted.payment_method,
                    bank: extracted.bank,
                    card_last_digits: extracted.card_last_digits,
                    authorization_code: extracted.authorization_code,
                    reference_number: extracted.reference_number
                }
            }
        });

    } catch (error) {
        console.error('OCR Error:', error);
        res.status(500).json({ success: false, error: 'OCR Processing Failed' });
    }
});

export default router;
