
import express from 'express'
import cors from 'cors'
import db from './database/db.js'
import ProductoRoute from './routes/ProductoRoute.js'
import CarritoCompraRoute from './routes/CarritoCompraRoute.js'
import UsuarioRoute from './routes/UsuarioRoute.js'
import PedidoRoute from './routes/PedidoRoute.js'
import DetallePedidoRoute from './routes/DetallePedidoRoute.js'


const app = express()

app.use(cors())
app.use(express.json())

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
    //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
    res.setHeader("Access-Control-Max-Age", 7200);
  
    next();
  });

app.use('/productos', ProductoRoute);
app.use('/carritoCompras', CarritoCompraRoute);
app.use('/usuarios', UsuarioRoute);
app.use('/pedidos', PedidoRoute);
app.use('/detallePedidos', DetallePedidoRoute);


try{
    await db.authenticate()
    console.log('Conexión exitosa a la DB')
}catch(error){
    console.log(`El error de conexión es: ${error}`)
}

app.listen(2003, ()=>{
    console.log('Server UP running in port 2003')
})