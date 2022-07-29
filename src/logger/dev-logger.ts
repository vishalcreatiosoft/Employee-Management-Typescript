import { createLogger, format, transports } from "winston";
import 'winston-mongodb';
const { timestamp, printf, combine, colorize, errors, json, metadata} = format;




const buildDevLogger = () => {

    const logFormat = printf(({ timestamp, level, message, stack }) => {
        return `${timestamp} ${level} : ${stack || message}`;
    });

    return createLogger({

        format : combine(   
            timestamp({ format : 'YYYY-MM-DD HH:mm:ss'}),
            // errors({ stack : true }),
            //logFormat,
            json(),
            metadata(),
        ),
        defaultMeta : {service : 'emp-service'},
        transports: [
            new transports.Console(),
            new transports.File({ filename: 'logHistory.log'}),
            new transports.MongoDB({
                level: 'info',
                db: 'mongodb://127.0.0.1:27017/employeeDb',
                collection : 'logMessages',
                            
            }),
        ],
    });
}


export default buildDevLogger;