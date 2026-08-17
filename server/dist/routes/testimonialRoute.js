"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../middleware/auth");
const Validation_1 = require("../middleware/Validation");
const container_1 = require("../config/container");
const admin_1 = require("../middleware/admin");
const route = (0, express_1.Router)();
route.use(auth_1.authenticate);
route.post('/create', (0, express_validator_1.body)('title')
    .notEmpty().withMessage('EL titulo es requerido'), (0, express_validator_1.body)('message')
    .notEmpty().withMessage('EL testimonial es requerido'), Validation_1.handleInputErrors, container_1.testimonialController.createTestimonial);
route.get('/testimonials/approved', container_1.testimonialController.getTestimonialsApproved);
route.get('/testimonials', admin_1.isAdmin, container_1.testimonialController.getAllTestimonials);
route.patch('/:testimonialId/status', (0, express_validator_1.param)('testimonialId')
    .isNumeric().withMessage('ID del testimonial no valido'), admin_1.isAdmin, container_1.testimonialController.updateStatusTestimonial);
route.get('/:testimonialId', (0, express_validator_1.param)('testimonialId')
    .isNumeric().withMessage('ID del testimonial no valido'), admin_1.isAdmin, container_1.testimonialController.getTestimonialById);
route.delete('/:testimonialId/delete', (0, express_validator_1.param)('testimonialId')
    .isNumeric().withMessage('ID del testimonial no valido'), admin_1.isAdmin, container_1.testimonialController.deleteTestimonial);
exports.default = route;
//# sourceMappingURL=testimonialRoute.js.map