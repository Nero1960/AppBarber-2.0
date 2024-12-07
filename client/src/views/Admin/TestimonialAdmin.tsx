import { getAllTestimonials } from "@/api/TestimonialApi"
import TestimonialTable from "@/components/admin/testimonials/TestimonialTable";
import { useQuery } from "@tanstack/react-query"

const TestimonialAdmin = () => {

    const { data } = useQuery({
        queryKey: ['testimonialAdmin'],
        queryFn: getAllTestimonials,
        retry: false,
        refetchOnWindowFocus: false,
        enabled: true
    })

    console.log(data);
 
    if(data)return (
        <div>
            <TestimonialTable testimonials={data}/>
        </div>
    )
}

export default TestimonialAdmin