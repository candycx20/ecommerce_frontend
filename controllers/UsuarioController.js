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

export const login = async (req, res) => {
    try {
        const {email, contrasenia} = req.body;
        const Usuario = await UsuarioModel.findAll({
            where:{ 
                email: email,
                contrasenia: contrasenia
            }
        })
        if(Usuario.length > 0){
            const token = jwt.sign({email}, "Stack",{
                expiresIn: '3m'
            })
            res.json({token});
        }else{
            console.log('No existe Usuario');
            res.json({message: 'No existe Usuario'});
        }
    } catch (error) {
        res.json( {message: error.message} )
    }
}