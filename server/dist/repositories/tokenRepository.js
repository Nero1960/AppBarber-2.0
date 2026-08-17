"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = __importDefault(require("../models/Token"));
class TokenRepository {
    //Guardar token en la base de datos
    async save(token) {
        return await token.save();
    }
    //Buscar token por token
    async findByToken(token) {
        return await Token_1.default.findOne({
            where: { token }
        });
    }
    //Eliminar token
    async destroyToken(token) {
        return await token.destroy();
    }
}
exports.default = TokenRepository;
//# sourceMappingURL=tokenRepository.js.map