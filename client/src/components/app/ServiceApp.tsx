import { useService } from '@/hooks/useService';
import { useServicesStore } from "@/store/serviceStore";
import { formatToCordobas } from "@/utils/formatToCordobas";
import { useEffect } from 'react';
import AnimationApp from './AnimationApp';

const ServiceApp = () => {

    const { data , isSuccess} = useService();

    const setServices = useServicesStore(state => state.setServices);
    const services = useServicesStore(state => state.services);

    //almacenar en el state
    useEffect(() => {
        if(isSuccess && data){
            setServices(data)
        }
    },[data])

    if (services) return (
        <>

        <AnimationApp>

            <div id='services' className="max-w-4xl mx-auto px-8 lg:px-0 py-20">
                <div className="service-info space-y-3 text-white-500 text-center">
                    <h2 className="text-white font-heading text-4xl">Nuestros Servicios</h2>
                    <p className="text-xs leading-5 lg:w-96 mx-auto">Ofrecemos cortes y estilos personalizados para realzar tu look. Calidad y atención al detalle en cada servicio.</p>
                </div>

                <div className="grid lg:grid-cols-3 mt-6 gap-5">
                    {services.map(service => (
                        <div
                            key={service.serviceId}
                            className="bg-brown-500  py-8 px-5 rounded-lg flex justify-center items-center hover:translate-y-1 hover:translate-x-1 duration-300"

                        >
                            <div className="">
                                <img src={'/logo1.png'} alt="icono barbero" width={60} height={60} />
                            </div>

                            <div className="flex flex-col space-y-1">
                                <p className="font-heading  text-white-500 text-lg">{service.name}</p>
                                <p className="text-xs text-white-400">Tu estilo es nuestra pasión</p>

                            </div>
                        </div>

                    ))}

                </div>

            </div>

            <main className="max-w-4xl mx-auto px-8 lg:px-0 mb-10">
                <div className="service-info text-white-500 text-center">
                    <h2 className="text-white font-heading text-4xl mb-3">Nuestros Precios</h2>
                    <p className="text-xs leading-5 lg:w-[26rem] mx-auto">Nuestra barbería ofrece precios justos y claros para cada servicio. Porque cuidar de tu estilo no tiene que ser complicado. </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-44 mt-16 mx-auto">
                        {services.map( service => (
                            <div key={service.serviceId} className="flex justify-between items-center font-heading mb-5 relative">
                                <p className="text-sm w-[40%] text-left">{service.name}</p>
                                <p className="hidden lg:flex points">.............................................</p>
                                <span className="  ms-2 text-Primary-500  text-lg m-0 p-0">{formatToCordobas(service.price)}</span>

                            </div>
                        ))}

                    </div>
                </div>

            </main>

            </AnimationApp>

        </>

    )
}

export default ServiceApp