import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const requestId = req.headers['x-request-id'];

    // Log the full error details
    logger.error({
        message: `Error: ${message}`,
        requestId,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method,
        statusCode,
    });

    // Send response to client
    // In production, we might want to hide stack traces or specific internal errors
    const isProduction = process.env.NODE_ENV === 'production';

    res.status(statusCode).json({
        success: false,
        error: message,
        requestId, // Useful for user to report
        ...(isProduction ? {} : { stack: err.stack })
    });
};
