import db from "../database/db.js";
import { DataTypes } from "sequelize";

const PedidoModel = db.define('pedidos', {
    no_pedido: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    descuento: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    direccion_envio: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    ciudad_envio: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    pais_envio: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    estado: {
        type: DataTypes.TINYINT,
        defaultValue: 1
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    }
}, {
    tableName: 'pedidos',
    timestamps: true
});

export default PedidoModel;
