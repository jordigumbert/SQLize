console.log("hola , node sequelize project !");

import Sequelize from 'sequelize';
//require('dotenv').config(); // si es mou, actualitzar gitignore i donar la ruta a dins config
import 'dotenv/config'   // mode ESM


import { TestConnection } from "./funcions/database.js";

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

