"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentController = void 0;
const appointmentController_1 = __importDefault(require("../../controllers/appointmentController"));
const appointmentRepository_1 = __importDefault(require("../../repositories/appointmentRepository"));
const appointmentService_1 = __importDefault(require("../../services/appointmentService"));
const barberRepository_1 = __importDefault(require("../../repositories/barberRepository"));
const barberService_1 = __importDefault(require("../../services/barberService"));
const DateValidator_1 = __importDefault(require("../../helpers/DateValidator"));
const barberRepository = new barberRepository_1.default();
const barberService = new barberService_1.default(barberRepository);
const dateValidator = new DateValidator_1.default();
const appointmentRepository = new appointmentRepository_1.default();
const appointmentService = new appointmentService_1.default(appointmentRepository, barberService, dateValidator);
const appointmentController = new appointmentController_1.default(appointmentService);
exports.appointmentController = appointmentController;
//# sourceMappingURL=appointmentContainer.js.map