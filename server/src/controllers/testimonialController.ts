import type { Response, Request } from "express";
import Testimonials from "../models/Testimonials";
import User from "../models/User";

class TestimonialsController {

    public static addTestimonial = async(request: Request, response: Response) => {

        try {

            const testimonial = new Testimonials({
                ...request.body,
                userId: request.user.userId,
            });

            await testimonial.save();

            response.status(201).json('Testimonial agregado correctamente');
            
        } catch (error) {
            console.log(error)
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }

    }


    public static getTestimonials = async (request: Request, response: Response) => {
        try {

            const testimonials = await Testimonials.findAll({
                order: [
                    ['date', 'DESC'],
                ],
                include: [
                    {
                        model: User,
                        attributes: ['name', 'lastname', 'image'],
                    },
                ],
            });

            response.status(201).json(testimonials);
            
        } catch (error) {
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }

    }

}

export default TestimonialsController;