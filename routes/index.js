import express from 'express';
import ProductoRoute from './routesController/ProductoRoute.js';
import CarritoCompraRoute from './routesController/CarritoCompraRoute.js';
import UsuarioRoute from './routesController/UsuarioRoute.js';
import PedidoRoute from './routesController/PedidoRoute.js';
import DetallePedidoRoute from './routesController/DetallePedidoRoute.js';

const router = express.Router();

router.use('/productos', ProductoRoute);
router.use('/carritoCompras', CarritoCompraRoute);
router.use('/usuarios', UsuarioRoute);
router.use('/pedidos', PedidoRoute);
router.use('/detallePedidos', DetallePedidoRoute);

export default router;
