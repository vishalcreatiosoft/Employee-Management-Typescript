import express from 'express';
import http from 'http';

const port = process.env.PORT || 3000;

const app: express.Application = express();

app.get('/',(req, res)=>{
    res.send('Landing page working');
})

http.createServer(app).listen(port,()=>{
    console.log(`server started on port ${port}`);
});

