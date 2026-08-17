"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../middleware/auth");
const container_1 = require("../config/container");
const Validation_1 = require("../middleware/Validation");
const admin_1 = require("../middleware/admin");
const route = (0, express_1.Router)();
route.use(auth_1.authenticate);
route.post('/create', (0, express_validator_1.body)('barberId')
    .isNumeric().withMessage('ID del barbero no válido'), (0, express_validator_1.body)('time')
    .notEmpty().withMessage('La hora no puede ir vacía'), 
//Validar que la fecha sea mayor a la actual y que sea una fecha válida
(0, express_validator_1.body)('date')
    .isISO8601().withMessage('Fecha no válida').toDate(), (0, express_validator_1.body)('services')
    .isArray({ min: 1 }).withMessage('Servicios debe ser un array')
    .custom(services => services.every((serviceId) => !isNaN(parseInt(serviceId)))).withMessage('Todos los IDs de servicios deben ser numéricos'), Validation_1.handleInputErrors, container_1.appointmentController.makeAppointment);
route.put('/:appointmentId/update', (0, express_validator_1.param)('appointmentId')
    .isNumeric().withMessage('ID de cita no válido'), (0, express_validator_1.body)('barberId')
    .isNumeric().withMessage('ID del barbero no válido'), (0, express_validator_1.body)('time')
    .notEmpty().withMessage('La hora no puede ir vacía'), (0, express_validator_1.body)('date')
    .isISO8601().withMessage('Fecha no válida').toDate(), (0, express_validator_1.body)('services')
    .isArray().withMessage('Servicios debe ser un array')
    .custom(services => services.every((serviceId) => !isNaN(parseInt(serviceId)))).withMessage('Todos los IDs de servicios deben ser numéricos'), Validation_1.handleInputErrors, container_1.appointmentController.updateAppointment);
route.patch('/:appointmentId/cancel', (0, express_validator_1.param)('appointmentId')
    .isNumeric().withMessage('ID de cita no válido'), Validation_1.handleInputErrors, container_1.appointmentController.cancelAppointment);
route.get('/user/appointments', container_1.appointmentController.getAppointmentUserAuth);
route.get('/monthly-revenue', admin_1.isAdmin, container_1.appointmentController.monthlyRevenueAppointment);
route.get('/:appointmentId', (0, express_validator_1.param)('appointmentId')
    .isNumeric().withMessage('ID de cita no válido'), Validation_1.handleInputErrors, container_1.appointmentController.getAppointmentById);
route.post('/cancellation/reason', (0, express_validator_1.body)('cancellation_reason')
    .notEmpty().withMessage('El motivo no puede ir vacío'), (0, express_validator_1.body)('additional_comments')
    .notEmpty().withMessage('El comentario no puede ir vacío'), Validation_1.handleInputErrors, container_1.appointmentController.cancellationReason);
route.delete('/:appointmentId/delete', (0, express_validator_1.param)('appointmentId')
    .isNumeric().withMessage('ID de cita no válido'), Validation_1.handleInputErrors, admin_1.isAdmin, container_1.appointmentController.deleteAppointment);
route.get('/monthly-revenue', admin_1.isAdmin, container_1.appointmentController.monthlyRevenueAppointment);
exports.default = route;
//# sourceMappingURL=appointmentRoute.js.map