import db from "../database/db.js";
import { DataTypes } from "sequelize";

const DetalleCompraModel = db.define('detalle_compras', {
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    costo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
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
    id_compra: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'compras',
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
    tableName: 'detalle_compras',
    timestamps: true
});

export default DetalleCompraModel;
