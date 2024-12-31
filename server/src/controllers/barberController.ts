import type { Request, Response } from "express";
import Barber from "../models/Barber";
import path from "path";
import fs from 'fs';

declare global {
    namespace Express {
        interface Request {
            file?: Express.Multer.File; // Aquí usamos el tipo `File` proporcionado por `multer`
        }
    }
}


class BarberController {

    public static getAllBarber = async (request: Request, response: Response) => {

        try {
            const barber = await Barber.findAll();
            response.status(200).json(barber);

        } catch (error) {
            console.log(error)
            const errorMessage = new Error('Oops! Something went wrong');
            response.status(500).json({ error: errorMessage.message });
        }

    }


    public static getBarberById = async (request: Request, response: Response) => {

        try {

            const barberId = parseInt(request.params.barberId);
            const barber = await Barber.findByPk(barberId);
            if (!barber) {
                const errorMessage = new Error('Barber not found');
                return response.status(404).json({ error: errorMessage.message });
            }

            response.status(200).json(barber);

        } catch (error) {
            const errorMessage = new Error('Oops! Something went wrong');
            response.status(500).json({ error: errorMessage.message });
        }

    }


    public static addBarber = async (request: Request, response: Response) => {

        try {

            const { name, lastname, email, phone, specialty } = request.body;
            const barber = await Barber.findOne(email);

            if (!barber) {
                const error = new Error('Este barbero ya existe');
                return response.status(409).json({ error: error.message });
            }

            const newBarber = await Barber.create({
                name,
                lastname,
                email,
                phone,
                specialty,
                image: request.file ? request.file.filename : 'default.png'
            });

            await newBarber.save();

            response.send('Barbero registrado correctamente')

        } catch (error) {
            console.log(error)
            const errorMessage = new Error('Oops! Something went wrong');
            response.status(500).json({ error: errorMessage.message });
        }

    }

    public static updateBarber = async (request: Request, response: Response) => {
      try {
        const barberId = parseInt(request.params.barberId);
        const { name, lastname, email, phone, specialty } = request.body;
        const barber = await Barber.findByPk(barberId);

        if (!barber) {
          const errorMessage = new Error('Barber0 no encontrado');
          return response.status(404).json({ error: errorMessage.message });
        };

        barber.name = name || barber.name;
        barber.lastname = lastname || barber.lastname;
        barber.email = email || barber.email;
        barber.phone = phone || barber.phone;
        barber.specialty = specialty || barber.specialty;
        
        const imageExist = barber.image;
        
        if(request.file){
          barber.image = request.file.filename;
          
          if(imageExist && imageExist !== 'default.png'){
            const previousImageUrl = path.join(__dirname, '..', 'uploads', imageExist);
            fs.unlinkSync(previousImageUrl);
          }
        }

        await barber.save();

        response.status(200).json(barber);
      } catch (error) {
        console.log(error);
        const errorMessage = new Error('Oops! Something went wrong');
        response.status(500).json({ error: errorMessage.message });
      }
    }

    public static deleteBarber = async (request: Request, response: Response) => {
      try {
        const barberId = parseInt(request.params.barberId);
        const barber = await Barber.findByPk(barberId);
        const image = barber.image;

        if (!barber) {
          const errorMessage = new Error('Barbero no encontrado');
          return response.status(404).json({ error: errorMessage.message });
        };

        await barber.destroy();
          
        const previousImageUrl = path.join(__dirname, '..', 'uploads', image);
        fs.unlinkSync(previousImageUrl);

        response.status(200).send('Barbero eliminado correctamente');
      } catch (error) {
        console.log(error);
        const errorMessage = new Error('Oops! Something went wrong');
        response.status(500).json({ error: errorMessage.message });
      }
    }
}

export default BarberController;