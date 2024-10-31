import express from 'express'   
import { getAllPagos, getPago, createPago, updatePago } from '../../controllers/PagoController.js'

const router = express.Router()

router.get('/', getAllPagos)
router.get('/:id', getPago)
router.post('/', createPago)
router.put('/:id', updatePago)

export default router