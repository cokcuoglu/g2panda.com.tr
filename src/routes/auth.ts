import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../db';
import bcrypt from 'bcryptjs';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key_change_me';

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Query user from DB
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        // Verify Password
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        // Generate Token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            data: {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    full_name: user.full_name
                }
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, error: 'Login failed' });
    }
});

// Register endpoint
// Register endpoint
router.post('/register', async (req: Request, res: Response) => {
    console.log('Register payload:', req.body);
    const { email, password, full_name, business_name, business_type, currency, locale } = req.body;

    // Basic validation
    if (!email || !password || !full_name) {
        return res.status(400).json({ success: false, error: 'Email, password and full name are required' });
    }

    try {
        // Check if user exists
        const userExists = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ success: false, error: 'User already exists' });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Create User
        // Note: For MVP, User = Business. We store business info directly on the user table.
        const newUserQuery = `
            INSERT INTO users (
                email, 
                password_hash, 
                full_name, 
                business_name, 
                business_type,
                currency,
                locale
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, email, full_name, role, business_name, currency, locale
        `;

        const newUserValues = [
            email,
            password_hash,
            full_name,
            business_name || 'İşletmem',
            business_type || 'Perakende',
            currency || 'TRY',
            locale || 'tr-TR'
        ];

        const result = await pool.query(newUserQuery, newUserValues);
        const user = result.rows[0];

        // Seed Default Categories
        const defaultCategories = [
            { name: 'Genel Satış', type: 'income', color: '#16a34a', icon: 'ShoppingCart' },
            { name: 'Hizmet Geliri', type: 'income', color: '#16a34a', icon: 'Briefcase' },
            { name: 'Kira', type: 'expense', color: '#dc2626', icon: 'Home' },
            { name: 'Fatura (Elektrik/Su)', type: 'expense', color: '#dc2626', icon: 'Zap' },
            { name: 'Personel Maaşı', type: 'expense', color: '#dc2626', icon: 'Users' },
            { name: 'Malzeme Alımı', type: 'expense', color: '#dc2626', icon: 'Package' },
            { name: 'Diğer Giderler', type: 'expense', color: '#dc2626', icon: 'MoreHorizontal' }
        ];

        for (const cat of defaultCategories) {
            await pool.query(
                `INSERT INTO categories (user_id, name, type, color, icon, is_default) VALUES ($1, $2, $3, $4, $5, true)`,
                [user.id, cat.name, cat.type, cat.color, cat.icon]
            );
        }

        // Seed Default Channels
        const defaultChannels = [
            { name: 'Nakit Kasa', type: 'payment', description: 'Nakit işlemler' },
            { name: 'Kredi Kartı', type: 'payment', description: 'POS cihazı çekimleri' },
            { name: 'Banka Hesabı', type: 'payment', description: 'Havale/EFT' },
            { name: 'Trendyol', type: 'sales', description: 'Trendyol satışları' },
            { name: 'Getir', type: 'sales', description: 'Getir satışları' },
            { name: 'Mağaza Satışı', type: 'sales', description: 'Fiziksel mağaza' }
        ];

        for (const ch of defaultChannels) {
            await pool.query(
                `INSERT INTO channels (user_id, name, type, description) VALUES ($1, $2, $3, $4)`,
                [user.id, ch.name, ch.type, ch.description]
            );
        }

        // Generate Token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role || 'OWNER' // Default to OWNER for new registrations (MVP)
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            success: true,
            data: {
                token,
                user
            }
        });

    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ success: false, error: 'Registration failed' });
    }
});

// Me endpoint moved to src/routes/user.ts
// to ensure it runs behind authMiddleware (RLS)

export default router;
