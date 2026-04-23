console.log("hola , node sequelize project !");

import Sequelize from 'sequelize';
//require('dotenv').config(); // si es mou, actualitzar gitignore i donar la ruta a dins config
import 'dotenv/config'   // mode ESM


import { TestConnection } from "./funcions/database.js";

import { DataTypes } from "sequelize"; // per no haver de escriure sempre sequelize.datatypes.XXXX

// creem objecte sequelize 
const sequelize = new Sequelize(
    process.env.DB_SCHEMA,
    process.env.DB_USER,
    process.env.DB_PASS,

    {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        // freezeTableName: true  // xk no faci plurals !!
        //  nosaltres donem no directament per tableName, pero pot ser interesant
    });


try {
    await TestConnection(sequelize);
} catch (err) {
    console.log("[ERR]:: ", err);
};



// taula usuaris per la DB 
const User = sequelize.define(  // nom de la variable que conté la taula User
    'users',                     // nom "javascript" de la taula 
    {  // dades de la taula "users"
        id: { // sense això també es crea !!! ( default ) 
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(31),
            allownull: false,
            unique: true,       // la fem unique
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
        tableName: "usuaris", // nom a la DB SQL , escollit per nosaltres una altra opcio és la de sota.
        //  freezeTableName: true //  fa que la taula mantingui nom "javascript" de la taula ( no fa plurals ni res més)
        paranoid: true // en comptes d'esborrar, afegeix clau "deletedAt" amb la data de la suposada eliminació si tenim els timepstamps actius ( default )
        //  timestamps : true // ( default ) pero pot ser false si no ho volem, 
        //              pero llavors no podrem posar mode paranoid !!!
        //  underscored: true, // Usa snake_case en les columnes de la BD (created_at, updated_at)
    }
);


/*
User.sync( { opcions } )
opcions:
{   force: true }  // per si volem que faci drop abans de crearla 
{   alter : true } // èr si volem que la canvii encara que exiteixi
   també es poden definir per lobjecte sequelize per aplicació general
   sequelize.sync({ opcions }); 
*/


// User.drop();  // per quan la volguem eliminar !!!

// sequelize.drop( {  match: /_test$/  } ); per dropejar tot el que compleix regex 
//               ( acaba en " _test " per exemple )


// passem la info al servidor.
User.sync()
    .then(
        (data) => {
            console.log("model i taula synced");
            console.log("DATA::______\n", data, "\n_________________");
        }
    )
    .catch(
        (err) => {
            console.log("Aguna cosa ha anat malament:\n[ERR]:: ", err);
        }
    );