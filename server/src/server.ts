import express from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import {corsConfig } from './config/cors'
import colors from 'colors'
import db from './config/database';
import authRoute from './routes/authRoute';
import serviceRoute from './routes/serviceRoute';
import barberRoute from './routes/barberRoute';
import profileRoute from './routes/profileRoute';
import appointmentRoute from './routes/appointmentRoute';
import testimonialRoute from './routes/testimonialRoute'
import productRoute from './routes/productRoute';
import cartRoute from './routes/cartRoute';
import reportRoute from './routes/reportRoute';


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

//hacer uso de los router
server.use('/api/auth', authRoute);
server.use('/api/service', serviceRoute);
server.use('/api/barber', barberRoute );
server.use('/api/profile', profileRoute);
server.use('/api/testimonial', testimonialRoute);
server.use('/api/appointment', appointmentRoute);
server.use('/api/product', productRoute);
server.use('/api/cart', cartRoute)
server.use('/api/report', reportRoute);



server.use('/uploads', express.static('src/uploads'));


export default server;