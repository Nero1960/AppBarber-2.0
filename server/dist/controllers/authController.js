"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    createAccount = async (request, response, next) => {
        try {
            await this.authService.createAccount(request.body);
            response.send('Hemos enviado instrucciones a tu correo para confirmar tu cuenta');
        }
        catch (error) {
            next(error);
        }
    };
    confirmAccount = async (request, response, next) => {
        try {
            const token = request.body.token;
            await this.authService.confirmAccount(token);
            response.send('Cuenta confirmada correctamente');
        }
        catch (error) {
            next(error);
        }
    };
    login = async (request, response, next) => {
        try {
            const { email, password } = request.body;
            const token = await this.authService.login(email, password);
            response.status(200).send(token);
        }
        catch (error) {
            next(error);
        }
    };
    requestConfirmationToken = async (request, response, next) => {
        try {
            const { email } = request.body;
            await this.authService.requestConfirmationToken(email);
            response.status(200).send('Hemos enviado un email de confirmación a tu correo');
        }
        catch (error) {
            next(error);
        }
    };
    forgotPassword = async (request, response, next) => {
        try {
            const { email } = request.body;
            await this.authService.forgotPassword(email);
            response.status(200).send('Hemos enviado un email para restablecer tu contraseña');
        }
        catch (error) {
            next(error);
        }
    };
    validateToken = async (request, response, next) => {
        try {
            //leemos el token del formulario
            const token = request.body.token;
            await this.authService.validateToken(token);
            response.status(200).send('Token válido, define tu nueva password');
        }
        catch (error) {
            next(error);
        }
    };
    updatePasswordWithToken = async (request, response, next) => {
        try {
            const { token } = request.params;
            const { password } = request.body;
            await this.authService.updatePasswordWithToken(token, password);
            response.status(200).send('Contraseña actualizada correctamente');
        }
        catch (error) {
            next(error);
        }
    };
    getProfile = async (request, response) => {
        try {
            const user = await User_1.default.findByPk(request.user.userId, {
                attributes: ['name', 'lastname', 'image', 'userId', 'phone', 'address', 'admin', 'email']
            });
            response.json(user);
        }
        catch (error) {
            response.status(500).json({ error: 'Hubo un error' });
        }
    };
}
exports.default = AuthController;
//# sourceMappingURL=authController.js.map