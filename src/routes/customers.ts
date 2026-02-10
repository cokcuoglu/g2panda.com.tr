import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/customers
router.get('/', async (req: Request, res: Response) => {
    try {
        const { search, limit = 50, offset = 0 } = req.query;

        console.log(`[DEBUG] GET /customers - User: ${req.user?.id} (${req.user?.email}) - Search: ${search}`);

        let query = `
            SELECT * FROM customers 
            WHERE user_id = $1 AND deleted_at IS NULL
        `;
        const params: any[] = [req.user?.id];

        if (search) {
            query += ` AND (name ILIKE $2 OR phone ILIKE $2)`;
            params.push(`%${search}%`);
        }

        query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
        params.push(limit, offset);

        const result = await req.db.query(query, params);

        // Get total count for pagination
        let countQuery = `SELECT count(*) FROM customers WHERE user_id = $1 AND deleted_at IS NULL`;
        const countParams = [req.user?.id];
        if (search) {
            countQuery += ` AND (name ILIKE $2 OR phone ILIKE $2)`;
            countParams.push(`%${search}%`);
        }
        const countResult = await req.db.query(countQuery, countParams);

        res.json({
            success: true,
            data: result.rows,
            total: parseInt(countResult.rows[0].count),
            limit: Number(limit),
            offset: Number(offset)
        });
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch customers' });
    }
});

// POST /api/customers
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, phone, address, notes, city, district, neighborhood } = req.body;

        if (!name) {
            return res.status(400).json({ success: false, error: 'Name is required' });
        }

        // Check duplicates if phone provided
        if (phone) {
            if (!/^[5][0-9]{9}$/.test(phone)) {
                return res.status(400).json({ success: false, error: 'Telefon numarası 5 ile başlamalı ve 10 haneli olmalıdır. (Örn: 5301234567)' });
            }

            const existing = await req.db.query(
                `SELECT id FROM customers WHERE user_id = $1 AND phone = $2 AND deleted_at IS NULL`,
                [req.user?.id, phone]
            );
            if (existing.rows.length > 0) {
                return res.status(409).json({ success: false, error: 'Bu telefon numarası ile kayıtlı bir müşteri zaten var.' });
            }
        }

        const result = await req.db.query(
            `INSERT INTO customers (user_id, name, phone, address, notes, city, district, neighborhood)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING *`,
            [req.user?.id, name, phone, address, notes, city, district, neighborhood]
        );

        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ success: false, error: 'Failed to create customer' });
    }
});

// PUT /api/customers/:id
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, phone, address, notes, city, district, neighborhood } = req.body;

        if (phone && !/^[5][0-9]{9}$/.test(phone)) {
            return res.status(400).json({ success: false, error: 'Telefon numarası 5 ile başlamalı ve 10 haneli olmalıdır. (Örn: 5301234567)' });
        }

        const result = await req.db.query(
            `UPDATE customers 
             SET name = COALESCE($1, name),
                 phone = COALESCE($2, phone),
                 address = COALESCE($3, address),
                 notes = COALESCE($4, notes),
                 city = COALESCE($5, city),
                 district = COALESCE($6, district),
                 neighborhood = COALESCE($7, neighborhood),
                 updated_at = NOW()
             WHERE id = $8 AND user_id = $9 AND deleted_at IS NULL
             RETURNING *`,
            [name, phone, address, notes, city, district, neighborhood, id, req.user?.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Customer not found' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ success: false, error: 'Failed to update customer' });
    }
});

// DELETE /api/customers/:id
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await req.db.query(
            `UPDATE customers SET deleted_at = NOW() 
             WHERE id = $1 AND user_id = $2 AND deleted_at IS NULL
             RETURNING id`,
            [id, req.user?.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Customer not found' });
        }

        res.json({ success: true, message: 'Customer deleted successfully' });
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ success: false, error: 'Failed to delete customer' });
    }
});

export default router;
