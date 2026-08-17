"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const sequelize_1 = require("sequelize");
const Token_1 = __importDefault(require("../models/Token"));
const generateToken = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
exports.generateToken = generateToken;
const verifyToken = async (token) => {
    // Busca un token en la base de datos que coincida con el token proporcionado y que no haya expirado
    const tokenExpired = await Token_1.default.findOne({
        where: {
            token: token,
            expiresAt: {
                [sequelize_1.Op.gt]: new Date() // El token debe no haber expirado
            }
        }
    });
    if (!tokenExpired) {
        // Intentar encontrar y eliminar el token si ha expirado
        await Token_1.default.destroy({
            where: {
                token: token
            }
        });
        throw new Error('Token expirado o no válido');
    }
    // El token es válido y no ha expirado
    return tokenExpired;
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=token.js.map