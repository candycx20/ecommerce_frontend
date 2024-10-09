import UsuarioModel from "../models/B1-UsuarioModel.js";
import  jwt  from "jsonwebtoken";
import { Op } from "sequelize";


export const getUsuario = async (req, res) => {
    try {
        const Usuario = await UsuarioModel.findOne({
            where: { id: req.params.id },
            attributes: ['nombre', 'apellido', 'telefono', 'email']
        });
        
        if (!Usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        
        res.json(Usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAllUsuarios = async (req, res) => {
    try {
        const Usuarios = await UsuarioModel.findAll()
        res.json(Usuarios)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const getAllClientes = async (req, res) => {
    try {
        const Usuarios = await UsuarioModel.findAll({
            where: {
                rol: 2,
                estado: 1
            }
        })
        res.json(Usuarios)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const getAllAdministradores = async (req, res) => {
    try {
        const Usuarios = await UsuarioModel.findAll({
            where: {
                rol: 1,
                estado: 1
            }
        })
        res.json(Usuarios)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const login = async (req, res) => {
    try {
        const {email, contrasenia} = req.body;
        const Usuario = await UsuarioModel.findOne({
            where: { 
                email: email,
                contrasenia: contrasenia
            }
        });
        
        if(Usuario){
            const token = jwt.sign(
                {
                    id: Usuario.id,   
                    email: Usuario.email,
                    rol: Usuario.id_rol
                }, 
                "Stack",  
                { expiresIn: '15m' } 
            );
            res.json({token});
        } else {
            console.log('No existe Usuario');
            res.status(401).json({message: 'No existe Usuario o la contraseña es incorrecta'});
        }
    } catch (error) {
        res.json( {message: error.message} )
    }
};

export const createUsuario = async (req, res) => {
    try {
        const {nombre_usuario, email} = req.body;
        const Usuario = await UsuarioModel.findOne({
            where: { 
                [Op.or]: [
                    { email: email }, 
                    { nombre_usuario: nombre_usuario }
                ]
            }
        });
        if(Usuario){ 
            return res.status(400).json({
                message: "El nombre de usuario o correo electrónico ya está en uso"
            });
        }else{
            await UsuarioModel.create(req.body)
            res.status(201).json({
                "message":"¡Registro creado correctamente!"
            })
        }
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const updateUsuario = async (req, res) => {
    try {
        await UsuarioModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}
