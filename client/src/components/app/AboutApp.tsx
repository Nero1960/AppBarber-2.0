import { Link } from "react-router-dom"
import { IoHomeSharp } from "react-icons/io5";
import { IoFlagSharp } from "react-icons/io5";
import AnimationApp from "./AnimationApp";

const AboutApp = () => {

    return (
        <AnimationApp>
            <div className="bg-brown-500 py-20">
                <div className="max-w-4xl mx-auto px-8 lg:px-0 lg:py-5 grid gap-x-20 grid-cols-1 lg:grid-cols-[40%,60%]">
                    <div className="about-info">
                        <h2 className="font-heading text-white-500 text-4xl mb-6">Nosotros</h2>
                        <div className="space-y-3 mt-5 mb-7 text-white-500 text-xs leading-6">
                            <p>En Mojica's Barbershop, nos apasiona más que solo cortar cabello; estamos dedicados a realzar tu estilo personal y hacer que te sientas increíble.
                            </p>

                            <p>Con {new Date().getFullYear() - 2019} años de experiencia y un compromiso inquebrantable con la excelencia.</p>

                            <p>Creemos en un servicio personalizado, atención al detalle, y un ambiente donde te sientas como en casa.</p>
                        </div>

                        <Link to={'/app/about'} className='bg-Primary-500 text-sm text-white-500 hover:bg-Primary-600 duration-300 px-4 py-2 rounded-md'>Leer Mas</Link>

                    </div>

                    <div className="relative grid grid-cols-2 pb-10 gap-x-4 lg:gap-x-0 lg:pb-0">

                        <div className="hidden lg:flex absolute top-3 left-24">
                            <button className=" bg-Primary-500 text-white-500 px-6 py-2 text-sm text-left rounded-3xl flex items-center gap-x-2"><IoHomeSharp className="text-xl" />No esperes mas <br />  Siéntete como en casa</button>
                        </div>
                        <div className="image-left absolute top-20 w-1/2 h-1/2 object-cover space-y-4">
                            <img src={'/imagen1.webp'} alt="imagen nosotros" className="rounded-lg" />
                        </div>

                        <div className="image-right">
                            <img src={'/imagen2.webp'} alt="imagen nosotros" className="rounded-lg" />
                        </div>

                        <div className="hidden lg:flex absolute top-[280px] left-60">
                            <button className=" bg-Primary-500 text-white-500 px-6 py-2 text-sm text-left rounded-3xl flex items-center gap-x-2"><IoFlagSharp className="text-xl" />Experiencia Asegurada <br /> Déjalo en nuestras manos </button>
                        </div>

                    </div>

                </div>

            </div>

        </AnimationApp>

    )
}

export default AboutApp