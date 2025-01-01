import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import dotenv from "dotenv";

dotenv.config();
const { createLogger, format, transports } = winston;

const transportDailyRotate = new DailyRotateFile({
    filename: './logs/%DATE%-error.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
});

const logger = createLogger({
    format: format.combine(
        format.label({ label: process.env.APP_NAME }),
        format.timestamp(),
        format.printf(({ level, message, timestamp, label }) => {
            return `${timestamp} [${label}] ${level}: ${message}`;
        })
    ),
    transports: [
        new transports.Console(), transportDailyRotate,
    ],
});

export default logger;
