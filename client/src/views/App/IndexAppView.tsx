import AboutApp from "@/components/app/AboutApp"
import BarberApp from "@/components/app/BarberApp"
import GalleryApp from "@/components/app/GalleryApp"
import HeroApp from "@/components/app/HeroApp"
import ServiceApp from "@/components/app/ServiceApp"
import TestimonialApp from "@/components/app/testimonials/TestimonialApp"

const IndexAppView = () => {
    return (

        <>
            <HeroApp />
            <AboutApp/>
            <ServiceApp/>
            <BarberApp/>
            <GalleryApp/>
            <TestimonialApp/>
        </>

    )
}

export default IndexAppView