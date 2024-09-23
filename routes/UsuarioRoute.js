import express from 'express'   
import { getAllUsuarios, login } from '../controllers/UsuarioController.js'

const router = express.Router()

router.get('/', getAllUsuarios)
router.post('/login', login)

export default router