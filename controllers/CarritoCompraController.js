import CarritoCompraModel from "../models/C4-CarritoCompraModel.js";
import ProductoModel from "../models/B6-ProductoModel.js";
import MarcaModel from "../models/A2-MarcaModel.js";
import TallaModel from "../models/A3-TallaModel.js";

export const getAllCarritoCompras = async (req, res) => {
    try {
        const CarritoCompras = await CarritoCompraModel.findAll({
            where : {
                estado: 1
            },
            include: [
                {
                    model: ProductoModel,
                    attributes: ['nombre', 'precio'],
                    include: [
                        {
                            model: MarcaModel,
                            attributes: ['nombre']
                        },
                        {
                            model: TallaModel,
                            attributes: ['descripcion']
                        }
                    ]
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
                where:{ id:req.params.id, estado: 1 }
            })
            res.json(CarritoCompra[0])
        } catch (error) {
            res.json( {message: error.message} )
        }
}

export const createCarritoCompra = async (req, res) => {
    try {
        const { cantidad, id_producto} = req.body;

        const producto = await ProductoModel.findByPk(id_producto);
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        const total = cantidad * producto.precio
       await CarritoCompraModel.create({
        ...req.body,
        total})
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