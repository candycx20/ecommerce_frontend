import db from "../database/db.js";
import { DataTypes } from "sequelize";

const PagoModel = db.define('pagos', {
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    monto_pedido: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    monto_envio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
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
    id_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'pedidos',
            key: 'id'
        }
    },
    id_metodo_pago: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'metodo_pagos',
            key: 'id'
        }
    }
}, {
    tableName: 'pagos',
    timestamps: true
});

export default PagoModel;
