"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
const isAdmin = (request, response, next) => {
    if (request.user && request.user.admin) {
        next();
    }
    else {
        return next(new AppError_1.default('No tienes permisos para acceder a este recurso', 403));
    }
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=admin.js.map