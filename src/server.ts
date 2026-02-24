import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth';
import { authMiddleware } from './middleware/auth';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';
import logger from './config/logger';

import ordersRouter from './routes/orders';
import transactionsRouter from './routes/transactions';
import campaignsRouter from './routes/campaigns';
import dashboardRouter from './routes/dashboard';
import inventoryRouter from './routes/inventory';
import categoriesRouter from './routes/categories';
import channelsRouter from './routes/channels';
import productsRouter from './routes/products';
import tablesRouter from './routes/tables';
import tableOrdersRouter from './routes/table_orders';
import userRouter from './routes/user';
import usersRouter from './routes/users';
import reportsRouter from './routes/reports';
import ocrRouter from './routes/ocr';
import ocrAdvancedRouter from './routes/ocr_advanced';
import customersRouter from './routes/customers';
import businessesRouter from './routes/businesses';
import businessStatusRouter from './routes/business_status';
import { shopStatusMiddleware } from './middleware/shopStatus';
import { query } from './db';
import { initBackupScheduler } from './services/backupService';
import { initArchiveScheduler } from './services/archiveService';
import { startCronJobs } from './services/cronJobs';
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 7174;

// Initialize Scheduled Tasks
initBackupScheduler();
initArchiveScheduler();
startCronJobs();

// Security Configurations
app.set('trust proxy', 1); // Trust first proxy (Cloudflare)

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", "https://static.cloudflareinsights.com"],
                styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
                fontSrc: ["'self'", "https://fonts.gstatic.com"],
                imgSrc: ["'self'", "data:", "https:"],
                mediaSrc: ["'self'", "data:", "https:"],
                connectSrc: ["'self'", "https://cloudflareinsights.com"],
            },
        },
    })
);
app.use(compression());
app.use(requestLogger); // Log all incoming requests

// CORS Configuration
// CORS Configuration
const defaultAllowedOrigins = [
    'http://localhost:7001',
    'http://localhost:7173',
    'http://localhost:5999',
    'https://g2panda.com.tr',
    'http://g2panda.com.tr',
    'https://www.g2panda.com.tr',
    'http://www.g2panda.com.tr',
    'https://g2panda.com',
    'http://g2panda.com',
    'https://www.g2panda.com',
    'http://www.g2panda.com',
    'https://refnumber.com',
    'http://refnumber.com'
];

const envAllowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
    : [];

const allowedOrigins = Array.from(new Set([...defaultAllowedOrigins, ...envAllowedOrigins]));

app.use((req, res, next) => {
    // Debug Origin
    const origin = req.headers.origin;
    if (origin) console.log(`[CORS] Request Origin: ${origin}`);
    next();
});

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            // Log precisely what was blocked for easier troubleshooting
            console.warn(`[CORS] Blocked Origin: ${origin}`);
            callback(new Error(`Not allowed by CORS: ${origin}`));
        }
    },
    credentials: true
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 1000 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api', limiter);

// Standard Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// JWT Verification
import { verifyToken } from './middleware/verifyToken';
app.use(verifyToken);
import path from 'path';
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health Check Endpoint
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', version: '1.4.2' });
});

// DEBUG LOGGING
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.url}`);
    if (req.headers.authorization) console.log('[REQUEST] Auth Header Present');
    next();
});

// Public Routes
app.use('/api/auth', authRouter);

import publicMenuRouter from './routes/public_menu';
import publicOrdersRouter from './routes/public_orders';
app.use('/api/public/menu', publicMenuRouter);
// Public QR Order route - NO AUTH REQUIRED (must be before authMiddleware)
app.use('/api/public/orders', publicOrdersRouter);

// Public Order Routes (QR Menu - no auth required)
// Must be BEFORE authMiddleware so unauthenticated customers can submit orders
app.post('/api/orders/public/:userId', (req, res, next) => {
    ordersRouter(req, res, next);
});

// Auth Middleware (RLS & Transaction) - Protects routes below
app.use('/api', authMiddleware);

// Protected Routes (Categories/Channels/Products - always allow if they are mostly read?)
// User might want to protect these too, but for now let's focus on Financial/Sales.
app.use('/api/categories', categoriesRouter);
app.use('/api/channels', channelsRouter);
app.use('/api/products', productsRouter);

// Financial/Order Routes - Protected by Shop Status
// NOTE: /public/* paths are exempted inside shopStatusMiddleware itself.
app.use('/api/transactions', shopStatusMiddleware, transactionsRouter);
app.use('/api/orders', shopStatusMiddleware, ordersRouter);
app.use('/api/table-orders', shopStatusMiddleware, tableOrdersRouter);
app.use('/api/inventory', shopStatusMiddleware, inventoryRouter);

// Other Protected Routes
app.use('/api/tables', tablesRouter);
app.use('/api/campaigns', campaignsRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/businesses', businessesRouter);
app.use('/api/business-status', businessStatusRouter);
// (Moved up)

// (Moved up)
// Mount user router (handles /me) - Secure (RLS Active)
app.use('/api/users/me', userRouter);
// Mount users management router (handles list/status)
app.use('/api/users', usersRouter);
// Mount menu categories router
import menuCategoriesRouter from './routes/menu_categories';
app.use('/api/menu-categories', menuCategoriesRouter);

// Mount reports router
app.use('/api/reports', reportsRouter);
app.use('/api/ocr', ocrRouter);
app.use('/api/ocr-advanced', ocrAdvancedRouter);
app.use('/api/customers', customersRouter);

import auditLogsRouter from './routes/audit_logs';
app.use('/api/audit-logs', auditLogsRouter);

import hardwareRouter from './routes/hardware';
app.use('/api/hardware', hardwareRouter);

// For backward compatibility (frontend uses /api/auth/me)
// Route /api/auth/me to the secure user router path
// This is a bit of a hack, better to update frontend.
// But wait, the frontend is calling /api/auth/me which hits the authRouter (public).
// We removed /me from authRouter. 
// So requests to /api/auth/me will fall through? 
// No, authRouter handles /api/auth prefix. If not found, it 404s inside authRouter? No, express Router passes non-matches.
// So: app.use('/api/auth', authRouter); 
// If /me is gone from authRouter, it continues to next middleware?
// Yes.
// So we can catch /api/auth/me specifically AFTER authMiddleware and route it to userRouter.

// Redirect legacy /api/auth/me removed (Frontend updated)

// Mount upload router
import uploadRouter from './routes/upload';
app.use('/api/upload', uploadRouter);

// Serve uploads folder statically
// This allows files to be accessed via http://domain.com/uploads/filename.png
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Serve static files from React app in production
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

// Handle React routing, return all other requests to React app
app.get('*', (req: Request, res: Response) => {
    // Skip API requests to prevent returning HTML for missing API endpoints
    if (req.path.startsWith('/api')) {
        console.warn(`[404-API] Unmatched API Request: ${req.method} ${req.url}`);
        res.status(404).json({ success: false, error: 'API endpoint not found' });
        return;
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
});

// Global Error Handler
// Global Error Handler
app.use(errorHandler);

import { hardwareBridgeService } from './services/hardwareBridge';

// Start Server
const server = app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

// Initialize Hardware Bridge WebSocket support
hardwareBridgeService.init(server);

export { server };

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err: any) => {
    logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
    logger.error(err);
    if (err.stack) logger.error(err.stack);
    server.close(() => {
        process.exit(1);
    });
});

// Handle Uncaught Exceptions
process.on('uncaughtException', (err: any) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err);
    if (err.stack) console.error(err.stack);
    process.exit(1);
});
