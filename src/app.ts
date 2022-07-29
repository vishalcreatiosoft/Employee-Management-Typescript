import express from 'express';
import http from 'http';
import router from './routes/route';
import adminService from './services/adminService';
import mongoConnection from './utils/mongodbConnection';
import swaggerDocs from './docs/swagger';


const port = 3000;

const app = express();
mongoConnection.init();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

adminService.config(app);
app.use('/',router);



http.createServer(app).listen(port,()=>{
    console.log(`server started on port ${port}`);
    swaggerDocs(app, port);
});



