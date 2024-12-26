import { useServicesStore } from '@/store/serviceStore';
import { GrFormNextLink } from 'react-icons/gr';

type SelectedServicesAppointmentProps = {
    selectedServices: number[];
    setSelectedServices: React.Dispatch<React.SetStateAction<number[]>>;
    handleNext: () => void;
};

const SelectedServicesAppointment = ({
    selectedServices,
    setSelectedServices,
    handleNext,
}: SelectedServicesAppointmentProps) => {

    const services = useServicesStore((state) => state.services);

    // Manejar la selección de servicios
    const handleServiceToggle = (serviceId: number) => {
        setSelectedServices((prev) =>
            prev.includes(serviceId)
                ? prev.filter((id) => id !== serviceId)
                : [...prev, serviceId]
        );
    };

    return (
        <div className="my-10 animate-fade-up">
            <h1 className="text-white-500 font-bold text-3xl font-heading text-center">
                Selección de Servicios
            </h1>
            <p className="text-brown-200 leading-5 lg:max-w-[30rem] mx-auto text-sm text-center mt-2">
                Selecciona entre nuestros servicios especializados y deja que nuestros
                barberos expertos se encarguen de darte el estilo que mereces.
            </p>

            <div className="grid lg:grid-cols-3 mt-6 gap-5">
                {services.map((service) => (
                    <div
                        key={service.serviceId}
                        className={`py-8 px-5 rounded-lg flex justify-center items-center cursor-pointer hover:translate-x-1 hover:translate-y-1 duration-300 ${selectedServices.includes(service.serviceId)
                                ? 'bg-Primary-500 text-white-500'
                                : 'bg-brown-500'
                            }`}
                        onClick={() => handleServiceToggle(service.serviceId)}
                    >
                        <div>
                            <img src={'/logo1.png'} alt="icono barbero" width={60} height={60} />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <p className="font-heading text-white-500 text-lg">
                                {service.name}
                            </p>
                            <p className="text-xs text-white-400">
                                Tu estilo es nuestra pasión
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end">
                <button
                    disabled={selectedServices.length === 0}
                    className="bg-transparent border flex items-center gap-x-3 border-white-900 text-white-500 placeholder:text-brown-200 py-2 px-4 mt-5 rounded-sm hover:bg-Primary-500 disabled:cursor-not-allowed hover:text-white-500 duration-300 text-sm"
                    onClick={handleNext}
                >
                    Siguiente
                    <GrFormNextLink className="text-lg" />
                </button>
            </div>
        </div>
    );
};

export default SelectedServicesAppointment;
