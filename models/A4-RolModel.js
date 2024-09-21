import db from "../database/db.js";
import { DataTypes } from "sequelize";

const RolModel = db.define('roles', {
    nombre: {
        type: DataTypes.STRING(50),
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
    tableName: 'roles',
    timestamps: true
});

export default RolModel;
