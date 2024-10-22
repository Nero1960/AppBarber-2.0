import type { Request, Response } from "express";
import Barber from "../models/Barber";

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
}

export default BarberController;