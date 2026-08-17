"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Testimonials_1 = __importDefault(require("../models/Testimonials"));
const User_1 = __importDefault(require("../models/User"));
class TestimonialRepository {
    async save(testimonial) {
        await testimonial.save();
    }
    async findAllApproved() {
        return await Testimonials_1.default.findAll({
            where: {
                status: "approved"
            },
            order: [
                ['date', 'DESC'],
            ],
            include: [
                {
                    model: User_1.default,
                    attributes: ['name', 'lastname', 'image'],
                },
            ],
        });
    }
    async findAll() {
        return await Testimonials_1.default.findAll({
            order: [
                ['date', 'DESC'],
            ],
            include: [
                {
                    model: User_1.default,
                    attributes: ['name', 'lastname', 'image'],
                },
            ],
        });
    }
    async findById(testimonialId) {
        return await Testimonials_1.default.findByPk(testimonialId, {
            include: [
                {
                    model: User_1.default,
                    attributes: ['name', 'lastname', 'image'],
                },
            ],
        });
    }
    async updateStatus(testimonial, status) {
        await testimonial.update({ status: status });
        await testimonial.save();
    }
    async delete(testimonial) {
        await testimonial.destroy();
    }
}
exports.default = TestimonialRepository;
//# sourceMappingURL=testimonialRepository.js.map