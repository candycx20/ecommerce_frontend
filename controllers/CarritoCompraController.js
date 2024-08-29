import CarritoCompraModel from "../models/C5-CarritoCompraModel.js";
import ProductoModel from "../models/B4-ProductoModel.js";

export const getAllCarritoCompras = async (req, res) => {
    try {
        const CarritoCompras = await CarritoCompraModel.findAll({
            include: [
                {
                    model: ProductoModel,
                    as: 'productoSucursal', 
                    attributes: ['nombre'] 
                }
            ]
        })
        res.json(CarritoCompras)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const getCarritoCompra = async (req, res) => {
        try {
            const CarritoCompra = await CarritoCompraModel.findAll({
                where:{ id:req.params.id }
            })
            res.json(CarritoCompra[0])
        } catch (error) {
            res.json( {message: error.message} )
        }
}

export const createCarritoCompra = async (req, res) => {
    try {
       await CarritoCompraModel.create(req.body)
       res.json({
           "message":"¡Registro creado correctamente!"
       })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const updateCarritoCompra = async (req, res) => {
    try {
        await CarritoCompraModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}