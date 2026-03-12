
import { Router, Request, Response } from 'express';
// Note: We use req.db because it has the RLS context set!
// Do NOT use 'pool' directly.

const router = Router();

// GET /api/reports/summary
router.get('/summary', async (req: Request, res: Response) => {
    try {
        const { start_date, end_date, type } = req.query;

        let typeFilter = '';
        const params: any[] = [start_date, end_date];

        // Type filter logic
        if (type === 'income') {
            typeFilter = `AND type = 'income'`;
        } else if (type === 'expense') {
            typeFilter = `AND type = 'expense'`;
        }
        // If 'all', we don't add type filter (or we handle summation logic carefully)

        // We can do a single query to get both aggregates
        // Since RLS is active, we don't need "WHERE user_id = $x" explicitly for security,
        // but explicit is better for performance keys sometimes. 
        // However, standard RLS practice: just query the table.

        const query = `
            SELECT 
                SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as total_income,
                SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as total_expense,
                COUNT(CASE WHEN type = 'income' THEN 1 END) as income_count,
                COUNT(CASE WHEN type = 'expense' THEN 1 END) as expense_count
            FROM transactions
            WHERE transaction_date >= ($1::TIMESTAMP AT TIME ZONE 'Europe/Istanbul')
              AND transaction_date < (($2::DATE + INTERVAL '1 day')::TIMESTAMP AT TIME ZONE 'Europe/Istanbul')
            ${typeFilter}
        `;

        const result = await req.db.query(query, params);
        const row = result.rows[0];

        // If filtering by specific type, the other metrics should be 0 logically?
        // The SQL case will handle it (sum will be 0 if no rows match type). 
        // Wait, if I add "AND type = 'income'", then type='expense' rows are filtered out before aggregation.
        // So total_expense will be 0. Correct.

        const summary = {
            total_income: Number(row.total_income || 0),
            total_expense: Number(row.total_expense || 0),
            net_profit: Number(row.total_income || 0) - Number(row.total_expense || 0),
            income_count: Number(row.income_count || 0),
            expense_count: Number(row.expense_count || 0)
        };

        res.json({
            success: true,
            data: summary
        });

    } catch (error) {
        console.error('Reports Summary Error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch report summary' });
    }
});

