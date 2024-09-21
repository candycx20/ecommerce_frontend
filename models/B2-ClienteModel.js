import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ClienteModel = db.define('clientes', {
    dpi: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    nit: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    ciudad: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    pais: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
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
    }
}, {
    tableName: 'clientes',
    timestamps: true
});

export default ClienteModel;
