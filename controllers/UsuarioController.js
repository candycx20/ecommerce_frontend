import UsuarioModel from "../models/B1-UsuarioModel.js";
import  jwt  from "jsonwebtoken";

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
            res.json({message: 'No existe Usuario'});
        }
    } catch (error) {
        res.json( {message: error.message} )
    }
};

export const createUsuario = async (req, res) => {
    try {
        
       await UsuarioModel.create(req.body)
       res.json({
           "message":"¡Registro creado correctamente!"
       })
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
