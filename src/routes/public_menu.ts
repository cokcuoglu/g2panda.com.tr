
import { Router, Request, Response } from 'express';
import { withTransaction } from '../db';
import { PoolClient } from 'pg';
const { query } = require('../db');

const router = Router();

// GET /api/public/menu/:userId
const getMenuData = async (client: PoolClient, userId: string) => {
    // Verify user exists
    const userCheck = await client.query('SELECT id, business_name FROM users WHERE id = $1', [userId]);
    if (userCheck.rows.length === 0) {
        throw new Error('User not found');
    }
    const businessName = userCheck.rows[0].business_name;

    // Fetch Categories (Active only)
    const categories = await client.query(
        `SELECT * FROM menu_categories 
         WHERE user_id = $1 AND is_active = true 
         ORDER BY sort_order ASC, name ASC`,
        [userId]
    );

    // Fetch Products (Active only)
    const products = await client.query(
        `SELECT id, name, price, description, image_url, menu_category_id, sort_order, CAST(COALESCE(takeaway_discount_percent, 0) AS FLOAT) as takeaway_discount_percent
         FROM products 
         WHERE user_id = $1 AND is_active = true
         ORDER BY sort_order ASC, name ASC`,
        [userId]
    );

    // Enhance categories with children
    const cats = categories.rows;
    const prods = products.rows;

    // Build Tree
    const categoryMap = new Map();
    cats.forEach((c: any) => {
        categoryMap.set(c.id, { ...c, children: [], products: [] });
    });

    const rootCategories: any[] = [];

    // Attach products to categories
    const uncategorizedProducts: any[] = [];
    prods.forEach((p: any) => {
        if (p.menu_category_id && categoryMap.has(p.menu_category_id)) {
            categoryMap.get(p.menu_category_id).products.push(p);
        } else {
            uncategorizedProducts.push(p);
        }
    });

    // Build hierarchy
    cats.forEach((c: any) => {
        if (c.parent_id && categoryMap.has(c.parent_id)) {
            categoryMap.get(c.parent_id).children.push(categoryMap.get(c.id));
        } else {
            rootCategories.push(categoryMap.get(c.id));
        }
    });

    // If there are products without a category, add a virtual "Diğer" category at the end
    if (uncategorizedProducts.length > 0) {
        rootCategories.push({
            id: 'uncategorized',
            name: 'Diğer',
            is_active: true,
            parent_id: null,
            sort_order: 999,
            children: [],
            products: uncategorizedProducts
        });
    }

    // Fetch Campaigns (Active only)
    const campaignsQuery = await client.query(
        `SELECT c.*, 
                COALESCE(
                    json_agg(
                        json_build_object(
                            'product_id', cp.product_id,
                            'quantity', cp.quantity,
                            'name', p.name,
                            'price', p.price
                        )
                    ) FILTER (WHERE cp.id IS NOT NULL),
                    '[]'
                ) as products
         FROM campaigns c
         LEFT JOIN campaign_products cp ON c.id = cp.campaign_id
         LEFT JOIN products p ON cp.product_id = p.id
         WHERE c.user_id = $1 AND c.is_active = true
         GROUP BY c.id`,
        [userId]
    );

    return {
        business_name: businessName,
        categories: rootCategories,
        campaigns: campaignsQuery.rows
    };
};

// GET /api/public/menu/:userId
router.get('/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        await withTransaction(userId, async (client: PoolClient) => {
            const data = await getMenuData(client, userId);
            res.json({ success: true, data });
        });

    } catch (err: any) {
        console.error('Public Menu API Error:', err);
        if (!res.headersSent) {
            res.status(err.message === 'User not found' ? 404 : 500).json({
                success: false,
                error: err.message || 'Internal Server Error'
            });
        }
    }
});

// GET /api/public/menu/table/:uniqueCode
router.get('/table/:uniqueCode', async (req: Request, res: Response) => {
    try {
        const { uniqueCode } = req.params;

        // 1. Find table and its owner (Public query, no RLS context yet)
        const tableRes = await query('SELECT user_id, id as table_id, name as table_name FROM tables WHERE unique_code = $1 AND deleted_at IS NULL', [uniqueCode]);

        if (tableRes.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Table not found' });
        }

        const { user_id, table_id, table_name } = tableRes.rows[0];

        // 2. Fetch menu with the found user_id
        await withTransaction(user_id, async (client: PoolClient) => {
            const menuData = await getMenuData(client, user_id);

            res.json({
                success: true,
                data: {
                    ...menuData,
                    table_id,
                    table_name,
                    table_code: uniqueCode
                }
            });
        });

    } catch (err: any) {
        console.error('Table Menu API Error:', err);
        if (!res.headersSent) {
            res.status(err.message === 'User not found' ? 404 : 500).json({
                success: false,
                error: err.message || 'Internal Server Error'
            });
        }
    }
});

// POST /api/public/menu/table/:uniqueCode/service-request
// Note: We use uniqueCode or tableId. The frontend might have tableId.
// Let's support tableId directly to avoid lookup if possible, or support both.
// Let's stick to :tableId for direct access if known.
// POST /api/public/menu/table/:uniqueCode/service-request
// Note: We use uniqueCode or tableId. The frontend might have tableId.
// Let's support tableId directly to avoid lookup if possible, or support both.
// Let's stick to :tableId for direct access if known.
router.post('/table/:tableId/service-request', async (req: Request, res: Response) => {
    try {
        const { tableId } = req.params;
        const { type } = req.body; // 'bill', 'call_waiter'

        console.log(`[PublicServiceRequest] ID: ${tableId}, Type: ${type}`);

        // Validate type
        if (type && !['bill', 'call_waiter', 'none'].includes(type)) {
            console.warn('[PublicServiceRequest] Invalid type:', type);
            return res.status(400).json({ success: false, error: 'Invalid request type' });
        }

        const requestText = type === 'bill' ? 'Hesap İstiyor' : (type === 'call_waiter' ? 'Garson İstiyor' : null);

        // Perform update via direct query (since no user context, we use a generic client or pool)
        // Ensure table exists and isn't deleted
        if (type === 'bill') {
            // Check if table is active before allowing bill request
            const tableCheck = await query('SELECT status FROM tables WHERE id = $1', [tableId]);
            if (tableCheck.rows.length === 0) {
                return res.status(404).json({ success: false, error: 'Table not found' });
            }
            if (tableCheck.rows[0].status !== 'active') {
                return res.status(400).json({ success: false, error: 'Table is not active, cannot request bill' });
            }
        }

        const result = await query(
            `UPDATE tables 
             SET service_request = $1, updated_at = NOW()
             WHERE id = $2 AND deleted_at IS NULL
             RETURNING id, name, service_request`,
            [requestText, tableId]
        );

        console.log(`[PublicServiceRequest] Update result count: ${result.rows.length}`);

        if (result.rows.length === 0) {
            console.warn(`[PublicServiceRequest] Table not found or deleted: ${tableId}`);
            return res.status(404).json({ success: false, error: 'Table not found' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (err: any) {
        console.error('Public Service Request Error:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

export default router;