// GET /api/reports/export/:format
router.get('/export/:format', async (req: Request, res: Response) => {
    try {
        const { format } = req.params;
        const { start_date, end_date, type } = req.query;

        // Fetch data
        let typeFilter = '';
        const params: any[] = [start_date, end_date];
        if (type === 'income') typeFilter = `AND type = 'income'`;
        if (type === 'expense') typeFilter = `AND type = 'expense'`;

        const query = `
            SELECT transaction_date, type, category_id, amount, description 
            FROM transactions
            WHERE transaction_date >= ($1::TIMESTAMP AT TIME ZONE 'Europe/Istanbul')
              AND transaction_date < (($2::DATE + INTERVAL '1 day')::TIMESTAMP AT TIME ZONE 'Europe/Istanbul')
            ${typeFilter}
            ORDER BY transaction_date DESC
        `;

        const result = await req.db.query(query, params);
        const rows = result.rows;

        if (format === 'excel' || format === 'csv') {
            // Generate CSV
            const header = 'Tarih,Tip,Kategori,Tutar,Aciklama\n';
            const csv = rows.map((r: any) => {
                const date = new Date(r.transaction_date).toLocaleDateString('tr-TR');
                const category = r.category_id ? r.category_id : 'Belirtilmedi'; // Assuming category_id might need to be joined with categories table for name, but using id or a joined name here. Actually, wait, the query doesn't join categories. Let's just output what we have or 'Diğer'.
                // Ideally we'd join categories. Let's just use what we have in rows.
                return `${date},${r.type},${category},${r.amount},"${r.description || ''}"`;
            }).join('\n');

            res.header('Content-Type', 'text/csv');
            res.attachment(`rapor_${start_date}.csv`);
            return res.send(header + csv);
        }

        if (format === 'pdf') {
            const PDFDocument = require('pdfkit-table');

            const doc = new PDFDocument({ margin: 30, size: 'A4' });

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=rapor_${start_date}_${end_date}.pdf`);

            doc.pipe(res);

            // Fetch categories for better names
            const catHeaderRes = await req.db.query('SELECT id, name FROM categories');
            const catMap = new Map();
            catHeaderRes.rows.forEach((c: any) => catMap.set(c.id, c.name));

            doc.fontSize(18).text('Finansal Rapor', { align: 'center' });
            doc.fontSize(10).text(`Tarih Aralığı: ${start_date} - ${end_date}`, { align: 'center' });
            doc.moveDown(2);

            const tableArray = {
                headers: [
                    { label: "Tarih", property: 'date', width: 80 },
                    { label: "Tip", property: 'type', width: 60 },
                    { label: "Kategori", property: 'category', width: 100 },
                    { label: "Tutar (TL)", property: 'amount', width: 80 },
                    { label: "Açıklama", property: 'description', width: 200 }
                ],
                datas: rows.map((r: any) => {
                    const dateObj = new Date(r.transaction_date);
                    return {
                        date: dateObj.toLocaleDateString('tr-TR'),
                        type: r.type === 'income' ? 'Gelir' : 'Gider',
                        category: r.category_id ? (catMap.get(r.category_id) || 'Bilinmeyen') : '-',
                        amount: Number(r.amount).toLocaleString('tr-TR', { minimumFractionDigits: 2 }),
                        description: r.description || '-'
                    };
                })
            };

            await doc.table(tableArray, {
                prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10),
                prepareRow: (row: any, i: number) => doc.font('Helvetica').fontSize(9)
            });

            doc.end();
            return;
        }

        res.status(400).json({ success: false, error: 'Invalid format requested' });

    } catch (error) {
        console.error('Export Error:', error);
        res.status(500).json({ success: false, error: 'Export failed' });
    }
});


// GET /api/reports/categories
router.get('/categories', async (req: Request, res: Response) => {
    try {
        const { start_date, end_date, type } = req.query;

        // Validation
        if (!start_date || !end_date) {
            return res.status(400).json({ success: false, error: 'Start date and end date are required' });
        }

        const start = new Date(start_date as string);
        const end = new Date(end_date as string);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({ success: false, error: 'Invalid date format' });
        }

        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 31) {
            return res.status(400).json({ success: false, error: 'Date range cannot exceed 31 days' });
        }

        if (type && type !== 'income' && type !== 'expense') {
            return res.status(400).json({ success: false, error: 'Invalid type parameter' });
        }

        const queryParams: any[] = [start_date, end_date];
        let typeFilter = '';
        if (type) {
            queryParams.push(type);
            typeFilter = `AND t.type = $${queryParams.length}`;
        }

        const query = `
            SELECT 
                COALESCE(c.name, 'Uncategorized') as category_name,
                c.color as category_color,
                SUM(t.amount) as total_amount,
                COUNT(t.id) as count
            FROM transactions t
            LEFT JOIN categories c ON t.category_id = c.id
            WHERE t.transaction_date >= ($1::TIMESTAMP AT TIME ZONE 'Europe/Istanbul')
              AND t.transaction_date < (($2::DATE + INTERVAL '1 day')::TIMESTAMP AT TIME ZONE 'Europe/Istanbul')
              ${typeFilter}
            GROUP BY c.name, c.color
            ORDER BY total_amount DESC
        `;

        const result = await req.db.query(query, queryParams);
        const rows = result.rows;

        // Calculate total for percentage
        const total = rows.reduce((sum: number, row: any) => sum + Number(row.total_amount), 0);

        const data = rows.map((row: any) => ({
            category_name: row.category_name,
            category_color: row.category_color,
            total_amount: Number(row.total_amount),
            count: Number(row.count),
            percentage: total > 0 ? (Number(row.total_amount) / total) * 100 : 0
        }));

        res.json({
            success: true,
            data,
            total
        });

    } catch (error) {
        console.error('Category Report Error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch category report' });
    }
});

// GET /api/reports/campaigns
router.get('/campaigns', async (req: Request, res: Response) => {
    try {
        const { start_date, end_date } = req.query;

        if (!start_date || !end_date) {
            return res.status(400).json({ success: false, error: 'Start date and end date are required' });
        }

        const query = `
            SELECT 
                campaign_code,
                campaign_id,
                description,
                COUNT(*) as sale_count,
                SUM(amount) as total_amount
            FROM transactions
            WHERE transaction_date >= ($1::TIMESTAMP AT TIME ZONE 'Europe/Istanbul')
              AND transaction_date < (($2::DATE + INTERVAL '1 day')::TIMESTAMP AT TIME ZONE 'Europe/Istanbul')
              AND campaign_code IS NOT NULL
            GROUP BY campaign_code, campaign_id, description
            ORDER BY total_amount DESC
        `;

        const result = await req.db.query(query, [start_date, end_date]);

        res.json({
            success: true,
            data: result.rows
        });

    } catch (error) {
        console.error('Campaign Report Error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch campaign report' });
    }
});

export default router;
