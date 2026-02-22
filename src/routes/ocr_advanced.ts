import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { OCRProcessor } from '../services/OCRProcessor';
import logger from '../config/logger';

const router = Router();
const ocrProcessor = new OCRProcessor();

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

const upload = multer({ storage: storage });

// POST /api/ocr/process (Async)
router.post('/process', upload.single('image'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'No image uploaded' });
        }

        const imagePath = req.file.path;

        // In a production app, this would be a background job (BullMQ, Redis, etc.)
        // For now, we simulate async by processing and then storing.
        // We return the ocr_record_id immediately for polling/webhooks.

        // 1. Initial record
        const initialRecord = await req.db.query(
            `INSERT INTO ocr_records (user_id, image_path, status) VALUES ($1, $2, 'processing') RETURNING id`,
            [req.user?.id, imagePath]
        );
        const ocrId = initialRecord.rows[0].id;

        // Start processing in background (RLS Safe)
        import('../db').then(({ withTransaction }) => {
            if (!req.user?.id) return;

            withTransaction(req.user.id, async (client) => {
                const result = await ocrProcessor.process(imagePath);

                // 2. Update record with results
                await client.query(
                    `UPDATE ocr_records 
                     SET raw_text = $1, 
                         extracted_amount = $2, 
                         extracted_date = $3, 
                         extracted_vendor = $4, 
                         confidence_score = $5,
                         status = 'completed',
                         processed_at = NOW(),
                         validation_summary = $6
                     WHERE id = $7`,
                    [
                        JSON.stringify(result.items),
                        result.total,
                        result.date,
                        result.merchant_name,
                        result.confidence_score * 100,
                        JSON.stringify(result.mathematical_validation),
                        ocrId
                    ]
                );

                // 3. Store individual items
                for (const item of result.items) {
                    await client.query(
                        `INSERT INTO transaction_items (
                            transaction_id, ocr_record_id, name, quantity, 
                            unit_price, total_price, vat_rate, vat_amount, confidence
                        ) VALUES (
                            $1, $2, $3, $4, $5, $6, $7, $8, $9
                        )`,
                        [
                            null,
                            ocrId,
                            item.name,
                            item.quantity || 1,
                            item.unit_price || item.total_price || 0,
                            item.total_price || 0,
                            item.vat_rate || 0,
                            item.vat_amount || 0,
                            item.confidence || 1.0
                        ]
                    );
                }

                logger.info(`OCR Job ${ocrId} completed successfully.`);
            }).catch(err => {
                logger.error(`OCR Job ${ocrId} failed:`, err);
                // Fallback to pool for final status update if withTransaction failed
                const { pool } = require('../db');
                pool.query(`UPDATE ocr_records SET status = 'failed' WHERE id = $1`, [ocrId]);
            });
        });

        res.json({
            success: true,
            job_id: ocrId,
            status: 'processing',
            message: 'Image received and processing started.'
        });

    } catch (error) {
        logger.error('OCR API Error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// GET /api/ocr/status/:id
router.get('/status/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // Check local DB first
        const { pool } = require('../db');
        const result = await pool.query(`SELECT * FROM ocr_records WHERE id = $1`, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Job not found' });
        }

        const record = result.rows[0];
        if (record.status === 'completed') {
            // Fetch items associated with this OCR record
            const itemsRes = await pool.query(
                `SELECT * FROM transaction_items WHERE ocr_record_id = $1`,
                [id]
            );
            record.items = itemsRes.rows;
        }

        res.json({ success: true, data: record });
    } catch (error) {
        logger.error('OCR Status API Error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

export default router;
