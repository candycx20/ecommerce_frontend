import express from 'express'   
import { getAllCarritoCompras, getCarritoCompra, createCarritoCompra, updateCarritoCompra } from '../controllers/CarritoCompraController.js'

const router = express.Router()

router.get('/', getAllCarritoCompras)
router.get('/:id', getCarritoCompra)
router.post('/', createCarritoCompra)
router.put('/:id', updateCarritoCompra)

export default router