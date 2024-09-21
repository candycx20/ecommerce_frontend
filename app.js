
import express from 'express'
import cors from 'cors'
import db from './database/db.js'
import ProductoRoute from './routes/ProductoRoute.js'
import CarritoCompraRoute from './routes/CarritoCompraRoute.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/productos', ProductoRoute);
app.use('/carritoCompras', CarritoCompraRoute);

try{
    await db.authenticate()
    console.log('Conexión exitosa a la DB')
}catch(error){
    console.log(`El error de conexión es: ${error}`)
}

app.listen(2003, ()=>{
    console.log('Server UP running in port 2003')
})