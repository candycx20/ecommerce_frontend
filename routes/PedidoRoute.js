import express from 'express'   
import { getAllPedidos, getPedido, createPedido, updatePedido } from '../controllers/PedidoController.js'

const router = express.Router()

router.get('/', getAllPedidos)
router.get('/:id', getPedido)
router.post('/', createPedido)
router.put('/:id', updatePedido)

export default router