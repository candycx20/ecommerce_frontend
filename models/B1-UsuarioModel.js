import db from "../database/db.js";
import { DataTypes } from "sequelize";

const UsuarioModel = db.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_usuario: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },
    contrasenia: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    dpi: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    nit: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    apellido: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    direccion: {
        type: DataTypes.STRING(255),
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
    id_rol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'roles',
            key: 'id'
        }
    }
}, {
    tableName: 'usuarios',
    timestamps: true
});

export default UsuarioModel;
