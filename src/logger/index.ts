import buildDevLogger from "./dev-logger";
import buildProdLogger from "./prod-logger";


let logger:any;

if(process.env.NODE_ENV === 'development'){
    logger = buildDevLogger();
}else{
    logger = buildProdLogger();
}


export default logger;