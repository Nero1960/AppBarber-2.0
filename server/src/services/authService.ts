import AppError from "../errors/AppError";
import { comparePassword, hashPassword } from "../helpers/auth";
import { generateJWT } from "../helpers/jwt";
import { IAuthRepository } from "../interfaces/repositories/IAuthRepository";
import { IAuthService } from "../interfaces/services/IAuthService";
import { ITokenService } from "../interfaces/services/ITokenService";
import Token from "../models/Token";
import User from "../models/User";
import { UserType } from "../types";
import { IEmailService } from "./emailService";


class AuthService implements IAuthService {

    constructor(
        private authRepository: IAuthRepository,
        private tokenService: ITokenService,
        private emailService: IEmailService
    ) { }

    async getUserByEmail(email: User['email']) {
        //Verificar si el usuario existe en la base de datos
        const userExist = await this.authRepository.findByEmail(email);
        return userExist;
    }

    async getUserById(id: User['userId']) {
        const user = await this.authRepository.findById(id);
        return user;
    }

    async createAccount(data: UserType) {
        //validar que el usuario no exista
        const userExist = await this.getUserByEmail(data.email);
        if(userExist){
            throw new AppError('Usuario ya registrado', 400);
        }
        //crear usuario
        const user = new User(data);
        //hash password
        user.password = await hashPassword(data.password);
        await this.authRepository.save(user);
        //crear token
        const token = await this.tokenService.createToken(user.userId);
        //enviar email
        await this.emailService.sendEmailConfirmAccount({
            email: user.email,
            token: token.token,
            name: user.name,
            lastname: user.lastname
        })
    }

    async confirmAccount(token: Token['token']) {
        //validar token
        const tokenExist = await this.tokenService.getTokenByToken(token);
        //Obtener al usuario con ese token
        const user = await this.getUserById(tokenExist.userId)
        if(!user){
            throw new AppError('Usuario no encontrado', 400);
        }
        //confirmar al usuario
        user.confirmed = 1;
        //Guard al usuario confirmado y eliminamos el token
        await Promise.allSettled([
            this.authRepository.save(user),
            this.tokenService.deleteToken(tokenExist)
        ])
    }

    async login(email: User["email"], password: User["password"]) {
        const user = await this.getUserByEmail(email);
        if(!user){
            throw new AppError('Este usuario no esta registrado', 400);
        }
        await this.validateConfirmedAccount(user);
        const isPasswordCorrect = await comparePassword(password, user.password);
        if (!isPasswordCorrect) {
            throw new AppError('Contraseña incorrecta', 400);
        }
        //autenticar al usuario
        const token = generateJWT({id: user.userId, admin: user.admin});
        return token;
    }

    //Solicitar un nuevo token de confirmación
    async requestConfirmationToken(email: User["email"]) {
        //validar email
        const user = await this.getUserByEmail(email);
        
        //validar que el usuario exista
        if(!user){
            throw new AppError('Usuario no registrado', 400);
        }

        //validar que el usuario no este confirmado
        if(user.confirmed){
            throw new AppError('Este usuario ya ha confirmado su cuenta', 400);
        }

        //generar un nuevo token
        const token =  await this.tokenService.createToken(user.userId);

        //enviar email
        await this.emailService.sendEmailConfirmAccount({
            email: user.email,
            token: token.token,
            name: user.name,
            lastname: user.lastname
        })
    }

    async forgotPassword(email: User["email"]) {
        //verificar email del usuario para generarle un token
        const user = await this.getUserByEmail(email);
        if(!user){
            throw new AppError('Este usuario no esta registrado', 400);
        }
        //generar un token para que el usuario pueda cambiar su contraseña y guardarlo en la bd
        const token = await this.tokenService.createToken(user.userId);

        //enviar email de recuperación de password
        await this.emailService.sendEmailResetPassword({
            email: user.email,
            token: token.token,
            name: user.name,
            lastname: user.lastname
        })
    }

    async validateToken(token: string) {
        //verificar si el token existe
        await this.tokenService.getTokenByToken(token);
    }

    async updatePasswordWithToken(token: Token['token'], password: User["password"]): Promise<void> {
        //Verificar si el token es valido
        const tokenExist = await this.tokenService.getTokenByToken(token);

        //extraer el usuario del token
        const user = await this.getUserById(tokenExist.userId)

        //hash password
        user.password = await hashPassword(password);

        //guardar el usuario con la nueva contraseña
        await Promise.allSettled([
            this.authRepository.save(user),
            this.tokenService.deleteToken(tokenExist)
        ])
    }

    private async validateConfirmedAccount(user: User) {
        //Si el usuario no esta confirmado
        if (!user.confirmed) {

            //generar un nuevo token automatizado
            const token = await this.tokenService.createToken(user.userId);

            //Enviar el email con el nuevo token
            await this.emailService.sendEmailConfirmAccount({
                email: user.email,
                token: token.token,
                name: user.name,
                lastname: user.lastname
            })

            throw new AppError('Tu cuenta no ha sido confirmada, hemos reenviado un email de confirmación', 400);
        }
    }

}

export default AuthService;