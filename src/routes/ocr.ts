
import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { createWorker } from 'tesseract.js';
import sharp from 'sharp';

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
        let clean = str.replace(/\s/g, '').replace(/[*%]/g, '');
        if (clean.match(/,\d{2}$/)) {
            clean = clean.replace(/\./g, '').replace(',', '.');
        } else if (clean.match(/\.\d{2}$/)) {
            // Already dot decimal
        } else {
            clean = clean.replace(/,/g, '.');
        }
        clean = clean.replace(/[^0-9.]/g, '');
        return parseFloat(clean);
    };

    const isGarbage = (line: string) => {
        const alnum = line.replace(/[^a-zA-Z0-9ÇĞİÖŞÜçğıöşü]/g, '').length;
        if (alnum < 2) return true; // Relaxed from 3
        if (alnum < line.length * 0.4) return true; // Relaxed from 0.5
        return false;
    };

    // --- Extraction Logic ---

    const moneyRegex = /[0-9]{1,3}(?:[.,][0-9]{3})*(?:[.,][0-9]{2})(?![0-9])/g;
    const dateRegex = /(\d{2})[./-](\d{2})[./-](\d{2,4})/;
    const timeRegex = /(\d{2}:\d{2}(?::\d{2})?)/;

    let potentialTotals: { val: number, line: string }[] = [];

    lines.forEach((line) => {
        // 1. Date/Time
        const dateMatch = line.match(dateRegex);
        if (dateMatch && !result.date) {
            let year = dateMatch[3];
            if (year.length === 2) year = '20' + year;
            result.date = `${year}-${dateMatch[2]}-${dateMatch[1]}`;
        }
        const timeMatch = line.match(timeRegex);
        if (timeMatch && !result.time) {
            result.time = timeMatch[1];
        }

        // 2. Merchant (First valid line heuristic)
        if (!result.merchant_name && !isGarbage(line) && !line.match(/\d/) && line.length > 3) {
            result.merchant_name = line;
        }

        // 3. Amounts & Items
        const amounts = line.match(moneyRegex);
        if (amounts) {
            amounts.forEach(amtStr => {
                const val = parseTurkishFloat(amtStr);
                if (!isNaN(val)) {
                    potentialTotals.push({ val, line });

                    // Possible Item Logic
                    // If line has text and ends with amount, or starts with *
                    if (line.includes('*') || (line.length > amtStr.length + 3)) {
                        let name = line.replace(amtStr, '').replace(/[*%]\d+/g, '').replace(/[*]/g, '').trim();
                        name = name.replace(/^\d+\s*(ad|x|adet)/i, '').trim();

                        if (name.length > 2 && !isGarbage(name) && !name.match(/(TOPLAM|KDV|TARIH|SAAT|BANKA|KREDI|TUTAR|MATRAH)/i)) {
                            // VAT Rate Heuristic from line (e.g. %1, %10)
                            let vat = null;
                            const vatMatch = line.match(/[%*](\d{1,2})/);
                            if (vatMatch) vat = parseInt(vatMatch[1]);

                            // Dedup
                            const exists = result.items.find((i) => i.description === name && i.amount === val);
                            if (!exists) {
                                result.items.push({ description: name, amount: val, vat_rate: vat });
                            }
                        }
                    }
                }
            });
        }
    });

    // 4. Find Total
    // Sort potential totals descending
    potentialTotals.sort((a, b) => b.val - a.val);

    // Fuzzy match for TOPLAM
    const toplamLine = lines.find(l => l.match(/(TOPLAM|T0PLAM|TOPLA|GENEL|TUTAR)/i));
    if (toplamLine) {
        const match = toplamLine.match(moneyRegex);
        if (match) {
            // Pick the largest amount in this line if multiple
            const vals = match.map(m => parseTurkishFloat(m)).sort((a, b) => b - a);
            result.total_amount = vals[0];
        }
    }

    if (!result.total_amount && potentialTotals.length > 0) {
        // Fallback: Max value found in the whole receipt (Assuming Total is the largest number)
        // This is usually true for receipts unless there's a huge Ref Number parsed as float (unlikely with decimal check)
        // Also ensure it's in the bottom half? No, simple Max is robust enough for now.
        result.total_amount = potentialTotals[0].val;
    }

    // 5. VAT Extraction (Heuristic)
    if (!result.vat_total) {
        const kdvLine = lines.find(l => l.match(/(TOPKDV|KDV|K.D.V)/i) && l.match(moneyRegex));
        if (kdvLine) {
            const match = kdvLine.match(moneyRegex);
            if (match) result.vat_total = parseTurkishFloat(match[0]);
        }
    }

    // 6. Payment Method
    const textLower = text.toLowerCase();
    if (textLower.match(/(kredi|visa|master|debit|amex)/)) result.payment_method = 'Kredi Kartı';
    else if (textLower.match(/(nakit)/)) result.payment_method = 'Nakit';

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

// Helper: Preprocess Image
async function preprocessImage(inputPath: string): Promise<string> {
    const outputPath = inputPath + '_processed.png';
    try {
        await sharp(inputPath)
            .rotate() // Auto-orient based on EXIF
            // .resize({ width: 1000, withoutEnlargement: false }) // Removed
            // .grayscale() // Removed
            // .normalize() // Removed
            .toFile(outputPath);
        return outputPath;
    } catch (error) {
        console.error('Image preprocessing failed:', error);
        return inputPath; // Fallback to original
    }
}

// POST /api/ocr/scan
router.post('/scan', upload.single('image'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'No image uploaded' });
        }

        const imagePath = req.file.path;

        // 1. Preprocess Image
        console.log(`Preprocessing image...`);
        const processedImagePath = await preprocessImage(imagePath);

        // 2. Perform OCR
        console.log(`Starting OCR for ${processedImagePath}...`);

        // Use local training data
        const langPath = path.join(__dirname, '../../');
        console.log(`Language Path: ${langPath}`);

        const worker = await createWorker('tur', 1, {
            langPath: langPath,
            gzip: false,
            // logger: m => console.log(m) // Disable noisy logging
        });

        // Configure parameters for better accuracy
        await worker.setParameters({
            tessedit_char_whitelist: 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZabcçdefgğhiıjklmnoöprsştuüvyz0123456789.,:/-&%*+ ',
            preserve_interword_spaces: '1',
            tessedit_pageseg_mode: 4 as any // PSM 4: Assume a single column of text of variable sizes
        });

        const ret = await worker.recognize(processedImagePath);
        const rawOutput = ret.data.text;
        console.log('Raw Tesseract Output Pattern:', rawOutput.substring(0, 100).replace(/\n/g, '\\n')); // Log start of text
        const confidence = ret.data.confidence;
        await worker.terminate();

        // Cleanup processed file if different
        if (processedImagePath !== imagePath) {
            fs.unlinkSync(processedImagePath);
        }

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
                reconstructedText + '\n\n--- RAW TESSERACT OUTPUT ---\n' + rawOutput, // Save clean version + raw for debug
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
