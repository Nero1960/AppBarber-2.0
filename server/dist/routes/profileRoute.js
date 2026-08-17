"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Validation_1 = require("../middleware/Validation");
const uploadFiles_1 = __importDefault(require("../middleware/uploadFiles"));
const express_validator_1 = require("express-validator");
const profileController_1 = __importDefault(require("../controllers/profileController"));
const auth_1 = require("../middleware/auth");
const route = (0, express_1.Router)();
route.put('/update-profile/:userId', auth_1.authenticate, uploadFiles_1.default.single('image'), // Manejo de la carga de la imagen antes de las validaciones
(0, express_validator_1.param)('userId').isNumeric().withMessage('ID no valido'), (0, express_validator_1.body)('name').notEmpty().withMessage('El nombre del barbero es requerido'), (0, express_validator_1.body)('lastname').notEmpty().withMessage('El apellido del barbero es requerido'), (0, express_validator_1.body)('phone').notEmpty().withMessage('El numero telefónico es requerido'), Validation_1.handleInputErrors, // Manejo de los errores de validación
profileController_1.default.updateProfile);
route.patch('/update-password/:userId', auth_1.authenticate, (0, express_validator_1.param)('userId')
    .isNumeric().withMessage('ID no valido'), (0, express_validator_1.body)('password')
    .isLength({ min: 8 }).withMessage('El password es muy corto, mínimo 8 caracteres'), (0, express_validator_1.body)('password_confirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Los passwords no son iguales');
    }
    return true;
}), Validation_1.handleInputErrors, profileController_1.default.updatePasswordProfile);
exports.default = route;
//# sourceMappingURL=profileRoute.js.map