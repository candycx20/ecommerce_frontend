import db from "../database/db.js";
import { DataTypes } from "sequelize";

 const MetodoPagoModel = db.define('metodo_pagos', {
    nombre: {
        type: DataTypes.STRING(100),
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
    }
}, {
    tableName: 'metodo_pagos',
    timestamps: true
});

export default MetodoPagoModel;