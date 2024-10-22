import { getTestimonials } from "@/api/TestimonialApi"
import { useQuery } from "@tanstack/react-query"

export const useTestimonials = () => {

    const { data } = useQuery({
        queryKey: ['testimonials'],
        queryFn: getTestimonials,
        retry: false,
        refetchOnWindowFocus: false,
    })

    return { data }

}
