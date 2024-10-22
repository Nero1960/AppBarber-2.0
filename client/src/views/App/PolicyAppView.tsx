import { ListItem, UnorderedList } from "@chakra-ui/react"
import { FaClock, FaLocationDot, FaPhoneVolume } from "react-icons/fa6"

const PolicyAppView = () => {
    return (
        <main className="max-w-4xl mx-auto px-8 lg:px-0 animate-fade-up my-10">
            <h1 className="text-white-500 font-heading text-3xl">Política de citas</h1>
            <p className="text-brown-200 mt-2 lg:w-[60%] text-sm">Por favor, lee atentamente las siguientes reglas para que podamos ofrecerte el mejor servicio posible en cada visita.</p>

            <div className="flex flex-col lg:flex-row lg:gap-x-5 mt-10">
                <div className="lg:w-[70%] space-y-5">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-heading text-white-500">Reservación</h2>
                        <UnorderedList className="list-disc space-y-2 text-brown-200 text-sm">
                            <ListItem className="leading-7">Las citas deben reservarse con al menos 24 horas de anticipación.</ListItem>
                            <ListItem className="leading-7">Puedes reservar fácilmente tu cita a través de nuestra plataforma en línea o llamando a nuestro salón directamente.</ListItem>
                            <ListItem className="leading-7">No debes reservar más de una cita al día.</ListItem>
                            <ListItem className="leading-7">Te recomendamos reservar tu cita con anticipación para garantizar tu lugar en nuestro calendario.</ListItem>
                        </UnorderedList>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-heading text-white-500">Modificaciones y Cancelaciones</h2>
                        <UnorderedList className="list-disc space-y-2 text-brown-200 text-sm">
                            <ListItem className="leading-7">Entendemos que pueden surgir imprevistos. Sin embargo, cualquier cambio o cancelación de cita debe realizarse con al menos 24 horas de anticipación.</ListItem>

                            <ListItem className="leading-7">Si cancelas tu cita con menos de 24 horas de antelación, se cobrará el costo completo de tu sesión. No hay excepciones para esto. Ya que si no nos avisas a tiempo, no podremos utilizar este tiempo de tu cita con otra persona.</ListItem>

                        </UnorderedList>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-heading text-white-500">Puntualidad</h2>
                        <UnorderedList className="list-disc space-y-2 text-brown-200 text-sm">
                            <ListItem className="leading-7">Valoramos tu tiempo y el de nuestro equipo. Te pedimos que llegues a tiempo para tu cita programada para asegurar que podamos brindarte el mejor servicio posible.</ListItem>

                            <ListItem className="leading-7">Si llegas tarde, haremos todo lo posible para atenderte, pero es posible que necesitemos re programar tu cita para otro momento.</ListItem>

                        </UnorderedList>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-heading text-white-500">Comunicación</h2>
                        <UnorderedList className="list-disc space-y-2 text-brown-200 text-sm">
                            <ListItem className="leading-7">Si tienes alguna pregunta o inquietud sobre nuestras políticas de citas, no dudes en comunicarte con nosotros. Estamos aquí para ayudarte y asegurarnos de que tengas una experiencia inolvidable en Mojica's BarberShop..</ListItem>

                        </UnorderedList>
                    </div>
                </div>

                <aside className="hidden lg:flex">

                    <div className='flex flex-col gap-y-2 '>
                        <h3 className='font-heading text-xl text-white-500  text-center lg:text-left'>Contacto</h3>
                        <div className='flex gap-x-2 items-center'>
                            <FaLocationDot className='text-Primary-500' />
                            <p className='text-xs text-brown-200'>7 esquinas 25 vrs oeste, Masaya, Nicaragua</p>
                        </div>

                        <div className='flex gap-x-2 items-center mt-2'>
                            <FaPhoneVolume className='text-Primary-500' />
                            <p className='text-xs text-brown-200'>8788 2866</p>
                        </div>

                        <div className='flex gap-x-2 items-center mt-2'>
                            <FaClock className='text-Primary-500' />
                            <p className="text-xs  text-brown-200">Horarios: <span>Lunes a Sábado: 9:00 AM - 6:00 PM</span></p>
                        </div>

                    </div>

                </aside>

            </div>

        </main>
    )
}

export default PolicyAppView