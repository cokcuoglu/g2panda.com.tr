
import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/users
// List all users
router.get('/', async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id || req.user.role !== 'superadmin') {
            return res.status(403).json({ success: false, error: 'Forbidden: Super Admin access required' });
        }

        const result = await req.db.query(
            'SELECT id, full_name, email, role, is_active, permissions, created_at FROM users ORDER BY created_at DESC'
        );

        res.json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        console.error('List Users error:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// POST /api/users
// Add new user (Owner only)
router.post('/', async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id || req.user.role !== 'superadmin') {
            return res.status(403).json({ success: false, error: 'Forbidden: Super Admin access required' });
        }

        const { full_name, email, password, permissions } = req.body;

        // Basic validation
        if (!full_name || !email || !password) {
            return res.status(400).json({ success: false, error: 'All fields are required' });
        }

        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await req.db.query(
            `INSERT INTO users (full_name, email, password_hash, role, is_active, permissions)
             VALUES ($1, $2, $3, 'STAFF', true, $4)
             RETURNING id, full_name, email, role, is_active, permissions, created_at`,
            [full_name, email, hashedPassword, JSON.stringify(permissions || [])]
        );

        res.status(201).json({
            success: true,
            data: result.rows[0]
        });

    } catch (error: any) {
        console.error('Create User error:', error);
        if (error.code === '23505') { // Unique violation
            return res.status(400).json({ success: false, error: 'Email already exists' });
        }
        res.status(500).json({ success: false, error: `Create failed: ${error.message}` });
    }
});

// PUT /api/users/:id
// Update user status and permissions
router.put('/:id', async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id || req.user.role !== 'superadmin') {
            return res.status(403).json({ success: false, error: 'Forbidden: Super Admin access required' });
        }

        const { id } = req.params;
        const { is_active, permissions } = req.body;

        // Prevent disabling self
        if (id === req.user.id && is_active === false) {
            return res.status(400).json({ success: false, error: 'Cannot disable your own account' });
        }

        const fields = [];
        const values = [];
        let idx = 1;

        if (is_active !== undefined) {
            fields.push(`is_active = $${idx++}`);
            values.push(is_active);
        }

        if (permissions !== undefined) {
            fields.push(`permissions = $${idx++}`);
            values.push(JSON.stringify(permissions));
        }

        if (fields.length === 0) {
            return res.status(400).json({ success: false, error: 'No changes provided' });
        }

        values.push(id);

        const result = await req.db.query(
            `UPDATE users SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, is_active, permissions`,
            values
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {
        console.error('Update User error:', error);
        res.status(500).json({ success: false, error: 'Update failed' });
    }
});

export default router;
