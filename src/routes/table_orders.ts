import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import logger from '../config/logger';

const router = Router();

// GET /api/table-orders/:tableId - Get open order for a table
router.get('/:tableId', async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, error: 'Unauthorized' });
        }

        const { tableId } = req.params;

        const result = await req.db.query(
            `SELECT * FROM orders 
             WHERE user_id = $1 AND table_id = $2 AND status IN ('pending', 'confirmed') 
             ORDER BY created_at DESC LIMIT 1`,
            [req.user.id, tableId]
        );

        logger.info(`[TableOrders-GET] Found ${result.rows.length} open orders for table ${tableId}`);

        if (result.rows.length === 0) {
            return res.json({ success: true, data: null });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error('Get Table Order error:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch table search' });
    }
});

// POST /api/table-orders - Create or get open order for table
router.post('/', async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, error: 'Unauthorized' });
        }

        const { tableId } = req.body;

        if (!tableId) {
            return res.status(400).json({ success: false, error: 'Table ID is required' });
        }

        // 1. Verify Table and Owner
        const tableRes = await req.db.query(
            'SELECT * FROM tables WHERE id = $1 AND user_id = $2 AND deleted_at IS NULL',
            [tableId, req.user.id]
        );

        if (tableRes.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Table not found' });
        }

        const table = tableRes.rows[0];

        // 2. Check for existing OPEN (pending) order
        const openOrderRes = await req.db.query(
            `SELECT * FROM orders 
             WHERE user_id = $1 AND table_id = $2 AND status IN ('pending', 'confirmed') 
             ORDER BY created_at DESC LIMIT 1`,
            [req.user.id, tableId]
        );

        if (openOrderRes.rows.length > 0) {
            return res.json({ success: true, data: openOrderRes.rows[0], message: 'Using existing open order' });
        }

        // 3. Create NEW order
        const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

        logger.info(`[TableOrders-POST] Creating new order for table ${table.name} (${tableId})`);

        const newOrderRes = await req.db.query(
            `INSERT INTO orders (user_id, table_id, table_code, table_number, order_number, status, total_amount, base_amount, discount_amount)
             VALUES ($1, $2, $3, $4, $5, 'pending', 0, 0, 0)
             RETURNING *`,
            [req.user.id, tableId, table.unique_code, table.name, orderNumber]
        );

        logger.info(`[TableOrders-POST] Created order ${newOrderRes.rows[0].id}`);

        // 4. Update Table Status to ACTIVE and clear old requests
        await req.db.query(
            "UPDATE tables SET status = 'active', service_request = NULL WHERE id = $1",
            [tableId]
        );

        res.status(201).json({ success: true, data: newOrderRes.rows[0] });
    } catch (err) {
        console.error('Create Table Order error:', err);
        res.status(500).json({ success: false, error: 'Failed to create table order' });
    }
});

// PUT /api/table-orders/:id - Update order items (Partial Save)
router.put('/:id', async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, error: 'Unauthorized' });
        }

        const { id } = req.params;
        const { items, total_amount } = req.body;

        logger.info(`[TableOrders-PUT] Updating order ${id}. Items: ${items?.length}, Total: ${total_amount}`);

        const result = await req.db.query(
            `UPDATE orders 
             SET items = $1, total_amount = $2, updated_at = NOW()
             WHERE id = $3 AND user_id = $4 AND status IN ('pending', 'confirmed')
             RETURNING *`,
            [JSON.stringify(items), total_amount, id, req.user.id]
        );

        logger.info(`[TableOrders - PUT] Update result: ${result.rows.length} rows updated`);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Order not found or already closed' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error('Update Table Order error:', err);
        res.status(500).json({ success: false, error: 'Failed to update order' });
    }
});

// PATCH /api/table-orders/:id/close - Close table order
router.patch('/:id/close', async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, error: 'Unauthorized' });
        }

        const { id } = req.params;

        // 1. Get Order and Table Info
        const orderRes = await req.db.query(
            'SELECT * FROM orders WHERE id = $1 AND user_id = $2',
            [id, req.user.id]
        );

        if (orderRes.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }

        const order = orderRes.rows[0];

        if (order.status === 'completed' || order.status === 'rejected') {
            return res.status(400).json({ success: false, error: 'Order is already closed' });
        }

        // 2. Update Order Status
        const updatedOrderRes = await req.db.query(
            `UPDATE orders 
             SET status = 'completed', updated_at = NOW()
             WHERE id = $1 AND user_id = $2
             RETURNING *`,
            [id, req.user.id]
        );

        // 3. Update Table Status to AVAILABLE if this was a table order
        if (order.table_id) {
            await req.db.query(
                "UPDATE tables SET status = 'available', service_request = NULL WHERE id = $1",
                [order.table_id]
            );
        }

        res.json({ success: true, data: updatedOrderRes.rows[0] });
    } catch (err) {
        console.error('Close Table Order error:', err);
        res.status(500).json({ success: false, error: 'Failed to close order' });
    }
});

export default router;
