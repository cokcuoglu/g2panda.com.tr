import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

// Define log levels
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

// Define level based on environment
const level = () => {
    return 'debug';
};

// Define colors for each level
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};

// Tell winston that we want to link the colors
winston.addColors(colors);

// Custom format for logging
const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
);

// Define file transport options
const fileRotateTransport = new DailyRotateFile({
    filename: 'logs/combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '7d', // Keep logs for 7 days
    maxSize: '20m', // Rotate if file size exceeds 20MB
    zippedArchive: true,
});

const errorFileRotateTransport = new DailyRotateFile({
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '7d',
    maxSize: '20m',
    zippedArchive: true,
    level: 'error',
});


// Create the logger instance
const logger = winston.createLogger({
    level: level(),
    levels,
    format: winston.format.json(), // Use JSON for production files
    defaultMeta: { service: 'g2panda-backend', env: process.env.NODE_ENV },
    transports: [
        fileRotateTransport,
        errorFileRotateTransport,
    ],
});

// Always log to console for pm2 to capture
logger.add(
    new winston.transports.Console({
        format: format,
    })
);

export default logger;
