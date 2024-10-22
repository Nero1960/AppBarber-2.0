import { Router } from 'express'
import { body } from 'express-validator'
import { authenticate } from '../middleware/auth'
import { handleInputErrors } from '../middleware/Validation';
import TestimonialsController from '../controllers/testimonialController';

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



export default route;




