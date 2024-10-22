import api from "@/config/axios";
import { isAxiosError } from "axios";
import { TestimonialForm, testimonialSchemaUserArray } from "../types";


export const getTestimonials = async () => {
    try {
        const url = '/testimonial/get-testimonials';
        const { data } = await api.get(url);

        const response = testimonialSchemaUserArray.safeParse(data);

        if (response.success) {
            return response.data;
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }

    }
}


export const addTestimonial = async (formData: TestimonialForm) => {
    try {
        
        const url = '/testimonial/add-testimonial';
        const { data } = await api.post<string>(url, formData);
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }

}