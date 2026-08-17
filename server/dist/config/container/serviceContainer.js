"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceController = void 0;
const serviceRepository_1 = __importDefault(require("../../repositories/serviceRepository"));
const serviceService_1 = __importDefault(require("../../services/serviceService"));
const serviceController_1 = __importDefault(require("../../controllers/serviceController"));
const serviceRepository = new serviceRepository_1.default();
const serviceService = new serviceService_1.default(serviceRepository);
const serviceController = new serviceController_1.default(serviceService);
exports.serviceController = serviceController;
//# sourceMappingURL=serviceContainer.js.map