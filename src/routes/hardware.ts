import express, { Request, Response } from 'express';
import { hardwareBridgeService } from '../services/hardwareBridge';
import logger from '../config/logger';

const router = express.Router();

// GET /api/hardware/status
router.get('/status', (req: Request, res: Response) => {
    const restaurantId = (req as any).user?.business_id || (req as any).user?.id;
    if (!restaurantId) {
        return res.status(401).json({ success: false, error: 'Restaurant ID not found' });
    }

    const status = hardwareBridgeService.getStatus(restaurantId);
    res.json({ success: true, data: status });
});

// POST /api/hardware/print-order/:id
router.post('/print-order/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = (req as any).user?.id;

        // 1. Get Order Data
        const orderRes = await (req as any).db.query(
            `SELECT o.*, t.name as table_name 
             FROM orders o 
             LEFT JOIN tables t ON o.table_id = t.id
             WHERE o.id = $1 AND o.user_id = $2`,
            [id, userId]
        );

        if (orderRes.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }

        const order = orderRes.rows[0];

        // 2. Find Online Bridge for this restaurant
        const restaurantId = (req as any).user?.business_id || userId;
        const bridges = hardwareBridgeService.getStatus(restaurantId);

        const onlineBridge = bridges.find(b => b.status === 'Online');

        if (!onlineBridge) {
            return res.status(400).json({ success: false, error: 'No online hardware bridge found' });
        }

        // 3. Generate ESC/POS and Send
        const base64 = hardwareBridgeService.generateReceipt(order);
        const success = hardwareBridgeService.sendRaw(onlineBridge.machineId, base64);

        if (success) {
            res.json({ success: true, message: 'Print job sent' });
        } else {
            res.status(500).json({ success: false, error: 'Failed to send print job to bridge' });
        }
    } catch (err: any) {
        logger.error(`[HardwarePrintOrder] Error: ${err.message}`);
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST /api/hardware/print-transaction/:id
router.post('/print-transaction/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = (req as any).user?.id;

        // 1. Get Transaction + Items Data
        const txRes = await (req as any).db.query(
            `SELECT * FROM transactions WHERE id = $1 AND user_id = $2`,
            [id, userId]
        );

        if (txRes.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Transaction not found' });
        }

        const tx = txRes.rows[0];

        const itemsRes = await (req as any).db.query(
            `SELECT * FROM transaction_items WHERE transaction_id = $1`,
            [id]
        );
        tx.items = itemsRes.rows;

        // 2. Find Online Bridge
        const bridges = hardwareBridgeService.getStatus((req as any).user?.business_id || userId);
        const onlineBridge = bridges.find(b => b.status === 'Online');

        if (!onlineBridge) {
            return res.status(400).json({ success: false, error: 'No online hardware bridge found' });
        }

        // 3. Generate ESC/POS and Send
        const base64 = hardwareBridgeService.generateReceipt(tx);
        const success = hardwareBridgeService.sendRaw(onlineBridge.machineId, base64);

        if (success) {
            res.json({ success: true, message: 'Print job sent' });
        } else {
            res.status(500).json({ success: false, error: 'Failed to send print job to bridge' });
        }
    } catch (err: any) {
        logger.error(`[HardwarePrintTx] Error: ${err.message}`);
        res.status(500).json({ success: false, error: err.message });
    }
});

export default router;
