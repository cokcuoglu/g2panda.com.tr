import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import http from 'http';
import FormData from 'form-data';
import logger from '../config/logger';
import { pool } from '../db';

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

    if (!req.user?.id) {
        return res.status(401).json({ success: false, error: 'Unauthorized: No user context found' });
    }

    const imagePath = req.file.path;

    // 1. Create pending record immediately for polling
    let ocrId: string | null = null;
    try {
        const initialRecord = await req.db.query(
            `INSERT INTO ocr_records (user_id, image_path, status) VALUES ($1, $2, 'processing') RETURNING id`,
            [req.user.id, imagePath]
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
        let client;
        try {
            client = await pool.connect();
            logger.info(`[OCR] Background process started for job ${ocrId}`);

            logger.info(`[OCR] Sending image to receipt_ai: ${imagePath}`);

            const form = new FormData();
            form.append('image', fs.createReadStream(imagePath), {
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
            logger.info(`[OCR] receipt_ai response for job ${ocrId}: ${JSON.stringify(aiData)}`);

            function parseAmount(val: any): number {
                if (val === null || val === undefined) return 0;
                if (typeof val === 'number') return val;
                const str = String(val).replace(',', '.');
                const parsed = parseFloat(str);
                return isNaN(parsed) ? 0 : parsed;
            }

            const merchantName: string = aiData.merchant?.name || aiData.Merchant?.Name || aiData.merchantName || aiData.MerchantName || aiData.merchant_name || 'Bilinmeyen';
            const totalAmount: number = parseAmount(aiData.financial?.total ?? aiData.Financial?.Total ?? aiData.grandTotal ?? aiData.GrandTotal ?? aiData.total ?? aiData.Total ?? aiData.amount ?? 0);
            const vatTotal: number = parseAmount(aiData.financial?.vatAmount ?? aiData.Financial?.VatAmount ?? aiData.totalVat ?? aiData.TotalVat ?? aiData.vat_total ?? aiData.vatTotal ?? 0);

            logger.info(`[OCR] Parsed for job ${ocrId} - Total: ${totalAmount}, VAT: ${vatTotal}`);

            const rawDate: string | null = aiData.date || aiData.Date || null;
            const formattedDate: string | null = formatDate(rawDate);

            // Items from receipt_ai
            const rawItems: any[] = aiData.items || aiData.Items || aiData.lineItems || aiData.LineItems || [];
            const mappedItems = rawItems.map((it: any) => {
                const total_price = parseFloat(it.totalPrice ?? it.TotalPrice ?? it.total_price ?? it.amount ?? 0) || 0;
                const vat_rate = it.vatRate ?? it.VatRate ?? it.vat_rate ?? 20;
                let vat_amount = parseFloat(it.vatAmount ?? it.VatAmount ?? it.vat_amount ?? 0) || 0;

                if (vat_amount === 0 && vat_rate > 0 && total_price > 0) {
                    const net_price = total_price / (1 + (vat_rate / 100));
                    vat_amount = Number((total_price - net_price).toFixed(2));
                }

                return {
                    name: it.name || it.Name || it.description || it.Description || 'Ürün',
                    quantity: it.quantity || it.Quantity || 1,
                    unit: it.unit || it.Unit || 'adet',
                    unit_price: parseFloat(it.unitPrice ?? it.UnitPrice ?? it.unit_price ?? it.price ?? 0) || 0,
                    total_price,
                    vat_rate,
                    vat_amount,
                    confidence: it.confidence ?? it.Confidence ?? 0.9,
                    is_tax_deductible: true
                };
            });

            let rawText = '';
            if (aiData.rawText || aiData.RawText) {
                rawText = aiData.rawText || aiData.RawText;
            } else {
                rawText = `--- FİŞ / FATURA DETAYI ---\n\n${merchantName}\nTARİH: ${formattedDate || '---'}\n...\n`;
            }

            // 4. Update DB record using background client
            await client.query(
                `UPDATE ocr_records 
                 SET raw_text = $1,
                     extracted_amount = $2,
                     extracted_vat = $3,
                     extracted_date = $4,
                     extracted_vendor = $5,
                     confidence_score = $6,
                     status = 'completed',
                     processed_at = NOW()
                 WHERE id = $7`,
                [rawText, totalAmount, vatTotal, rawDate, merchantName.substring(0, 255), 90, ocrId]
            );

            // 5. Insert individual items
            for (const item of mappedItems) {
                try {
                    await client.query(
                        `INSERT INTO transaction_items
                            (transaction_id, ocr_record_id, name, quantity, unit, unit_price, total_price, vat_rate, vat_amount, confidence)
                         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
                        [null, ocrId, item.name, item.quantity, item.unit, item.unit_price, item.total_price, item.vat_rate, item.vat_amount, item.confidence]
                    );
                } catch (itemErr) {
                    logger.warn(`[OCR] Item insert failed for job ${ocrId}: ${itemErr}`);
                }
            }

            logger.info(`[OCR] Job ${ocrId} successfully saved to database. VAT: ${vatTotal}`);
        } catch (procErr: any) {
            logger.error(`[OCR] Job ${ocrId} failed:`, procErr);
            if (client) {
                try {
                    await client.query(
                        `UPDATE ocr_records SET status = 'failed', raw_text = $1 WHERE id = $2`,
                        [`Hata: ${procErr.message || 'Bilinmeyen hata'}`, ocrId]
                    );
                } catch (_) { }
            }
        } finally {
            if (client) client.release();
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
