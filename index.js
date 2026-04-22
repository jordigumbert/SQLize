console.log("hola , node sequelize project !");

import Sequelize from 'sequelize';
//require('dotenv').config(); // si es mou, actualitzar gitignore i donar la ruta a dins config
import 'dotenv/config'   // mode ESM


import { TestConnection } from "./funcions/database.js";

const { DataTypes } = require("sequelize"); // per no haver de escriure sempre sequelize.datatypes.XXXX

// creem objecte sequelize 
const sequelize = new Sequelize(
    process.env.DB_USER,
    process.env.DB_PASS,
    process.env.DB_SCHEMA,
    {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    });


try {
    await TestConnection(sequelize);
} catch (err) {
    console.log("[ERR]:: ", err);
};



// taula usuaris per la DB 
const User = sequelize.define(  // nom de la variable que conté la taula User
    'User',                     // nom "javascript" de la taula 
    {  // dades de la taula "user"
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(31),
            allownull: false,
            validate: {
                notEmpty: { msg: "El nombre no puede estar vacío" },
                len: { args: [5, 31], msg: "El nombre debe tener entre 5 y 31 caracteres" },
            },

        },
        apellidos: {
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: {
                notEmpty: { msg: "Los apellidos no pueden estar vacíos" },
                len: { args: [3, 150], msg: "El nombre debe ser cadena de entre 3 y 150 caracteres" },
            },
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
            validate: {
                isEmail: {
                    msg: "Debe ser un email válido",
                },
            },
        },
        password: {
            type: DataTypes.STRING(60) // en realidad guardaremos el hash q siempre es de 60 
        },

        age: {
            type: DataTypes.INTEGER,
            defaultValue: 18,
        }
    },
    {
        tableName: "usuari", // nom a la DB SQL 

    }
);

User.sync();