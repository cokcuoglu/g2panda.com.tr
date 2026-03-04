import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import http from 'http';
import FormData from 'form-data';
import logger from '../config/logger';

const router = Router();

// ──────────────────────────────────────────────────────────────────────────
// Receipt AI Docker service
// Container: receipt_ai-receipt-api-1 → http://localhost:8080
// Endpoint:  POST /api/v1/ai/Receipt/analyze  (multipart, field: "file")
// ──────────────────────────────────────────────────────────────────────────
const RECEIPT_AI_URL = process.env.RECEIPT_AI_URL || 'http://localhost:8080';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/ocr';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'proc-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10 MB
});

// ── Helpers ────────────────────────────────────────────────────────────────

function formatDate(raw: string | null | undefined): string | null {
    if (!raw) return null;
    // API may return ISO or DD.MM.YYYY
    if (raw.includes('T')) {
        const d = new Date(raw);
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = d.getFullYear();
        return `${dd}.${mm}.${yyyy}`;
    }
    return raw;
}

// ── POST /api/ocr-advanced/process ─────────────────────────────────────────
// Synchronous scan via receipt_ai, stored in ocr_records, returns job_id
router.post('/process', upload.single('image'), async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ success: false, error: 'Görüntü yüklenmedi' });
    }

    const imagePath = req.file.path;

    // 1. Create pending record immediately for polling
    let ocrId: string | null = null;
    try {
        const initialRecord = await req.db.query(
            `INSERT INTO ocr_records (user_id, image_path, status) VALUES ($1, $2, 'processing') RETURNING id`,
            [req.user?.id, imagePath]
        );
        ocrId = initialRecord.rows[0].id;
    } catch (dbErr) {
        logger.error('OCR DB insert failed:', dbErr);
        return res.status(500).json({ success: false, error: 'Veritabanı hatası' });
    }

    // Return job_id immediately so the frontend can poll
    res.json({
        success: true,
        job_id: ocrId,
        status: 'processing',
        message: 'Görüntü alındı, analiz başladı.'
    });

    // 2. Process in background
    (async () => {
        try {
            logger.info(`[OCR] Sending image to receipt_ai: ${imagePath}`);

            const form = new FormData();
            form.append('file', fs.createReadStream(imagePath), {
                filename: path.basename(imagePath),
                contentType: req.file!.mimetype || 'image/jpeg'
            });

            // Send to receipt_ai using native http.request (no external deps)
            const aiData: any = await new Promise((resolve, reject) => {
                const receiptUrl = new URL(`${RECEIPT_AI_URL}/api/v1/ai/Receipt/analyze`);
                const headers = form.getHeaders();

                const options: http.RequestOptions = {
                    hostname: receiptUrl.hostname,
                    port: receiptUrl.port ? parseInt(receiptUrl.port) : 80,
                    path: receiptUrl.pathname,
                    method: 'POST',
                    headers
                };

                const reqHttp = http.request(options, (httpRes) => {
                    let data = '';
                    httpRes.on('data', (chunk) => { data += chunk; });
                    httpRes.on('end', () => {
                        if (httpRes.statusCode && httpRes.statusCode >= 400) {
                            return reject(new Error(`receipt_ai returned ${httpRes.statusCode}: ${data}`));
                        }
                        try {
                            resolve(JSON.parse(data));
                        } catch (e) {
                            reject(new Error('Invalid JSON from receipt_ai: ' + data.substring(0, 200)));
                        }
                    });
                });

                reqHttp.on('error', reject);
                reqHttp.setTimeout(60000, () => {
                    reqHttp.destroy(new Error('receipt_ai request timed out'));
                });

                form.pipe(reqHttp);
            });
            logger.info(`[OCR] receipt_ai response for job ${ocrId}:`, JSON.stringify(aiData).substring(0, 300));

            // 3. Map response fields (receipt_ai may vary — handle both camelCase and PascalCase)
            const merchantName: string = aiData.merchantName || aiData.MerchantName || aiData.merchant_name || 'Bilinmeyen';
            const totalAmount: number = parseFloat(aiData.grandTotal ?? aiData.GrandTotal ?? aiData.total ?? aiData.Total ?? aiData.amount ?? 0) || 0;
            const vatTotal: number = parseFloat(aiData.totalVat ?? aiData.TotalVat ?? aiData.vat_total ?? aiData.vatTotal ?? 0) || 0;
            const rawDate: string | null = aiData.date || aiData.Date || null;
            const formattedDate: string | null = formatDate(rawDate);

            // Items from receipt_ai
            const rawItems: any[] = aiData.items || aiData.Items || aiData.lineItems || aiData.LineItems || [];
            const mappedItems = rawItems.map((it: any) => ({
                name: it.name || it.Name || it.description || it.Description || 'Ürün',
                quantity: it.quantity || it.Quantity || 1,
                unit_price: parseFloat(it.unitPrice ?? it.UnitPrice ?? it.unit_price ?? it.price ?? 0) || 0,
                total_price: parseFloat(it.totalPrice ?? it.TotalPrice ?? it.total_price ?? it.amount ?? 0) || 0,
                vat_rate: it.vatRate ?? it.VatRate ?? it.vat_rate ?? 20,
                vat_amount: parseFloat(it.vatAmount ?? it.VatAmount ?? it.vat_amount ?? 0) || 0,
                confidence: it.confidence ?? it.Confidence ?? 0.9,
                is_tax_deductible: true
            }));

            // Build human-readable raw_text
            let rawText = `--- FİŞ / FATURA DETAYI (receipt_ai) ---\n\n`;
            rawText += `${merchantName}\n`;
            rawText += `TARİH: ${formattedDate || '---'}\n`;
            rawText += `-------------------------------------------\n`;
            if (mappedItems.length > 0) {
                mappedItems.forEach((it: any) => {
                    rawText += `${String(it.name).padEnd(25).substring(0, 25)} ${it.total_price.toFixed(2).padStart(8)} TL\n`;
                });
            } else {
                rawText += 'KALEM DETAYLARI OKUNAMADI\n';
            }
            rawText += `-------------------------------------------\n`;
            if (vatTotal > 0) rawText += `TOPKDV: ${vatTotal.toFixed(2).padStart(28)} TL\n`;
            rawText += `TOPLAM: ${totalAmount.toFixed(2).padStart(28)} TL\n`;

            // 4. Update DB record
            await req.db.query(
                `UPDATE ocr_records 
                 SET raw_text = $1,
                     extracted_amount = $2,
                     extracted_date = $3,
                     extracted_vendor = $4,
                     confidence_score = $5,
                     status = 'completed',
                     processed_at = NOW()
                 WHERE id = $6`,
                [rawText, totalAmount, rawDate, merchantName.substring(0, 255), 90, ocrId]
            );

            // 5. Insert individual items (linked to OCR record, no transaction yet)
            for (const item of mappedItems) {
                try {
                    await req.db.query(
                        `INSERT INTO transaction_items
                            (transaction_id, ocr_record_id, name, quantity, unit_price, total_price, vat_rate, vat_amount, confidence)
                         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                        [null, ocrId, item.name, item.quantity, item.unit_price, item.total_price, item.vat_rate, item.vat_amount, item.confidence]
                    );
                } catch (itemErr) {
                    logger.warn(`[OCR] Item insert failed for "${item.name}":`, itemErr);
                }
            }

            logger.info(`[OCR] Job ${ocrId} completed. Total: ${totalAmount} TL, Items: ${mappedItems.length}`);
        } catch (procErr: any) {
            logger.error(`[OCR] Job ${ocrId} failed:`, procErr.message || procErr);
            try {
                await req.db.query(
                    `UPDATE ocr_records SET status = 'failed', raw_text = $1 WHERE id = $2`,
                    [`Hata: ${procErr.message || 'Bilinmeyen hata'}`, ocrId]
                );
            } catch (_) { }
        }
    })();
});

// ── GET /api/ocr-advanced/status/:id ───────────────────────────────────────
router.get('/status/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { pool } = await import('../db');

        const result = await pool.query(`SELECT * FROM ocr_records WHERE id = $1`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Kayıt bulunamadı' });
        }

        const record = result.rows[0];
        if (record.status === 'completed') {
            const itemsRes = await pool.query(
                `SELECT * FROM transaction_items WHERE ocr_record_id = $1`,
                [id]
            );
            record.items = itemsRes.rows;
        }

        res.json({ success: true, data: record });
    } catch (error) {
        logger.error('OCR Status API Error:', error);
        res.status(500).json({ success: false, error: 'Sunucu hatası' });
    }
});

export default router;
