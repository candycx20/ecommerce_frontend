import express from 'express'   
import { getAllUsuarios, getAllClientes, getAllAdministradores,login } from '../controllers/UsuarioController.js'

const router = express.Router()

router.get('/', getAllUsuarios)
router.get('/clientes', getAllClientes)
router.get('/administradores', getAllAdministradores)
router.post('/login', login)

export default router