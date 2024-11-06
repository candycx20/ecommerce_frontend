import express from 'express'   
import { getUsuario ,getAllUsuarios, getAllClientes, getAllAdministradores, login, createUsuario, updateUsuario } from '../../controllers/UsuarioController.js'

const router = express.Router()

router.get('/:id', getUsuario)
router.get('/', getAllUsuarios)
router.get('/clientes', getAllClientes)
router.get('/administradores', getAllAdministradores)
router.post('/login', login)
router.post('/', createUsuario)
router.put('/:id', updateUsuario)

export default router