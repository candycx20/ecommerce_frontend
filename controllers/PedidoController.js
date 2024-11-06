import PedidoModel from "../models/B4-PedidoModel.js";
import xmlbuilder from 'xmlbuilder';
import xml2js from 'xml2js';
import axios from 'axios';

// Obtener todos los pedidos
export const getAllPedidos = async (req, res) => {
    try {
        const pedidos = await PedidoModel.findAll();
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un pedido por ID
export const getPedido = async (req, res) => {
    try {
        const pedido = await PedidoModel.findOne({ where: { id: req.params.id } });
        if (!pedido) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createPedido = async (req, res) => {
    try {
        const { subtotal, descuento, nit_emisor, nit_receptor } = req.body;
        const total = subtotal - descuento;
        const { id_emisor, id_receptor } = await fetchReceptorAndEmisorIds(nit_emisor, nit_receptor);
        if (!id_emisor || !id_receptor) {
            return res.status(404).json({
                message: "Emisor o receptor no encontrado con los NITs proporcionados"
            });
        }

        const pedido = await PedidoModel.create({
            ...req.body,
            total
        });

        let factura;
        try {
            factura = await createFactura({ total, id_emisor, id_receptor });
        } catch (error) {
            console.error("Error al crear la factura:", error.message);
            return res.status(500).json({ message: "Error al crear la factura" });
        }

        res.json({
            id: pedido.id,
            id_factura: factura.id, 
            factura,
            message: "¡Pedido y factura creados correctamente!"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updatePedido = async (req, res) => {
    try {
        const [updated] = await PedidoModel.update(req.body, {
            where: { id: req.params.id }
        });

        if (updated) {
            res.json({ message: "¡Registro actualizado correctamente!" });
        } else {
            res.status(404).json({ message: "Pedido no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const fetchReceptorAndEmisorIds = async (nit_emisor, nit_receptor) => {
    let id_emisor = null;
    let id_receptor = null;

    try {
        const receptorXml = xmlbuilder.create('receptor')
            .ele('nit', nit_receptor)
            .end({ pretty: true });

        try {
            const receptorResponse = await axios.post('http://facturacion.candy21.icu/api/receptores/find', receptorXml, {
                headers: { 'Content-Type': 'application/xml' }
            });

            if (receptorResponse.status === 200) {
                const parser = new xml2js.Parser({ explicitArray: false });
                const receptorParsedData = await parser.parseStringPromise(receptorResponse.data);
                const receptor = receptorParsedData.receptores?.Receptor;
                if (receptor) {
                    id_receptor = receptor.id;
                }
            } else {
                console.error("Receptor API devolvió un código de estado:", receptorResponse.status);
            }
        } catch (error) {
            console.error("Error en la solicitud del receptor:", error.message);
        }

        const emisorXml = xmlbuilder.create('emisor')
            .ele('nit', nit_emisor)
            .end({ pretty: true });

        try {
            const emisorResponse = await axios.post('http://facturacion.candy21.icu/api/emisores/find', emisorXml, {
                headers: { 'Content-Type': 'application/xml' }
            });

            if (emisorResponse.status === 200) {
                const emisorParsedData = await new xml2js.Parser({ explicitArray: false }).parseStringPromise(emisorResponse.data);
                const emisor = emisorParsedData.emisores?.Emisor;
                if (emisor) {
                    id_emisor = emisor.id;
                }
            } else {
                console.error("Emisor API devolvió un código de estado:", emisorResponse.status);
            }
        } catch (error) {
            console.error("Error en la solicitud del emisor:", error.message);
        }
    } catch (error) {
        console.error("Error general en fetchReceptorAndEmisorIds:", error.message);
    }

    return { id_emisor, id_receptor };
};



const createFactura = async ({ total, id_emisor, id_receptor }) => {
    const facturaData = {
        factura: {
            total: [total.toString()],
            id_emisor: [id_emisor.toString()],
            id_receptor: [id_receptor.toString()]
        }
    };

    const xml = xmlbuilder.create(facturaData).end({ pretty: true });

    const response = await axios.post('http://facturacion.candy21.icu/api/facturas/create', xml, {
        headers: { 'Content-Type': 'application/xml' }
    });


    const parser = new xml2js.Parser({ explicitArray: false });
    const parsedData = await parser.parseStringPromise(response.data);

 
    if (!parsedData || !parsedData.factura || !parsedData.factura.id) {
        throw new Error("La respuesta de la API no contiene un ID de factura válido");
    }

    return parsedData.factura; 
};