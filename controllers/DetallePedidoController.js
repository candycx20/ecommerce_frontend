import DetallePedidoModel from "../models/C1-DetallePedidoModel.js";
import xmlbuilder from 'xmlbuilder';
import axios from 'axios';

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
        const { cantidad, precio, id_pedido, id_producto, descuento, otros_descuento } = req.body;
        
        const total = cantidad * precio - (descuento || 0) - (otros_descuento || 0);
        
        await DetallePedidoModel.create({
            cantidad,
            precio,
            total,
            id_pedido,
            id_producto
        });

        const { nombre, tipo_item, descripcion, id_factura } = req.body;

        const itemData = {
            cantidad,
            precio,
            nombre,
            tipo_item,
            descripcion,
            descuento,
            otros_descuento,
            total,
            id_factura
        };
        console.log(descripcion)
        await sendItemToApi(itemData);

        res.json({
            message: "¡Detalle del pedido creado correctamente y enviado a la API de Items!",
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

const sendItemToApi = async (detallePedido) => {
    try {
        const xml = xmlbuilder.create('item')
            .ele('nombre', detallePedido.nombre).up()
            .ele('tipo_item', detallePedido.tipo_item).up()
            .ele('cantidad', detallePedido.cantidad).up()
            .ele('descripcion', detallePedido.descripcion).up()
            .ele('precio', detallePedido.precio).up()
            .ele('descuento', detallePedido.descuento || 0).up()
            .ele('otros_descuento', detallePedido.otros_descuento || 0).up()
            .ele('total', detallePedido.total).up()
            .ele('id_factura', detallePedido.id_factura).up()
            .end({ pretty: true });
            
        await axios.post('http://facturacion.candy21.icu/api/items/create', xml, {
            headers: { 'Content-Type': 'application/xml' }
        });
    } catch (error) {
        console.error("Error al enviar el item a la API de Items:", error.message);
    }
};

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