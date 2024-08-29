import MetodoPagoModel from "../models/A6-MetodoPagoModel.js";

export const getAllMetodoPagos = async (req, res) => {
    try {
        const metodo_pagos = await MetodoPagoModel.findAll()
        res.json(metodo_pagos)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const getMetodoPago = async (req, res) => {
        try {
            const MetodoPago = await MetodoPagoModel.findAll({
                where:{ id:req.params.id }
            })
            res.json(MetodoPago[0])
        } catch (error) {
            res.json( {message: error.message} )
        }
}

export const createMetodoPago = async (req, res) => {
    try {
       await MetodoPagoModel.create(req.body)
       res.json({
           "message":"¡Registro creado correctamente!"
       })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const updateMetodoPago = async (req, res) => {
    try {
        await MetodoPagoModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}