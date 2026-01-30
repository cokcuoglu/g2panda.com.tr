
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

// Helper: Parse OCR Text (Improved for Turkish Receipts)
function parseReceipt(text: string) {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    let amount = 0;
    let date = null;
    let vendor = null;

    // 1. Vendor Extraction (Heuristic)
    // - Skip lines that look like garbage (too many symbols)
    // - Prefer lines with "LTD", "A.Ş", "GIDA", "MARKET", "TİC"
    // - Usually the first valid line is the vendor
    for (const line of lines) {
        // Skip common receipt headers that aren't names
        if (line.match(/TARIH|SAAT|FIS|NO|TESEKKUR|MALIYE|BAKANLIGI/i)) continue;

        // Skip lines with high symbol density (logo noise)
        const symbols = line.replace(/[a-zA-Z0-9\sğüşıöçĞÜŞİÖÇ]/g, '').length;
        if (symbols > line.length * 0.3) continue;

        // If we found a strong candidate with keywords, take it
        if (line.match(/(LTD|A\.Ş|GIDA|MARKET|RESTORAN|BÜFE|PAZAR|TİC|SAN)/i)) {
            vendor = line;
            break;
        }

        // Otherwise keep the first clean line as candidate
        if (!vendor && line.length > 3) {
            vendor = line;
        }
    }

    // 2. Date Extraction
    // Patterns: DD.MM.YYYY, DD/MM/YYYY, YYYY-MM-DD
    const datePattern = /(\d{2}[./-]\d{2}[./-]\d{4})|(\d{4}[./-]\d{2}[./-]\d{2})/;
    const dateMatch = text.match(datePattern);
    if (dateMatch) {
        let rawDate = dateMatch[0].replace(/\//g, '.').replace(/-/g, '.'); // Normalize to dots
        // If YYYY.MM.DD
        if (rawDate.match(/^\d{4}/)) {
            const parts = rawDate.split('.');
            date = `${parts[0]}-${parts[1]}-${parts[2]}`;
        } else {
            // DD.MM.YYYY -> YYYY-MM-DD
            const parts = rawDate.split('.');
            if (parts.length === 3) date = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
    }

    // 3. Amount Extraction (Turkish Logic)
    // - Look for TOPLAM or TUTAR lines first
    // - Support format: 1.234,56 (dot thousands, comma decimal)
    // - Tesseract might confuse dot/comma, so we need smart logic.

    let maxVal = 0;

    // Helper to parse Turkish currency: "1.234,56" -> 1234.56
    const parseTurkishFloat = (str: string) => {
        // Remove spaces (Tesseract artifact: "2 974,80")
        let clean = str.replace(/\s/g, '');

        // If it ends with ,XX -> replace dots, replace comma with dot
        if (clean.match(/,\d{2}$/)) {
            clean = clean.replace(/\./g, '').replace(',', '.');
        }
        // If it looks like US format (1,234.56) - rare in TR but possible
        else if (clean.match(/,\d{3}\.\d{2}$/)) {
            clean = clean.replace(/,/g, '');
        }
        // Fallback: replace all commas with dots if no clear pattern
        else {
            clean = clean.replace(/,/g, '.');
        }
        return parseFloat(clean);
    };

    // Regex finding numbers that look like currency (at least 2 digits, maybe decimals)
    // Captures: 2.974,80 | 974,80 | 100.00
    const moneyRegex = /[0-9]{1,3}(?:[.,\s]?[0-9]{3})*(?:[.,][0-9]{2})?/g;

    // Strategy: 
    // A) Search explicitly in lines with "TOPLAM" or "TUTAR"
    // B) If not found, search all lines for max value

    let specificAmountFound = false;

    // A) Specific Keyword Search
    for (const line of lines) {
        if (line.match(/(TOPLAM|TUTAR|GENEL)/i) && !line.match(/KDV|MATRAH/i)) {
            const matches = line.match(moneyRegex);
            if (matches) {
                for (const m of matches) {
                    const val = parseTurkishFloat(m);
                    if (!isNaN(val) && val > 0) {
                        amount = val; // Assuming last number on TOPLAM line is the total
                        specificAmountFound = true;
                    }
                }
            }
        }
    }

    // B) Global Search (if A failed)
    if (!specificAmountFound) {
        const allMatches = text.match(moneyRegex);
        if (allMatches) {
            for (const m of allMatches) {
                // Heuristic: Ignore numbers that look like dates (e.g. 2024) if they are integers
                // But a bill could be 2024 TL. Hard to distinguish.
                // Usually amounts have decimals.
                if (m.includes(',') || m.includes('.')) {
                    const val = parseTurkishFloat(m);
                    if (!isNaN(val) && val > maxVal) {
                        maxVal = val;
                    }
                }
            }
            amount = maxVal;
        }
    }

    return { amount, date, vendor };
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
        const worker = await createWorker('tur'); // Turkish language
        const ret = await worker.recognize(imagePath);
        const rawText = ret.data.text;
        const confidence = ret.data.confidence;
        await worker.terminate();

        console.log('OCR Complete. Confidence:', confidence);

        // 2. Parse Logic
        const extracted = parseReceipt(rawText);

        // 3. Save Record (Pending)
        // Ensure user is authenticated (RLS context already set by middleware)
        const result = await req.db.query(
            `INSERT INTO ocr_records (user_id, image_path, raw_text, extracted_amount, extracted_date, extracted_vendor, confidence_score, status)
             VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending')
             RETURNING id`,
            [
                req.user?.id,
                imagePath,
                rawText,
                extracted.amount,
                extracted.date,
                extracted.vendor?.substring(0, 255),
                Math.round(confidence)
            ]
        );

        res.json({
            success: true,
            data: {
                ocr_id: result.rows[0].id,
                amount: extracted.amount,
                date: extracted.date,
                description: extracted.vendor ? `Fiş: ${extracted.vendor}` : 'Fiş Okuma',
                raw_text: rawText
            }
        });

    } catch (error) {
        console.error('OCR Error:', error);
        res.status(500).json({ success: false, error: 'OCR Processing Failed' });
    }
});

export default router;
