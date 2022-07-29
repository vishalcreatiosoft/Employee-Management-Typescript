import { createLogger, format, transports } from "winston";
const { timestamp, json, combine, errors } = format;

const buildProdLogger = () =>{

    return createLogger({
        
        format : combine(
            
            timestamp(),
            errors({ stack : true }),
            json(),
        ),
        defaultMeta : { service : 'user-service' },
        transports : [ new transports.Console()],
    });
}


export default buildProdLogger;