import express from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import {corsConfig } from './config/cors'
import routes from "./routes"
import colors from 'colors'
import db from './config/database';
import { errorHandler } from './middleware/errorHandler';


//Instancia de express
const server = express();

//variables de entorno
dotenv.config();

//uso de cors para permitir peticiones desde cualquier dominio
server.use(cors());


//leer datos del formulario
server.use(express.json())
// Middleware para procesar datos de formularios (si aplicable)
server.use(express.urlencoded({ extended: true }));

//comprobar la conexión a la base de datos
const connectDB = async () => {
    try {
        await db.authenticate();
        console.log( colors.bgGreen.white('Database connection has been established successfully.'));
    } catch (error) {
        console.log( colors.bgRed.white( 'Unable to connect to the database:') , error);
    }
}

connectDB();

server.use(morgan('dev'))

//hacer uso de los router, revisar archivo index del route.ts
server.use('/api', routes)

//Manejo de errores
server.use(errorHandler);

server.use('/uploads', express.static('src/uploads'));
export default server;