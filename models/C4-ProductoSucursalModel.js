import db from "../database/db.js";
import { DataTypes } from "sequelize";
import ProductoModel from "./B4-ProductoModel.js";

const ProductoSucursalModel = db.define('producto_sucursal', {
    existencia: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
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
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'productos',
            key: 'id'
        }
    },
    id_sucursal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'sucursales',
            key: 'id'
        }
    }
}, {
    tableName: 'producto_sucursales',
    timestamps: true
});


export default ProductoSucursalModel;
