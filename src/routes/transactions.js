const express = require('express');
const router = express.Router();
const logger = require('../config/logger').default;

// GET /api/transactions
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, type, start_date, end_date, sort_by = 'date', expense_type } = req.query;
    console.log('GET /api/transactions Query:', req.query);
    const offset = (page - 1) * limit;

    let query = `
      SELECT t.*, c.name as category_name, c.color as category_color, ch.name as channel_name, o.image_path as receipt_image
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      LEFT JOIN channels ch ON t.channel_id = ch.id
      LEFT JOIN ocr_records o ON t.ocr_record_id = o.id
      WHERE t.deleted_at IS NULL
    `;
    const params = [];

    if (type) {
      params.push(type);
      query += ` AND t.type = $${params.length}`;
    }

    if (expense_type) {
      params.push(expense_type);
      query += ` AND t.expense_type = $${params.length}`;
    }

    if (start_date) {
      params.push(start_date);
      query += ` AND t.transaction_date >= $${params.length}`;
    }

    if (end_date) {
      params.push(end_date);
      query += ` AND t.transaction_date <= $${params.length}`;
    }

    if (sort_by === 'created_at') {
      query += ` ORDER BY t.created_at DESC`;
    } else {
      query += ` ORDER BY t.transaction_date DESC, t.created_at DESC`;
    }

    // Limits
    params.push(limit);
    query += ` LIMIT $${params.length}`;

    params.push(offset);
    query += ` OFFSET $${params.length}`;

    // Execute using req.db (Transaction + RLS active)
    const result = await req.db.query(query, params);

    // Count total for pagination
    const countRes = await req.db.query(`SELECT COUNT(*) FROM transactions t WHERE t.deleted_at IS NULL`);

    res.json({
      success: true,
      data: result.rows,
      meta: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(countRes.rows[0].count)
      }
    });
  } catch (err) {
    logger.error(`[GET-TRANSACTIONS ERROR] User: ${req.user.id}, Error: ${err.message}`, { stack: err.stack });
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// GET /api/transactions/daily-total
router.get('/daily-total', async (req, res) => {
  try {
    // Sum amount for income transactions created today
    // Using transaction_date for business logic day

    const { date } = req.query;
    const targetDate = date || new Date().toISOString().split('T')[0];

    // Removed redundant log to reduce noise

    const query = `
      SELECT SUM(amount) as total 
      FROM transactions 
      WHERE type = 'income' 
      AND deleted_at IS NULL 
      AND transaction_date >= ($1::TIMESTAMP AT TIME ZONE 'Europe/Istanbul')
      AND transaction_date < (($1::DATE + INTERVAL '1 day')::TIMESTAMP AT TIME ZONE 'Europe/Istanbul')
      AND user_id = $2
    `;

    const result = await req.db.query(query, [targetDate, req.user.id]);
    const total = result.rows[0].total || 0;

    logger.debug(`[DAILY-TOTAL] User: ${req.user.id}, Date: ${targetDate}, Total: ${total}`);

    res.json({ success: true, total: Number(total), debug: { userId: req.user.id, targetDate } });
  } catch (err) {
    logger.error(`[DAILY-TOTAL ERROR] User: ${req.user.id}, Date: ${req.query.date}, Error: ${err.message}`, { stack: err.stack });
    res.status(500).json({ success: false, error: 'Failed to calculate daily total' });
  }
});

// GET /api/transactions/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT t.*, c.name as category_name, c.color as category_color, ch.name as channel_name, o.image_path as receipt_image
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      LEFT JOIN channels ch ON t.channel_id = ch.id
      LEFT JOIN ocr_records o ON t.ocr_record_id = o.id
      WHERE t.id = $1 AND t.deleted_at IS NULL
    `;

    const result = await req.db.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Transaction not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    logger.error(`[GET-TRANSACTION-BY-ID ERROR] ID: ${req.params.id}, User: ${req.user.id}, Error: ${err.message}`, { stack: err.stack });
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// POST /api/transactions
router.post('/', async (req, res) => {
  try {
    const { category_id, channel_id, type, amount, transaction_date, description, ocr_record_id, expense_type, is_tax_deductible, deduction_reason, document_type } = req.body;
    const fs = require('fs');
    const path = require('path');

    // Validation
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, error: 'Amount must be greater than 0' });
    }
    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ success: false, error: 'Invalid transaction type' });
    }
    // Date Validation (Relaxed for Timezones)
    const txDate = new Date(transaction_date);
    const futureLimit = new Date();
    futureLimit.setHours(futureLimit.getHours() + 48); // Allow +48h buffer

    if (txDate > futureLimit) {
      return res.status(400).json({ success: false, error: 'Date cannot be in the future (more than 48h)' });
    }

    // Insert Transaction
    const query = `
      INSERT INTO transactions (
        user_id, category_id, channel_id, type, amount, transaction_date, description, ocr_record_id,
        expense_type, is_tax_deductible, deduction_reason, document_type
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `;

    const values = [
      req.user.id,
      category_id,
      channel_id,
      type,
      amount,
      transaction_date,
      description,
      ocr_record_id || null,
      expense_type || 'none',
      is_tax_deductible === undefined ? true : is_tax_deductible,
      deduction_reason || null,
      document_type || 'receipt'
    ];
    const result = await req.db.query(query, values);
    const transaction = result.rows[0];

    // File Organization Logic (if OCR)
    if (ocr_record_id) {
      try {
        // 1. Get OCR Record
        const ocrRes = await req.db.query('SELECT * FROM ocr_records WHERE id = $1', [ocr_record_id]);
        const ocrRecord = ocrRes.rows[0];

        if (ocrRecord && ocrRecord.image_path) {
          // 2. Get Category Name for Folder
          const catRes = await req.db.query('SELECT name FROM categories WHERE id = $1', [category_id]);
          const categoryName = catRes.rows[0]?.name || 'uncategorized';

          // Slugify category name (e.g., "Food & Bev" -> "food-bev")
          const safeCatName = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

          // 3. Create Target Directory: uploads/{type}/{category_slug}
          const baseUploadDir = 'uploads'; // Ensure this matches ocr.ts
          const targetDir = path.join(baseUploadDir, type, safeCatName);

          if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
          }

          // 4. Move File
          const oldPath = ocrRecord.image_path;
          const fileName = path.basename(oldPath);
          const newPath = path.join(targetDir, fileName);

          // Check if old file exists before moving
          // Note: oldPath comes from DB, might be relative or absolute. 
          // Assuming relative to project root based on ocr.ts 'uploads' dest.
          if (fs.existsSync(oldPath)) {
            fs.renameSync(oldPath, newPath);

            // 5. Update OCR Record with new Path and Validated Status
            await req.db.query(
              `UPDATE ocr_records SET image_path = $1, status = 'confirmed' WHERE id = $2`,
              [newPath, ocr_record_id]
            );

            console.log(`Organized receipt: ${oldPath} -> ${newPath}`);
          } else {
            console.warn(`Original receipt file not found: ${oldPath}`);
          }
        }
      } catch (fileErr) {
        console.error('File organization failed:', fileErr);
        // Don't fail the transaction, just log error
      }
    }

    res.status(201).json({ success: true, data: transaction });
  } catch (err) {
    logger.error(`[POST-TRANSACTION ERROR] User: ${req.user.id}, Error: ${err.message}`, { stack: err.stack });
    res.status(500).json({ success: false, error: 'Internal Server Error: ' + err.message });
  }
});

// PUT /api/transactions/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description, transaction_date, category_id, channel_id } = req.body;

    // Validate if provided
    if (amount !== undefined && amount <= 0) {
      return res.status(400).json({ success: false, error: 'Amount must be greater than 0' });
    }

    // Build dynamic update
    const fields = [];
    const values = [];
    let idx = 1;

    if (amount !== undefined) { fields.push(`amount = $${idx++}`); values.push(amount); }
    if (description !== undefined) { fields.push(`description = $${idx++}`); values.push(description); }
    if (transaction_date !== undefined) { fields.push(`transaction_date = $${idx++}`); values.push(transaction_date); }
    if (category_id !== undefined) { fields.push(`category_id = $${idx++}`); values.push(category_id); }
    if (channel_id !== undefined) { fields.push(`channel_id = $${idx++}`); values.push(channel_id); }
    if (req.body.expense_type !== undefined) { fields.push(`expense_type = $${idx++}`); values.push(req.body.expense_type); }
    if (req.body.is_tax_deductible !== undefined) { fields.push(`is_tax_deductible = $${idx++}`); values.push(req.body.is_tax_deductible); }
    if (req.body.deduction_reason !== undefined) { fields.push(`deduction_reason = $${idx++}`); values.push(req.body.deduction_reason); }

    if (fields.length === 0) return res.status(400).json({ success: false, error: 'No fields to update' });

    fields.push(`updated_at = NOW()`);

    // Add ID as last parameter
    values.push(id);

    const query = `
      UPDATE transactions 
      SET ${fields.join(', ')}
      WHERE id = $${idx} AND deleted_at IS NULL
      RETURNING *
    `;

    const result = await req.db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Transaction not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// DELETE /api/transactions/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      UPDATE transactions 
      SET deleted_at = NOW()
      WHERE id = $1 AND deleted_at IS NULL
      RETURNING id
    `;

    const result = await req.db.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Transaction not found' });
    }

    res.json({ success: true, message: 'Transaction deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
