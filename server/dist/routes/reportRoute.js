"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const admin_1 = require("../middleware/admin");
const reportController_1 = __importDefault(require("../controllers/reportController"));
const express_validator_1 = require("express-validator");
const Validation_1 = require("../middleware/Validation");
const route = (0, express_1.Router)();
//Router para obtener los últimos usuarios registrados
route.get('/getLastUsers', auth_1.authenticate, admin_1.isAdmin, reportController_1.default.getLastUsers);
//Router para obtener las horas mas solicitadas por los usuarios
route.get('/getPeakHours', auth_1.authenticate, admin_1.isAdmin, reportController_1.default.getPeakHour);
//Router para obtener los barberos con más reservas
route.get('/getTopBarbers', auth_1.authenticate, admin_1.isAdmin, reportController_1.default.getTopBarbers);
//Router para obtener a los usuarios mas frecuentes
route.get('/getTopUsers', auth_1.authenticate, admin_1.isAdmin, reportController_1.default.getTopUsers);
//Router para obtener todas las citas
route.get('/getAllAppointments', auth_1.authenticate, admin_1.isAdmin, reportController_1.default.getAllAppointments);
//Obtener cita por ID
route.get('/appointment/:appointmentId', (0, express_validator_1.param)('appointmentId')
    .isNumeric().withMessage('El id de la cita no es valido'), Validation_1.handleInputErrors, auth_1.authenticate, admin_1.isAdmin, reportController_1.default.getAppointmentById);
//Actualizar el estado de la cita
route.patch('/appointment/:appointmentId/status', (0, express_validator_1.param)('appointmentId')
    .isNumeric().withMessage('ID de cita no válido'), Validation_1.handleInputErrors, auth_1.authenticate, admin_1.isAdmin, reportController_1.default.updateAppointmentStatus);
//Obtener la datos del estado de la citas
route.get('/appointment/status/data', auth_1.authenticate, admin_1.isAdmin, reportController_1.default.getStatusData);
//Obtener los datos de las citas canceladas
route.get('/appointment/cancellation/data', auth_1.authenticate, admin_1.isAdmin, reportController_1.default.getCancellationReasonData);
exports.default = route;
//# sourceMappingURL=reportRoute.js.map