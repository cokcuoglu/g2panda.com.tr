
import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ensure user is authenticated before storage (Middleware runs first, but req.user needed)
        // VerifyToken middleware should have populated req.user
        if (!req.user || !req.user.id) {
            return cb(new Error('Unauthorized'), '');
        }

        const userId = req.user.id;
        const uploadDir = path.join(__dirname, '../../uploads', userId, 'production');

        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Generate unique filename: timestamp-random.ext
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

// GET /api/products
router.get('/', async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, error: 'Unauthorized' });
        }

        // Fix: Use ORDER BY id or name if created_at is missing from table definition, but it should be there.
        // Assuming created_at exists.
        const result = await req.db.query(
            `SELECT * FROM products WHERE user_id = $1 ORDER BY created_at DESC`,
            [req.user.id]
        );

        res.json({ success: true, data: result.rows });
    } catch (err) {
        console.error('Get Products error:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch products' });
    }
});

// POST /api/products
router.post('/', upload.single('image'), async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, error: 'Unauthorized' });
        }

        let { name, price, color, menu_category_id, is_active, sort_order, takeaway_discount_percent } = req.body;

        // Sanitize price: Convert "300,00" to "300.00"
        if (typeof price === 'string') {
            price = price.replace(',', '.');
        }

        // Sanitize discount: ensure it's a valid number between 0-100
        let discount = parseFloat(takeaway_discount_percent) || 0;
        discount = Math.max(0, Math.min(100, discount));

        // Construct image_url if file was uploaded
        let image_url = req.body.image_url; // Allow manual URL if sent? Maybe not.
        if (req.file) {
            // Save absolute URL path relative to server root
            // uploads/userId/production/filename
            image_url = `/uploads/${req.user.id}/production/${req.file.filename}`;
        }

        if (!name || !price) {
            return res.status(400).json({ success: false, error: 'Name and Price are required' });
        }

        // Default to true if not provided
        const active = is_active !== undefined ? (is_active === 'true' || is_active === true) : true;
        const order = sort_order || 0;
        const desc = req.body.description || null;

        const result = await req.db.query(
            `INSERT INTO products (user_id, name, price, color, menu_category_id, image_url, is_active, sort_order, description, takeaway_discount_percent)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
             RETURNING *`,
            [req.user.id, name, price, color || 'bg-white', menu_category_id || null, image_url || null, active, order, desc, discount]
        );

        res.status(201).json({ success: true, data: result.rows[0] });

    } catch (err) {
        console.error('Create Product error:', err);
        res.status(500).json({ success: false, error: 'Failed to create product' });
    }
});

// PUT /api/products/:id
router.put('/:id', upload.single('image'), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        let { name, price, color, menu_category_id, is_active, sort_order, takeaway_discount_percent } = req.body;

        // Sanitize price: Convert "300,00" to "300.00"
        if (typeof price === 'string') {
            price = price.replace(',', '.');
        }

        // Sanitize discount if provided
        let discount = takeaway_discount_percent !== undefined ? parseFloat(takeaway_discount_percent) || 0 : undefined;
        if (discount !== undefined) {
            discount = Math.max(0, Math.min(100, discount));
        }

        let image_url = req.body.image_url;
        if (req.file) {
            image_url = `/uploads/${req.user!.id}/production/${req.file.filename}`;
        }

        const active = is_active === undefined ? undefined : (is_active === 'true' || is_active === true);
        const desc = req.body.description; // Undefined if not sent

        // Handle sort_order logic (if sent)
        // If sort_order not sent, we want to keep it. BUT COALESCE with undefined in JS works if we pass explicitly.
        // Actually, let's allow partial updates properly.

        const result = await req.db.query(
            `UPDATE products 
             SET name = COALESCE($1, name),
                 price = COALESCE($2, price),
                 color = COALESCE($3, color),
                 menu_category_id = COALESCE($4, menu_category_id),
                 image_url = COALESCE($5, image_url),
                 is_active = COALESCE($6, is_active),
                 sort_order = COALESCE($7, sort_order),
                 description = COALESCE($8, description),
                 takeaway_discount_percent = COALESCE($9, takeaway_discount_percent)
             WHERE id = $10 AND user_id = $11
             RETURNING *`,
            [name, price, color, menu_category_id || null, image_url, active, sort_order, desc, discount, id, req.user!.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Product not found or unauthorized' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error('Update Product error:', err);
        res.status(500).json({ success: false, error: 'Failed to update product' });
    }
});

// DELETE /api/products/:id
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Secure delete: ensure user owns the product
        const result = await req.db.query(
            `DELETE FROM products WHERE id = $1 AND user_id = $2 RETURNING id`,
            [id, req.user!.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Product not found or unauthorized' });
        }

        res.json({ success: true, message: 'Product deleted' });
    } catch (err) {
        console.error('Delete Product error:', err);
        res.status(500).json({ success: false, error: 'Failed to delete product' });
    }
});

export default router;
