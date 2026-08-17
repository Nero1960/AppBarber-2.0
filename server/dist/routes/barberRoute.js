"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../middleware/auth");
const container_1 = require("../config/container");
const Validation_1 = require("../middleware/Validation");
const admin_1 = require("../middleware/admin");
const uploadFiles_1 = __importDefault(require("../middleware/uploadFiles"));
const route = (0, express_1.Router)();
route.use(auth_1.authenticate);
route.get('/barbers', container_1.barberController.getBarbers);
route.get('/:barberId', (0, express_validator_1.param)('barberId')
    .isNumeric().withMessage('ID no valido'), Validation_1.handleInputErrors, container_1.barberController.getBarberById);
route.post('/create', admin_1.isAdmin, // Verificación de autenticación primero
uploadFiles_1.default.single('image'), // Manejo de la carga de la imagen antes de las validaciones
(0, express_validator_1.body)('name').notEmpty().withMessage('El nombre del barbero es requerido'), (0, express_validator_1.body)('lastname').notEmpty().withMessage('El apellido del barbero es requerido'), (0, express_validator_1.body)('phone').notEmpty().withMessage('El numero telefónico es requerido'), (0, express_validator_1.body)('email').isEmail().withMessage('El email es requerido'), (0, express_validator_1.body)('specialty').notEmpty().withMessage('La especialidad es requerida'), Validation_1.handleInputErrors, // Manejo de los errores de validación
container_1.barberController.createBarber);
route.put('/:barberId/update', admin_1.isAdmin, uploadFiles_1.default.single('image'), (0, express_validator_1.param)('barberId').isNumeric().withMessage('ID no valido'), (0, express_validator_1.body)('name').notEmpty().withMessage('El nombre del barbero es requerido'), (0, express_validator_1.body)('lastname').notEmpty().withMessage('El apellido del barbero es requerido'), (0, express_validator_1.body)('phone').notEmpty().withMessage('El numero telefónico es requerido'), (0, express_validator_1.body)('email').isEmail().withMessage('El email es requerido'), (0, express_validator_1.body)('specialty').notEmpty().withMessage('La especialidad es requerida'), Validation_1.handleInputErrors, container_1.barberController.updateBarber);
route.delete('/:barberId/delete', admin_1.isAdmin, (0, express_validator_1.param)('barberId').isNumeric().withMessage('ID no valido'), Validation_1.handleInputErrors, container_1.barberController.deleteBarber);
route.get('/appointment/data', admin_1.isAdmin, container_1.barberController.barberData);
route.get('/income/data', admin_1.isAdmin, container_1.barberController.barbersIncome);
exports.default = route;
//# sourceMappingURL=barberRoute.js.map