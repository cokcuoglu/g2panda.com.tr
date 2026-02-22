import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Configure Multer Storage (Reusing product logic)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!req.user || !req.user.id) {
            return cb(new Error('Unauthorized'), '');
        }

        const userId = req.user.id;
        const uploadDir = path.join(__dirname, '../../uploads', userId, 'production');

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Only images are allowed (jpeg, jpg, png, webp)'));
    }
});

// GET /api/campaigns
router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await req.db.query(
            `SELECT c.*, 
                (SELECT json_agg(json_build_object(
                    'product_id', cp.product_id,
                    'quantity', cp.quantity,
                    'name', p.name,
                    'price', p.price
                ))
                FROM campaign_products cp
                JOIN products p ON cp.product_id = p.id
                WHERE cp.campaign_id = c.id
                ) as products
             FROM campaigns c
             WHERE user_id = $1 AND deleted_at IS NULL
             ORDER BY created_at DESC`,
            [req.user!.id]
        );
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// POST /api/campaigns
router.post('/', upload.single('image'), async (req: Request, res: Response) => {
    try {
        const { name, unique_code, description, discount_amount, discount_type, is_active } = req.body;
        let { products } = req.body;

        // Parse products if it's a string (from FormData)
        if (typeof products === 'string') {
            try {
                products = JSON.parse(products);
            } catch (e) {
                products = [];
            }
        }

        if (!name || !unique_code) {
            return res.status(400).json({ success: false, error: 'Name and unique code are required' });
        }

        let image_url = req.body.image_url;
        if (req.file) {
            image_url = `/uploads/${req.user!.id}/production/${req.file.filename}`;
        }

        const campaignResult = await req.db.query(
            `INSERT INTO campaigns (user_id, name, unique_code, description, discount_amount, discount_type, is_active, image_url)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING *`,
            [req.user!.id, name, unique_code, description || '', discount_amount || 0, discount_type || 'amount', is_active !== 'false' && is_active !== false, image_url || null]
        );
        const campaign = campaignResult.rows[0];

        if (products && Array.isArray(products)) {
            for (const p of products) {
                await req.db.query(
                    `INSERT INTO campaign_products (campaign_id, product_id, quantity)
                     VALUES ($1, $2, $3)`,
                    [campaign.id, p.product_id, p.quantity || 1]
                );
            }
        }

        res.status(201).json({ success: true, data: campaign });
    } catch (error: any) {
        console.error('Error creating campaign:', error);
        res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
    }
});

// PUT /api/campaigns/:id
router.put('/:id', upload.single('image'), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, unique_code, description, discount_amount, discount_type, is_active } = req.body;
        let { products } = req.body;

        // Parse products if it's a string (from FormData)
        if (typeof products === 'string') {
            try {
                products = JSON.parse(products);
            } catch (e) {
                products = [];
            }
        }

        let image_url = req.body.image_url;
        if (req.file) {
            image_url = `/uploads/${req.user!.id}/production/${req.file.filename}`;
        }

        const campaignResult = await req.db.query(
            `UPDATE campaigns 
             SET name = COALESCE($1, name),
                 unique_code = COALESCE($2, unique_code),
                 description = COALESCE($3, description),
                 discount_amount = COALESCE($4, discount_amount),
                 discount_type = COALESCE($5, discount_type),
                 is_active = COALESCE($6, is_active),
                 image_url = COALESCE($7, image_url),
                 updated_at = NOW()
             WHERE id = $8 AND user_id = $9
             RETURNING *`,
            [name, unique_code, description, discount_amount, discount_type, is_active === undefined ? undefined : (is_active === 'true' || is_active === true), image_url, id, req.user!.id]
        );

        if (campaignResult.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Campaign not found' });
        }

        if (products && Array.isArray(products)) {
            // Re-sync products: delete and insert
            await req.db.query('DELETE FROM campaign_products WHERE campaign_id = $1', [id]);
            for (const p of products) {
                await req.db.query(
                    `INSERT INTO campaign_products (campaign_id, product_id, quantity)
                     VALUES ($1, $2, $3)`,
                    [id, p.product_id, p.quantity || 1]
                );
            }
        }

        res.json({ success: true, data: campaignResult.rows[0] });
    } catch (error: any) {
        console.error('Error updating campaign:', error);
        res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
    }
});

// DELETE /api/campaigns/:id
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await req.db.query(
            `UPDATE campaigns SET deleted_at = NOW(), is_active = false WHERE id = $1 AND user_id = $2 RETURNING id`,
            [id, req.user!.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Campaign not found' });
        }

        res.json({ success: true, message: 'Campaign deleted' });
    } catch (error) {
        console.error('Error deleting campaign:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

export default router;
