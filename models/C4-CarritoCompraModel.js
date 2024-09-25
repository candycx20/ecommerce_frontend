import db from "../database/db.js";
import { DataTypes } from "sequelize";
import ProductoModel from "./B6-ProductoModel.js"

const CarritoCompraModel = db.define('carrito_compras', {
    cantidad: {
        type: DataTypes.INTEGER,
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
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'productos',
            key: 'id'
        }
    }
}, {
    tableName: 'carrito_compras',
    timestamps: true
});

// Definición de las relaciones
CarritoCompraModel.belongsTo(ProductoModel, { foreignKey: 'id_producto' }); 

export default CarritoCompraModel;
