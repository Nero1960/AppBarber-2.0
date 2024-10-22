import type { Request, Response } from "express";
import User from "../models/User";
import path from "path";
import fs from 'fs';
import { hashPassword } from "../helpers/auth";


class ProfileController  {

    public static updateProfile = async (request: Request, response: Response) => {
        try {
            
            const userId = request.params.userId;
            const { name, phone, address, lastname } = request.body;

            const user = await User.findByPk(userId);

            if(!user){
                const error = new Error('Usuario no encontrado');
                return response.status(404).json({ error: error.message });
            }

            user.name =  name || user.name;
            user.phone = phone || user.phone;
            user.address = address || user.address;
            user.lastname = lastname || user.lastname;

            //Verificar si hay una imagen previa 
            const imageExist = user.image;

            if(request.file){
                //si se subió la imagen almacenar en la base de datos
                user.image = request.file.filename;
                
                //Si hay una imagen anterior, eliminarla del directorio uploads y de la base de datos
                if(imageExist && imageExist !== 'default.png'){
                    const previousImageUrl = path.join(__dirname, '..', 'uploads', imageExist);
                    fs.unlinkSync(previousImageUrl);
                }
            }

            await user.save();
            response.status(200).json(user);

        } catch (error) {
            console.log(error)
            const err = new Error("Oops! Something went wrong")
            return response.status(500).json({ error: err.message });
        }

    }

    public static updatePasswordProfile = async ( request: Request, response: Response) => {

        try {

            const userId = request.params.userId;
            const password = request.body.password;


            const user = await User.findByPk(userId);

            user.password = await hashPassword(password)

           user.save();

            response.status(200).send('Contraseña actualizada correctamente');
            
        } catch (error) {
            response.status(500).json({ error: 'Hubo un error' })
            
        }

    }
}


export default ProfileController;