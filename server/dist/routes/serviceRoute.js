"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const Validation_1 = require("../middleware/Validation");
const auth_1 = require("../middleware/auth");
const admin_1 = require("../middleware/admin");
const express_1 = require("express");
const container_1 = require("../config/container");
const route = (0, express_1.Router)();
//todas las consultas hacia servicio, el usuario debe estar autenticado
route.use(auth_1.authenticate);
route.get('/services', container_1.serviceController.getAllServices);
route.get('/get-top-services', admin_1.isAdmin, container_1.serviceController.getTopServices);
route.get('/:serviceId', admin_1.isAdmin, (0, express_validator_1.param)('serviceId')
    .isNumeric().withMessage('ID no valido'), Validation_1.handleInputErrors, container_1.serviceController.getServiceById);
route.post('/create', admin_1.isAdmin, (0, express_validator_1.body)('name')
    .notEmpty().withMessage('El nombre del servicio es requerido'), (0, express_validator_1.body)('price')
    .notEmpty().withMessage('El precio del servicio es requerido'), Validation_1.handleInputErrors, container_1.serviceController.newService);
route.put('/:serviceId/update', admin_1.isAdmin, (0, express_validator_1.param)('serviceId')
    .isNumeric().withMessage('ID no valido'), (0, express_validator_1.body)('name')
    .notEmpty().withMessage('El nombre del servicio es requerido'), (0, express_validator_1.body)('price')
    .notEmpty().withMessage('El precio del servicio es requerido')
    .isFloat({ min: 50 }).withMessage('El precio debe ser mayor a 50'), Validation_1.handleInputErrors, container_1.serviceController.updateService);
route.delete('/:serviceId/delete', admin_1.isAdmin, (0, express_validator_1.param)('serviceId')
    .isNumeric().withMessage('ID no valido'), Validation_1.handleInputErrors, container_1.serviceController.deleteService);
exports.default = route;
//# sourceMappingURL=serviceRoute.js.map