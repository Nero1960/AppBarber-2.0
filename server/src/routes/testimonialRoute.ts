import { Router } from 'express'
import { body, param } from 'express-validator'
import { authenticate } from '../middleware/auth'
import { handleInputErrors } from '../middleware/Validation';
import TestimonialsController from '../controllers/testimonialController';
import { isAdmin } from '../middleware/admin';

const route = Router();


route.use(authenticate);

route.post(
    '/add-testimonial',
    body('title')
        .notEmpty().withMessage('EL titulo es requerido'),
    body('message')
        .notEmpty().withMessage('EL testimonial es requerido'),
    handleInputErrors,
    TestimonialsController.addTestimonial
)

route.get(
    '/get-testimonials',
    TestimonialsController.getTestimonials
)


route.patch(
    '/:testimonialId/status',
    param('testimonialId')
        .isNumeric().withMessage('ID del testimonial no valido'),
    isAdmin,
    TestimonialsController.updateStatusTestimonial
)

route.get(
    '/testimonials',
    isAdmin,
    TestimonialsController.getAllTestimonials
)

route.get(
    '/:testimonialId',
    param('testimonialId')
        .isNumeric().withMessage('ID del testimonial no valido'),
    isAdmin,
    TestimonialsController.getTestimonialById
)

route.delete(
    '/:testimonialId/delete',
    param('testimonialId')
        .isNumeric().withMessage('ID del testimonial no valido'),
    isAdmin,
    TestimonialsController.deleteTestimonial
)




export default route;




