import { DataTypes } from "sequelize";
import { db } from "../database/db.js";
import { Mascota } from "./mascota.model.js";

const Solicitud = db.define('Solicitudes', {
    idSolicitud: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    identidadSolicitante: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },  
    celSolicitante: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    correoSolicitante: {
        type:DataTypes.STRING,
        allowNull:false
    },
    fechaSolicitud: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: 'Pendiente'
    }


}, {
    timestamps: false
});

// Relación
Solicitud.belongsTo(Mascota, {
    foreignKey: 'idMascota',
    onDelete: 'CASCADE'
});

export { Solicitud };
