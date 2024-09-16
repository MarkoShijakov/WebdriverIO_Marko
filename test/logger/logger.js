import winston from 'winston';
import { format } from 'date-fns';

const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
const logFilename = `logs/test_${timestamp}.log`;

const logger = winston.createLogger({
    level: 'debug', 
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: logFilename })
    ],
});

export default logger;
