import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key_change_me';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    // Check if authorization header is present
    if (!authHeader) {
        return next();
    }

    // Check if format is "Bearer <token>"
    const token = authHeader.split(' ')[1];
    if (!token) {
        return next();
    }

    // Verify token
    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) {
            // If token is invalid, we don't set req.user
            // We allow the request to proceed; protected routes will fail in authMiddleware
            // or specific route handlers.
            console.warn('[VerifyToken] Token verification failed:', err.message);
            return next();
        }

        // Token is valid, attach user to request
        req.user = user;
        next();
    });
};
