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
                where: {
                    status: "approved"
                },
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

    public static getAllTestimonials = async (request: Request, response: Response) => {
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
            console.log(error);
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }
    }

    public static getTestimonialById = async (request: Request, response: Response) => {
        try {
            const testimonialId = +request.params.testimonialId;

            const testimonial = await Testimonials.findByPk(testimonialId, {
                include: [
                    {
                        model: User,
                        attributes: ['name', 'lastname', 'image'],
                    },
                ],
            });

            response.status(200).json(testimonial);
            
        } catch (error) {
            console.log(error);
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }

    }

    public static updateStatusTestimonial = async (request: Request, response: Response) => {
        try {
            const testimonialId = +request.params.testimonialId;

            const testimonial = await Testimonials.findByPk(testimonialId);

            if(!testimonial){
                const error = new Error('Testimonial no encontrado');
                return response.status(404).json({ error: error.message });
            }

            testimonial.status = request.body.status;
            await testimonial.save();

            response.status(200).send('Se ha cambiado el estado del testimonial');

            
        } catch (error) {
            console.log(error);
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }

    }

    public static deleteTestimonial = async (request: Request, response: Response) => {

        try {

            const testimonialId = +request.params.testimonialId;

            const testimonial = await Testimonials.findByPk(testimonialId);

            if(!testimonial){
                const error = new Error('Testimonial no encontrado');
                return response.status(404).json({ error: error.message });
            }

            await testimonial.destroy();
            
            response.status(200).send('Testimonial eliminado correctamente');
            
        } catch (error) {
            console.log(error);
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }
    }

}

export default TestimonialsController;