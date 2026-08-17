"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const Validation_1 = require("../middleware/Validation");
const auth_1 = require("../middleware/auth");
const container_1 = require("../config/container");
const route = (0, express_1.Router)();
//rutas para la autenticación del usuario
route.post('/register', (0, express_validator_1.body)('name')
    .notEmpty().withMessage('El nombre es requerido'), (0, express_validator_1.body)('lastname')
    .notEmpty().withMessage('El apellido es requerido'), (0, express_validator_1.body)('phone')
    .notEmpty().withMessage('El teléfono es requerido'), (0, express_validator_1.body)('email')
    .isEmail().withMessage('Email no válido'), (0, express_validator_1.body)('password_confirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Los passwords no son iguales');
    }
    return true;
}), (0, express_validator_1.body)('password')
    .isLength({ min: 8 }).withMessage('El password es muy corto, mínimo 8 caracteres'), Validation_1.handleInputErrors, container_1.authController.createAccount);
route.post('/confirm-account', (0, express_validator_1.body)('token')
    .notEmpty().withMessage('EL token no debe ir vació'), Validation_1.handleInputErrors, container_1.authController.confirmAccount);
route.post('/login', (0, express_validator_1.body)('email')
    .isEmail().withMessage('Email no válido'), (0, express_validator_1.body)('password')
    .notEmpty().withMessage('El password es requerido'), Validation_1.handleInputErrors, container_1.authController.login);
route.post('/request-token', (0, express_validator_1.body)('email')
    .notEmpty().withMessage('El email no puede ir vacío')
    .isEmail().withMessage('Email No valido'), Validation_1.handleInputErrors, container_1.authController.requestConfirmationToken);
route.post('/forgot-password', (0, express_validator_1.body)('email')
    .isEmail().withMessage('Email no válido'), Validation_1.handleInputErrors, container_1.authController.forgotPassword);
route.post('/validate-token', (0, express_validator_1.body)('token')
    .notEmpty().withMessage('El token no debe ir vacío'), Validation_1.handleInputErrors, container_1.authController.validateToken);
route.post('/reset-password/:token', (0, express_validator_1.param)('token')
    .isNumeric().withMessage('Token no válido'), (0, express_validator_1.body)('password')
    .isLength({ min: 8 }).withMessage('El password es muy corto, mínimo 8 caracteres'), (0, express_validator_1.body)('password_confirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Los passwords no son iguales');
    }
    return true;
}), Validation_1.handleInputErrors, container_1.authController.updatePasswordWithToken);
route.get('/profile', auth_1.authenticate, container_1.authController.getProfile);
exports.default = route;
//# sourceMappingURL=authRoute.js.map