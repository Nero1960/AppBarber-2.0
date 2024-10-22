import { GrGallery } from "react-icons/gr";
import { RiStarSFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import AnimationApp from "./AnimationApp";

const HeroApp = () => {
    return (
        <AnimationApp>
            <section className="hero-section lg:mt-10 px-8 lg:px-0">
                <div className="max-w-4xl mx-auto lg:h-[70vh] grid grid-cols-1 lg:grid-cols-2 place-items-center">
                    <div className="hero-info w-full flex flex-col gap-y-5">
                        <h1 className="font-heading text-4xl leading-tight text-white-500">
                            Estamos aquí para realzar tu atractivo.
                        </h1>
                        <p className="text-brown-200 text-sm">Transforma tu estilo, redefine tu imagen. ¡Descubre la experiencia de cortes excepcionales en Mojica's Barbershop.</p>

                        <div className="buttons flex gap-x-4">
                            <a
                                href={'#services'}
                                className="bg-Primary-500 rounded text-sm text-white-500 px-6 py-2 hover:bg-Primary-600 duration-300"
                            >
                                Servicios

                            </a>

                            <a
                                href={'#gallery'}
                                className="bg-transparent rounded text-sm text-white-500 px-6 py-2 hover:bg-brown-500 duration-300 flex items-center gap-x-2"
                            >
                                <GrGallery className="text-Primary-500 font-extrabold" />
                                Galería

                            </a>

                        </div>

                        <p className="font-bold text-white-500 text-sm flex items-center gap-x-2  max-w-64"><FaLocationDot className="text-Primary-500 text-xl" />7 esquinas 25 vrs oeste, Masaya, Nicaragua</p>

                        <div className="flex items-center text-Primary-500 text-lg">
                            <RiStarSFill />
                            <RiStarSFill />
                            <RiStarSFill />
                            <RiStarSFill />
                            <RiStarSFill />
                        </div>
                    </div>
                </div>
            </section>
        </AnimationApp>

    )
}

export default HeroApp