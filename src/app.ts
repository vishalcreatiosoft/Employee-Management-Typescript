import express from 'express';
import http from 'http';
import router from './routes/route';
import mongoConnection from './utils/mongodbConnection';


const port = process.env.PORT || 3000;

const app: express.Application = express();
mongoConnection.init();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);




http.createServer(app).listen(port,()=>{
    console.log(`server started on port ${port}`);
});



