import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import Token from "../models/Token";
import { IAuthService } from "../interfaces/services/IAuthService";

class AuthController {

    constructor
        (
            private authService: IAuthService
        ) { }


    public createAccount = async (request: Request, response: Response, next: NextFunction) => {
        try {
            await this.authService.createAccount(request.body);
            response.send('Hemos enviado instrucciones a tu correo para confirmar tu cuenta');
        } catch (error) {
            next(error)
        }
    }

    public confirmAccount = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const token: Token['token'] = request.body.token;
            await this.authService.confirmAccount(token);
            response.send('Cuenta confirmada correctamente');
        } catch (error) {
            next(error)
        }
    }

    public login = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { email, password } = request.body;
            const token = await this.authService.login(email, password);
            response.status(200).send(token);
        } catch (error) {
            next(error)
        }
    }

    public requestConfirmationToken = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { email } = request.body;
            await this.authService.requestConfirmationToken(email);
            response.status(200).send('Hemos enviado un email de confirmación a tu correo');
        } catch (error) {
            next(error)
        }
    }

    public forgotPassword = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { email } = request.body;
            await this.authService.forgotPassword(email);
            response.status(200).send('Hemos enviado un email para restablecer tu contraseña');
        } catch (error) {
            next(error)
        }
    }


    public validateToken = async (request: Request, response: Response, next: NextFunction) => {
        try {
            //leemos el token del formulario
            const token: string = request.body.token;
            await this.authService.validateToken(token);
            response.status(200).send('Token válido, define tu nueva password');
        } catch (error) {
            next(error)
        }
    }

    public updatePasswordWithToken = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { token } = request.params;
            const { password } = request.body
            await this.authService.updatePasswordWithToken(token, password)
            response.status(200).send('Contraseña actualizada correctamente');
        } catch (error) {
            next(error)
        }
    }

    public getProfile = async (request: Request, response: Response) => {
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