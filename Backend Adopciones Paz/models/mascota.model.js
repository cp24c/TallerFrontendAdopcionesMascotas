import { DataTypes } from "sequelize";
import { db } from "../database/db.js";

const Mascota = db.define('Mascotas', {
    idMascota: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    especie: {
        type: DataTypes.STRING,
        allowNull: false
    },
    raza: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sexo: {
        type: DataTypes.STRING,
        allowNull:false
    },
    contacto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estadoAdopcion: {
        type: DataTypes.STRING,
        defaultValue: 'Disponible'
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true
      }
}, {
    timestamps: false
});

export { Mascota };