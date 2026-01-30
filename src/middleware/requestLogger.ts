import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    // Generate Request ID if not present (Cloudflare usually provides one, but fallback is good)
    const requestId = req.headers['x-request-id'] || req.headers['cf-ray'] || require('uuid').v4();
    req.headers['x-request-id'] = requestId as string;

    const start = Date.now();
    const { method, originalUrl, ip } = req;

    // Log the request initiation
    logger.http({
        message: `Incoming Request: ${method} ${originalUrl}`,
        requestId,
        method,
        url: originalUrl,
        ip,
    });

    // Hook into response finish to log completion
    res.on('finish', () => {
        const duration = Date.now() - start;
        const { statusCode } = res;

        logger.http({
            message: `Request Completed: ${method} ${originalUrl} -> ${statusCode} (${duration}ms)`,
            requestId,
            method,
            url: originalUrl,
            statusCode,
            duration,
        });
    });

    next();
};
