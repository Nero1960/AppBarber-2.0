"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testimonialController = void 0;
const testimonialController_1 = __importDefault(require("../../controllers/testimonialController"));
const testimonialRepository_1 = __importDefault(require("../../repositories/testimonialRepository"));
const testimonialService_1 = __importDefault(require("../../services/testimonialService"));
const testimonialRepository = new testimonialRepository_1.default();
const testimonialService = new testimonialService_1.default(testimonialRepository);
const testimonialController = new testimonialController_1.default(testimonialService);
exports.testimonialController = testimonialController;
//# sourceMappingURL=testimonialContainer.js.map