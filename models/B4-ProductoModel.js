import db from "../database/db.js";
import { DataTypes } from "sequelize";
import ProductoSucursalModel from "./C4-ProductoSucursalModel.js";
import MarcaModel from "./A3-MarcaModel.js";

 const ProductoModel = db.define('productos', {
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
    id_marca: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'marcas',
            key: 'id'
        }
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categorias', 
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
ProductoModel.hasMany(ProductoSucursalModel, { foreignKey: 'id_producto' });
ProductoModel.belongsTo(MarcaModel, { foreignKey: 'id_marca' }); 
// ProductoModel.belongsTo(CategoriaModel, { foreignKey: 'id_categoria' });
// ProductoModel.belongsTo(TallaModel, { foreignKey: 'id_talla' });

export default ProductoModel;