import { Request, Response } from "express";
import User from "../models/User";
import { generateToken } from "../helpers/token";
import Token from "../models/Token";
import AuthEmail from "../emails/authEmail";
import { comparePassword, hashPassword } from "../helpers/auth";
import { generateJWT } from "../helpers/jwt";



class AuthController {

    public static createAccount = async (request: Request, response: Response) => {

        try {

            const { email, password }: User = request.body;

            const userExist = await User.findOne({ where: { email } });

            if (userExist) {
                const error = new Error('Este usuario ya existe');
                response.status(404).json({ error: error.message });
                return;
            }

            const token = new Token();
            const user = new User(request.body);

            //encriptar el password
            user.password = await hashPassword(password)

            await user.save();

            token.token = generateToken();
            token.userId = user.userId;

            await AuthEmail.sendEmailConfirmAccount({
                email: user.email,
                token: token.token,
                name: user.name,
                lastname: user.lastname
            })

            await token.save();

            response.send('Hemos enviado instrucciones a tu correo para confirmar tu cuenta');

        } catch (error) {
            response.status(400).json({ msg: error.message })
        }
    }

    public static confirmAccount = async (request: Request, response: Response) => {

        try {

            const { token } = request.body;

            const tokenExist = await Token.findOne({ where: { token } });

            if(!tokenExist){
                const error = new Error('Token no válido o expirado');
                return response.status(404).json({ msg: error.message });
            }

            const user = await User.findByPk(tokenExist.userId);

            user.confirmed = 1;

            await Promise.allSettled([
                user.save(),
                tokenExist.destroy()
            ])

            response.status(200).send('Cuenta confirmada correctamente, puedes iniciar sesión');

        } catch (error) {
            response.status(400).json({ msg: error.message })
        }
    }

    public static login = async (request: Request, response: Response) => {

        try {
            
            const {email , password} = request.body;

            const user = await User.findOne({ where: { email } });

            if(!user){
                const error = new Error('Usuario no encontrado');
                return response.status(404).json({ error: error.message });
            }

            //si el usuario no ha confirmado su cuenta enviamos un email con el token en automático
            if(!user.confirmed){

                const token = new Token();
                token.token = generateToken();
                token.userId = user.userId;
                await token.save();

                await AuthEmail.sendEmailConfirmAccount({
                    email: user.email,
                    token: token.token,
                    name: user.name,
                    lastname: user.lastname
                })

                const error = new Error('Cuenta no confirmada, hemos enviado un email de confirmación a tu correo');

                return response.status(401).json({ error: error.message });;
            }

            const isPasswordCorrect = await comparePassword(password, user.password);

            if(!isPasswordCorrect){
                const error = new Error('Contraseña incorrecta');
                return response.status(401).json({ error: error.message });
            }

            //autenticar al usuario

            const token = generateJWT({id: user.userId, admin: user.admin});
            response.status(200).send(token);

        } catch (error) {
            console.log(error);
            
        }



    }
    
    public static requestConfirmationToken = async(request: Request, response: Response) => {

        try {

            const { email } = request.body;


            const user = await User.findOne({ where: { email } });

            if(!user){
                const error = new Error('Usuario no registrado');
                return response.status(404).json({ error: error.message });
            }

            if(user.confirmed){
                const error = new Error('Este usuario ya ha confirmado su cuenta');
                return response.status(403).json({ error: error.message });
            }
    

            //Almacenar el token al nuevo usuario
            //Crear la instancia del token para el usuario
            const token = new Token();
            token.token = generateToken();
            token.userId = user.userId;

            await user.save();

            //enviar email
            await AuthEmail.sendEmailConfirmAccount({
                email: user.email,
                token: token.token,
                name: user.name,
                lastname: user.lastname
            });

            await token.save();

            response.status(200).send('Hemos enviado un email de confirmación a tu correo');
            
        } catch (error) {
            console.log(error)
        }

    }

    public static forgotPassword = async ( request: Request, response: Response) => {

        try {
            const { email } = request.body;

            console.log(email)

            const user = await User.findOne({
                where: {email}
            })

            if (!user) {
                const error = new Error('Este usuario no esta registrado');
                return response.status(404).json({ error: error.message });
            }
            
            //Almacenar el token al nuevo usuario
            //Crear la instancia del token para el usuario
            const token = new Token();
            token.token = generateToken();
            token.userId = user.userId;

            //enviar email de recuperación de password;

            await AuthEmail.sendEmailResetPassword({
                email: user.email,
                token: token.token,
                name: user.name,
                lastname: user.lastname
            });
           

            await token.save();

            //enviar el correo de confirmación al usuario
            response.send('Se ha enviado un nuevo token, revisa tu email');

        } catch (err) {
            console.log(err)
            response.status(500).json({ error: 'Hubo un error' })
        }

    }


    public static validateToken = async (request: Request, response: Response) => {

        try {

            //leemos el token del formulario
            const token: string = request.body.token;

            //verificar si el token existe
            const tokenExist = await Token.findOne({ where: { token } });

            //si el token no existe, enviamos un error
            if (!tokenExist) {
                const error = new Error('Token no válido o expirado');
                return response.status(404).json({ error: error.message });
            }

            response.status(200).send('Token Valido. Define tu nueva Contraseña');

        } catch (error) {
            response.status(500).json({ error: 'Hubo un error' })
        }

    }

    public static updatePasswordWithToken = async ( request: Request, response: Response) => {

        try {

            const token = request.params.token;
            const password = request.body.password;

            const tokenExist = await Token.findOne({ where: { token } });

            if(!tokenExist){
                const error = new Error('Token no válido o expirado');
                return response.status(404).json({ error: error.message });
            }

            const user = await User.findByPk(tokenExist.userId);

            user.password = await hashPassword(password)

            await Promise.all([
                user.save(),
                tokenExist.destroy()
            ])

            response.status(200).send('Contraseña actualizada correctamente');
            
        } catch (error) {
            response.status(500).json({ error: 'Hubo un error' })
            
        }

    }

    public static getProfile = async ( request: Request, response: Response ) => {
        try {
            const user = await User.findByPk(request.user.userId, {
                attributes: ['name', 'lastname', 'image', 'userId', 'phone', 'address', 'admin', 'email']
            });
            response.json(user);
        } catch (error) {
            response.status(500).json({ error: 'Hubo un error' })
        }

    }
}

export default AuthController;