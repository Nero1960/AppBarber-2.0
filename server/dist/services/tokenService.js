"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../errors/AppError"));
const token_1 = require("../helpers/token");
const Token_1 = __importDefault(require("../models/Token"));
class TokenService {
    tokenRepository;
    constructor(tokenRepository) {
        this.tokenRepository = tokenRepository;
    }
    async createToken(userId) {
        //crear un instancia de token
        const token = new Token_1.default();
        //Generar un token de 6 dígitos
        token.token = (0, token_1.generateToken)();
        //Asignar el id del usuario
        token.userId = userId;
        //Guardar el token en la base de datos
        return await this.tokenRepository.save(token);
    }
    async getTokenByToken(token) {
        //Buscar el token en la base de datos
        const tokenExist = await this.tokenRepository.findByToken(token);
        //Validar si el token existe
        if (!tokenExist) {
            throw new AppError_1.default('Token no encontrado', 400);
        }
        //Retornar el token
        return tokenExist;
    }
    async deleteToken(token) {
        //Eliminar el token de la base de datos
        await this.tokenRepository.destroyToken(token);
    }
}
exports.default = TokenService;
//# sourceMappingURL=tokenService.js.map