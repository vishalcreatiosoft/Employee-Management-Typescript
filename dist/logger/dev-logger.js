"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { timestamp, printf, combine, colorize, errors } = winston_1.format;
const buildDevLogger = () => {
    const logFormat = printf(({ timestamp, level, message, stack }) => {
        return `${timestamp} ${level} : ${stack || message}`;
    });
    return (0, winston_1.createLogger)({
        format: combine(colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), logFormat),
        transports: [new winston_1.transports.Console()],
    });
};
exports.default = buildDevLogger;
