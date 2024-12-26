import AnimationApp from "@/components/app/AnimationApp"
import {
    CarouselContent, CarouselItem, Carousel, CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { formatDate } from "@/utils/formatDate";
import { Avatar } from "@chakra-ui/react";
import { useState } from "react";
import { RiStarSFill } from "react-icons/ri";
import { IoMdAddCircle } from "react-icons/io";
import TestimonialAddModal from "@/components/app/testimonials/TestimonialAddModal";
import { useQuery } from "@tanstack/react-query";
import { getTestimonials } from "@/api/TestimonialApi";

const TestimonialApp = () => {

    
    const [showModal, setShowModal] = useState(false)

    const { data : testimonials } = useQuery({
        queryKey: ['testimonials'],
        queryFn: getTestimonials,
        retry: false,
        refetchOnWindowFocus: false,
        enabled: true,
    });


    

    if (testimonials && testimonials.length !== 0) return (
        <AnimationApp>
            <div className="py-20 relative">
                <div className="max-w-4xl mx-auto px-8 lg:px-0 lg:py-5">
                    <div className="space-y-3 text-white-500 text-center">
                        <h2 className="text-white font-heading text-4xl">Que Opinan Nuestros Clientes</h2>
                        <p className="text-xs leading-5 lg:w-[25rem] mx-auto">
                            Nuestros clientes confían en nosotros para ofrecer estilo y calidad. Lee sus opiniones y descubre cómo cada experiencia refleja nuestro compromiso con la excelencia
                        </p>
                    </div>

                    <Carousel
                        className="w-full my-10"
                        opts={
                            {
                                loop: true,
                                align: "center"
                            }
                        }
                    >
                        <CarouselContent className="-ml-1">
                            {testimonials.map((testimonial, index) => (
                                <CarouselItem
                                    key={testimonial.testimonialId}
                                    className={`bg-brown-500 rounded-md flex flex-col justify-between items-center h-[16rem]  py-5 px-6 text-white-500 even:bg-Primary-500 space-y-2 text-center md:basis-1/2 lg:basis-1/3`}
                                >

                                    <div className="flex flex-col space-y-1 justify-center items-center">
                                        <Avatar
                                            size={'lg'}
                                            src={`${import.meta.env.VITE_IMAGE_URL}/${testimonial.user.image}`}
                                        />

                                        <div className={`stars flex ${index % 2 === 0 ? 'text-Primary-500' : 'text-white-500'}`}>
                                            <RiStarSFill />
                                            <RiStarSFill />
                                            <RiStarSFill />
                                            <RiStarSFill />
                                            <RiStarSFill />
                                        </div>

                                        <p>{testimonial.title}</p>
                                        <p className="text-xs text-center">{testimonial.message}</p>

                                    </div>


                                    <div className="space-y-1">
                                        <p className={`text-sm font-heading ${index % 2 === 0 ? 'text-Primary-500' : 'text-white-500'}`}>{testimonial.user.name} {" "}{testimonial.user.lastname}</p>
                                        <p className="text-xs">{formatDate(testimonial.date)}</p>
                                    </div>

                                </CarouselItem>
                            ))}

                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex" />
                        <CarouselNext className="hidden md:flex" />      

                        <div className="md:hidden absolute -bottom-14 left-1/2 py-2">
                            <CarouselPrevious className="bg-Primary-500" />
                            <CarouselNext className="bg-Primary-500" />
                        </div>
                    </Carousel>
                    
                    <div className="flex justify-end">
                        <IoMdAddCircle
                            title="Agregar un testimonial"
                            className="text-Primary-500 font-bold text-4xl cursor-pointer"
                            onClick={() => setShowModal(true)}
                        />
                    </div>

                    {showModal && (
                        <TestimonialAddModal
                            setShowModal={setShowModal}
                            showModal={showModal}
                        />
                    )}
                </div>
            </div>
        </AnimationApp>
    )
}

export default TestimonialApp