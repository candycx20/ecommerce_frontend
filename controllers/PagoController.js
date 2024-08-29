import PagoModel from "../models/B4-PagoModel.js";

export const getAllPagos = async (req, res) => {
    try {
        const pagos = await PagoModel.findAll()
        res.json(pagos)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const getPago = async (req, res) => {
        try {
            const Pago = await PagoModel.findAll({
                where:{ id:req.params.id }
            })
            res.json(Pago[0])
        } catch (error) {
            res.json( {message: error.message} )
        }
}

export const createPago = async (req, res) => {
    try {
        const {monto_pedido, monto_enviado} = req.body;
        const total = monto_pedido + monto_enviado;

       await PagoModel.create({
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

export const updatePago = async (req, res) => {
    try {
        await PagoModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}