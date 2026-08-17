"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.barberController = void 0;
const barberController_1 = __importDefault(require("../../controllers/barberController"));
const barberRepository_1 = __importDefault(require("../../repositories/barberRepository"));
const barberService_1 = __importDefault(require("../../services/barberService"));
const barberRepository = new barberRepository_1.default();
const barberService = new barberService_1.default(barberRepository);
const barberController = new barberController_1.default(barberService);
exports.barberController = barberController;
//# sourceMappingURL=barberContainer.js.map