"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestimonialsController {
    testimonialService;
    constructor(testimonialService) {
        this.testimonialService = testimonialService;
    }
    createTestimonial = async (request, response, next) => {
        try {
            await this.testimonialService.createTestimonial(request.body, request.user.userId);
            response.status(201).send('Testimonial creado correctamente');
        }
        catch (error) {
            next(error);
        }
    };
    getTestimonialsApproved = async (request, response, next) => {
        try {
            const testimonials = await this.testimonialService.getTestimonialsApproved();
            response.status(200).json(testimonials);
        }
        catch (error) {
            next(error);
        }
    };
    getAllTestimonials = async (request, response, next) => {
        try {
            const testimonials = await this.testimonialService.getAllTestimonials();
            response.status(200).json(testimonials);
        }
        catch (error) {
            next(error);
        }
    };
    getTestimonialById = async (request, response, next) => {
        try {
            const testimonialId = +request.params.testimonialId;
            const testimonial = await this.testimonialService.getTestimonialById(testimonialId);
            response.status(200).json(testimonial);
        }
        catch (error) {
            next(error);
        }
    };
    updateStatusTestimonial = async (request, response, next) => {
        try {
            const testimonialId = +request.params.testimonialId;
            await this.testimonialService.updateStatusTestimonial(testimonialId, request.body.status);
            response.status(200).send('Se ha cambiado el estado del testimonial');
        }
        catch (error) {
            next(error);
        }
    };
    deleteTestimonial = async (request, response, next) => {
        try {
            const testimonialId = +request.params.testimonialId;
            await this.testimonialService.deleteTestimonial(testimonialId);
            response.status(200).send('Testimonial eliminado correctamente');
        }
        catch (error) {
            next(error);
        }
    };
}
exports.default = TestimonialsController;
//# sourceMappingURL=testimonialController.js.map