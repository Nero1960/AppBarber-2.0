"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Clase que extiende de Error para manejar los errores de la aplicación
class AppError extends Error {
    status;
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = 'App Error';
    }
}
exports.default = AppError;
//# sourceMappingURL=AppError.js.map