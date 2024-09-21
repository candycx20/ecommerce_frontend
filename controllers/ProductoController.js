import MarcaModel from "../models/A2-MarcaModel.js";
import ProductoModel from "../models/B6-ProductoModel.js";

export const getAllProductos = async (req, res) => {
    try {
        const productos = await ProductoModel.findAll({
            include: [
                {
                    model: MarcaModel,
                    attributes: ['nombre']
                }
            ]
        })
        res.json(productos)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const getProducto = async (req, res) => {
        try {
            const Producto = await ProductoModel.findAll({
                where:{ id:req.params.id }
            })
            res.json(Producto[0])
        } catch (error) {
            res.json( {message: error.message} )
        }
}

export const createProducto = async (req, res) => {
    try {
        
       await ProductoModel.create(req.body)
       res.json({
           "message":"¡Registro creado correctamente!"
       })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const updateProducto = async (req, res) => {
    try {
        await ProductoModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}