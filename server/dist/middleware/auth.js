"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const authenticate = async (request, response, next) => {
    const bearer = request.headers.authorization;
    if (!bearer) {
        return next(new AppError_1.default('Token no proporcionado', 401));
    }
    const token = bearer.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === 'object' && decoded.id) {
            const user = await User_1.default.findByPk(decoded.id);
            if (user) {
                //almacenamos en el request al usuario para hacerlo accesible en los otros request
                request.user = user;
                next();
            }
            else {
                //en caso de que el usuario haya eliminado su cuenta pero el token exista
                return next(new AppError_1.default('Token no valid o Expirado', 401));
            }
        }
    }
    catch (error) {
        next(error);
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.js.map