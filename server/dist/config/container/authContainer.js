"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const authController_1 = __importDefault(require("../../controllers/authController"));
const authRepository_1 = __importDefault(require("../../repositories/authRepository"));
const tokenRepository_1 = __importDefault(require("../../repositories/tokenRepository"));
const authService_1 = __importDefault(require("../../services/authService"));
const tokenService_1 = __importDefault(require("../../services/tokenService"));
const emailService_1 = __importDefault(require("../../services/emailService"));
// Crear instancias de repositorios
const tokenRepository = new tokenRepository_1.default();
const authRepository = new authRepository_1.default();
// Crear instancias de servicios inyectando los repositorios
const tokenService = new tokenService_1.default(tokenRepository);
const emailService = new emailService_1.default();
const authService = new authService_1.default(authRepository, tokenService, emailService);
// Crear instancia del controlador inyectando los servicios
const authController = new authController_1.default(authService);
exports.authController = authController;
//# sourceMappingURL=authContainer.js.map