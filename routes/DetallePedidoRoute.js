import express from 'express'   
import { getAllDetallePedidos, getDetallePedido, createDetallePedido, updateDetallePedido } from '../controllers/DetallePedidoController.js'

const router = express.Router()

router.get('/', getAllDetallePedidos)
router.get('/:id', getDetallePedido)
router.post('/', createDetallePedido)
router.put('/:id', updateDetallePedido)

export default router