import db from "../database/db.js";
import { DataTypes } from "sequelize";

const TallaModel = db.define('tallas', {
    descripcion: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    genero: {
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
    }
}, {
    tableName: 'tallas',
    timestamps: true
});

export default TallaModel;
