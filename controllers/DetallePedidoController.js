import DetallePedidoModel from "../models/C1-DetallePedidoModel.js";

export const getAllDetallePedidos = async (req, res) => {
    try {
        const detalle_pedidos = await DetallePedidoModel.findAll()
        res.json(detalle_pedidos)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const getDetallePedido = async (req, res) => {
        try {
            const DetallePedido = await DetallePedidoModel.findAll({
                where:{ id:req.params.id }
            })
            res.json(DetallePedido[0])
        } catch (error) {
            res.json( {message: error.message} )
        }
}

export const createDetallePedido = async (req, res) => {
    try {
        const { cantidad, precio} = req.body;
        const total = cantidad * precio;

       await DetallePedidoModel.create({
        ...req.body,
        total
    });
       res.json({
           "message":"¡Registro creado correctamente!"
       })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const updateDetallePedido = async (req, res) => {
    try {
        await DetallePedidoModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}