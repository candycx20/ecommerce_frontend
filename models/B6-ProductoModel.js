import db from "../database/db.js";
import { DataTypes } from "sequelize";
import CategoriaModel from "./A1-CategoriaModel.js";
import MarcaModel from "./A2-MarcaModel.js";
import TallaModel from "./A3-TallaModel.js";

const ProductoModel = db.define('productos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codigo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    existencia: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    costo: {
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
    id_marca: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'marca',
            key: 'id'
        }
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categoria',
            key: 'id'
        }
    },
    id_talla: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tallas',
            key: 'id'
        }
    }
}, {
    tableName: 'productos',
    timestamps: true
});


// Definición de las relaciones
ProductoModel.belongsTo(CategoriaModel, { foreignKey: 'id_categoria' }); 
ProductoModel.belongsTo(MarcaModel, { foreignKey: 'id_marca' }); 
ProductoModel.belongsTo(TallaModel, { foreignKey: 'id_talla' });

export default ProductoModel;