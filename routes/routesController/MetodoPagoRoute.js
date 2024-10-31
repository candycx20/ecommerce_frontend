import express from 'express'   
import { getAllMetodoPagos, getMetodoPago, createMetodoPago, updateMetodoPago } from '../../controllers/MetodoPagoController.js'

const router = express.Router()

router.get('/', getAllMetodoPagos)
router.get('/:id', getMetodoPago)
router.post('/', createMetodoPago)
router.put('/:id', updateMetodoPago)

export default router