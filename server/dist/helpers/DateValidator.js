"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const AppError_1 = __importDefault(require("../errors/AppError"));
class DateValidator {
    // Validates that the date is in the future
    validateFutureDate(date, time) {
        const currentlyDate = (0, moment_1.default)();
        const datePart = moment_1.default.utc(date).format('YYYY-MM-DD'); //extraer solo la parte de la fecha
        const timePart = (0, moment_1.default)(time, 'HH:mm').format('HH:mm:ss'); // Formatear la hora a HH:mm:ss
        // Combinar la fecha y la hora en un formato ISO 8601
        // Esto asegura que la fecha y hora estén en el formato correcto para moment.js
        const dateTimeString = `${datePart}T${timePart}`;
        const dateUpdated = (0, moment_1.default)(`${dateTimeString}`);
        console.log(date, "---------------");
        console.log(dateUpdated, "++++++++++++++++++++", currentlyDate);
        if (!dateUpdated.isValid() || dateUpdated.isSameOrBefore(currentlyDate)) {
            throw new AppError_1.default('La fecha propuesta debe ser válida y mayor a la fecha actual', 400);
        }
    }
    // Validates that the date is at least 24 hours in the future
    validateDiffHour(date) {
        const currentlyDate = (0, moment_1.default)();
        const diff24Hours = Math.abs(moment_1.default.duration(currentlyDate.diff(date)).asHours());
        if (diff24Hours < 24) {
            throw new AppError_1.default('No se puede Actualizar la cita dentro de las 24 horas previas a la cita original', 404);
        }
    }
    validateTime(time) {
        // Convertir la hora en formato HH:MM a un objeto Date
        const selectHour = new Date(`2000-01-01T${time}:00`);
        // Crear objetos Date para las horas de inicio y fin del rango permitido
        const startHour = new Date('2000-01-01T09:00:00'); // 9:00 AM
        const endHour = new Date('2000-01-01T17:00:00'); // 5:00 PM
        // Validar si la hora seleccionada está dentro del rango permitido
        if (!(selectHour >= startHour && selectHour <= endHour)) {
            throw new AppError_1.default('La hora seleccionada no es válida, debe estar entre las 9:00 AM y las 5:00 PM', 400);
        }
    }
}
exports.default = DateValidator;
//# sourceMappingURL=DateValidator.js.map