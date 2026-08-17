"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../errors/AppError"));
const Testimonials_1 = __importDefault(require("../models/Testimonials"));
class TestimonialService {
    testimonialRepository;
    constructor(testimonialRepository) {
        this.testimonialRepository = testimonialRepository;
    }
    async createTestimonial(testimonialData, userId) {
        const testimonial = new Testimonials_1.default({
            ...testimonialData,
            userId: userId
        });
        await this.testimonialRepository.save(testimonial);
    }
    async getTestimonialsApproved() {
        return await this.testimonialRepository.findAllApproved();
    }
    async getAllTestimonials() {
        return await this.testimonialRepository.findAll();
    }
    async getTestimonialById(testimonialId) {
        const testimonial = await this.testimonialRepository.findById(testimonialId);
        // Si no se encuentra el testimonio, lanzar un error
        if (!testimonial) {
            throw new AppError_1.default('Testimonial no encontrado', 404);
        }
        return testimonial;
    }
    async updateStatusTestimonial(testimonialId, status) {
        const testimonial = await this.getTestimonialById(testimonialId);
        await this.testimonialRepository.updateStatus(testimonial, status);
    }
    async deleteTestimonial(testimonialId) {
        const testimonial = await this.getTestimonialById(testimonialId);
        await this.testimonialRepository.delete(testimonial);
        '';
    }
}
exports.default = TestimonialService;
//# sourceMappingURL=testimonialService.js.map