"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
// Middleware para manejar errores
const errorHandler = (error, request, response, next) => {
    if (error instanceof AppError_1.default) {
        return response.status(error.status).json({ error: error.message });
    }
    response.status(500).json({ message: 'Error interno del servidor' });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map