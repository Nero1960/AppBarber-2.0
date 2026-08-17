"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoute_1 = __importDefault(require("./authRoute"));
const serviceRoute_1 = __importDefault(require("./serviceRoute"));
const barberRoute_1 = __importDefault(require("./barberRoute"));
const profileRoute_1 = __importDefault(require("./profileRoute"));
const appointmentRoute_1 = __importDefault(require("./appointmentRoute"));
const testimonialRoute_1 = __importDefault(require("./testimonialRoute"));
const productRoute_1 = __importDefault(require("./productRoute"));
const cartRoute_1 = __importDefault(require("./cartRoute"));
const reportRoute_1 = __importDefault(require("./reportRoute"));
const customerRoute_1 = __importDefault(require("./customerRoute"));
const router = (0, express_1.Router)();
// Registrar todas las rutas en un solo objeto
router.use("/auth", authRoute_1.default);
router.use("/service", serviceRoute_1.default);
router.use("/barber", barberRoute_1.default);
router.use("/profile", profileRoute_1.default);
router.use("/testimonial", testimonialRoute_1.default);
router.use("/appointment", appointmentRoute_1.default);
router.use("/product", productRoute_1.default);
router.use("/cart", cartRoute_1.default);
router.use("/report", reportRoute_1.default);
router.use("/customer", customerRoute_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map