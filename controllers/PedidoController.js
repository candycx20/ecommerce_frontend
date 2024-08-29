import PedidoModel from "../models/B2-PedidoModel.js";

export const getAllPedidos = async (req, res) => {
    try {
        const pedidos = await PedidoModel.findAll()
        res.json(pedidos)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const getPedido = async (req, res) => {
    try {
        const Pedido = await PedidoModel.findAll({
            where:{ id:req.params.id }
        })
        res.json(Pedido[0])
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const createPedido = async (req, res) => {
    try {
        const { subtotal, descuento } = req.body;
        const total = subtotal - descuento;
        
        await PedidoModel.create({
            ...req.body,
            total 
        });
        
        res.json({
            message: "¡Registro creado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updatePedido = async (req, res) => {
    try {
        await PedidoModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}