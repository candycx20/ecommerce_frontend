
import 'dotenv/config';
import express from 'express'
import cors from 'cors'
import db from './database/db.js'
import index from './routes/index.js'


const app = express()

app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "*"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    res.setHeader("Access-Control-Max-Age", 7200);
  
    next();
  });
  
  
app.use(express.json())
app.use('/', index);

try{
    await db.authenticate()
    console.log('Conexión exitosa a la DB')
}catch(error){
    console.log(`El error de conexión es: ${error}`)
}


const port = process.env.PORT;

app.listen(port, ()=>{
    console.log(`Server UP running in port ${port}`)
})