import { Link, useLocation } from "react-router-dom"
import { FaRegCalendarCheck, FaUserCheck, FaRegClock } from "react-icons/fa6"

const benefits = [
    {
        icon: <FaRegCalendarCheck className="text-Primary-500" />,
        text: 'Guarda y consulta tus citas en cualquier momento'
    },
    {
        icon: <FaUserCheck className="text-Primary-500" />,
        text: 'Elige al barbero de tu preferencia'
    },
    {
        icon: <FaRegClock className="text-Primary-500" />,
        text: 'Recibe la confirmación de tu horario al instante'
    }
]

const LoginRequiredView = () => {

    const location = useLocation();
    const state = location.state as { from?: string } | null;
    const from = state?.from;

    return (
        <main className="grid place-items-center px-6 py-20 lg:py-24">
            <div className="bg-brown-500 border border-white-950 rounded-lg max-w-md w-full px-8 py-12 space-y-8">

                <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-full bg-Primary-950/60 flex items-center justify-center">
                        <FaRegCalendarCheck className="text-Primary-500 text-3xl" />
                    </div>

                    <h1 className="font-heading text-3xl leading-snug text-white-500">
                        Crea tu cuenta para agendar tu cita
                    </h1>

                    <p className="text-sm leading-6 text-brown-200">
                        Regístrate gratis en Mojica&apos;s Barbershop y reserva tu cita
                        en pocos minutos. Es rápido y sin complicaciones.
                    </p>
                </div>

                <ul className="space-y-4">
                    {benefits.map(benefit => (
                        <li key={benefit.text} className="flex items-start gap-x-3">
                            <span className="text-lg mt-0.5">{benefit.icon}</span>
                            <span className="text-sm text-white-600">{benefit.text}</span>
                        </li>
                    ))}
                </ul>

                <div className="space-y-4 pt-2 flex flex-col items-center">
                    <Link
                        to={'/auth/register'}
                        state={from ? { from } : undefined}
                        className="w-full text-center rounded-lg bg-Primary-500 text-white-500 text-sm font-semibold px-6 py-3 hover:bg-Primary-600 duration-300"
                    >
                        Crear Cuenta
                    </Link>

                    <p className="text-sm text-brown-200">
                        ¿Ya tienes cuenta?{' '}
                        <Link
                            to={'/auth/login'}
                            state={from ? { from } : undefined}
                            className="text-Primary-400 hover:text-Primary-300 duration-300"
                        >
                            Inicia Sesión
                        </Link>
                    </p>

                    <Link
                        to={'/app'}
                        className="text-xs text-brown-300 hover:text-white-500 duration-300"
                    >
                        Volver al inicio
                    </Link>
                </div>

            </div>
        </main>
    )
}

export default LoginRequiredView
