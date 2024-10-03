
import express from 'express'
import cors from 'cors'
import db from './database/db.js'
import ProductoRoute from './routes/ProductoRoute.js'
import CarritoCompraRoute from './routes/CarritoCompraRoute.js'
import UsuarioRoute from './routes/UsuarioRoute.js'
import PedidoRoute from './routes/PedidoRoute.js'
import DetallePedidoRoute from './routes/DetallePedidoRoute.js'


const app = express()

app.use(cors({
    origin: 'http://react-ecommerce-candy.s3-website-us-east-2.amazonaws.com',  // Solo permite este dominio
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,  // Permite cookies y credenciales
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
  
app.use(express.json())

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