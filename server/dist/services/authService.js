"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../errors/AppError"));
const auth_1 = require("../helpers/auth");
const jwt_1 = require("../helpers/jwt");
const User_1 = __importDefault(require("../models/User"));
class AuthService {
    authRepository;
    tokenService;
    emailService;
    constructor(authRepository, tokenService, emailService) {
        this.authRepository = authRepository;
        this.tokenService = tokenService;
        this.emailService = emailService;
    }
    async getUserByEmail(email) {
        //Verificar si el usuario existe en la base de datos
        const userExist = await this.authRepository.findByEmail(email);
        return userExist;
    }
    async getUserById(id) {
        const user = await this.authRepository.findById(id);
        return user;
    }
    async createAccount(data) {
        //validar que el usuario no exista
        const userExist = await this.getUserByEmail(data.email);
        if (userExist) {
            throw new AppError_1.default('Usuario ya registrado', 400);
        }
        //crear usuario
        const user = new User_1.default(data);
        //hash password
        user.password = await (0, auth_1.hashPassword)(data.password);
        await this.authRepository.save(user);
        //crear token
        const token = await this.tokenService.createToken(user.userId);
        //enviar email
        await this.emailService.sendEmailConfirmAccount({
            email: user.email,
            token: token.token,
            name: user.name,
            lastname: user.lastname
        });
    }
    async confirmAccount(token) {
        //validar token
        const tokenExist = await this.tokenService.getTokenByToken(token);
        //Obtener al usuario con ese token
        const user = await this.getUserById(tokenExist.userId);
        if (!user) {
            throw new AppError_1.default('Usuario no encontrado', 400);
        }
        //confirmar al usuario
        user.confirmed = 1;
        //Guard al usuario confirmado y eliminamos el token
        await Promise.allSettled([
            this.authRepository.save(user),
            this.tokenService.deleteToken(tokenExist)
        ]);
    }
    async login(email, password) {
        const user = await this.getUserByEmail(email);
        if (!user) {
            throw new AppError_1.default('Este usuario no esta registrado', 400);
        }
        await this.validateConfirmedAccount(user);
        const isPasswordCorrect = await (0, auth_1.comparePassword)(password, user.password);
        if (!isPasswordCorrect) {
            throw new AppError_1.default('Contraseña incorrecta', 400);
        }
        //autenticar al usuario
        const token = (0, jwt_1.generateJWT)({ id: user.userId, admin: user.admin });
        return token;
    }
    //Solicitar un nuevo token de confirmación
    async requestConfirmationToken(email) {
        //validar email
        const user = await this.getUserByEmail(email);
        //validar que el usuario exista
        if (!user) {
            throw new AppError_1.default('Usuario no registrado', 400);
        }
        //validar que el usuario no este confirmado
        if (user.confirmed) {
            throw new AppError_1.default('Este usuario ya ha confirmado su cuenta', 400);
        }
        //generar un nuevo token
        const token = await this.tokenService.createToken(user.userId);
        //enviar email
        await this.emailService.sendEmailConfirmAccount({
            email: user.email,
            token: token.token,
            name: user.name,
            lastname: user.lastname
        });
    }
    async forgotPassword(email) {
        //verificar email del usuario para generarle un token
        const user = await this.getUserByEmail(email);
        if (!user) {
            throw new AppError_1.default('Este usuario no esta registrado', 400);
        }
        //generar un token para que el usuario pueda cambiar su contraseña y guardarlo en la bd
        const token = await this.tokenService.createToken(user.userId);
        //enviar email de recuperación de password
        await this.emailService.sendEmailResetPassword({
            email: user.email,
            token: token.token,
            name: user.name,
            lastname: user.lastname
        });
    }
    async validateToken(token) {
        //verificar si el token existe
        await this.tokenService.getTokenByToken(token);
    }
    async updatePasswordWithToken(token, password) {
        //Verificar si el token es valido
        const tokenExist = await this.tokenService.getTokenByToken(token);
        //extraer el usuario del token
        const user = await this.getUserById(tokenExist.userId);
        //hash password
        user.password = await (0, auth_1.hashPassword)(password);
        //guardar el usuario con la nueva contraseña
        await Promise.allSettled([
            this.authRepository.save(user),
            this.tokenService.deleteToken(tokenExist)
        ]);
    }
    async validateConfirmedAccount(user) {
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
            });
            throw new AppError_1.default('Tu cuenta no ha sido confirmada, hemos reenviado un email de confirmación', 400);
        }
    }
}
exports.default = AuthService;
//# sourceMappingURL=authService.js.map