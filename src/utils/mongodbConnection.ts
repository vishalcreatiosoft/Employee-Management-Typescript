import mongoose from "mongoose";

class mongodbConnection{
    config;

    constructor(){
        this.config = {
            host : process.env.DATABASE_HOST || '127.0.0.1',
            port : process.env.DATABASE_PORT || '27017',
            database : process.env.DATABASE_NAME || 'employeeDb'
        }
        this.init();
    }

    init() {

        let url = `mongodb://${this.config.host}:${this.config.port}/${this.config.database}`;
        mongoose.connect(url)
            .then(database=>{
                console.log(`mongodb database connected to server on url : ${url}`);
            })
            .catch(error=>{
                console.log(`unable to connect mongodb database to server on url : ${url}`);
                console.log(error);
                process.exit(1);
            })
    }
}

const mongoConnection = new mongodbConnection();
export default mongoConnection;
